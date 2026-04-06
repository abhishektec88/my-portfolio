# Portfolio (React shell + original UI)

This project is **Vite + React + TypeScript**. The **visual experience** (WebGL room, animations, layout) is the **original production build**, loaded inside a full-page iframe so it stays **identical** to the static site.

- **React entry:** `src/App.tsx`, `src/main.tsx`
- **Site name, SEO, social cards, theme, public URL:** `src/site.config.ts` — drives both the React shell (`index.html`) and **`/portfolio-legacy.html`** (generated in dev/build from `src/legacy/portfolio-legacy.template.html`; not stored under `public/`).
- **Legacy data chunks (TypeScript only):** `src/legacy-chunks/` + `src/data/legacy/`. Vite compiles them on the fly in dev and writes **`dist/chunks/*.js`** on production build. The **vendor WebGL main source** lives in **`src/legacy/vendor/index-XNYmtKME.tsx`** and is transformed/served as **`/chunks/index-XNYmtKME.js`** by the legacy plugin (`public/chunks/` has no committed `.js` files).
- **Static assets:** `public/assets/`, `public/fonts/`, `public/meta/`

## Commands

```bash
npm.cmd install
npm.cmd run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm.cmd run build
npm.cmd run preview
```

## Why an iframe?

Rebuilding the 3D scene and Vue app in React would not match the real site. The iframe keeps **one** source of truth for the UI while you use React for tooling, future routes, or new pages.

## Direct legacy URL (no React)

In dev/build you can also open `/portfolio-legacy.html` — same site without the React wrapper.
