/**
 * Injects `src/site.config.ts` into the React shell (`index.html`) and serves/writes
 * `portfolio-legacy.html` from `src/legacy/portfolio-legacy.template.html`.
 */
import type { Plugin, ResolvedConfig } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "../site.config";

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function absoluteUrl(pathFromRoot: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const p = pathFromRoot.startsWith("/") ? pathFromRoot : `/${pathFromRoot}`;
  return `${base}${p}`;
}

function injectMainShellHtml(html: string): string {
  const c = siteConfig;
  const canonical = absoluteUrl("/");
  const ogImage = absoluteUrl(c.ogImagePath);
  const twitterImage = absoluteUrl(c.twitterImagePath);
  const block = `
    <meta name="description" content="${escapeAttr(c.description)}" />
    <meta name="robots" content="${escapeAttr(c.robots)}" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    <meta property="og:title" content="${escapeAttr(c.title)}" />
    <meta property="og:description" content="${escapeAttr(c.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(c.title)}" />
    <meta name="twitter:description" content="${escapeAttr(c.description)}" />
    <meta name="twitter:image" content="${escapeAttr(twitterImage)}" />
    <meta name="theme-color" content="${escapeAttr(c.themeColor)}" />
`;
  let out = html.replace(/<html[^>]*>/, `<html lang="${escapeAttr(c.lang)}">`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(c.title)}</title>`);
  out = out.replace("</head>", `${block}</head>`);
  return out;
}

function applyLegacyTemplate(template: string): string {
  const c = siteConfig;
  const legacyCanonical = absoluteUrl(c.legacyHtmlPath);
  const ogUrl = legacyCanonical;
  const ogImage = absoluteUrl(c.ogImagePath);
  const twitterImage = absoluteUrl(c.twitterImagePath);

  const map: Record<string, string> = {
    LANG: escapeAttr(c.lang),
    TITLE: escapeText(c.title),
    DESCRIPTION: escapeAttr(c.description),
    ROBOTS: escapeAttr(c.robots),
    LEGACY_CANONICAL: escapeAttr(legacyCanonical),
    OG_TITLE: escapeAttr(c.title),
    OG_DESCRIPTION: escapeAttr(c.description),
    OG_URL: escapeAttr(ogUrl),
    OG_IMAGE: escapeAttr(ogImage),
    TWITTER_TITLE: escapeAttr(c.title),
    TWITTER_DESCRIPTION: escapeAttr(c.description),
    TWITTER_IMAGE: escapeAttr(twitterImage),
    THEME_COLOR: escapeAttr(c.themeColor),
  };

  let out = template;
  for (const [key, value] of Object.entries(map)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}

async function renderPortfolioLegacyPage(root: string): Promise<string> {
  const templatePath = path.join(root, "src/legacy/portfolio-legacy.template.html");
  const raw = await fs.readFile(templatePath, "utf8");
  return applyLegacyTemplate(raw);
}

export function siteHtmlPlugin(): Plugin {
  let resolved: ResolvedConfig;

  return {
    name: "site-html",
    configResolved(c) {
      resolved = c;
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = ((req as { url?: string }).url ?? "").split("?")[0] ?? "";
        if (url !== "/portfolio-legacy.html") {
          next();
          return;
        }
        try {
          const html = await renderPortfolioLegacyPage(server.config.root);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(html);
        } catch (e) {
          console.error("[site-html]", e);
          res.statusCode = 500;
          res.end("<!doctype html><title>Error</title><p>Failed to render portfolio-legacy.html</p>");
        }
      });
    },
    transformIndexHtml: {
      order: "pre",
      handler(html: string) {
        return injectMainShellHtml(html);
      },
    },
    async closeBundle() {
      const r = resolved.root;
      const outFile = path.resolve(r, resolved.build.outDir, "portfolio-legacy.html");
      const html = await renderPortfolioLegacyPage(r);
      await fs.writeFile(outFile, html, "utf8");
      console.log("[site-html] wrote", outFile);
    },
  };
}
