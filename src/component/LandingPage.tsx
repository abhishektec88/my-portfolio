/**
 * The original portfolio is a Vue + WebGL production build (`src/legacy/vendor/index-XNYmtKME.tsx`).
 * It must keep loading its own chunk files — those cannot be swapped for `src/` at build time.
 *
 * Site title, SEO, and social meta: `src/site.config.ts` (injected into `index.html` and the legacy page).
 * In-experience copy: `src/data/legacy/` (`i18n-en.ts`, `projects-en.ts`, `thumbnails.ts`).
 * Vendor bundle data: `vendor-project-cases-en.ts`, `vendor-hero-name.ts`, loaded via `/chunks/vendor-project-data.js`.
 */

const LEGACY_ENTRY = "/portfolio-legacy.html";

export default function LandingPage() {
  return (
    <iframe
      title="Portfolio"
      src={LEGACY_ENTRY}
      className="legacy-frame"
    />
  );
}