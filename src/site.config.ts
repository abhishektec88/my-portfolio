/**
 * Single source of truth for site name, SEO, social previews, theme, and public URL.
 * Edit this file to rebrand — the main React shell (`index.html`) and the legacy page
 * (`/portfolio-legacy.html`) are both generated from these values. The shell is an iframe
 * to `legacyHtmlPath` — see `App.tsx`.
 *
 * **Strings inside the 3D experience** (buttons, about text, project lists) are edited in
 * `src/data/legacy/` (`i18n-en.ts`, `projects-en.ts`, `thumbnails.ts`).
 * **Legacy Vue bundle data** (loaded on `/portfolio-legacy.html` via `/chunks/vendor-project-data.js`):
 * project cases (`vendor-project-cases-en.ts`), tag labels, and **hero name** (`vendor-hero-name.ts`).
 */

export const siteConfig = {
  /** No trailing slash. Used for canonical, Open Graph, and Twitter Card absolute URLs. */
  siteUrl: "https://portfolio-zvso.vercel.app",

  /** Browser tab title and default social title. */
  title: "Abhishek Ranjan",

  /** Meta description (search + social snippets). */
  description:
    "Senior Software Engineer building intelligent solutions with AI/ML and modern technology. Full-stack development, Spring Boot, React, Python, and cloud.",

  /** `<html lang="...">` */
  lang: "en",

  /** `<meta name="robots">` */
  robots: "index, follow",

  /** `<meta name="theme-color">` (shell + legacy). */
  themeColor: "#d1dae1",

  /**
   * Path to the legacy HTML file on your deployed origin (leading slash).
   * Must match the iframe `src` in `App.tsx`.
   */
  legacyHtmlPath: "/portfolio-legacy.html",

  /** Paths under `public/` — combined with `siteUrl` for og:image and twitter:image. */
  ogImagePath: "/meta/og-image.webp",
  twitterImagePath: "/meta/twitter-image.webp",
} as const;
