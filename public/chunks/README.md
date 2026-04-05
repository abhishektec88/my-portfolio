# `public/chunks/`

This folder is intentionally **empty** in git: chunk URLs are still `/chunks/*.js` for the legacy iframe.

- **Main vendor bundle** — `src/legacy/vendor/index-XNYmtKME.js` (minified Vue + WebGL; no TS source in this repo). Served in dev and copied to `dist/chunks/` on build via `legacyChunksPlugin`.
- **Data chunks** (`DABWVKfi.js`, etc.) — compiled from **`src/legacy-chunks/*.ts`** + **`src/data/legacy/`** at dev (middleware) and build.

Edit TypeScript under `src/`. Run `npm run dev` or `npm run build`.
