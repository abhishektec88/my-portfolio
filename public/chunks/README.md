# `public/chunks/`

This folder is intentionally **empty** in git: chunk URLs are still `/chunks/*.js` for the legacy iframe.

- **Main vendor bundle source** — `src/legacy/vendor/index-XNYmtKME.tsx` (minified Vue + WebGL; no clean TS source in this repo). Served in dev and emitted to `dist/chunks/index-XNYmtKME.js` on build via `legacyChunksPlugin`.
- **Data chunks** (`legacy-thumbnails.js`, `legacy-projects-en.js`, `legacy-i18n-en.js`, …) — compiled from **`src/legacy-chunks/*.ts`** + **`src/data/legacy/`** at dev (middleware) and build.

Edit TypeScript under `src/`. Run `npm run dev` or `npm run build`.
