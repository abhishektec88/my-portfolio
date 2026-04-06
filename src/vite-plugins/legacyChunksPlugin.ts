/**
 * Legacy data chunks: **TypeScript only** in `src/legacy-chunks` + `src/data/legacy`.
 * Dev: middleware compiles on first request (cached until sources change).
 * Build: writes `dist/chunks/*.js` (+ .map). `vendor-project-data.js` is built from
 * `src/legacy-chunks/vendor-project-data.ts` (project case copy + tag labels for the legacy Vue app).
 * Vendor main `index-XNYmtKME.tsx` is transformed from `src/legacy/vendor/`
 * and emitted as `/chunks/index-XNYmtKME.js`.
 */
import type { Plugin, ResolvedConfig } from "vite";
import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const CHUNK_NAMES = ["legacy-thumbnails", "legacy-projects-en", "legacy-i18n-en"] as const;
type ChunkName = (typeof CHUNK_NAMES)[number];

const VENDOR_MAIN = "index-XNYmtKME.js";
const VENDOR_MAIN_SOURCE = "index-XNYmtKME.tsx";
const VENDOR_PROJECT_DATA = "vendor-project-data.js";

async function buildVendorMainJs(projectRoot: string): Promise<string> {
  const sourcePath = path.join(projectRoot, "src/legacy/vendor", VENDOR_MAIN_SOURCE);
  const source = await fs.readFile(sourcePath, "utf8");
  const result = await esbuild.transform(source, {
    loader: "tsx",
    format: "esm",
    target: "es2022",
    sourcefile: sourcePath,
  });
  return result.code;
}

async function buildVendorProjectDataJs(projectRoot: string): Promise<string> {
  const r = await esbuild.build({
    absWorkingDir: projectRoot,
    entryPoints: [path.join(projectRoot, "src/legacy-chunks/vendor-project-data.ts")],
    bundle: true,
    format: "iife",
    platform: "browser",
    target: "es2022",
    write: false,
    minify: false,
  });
  const out = r.outputFiles?.[0]?.text;
  if (!out) throw new Error("[legacy-chunks] vendor-project-data build produced no output");
  return out;
}

const common: esbuild.BuildOptions = {
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  sourcemap: true,
};

async function buildLegacyChunksToDir(root: string, outDir: string): Promise<void> {
  const absWorkingDir = root;

  await esbuild.build({
    ...common,
    absWorkingDir,
    entryPoints: [path.join(root, "src/legacy-chunks/legacy-thumbnails.ts")],
    outfile: path.join(outDir, "legacy-thumbnails.js"),
  });

  await esbuild.build({
    ...common,
    absWorkingDir,
    entryPoints: [path.join(root, "src/legacy-chunks/legacy-projects-en.ts")],
    outfile: path.join(outDir, "legacy-projects-en.js"),
    external: ["./legacy-thumbnails.js"],
  });

  await esbuild.build({
    ...common,
    absWorkingDir,
    entryPoints: [path.join(root, "src/legacy-chunks/legacy-i18n-en.ts")],
    outfile: path.join(outDir, "legacy-i18n-en.js"),
  });
}

async function readBuiltChunks(dir: string): Promise<Record<ChunkName, { js: string; map: string }>> {
  const out = {} as Record<ChunkName, { js: string; map: string }>;
  for (const name of CHUNK_NAMES) {
    const jsPath = path.join(dir, `${name}.js`);
    const mapPath = path.join(dir, `${name}.js.map`);
    const js = await fs.readFile(jsPath, "utf8");
    let map = "";
    try {
      map = await fs.readFile(mapPath, "utf8");
    } catch {
      /* optional */
    }
    out[name] = { js, map };
  }
  return out;
}

async function buildLegacyChunksInMemory(root: string): Promise<Record<ChunkName, { js: string; map: string }>> {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "vite-legacy-chunks-"));
  try {
    await buildLegacyChunksToDir(root, tmp);
    // Must await before `finally` runs — otherwise the temp dir is deleted while reads are still in flight.
    return await readBuiltChunks(tmp);
  } finally {
    await fs.rm(tmp, { recursive: true, force: true }).catch(() => undefined);
  }
}

