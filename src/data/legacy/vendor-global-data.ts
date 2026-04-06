import {
  vendorProjectCaseAiRiskPlatformEn,
  vendorProjectCaseClientPortfolioEn,
  vendorProjectCaseEcommerceEn,
  vendorProjectCaseFinancialSecurityEn,
  vendorProjectCaseNgoWebsiteEn,
  vendorProjectCaseResumeBuilderEn,
} from "./vendor-project-cases-en";
import { vendorHeroName } from "./vendor-hero-name";
import { vendorTagLabels } from "./vendor-tag-labels";

function freezeLegacyModule<T extends object>(defaultExport: T) {
  return Object.freeze(
    Object.defineProperty({ __proto__: null, default: defaultExport }, Symbol.toStringTag, { value: "Module" }),
  );
}

function mapVirtualPathsToModules(i: Record<string, ReturnType<typeof freezeLegacyModule>>) {
  const e: Record<string, ReturnType<typeof freezeLegacyModule>> = {};
  for (const [t, n] of Object.entries(i)) {
    const r = t.match(/\/([a-z0-9_-]+)\.ts$/i);
    if (r) e[r[1]] = n;
  }
  return e;
}

/** Same shape as `zz` in the original Vue bundle (`index-XNYmtKME.tsx`). English only. */
export function getVendorGlobalData() {
  const clientEn = freezeLegacyModule(vendorProjectCaseClientPortfolioEn);
  const ngoEn = freezeLegacyModule(vendorProjectCaseNgoWebsiteEn);
  const resumeEn = freezeLegacyModule(vendorProjectCaseResumeBuilderEn);
  const ecommerceEn = freezeLegacyModule(vendorProjectCaseEcommerceEn);
  const aiEn = freezeLegacyModule(vendorProjectCaseAiRiskPlatformEn);
  const finEn = freezeLegacyModule(vendorProjectCaseFinancialSecurityEn);

  return {
    heroName: vendorHeroName,
    zz: {
      en: mapVirtualPathsToModules({
        "./en/client-portfolio.ts": clientEn,
        "./en/ngo-website.ts": ngoEn,
        "./en/resume-builder.ts": resumeEn,
        "./en/ecommerce.ts": ecommerceEn,
        "./en/ai-risk-platform.ts": aiEn,
        "./en/financial-security-dashboard.ts": finEn,
      }),
    },
    tagLabels: vendorTagLabels,
  };
}

export type VendorGlobalData = ReturnType<typeof getVendorGlobalData>;
