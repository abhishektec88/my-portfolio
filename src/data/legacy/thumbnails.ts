/**
 * Project grid thumbnails: ice-blue gradients + white outline icons (SVG data URLs).
 * Paths are Heroicons-style 24×24; centered via transform. Edit per-project gradients/icons here.
 */

/** Ice-blue horizontal gradients — muted (dimmed again for softer viewing). */
const iceGradients = {
  clientPortfolio: ["#9bb8cc", "#7499a8", "#557a8c"] as const,
  ngoWebsite: ["#98c2cc", "#72a3b0", "#528a98"] as const,
  resumeBuilder: ["#9db4cc", "#779bb0", "#56829a"] as const,
  ecommerce: ["#92a8bc", "#6c8fa6", "#4f7688"] as const,
  aiRiskPlatform: ["#98c4d0", "#74aab8", "#549098"] as const,
  financialSecurityDashboard: ["#90aec8", "#6a94b0", "#4c7c98"] as const,
} as const;

/** 24×24 outline icons (single path each), stroke drawn in white. */
const icons = {
  /** Briefcase — client portfolio */
  clientPortfolio:
    "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  /** Heart — NGO / mission */
  ngoWebsite:
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  /** Document — resume */
  resumeBuilder:
    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  /** Shopping cart — e-commerce */
  ecommerce:
    "M2.25 3h1.386c.51 0 .955.343 1.087.835l3.383 13.26a2.25 2.25 0 002.122 1.696H19.5a2.25 2.25 0 002.143-1.574l1.5-5A2.25 2.25 0 0020.25 9H8.106a2.25 2.25 0 01-2.122-1.696L4.59 6.5M4.59 6.5L3.18 2.25A1.125 1.125 0 002.063 1.5H1.125M6 21.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm12 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  /** CPU chip — AI / ML */
  aiRiskPlatform:
    "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
  /** Bar chart — dashboard */
  financialSecurityDashboard:
    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
} as const;

function iceIconThumbnail(
  gradient: readonly [string, string, string],
  pathD: string,
): string {
  const [c0, c1, c2] = gradient;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="400" height="225"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${c0}"/><stop offset="50%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="400" height="225" fill="url(#g)"/><g transform="translate(200,112.5) scale(5.5) translate(-12,-12)" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path vector-effect="non-scaling-stroke" d="${pathD}"/></g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const legacyProjectThumbnails = {
  clientPortfolio: iceIconThumbnail(
    iceGradients.clientPortfolio,
    icons.clientPortfolio,
  ),
  ngoWebsite: iceIconThumbnail(iceGradients.ngoWebsite, icons.ngoWebsite),
  resumeBuilder: iceIconThumbnail(
    iceGradients.resumeBuilder,
    icons.resumeBuilder,
  ),
  ecommerce: iceIconThumbnail(iceGradients.ecommerce, icons.ecommerce),
  aiRiskPlatform: iceIconThumbnail(
    iceGradients.aiRiskPlatform,
    icons.aiRiskPlatform,
  ),
  financialSecurityDashboard: iceIconThumbnail(
    iceGradients.financialSecurityDashboard,
    icons.financialSecurityDashboard,
  ),
} as const;