export function legacyChunksPlugin(): Plugin[] {
  let root: string;
  let devCache: Record<ChunkName, { js: string; map: string }> | null = null;
  /** Cached vendor main bundle (~1MB); invalidated when `src/legacy/vendor` changes. */
  let vendorMainJs: string | null = null;
  /** Cached IIFE for `globalThis.__PORTFOLIO_VENDOR_DATA__`. */
  let vendorProjectDataJs: string | null = null;
  let resolved: ResolvedConfig;

  return [
    {
      name: "legacy-chunks-dev",
      configureServer(server) {
        root = server.config.root;
        server.middlewares.use(async (req, res, next) => {
          const url = ((req as { url?: string }).url ?? "").split("?")[0] ?? "";
          if (url === `/chunks/${VENDOR_PROJECT_DATA}`) {
            try {
              if (vendorProjectDataJs === null) {
                vendorProjectDataJs = await buildVendorProjectDataJs(root);
              }
              res.setHeader("Content-Type", "text/javascript; charset=utf-8");
              res.end(vendorProjectDataJs);
              return;
            } catch (e) {
              console.error("[legacy-chunks] vendor-project-data:", e);
              res.statusCode = 500;
              res.end("// vendor-project-data build error\n");
              return;
            }
          }
          if (url === `/chunks/${VENDOR_MAIN}`) {
            try {
              if (vendorMainJs === null) {
                vendorMainJs = await buildVendorMainJs(root);
              }
              res.setHeader("Content-Type", "text/javascript; charset=utf-8");
              res.end(vendorMainJs);
              return;
            } catch (e) {
              console.error("[legacy-chunks] vendor main:", e);
              res.statusCode = 500;
              res.end("// missing src/legacy/vendor/index-XNYmtKME.tsx\n");
              return;
            }
          }
          const jsM = url.match(
            /^\/chunks\/(legacy-thumbnails|legacy-projects-en|legacy-i18n-en)\.js$/,
          );
          const mapM = url.match(
            /^\/chunks\/(legacy-thumbnails|legacy-projects-en|legacy-i18n-en)\.js\.map$/,
          );
          const name = (jsM?.[1] ?? mapM?.[1]) as ChunkName | undefined;
          if (!name) {
            next();
            return;
          }
          try {
            if (!devCache) devCache = await buildLegacyChunksInMemory(root);
            const chunk = devCache[name];
            if (jsM) {
              res.setHeader("Content-Type", "text/javascript; charset=utf-8");
              res.end(chunk.js);
              return;
            }
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(chunk.map || "{}");
          } catch (e) {
            console.error("[legacy-chunks]", e);
            res.statusCode = 500;
            res.end("// legacy-chunks compile error\n");
          }
        });
        server.watcher.on("change", (file) => {
          if (file.includes("legacy-chunks") || file.includes(`${path.sep}data${path.sep}legacy`)) {
            devCache = null;
          }
          if (file.includes(`${path.sep}legacy${path.sep}vendor`)) {
            vendorMainJs = null;
          }
          if (file.includes("vendor-project-data.ts") || file.includes(`${path.sep}data${path.sep}legacy`)) {
            vendorProjectDataJs = null;
          }
        });
      },
    },
    {
      name: "legacy-chunks-dist",
      apply: "build",
      configResolved(c) {
        resolved = c;
      },
      async closeBundle() {
        const r = resolved.root;
        const chunksDir = path.resolve(r, resolved.build.outDir, "chunks");
        await fs.mkdir(chunksDir, { recursive: true });
        await buildLegacyChunksToDir(r, chunksDir);
        const vendorData = await buildVendorProjectDataJs(r);
        await fs.writeFile(path.join(chunksDir, VENDOR_PROJECT_DATA), vendorData, "utf8");
        const vendorMain = await buildVendorMainJs(r);
        await fs.writeFile(path.join(chunksDir, VENDOR_MAIN), vendorMain, "utf8");
        console.log("[legacy-chunks] emitted", chunksDir);
      },
    },
  ];
}
