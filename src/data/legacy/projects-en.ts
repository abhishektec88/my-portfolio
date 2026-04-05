import { legacyProjectThumbnails as T } from "./thumbnails";

/** English project rows — used by `BzAv57W4` legacy chunk. Order matches `DABWVKfi` thumbnails. */
export const legacyProjectsEn = [
  {
    title: "Client Portfolio Website",
    slug: "client-portfolio",
    thumbnail: T.clientPortfolio,
    description: "Professional client portfolio site with responsive design.",
  },
  {
    title: "NGO Website",
    slug: "ngo-website",
    thumbnail: T.ngoWebsite,
    description: "NGO site with donations, volunteers, and mission content.",
  },
  {
    title: "Resume Builder",
    slug: "resume-builder",
    thumbnail: T.resumeBuilder,
    description: "Next.js app to build a resume from a form.",
  },
  {
    title: "E-commerce Website",
    slug: "ecommerce",
    thumbnail: T.ecommerce,
    description: "Cart, products, and auth with React and Node.js.",
  },
  {
    title: "AI Customer Insights & Risk Platform",
    slug: "ai-risk-platform",
    thumbnail: T.aiRiskPlatform,
    description: "Banking ML platform for credit risk and fraud.",
  },
  {
    title: "Financial Security Dashboard",
    slug: "financial-security-dashboard",
    thumbnail: T.financialSecurityDashboard,
    description: "Spring Boot + React dashboard with AI insights.",
  },
] as const;
