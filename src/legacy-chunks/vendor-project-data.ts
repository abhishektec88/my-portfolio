/**
 * Built to `/chunks/vendor-project-data.js` (IIFE). Loaded before `index-XNYmtKME.js` on
 * `portfolio-legacy.html` so the legacy Vue bundle can read `globalThis.__PORTFOLIO_VENDOR_DATA__`.
 */
import { getVendorGlobalData } from "../data/legacy/vendor-global-data";

const g = globalThis as typeof globalThis & { __PORTFOLIO_VENDOR_DATA__: ReturnType<typeof getVendorGlobalData> };
g.__PORTFOLIO_VENDOR_DATA__ = getVendorGlobalData();
