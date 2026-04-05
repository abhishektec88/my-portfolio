import { PLACEHOLDER_PREVIEW } from "./portfolio-project-media";

const img = (alt: string, caption: string) => ({
  type: "media" as const,
  props: { type: "image" as const, src: PLACEHOLDER_PREVIEW, alt, caption },
});

export const vendorProjectCaseClientPortfolioEn = {
  title: "Client Portfolio Website",
  theme: "light" as const,
  tags: ["html", "css", "javascript", "netlify"],
  live: "https://kaushalgupta.netlify.app/",
  source: "",
  videoBorder: true,
  description:
    "A professional portfolio website for a client showcasing their work, skills, and achievements. Built with modern web technologies and responsive design.",
  components: [img("Client portfolio", "Preview")],
};

export const vendorProjectCaseNgoWebsiteEn = {
  title: "NGO Website",
  theme: "light" as const,
  tags: ["html", "css", "javascript", "netlify"],
  live: "https://rbstreetkids.netlify.app/",
  source: "",
  videoBorder: true,
  description:
    "A comprehensive website for an NGO focused on helping street kids. Features donation system, volunteer registration, and information about their mission.",
  components: [img("NGO website", "Preview")],
};

export const vendorProjectCaseResumeBuilderEn = {
  title: "Resume Builder",
  theme: "light" as const,
  tags: ["nextjs", "tailwind", "react", "typescript", "html", "css"],
  live: "https://resume-builder-two-pearl.vercel.app/",
  source: "https://github.com/abhishektec88",
  videoBorder: true,
  description:
    "Resume Builder is a web application that allows you to create a professional resume by filling out a form. It is built with Next.js.",
  components: [img("Resume builder", "Preview")],
};

export const vendorProjectCaseEcommerceEn = {
  title: "E-commerce Website",
  theme: "light" as const,
  tags: ["react", "node", "mongodb"],
  live: "",
  source: "https://github.com/abhishektec88",
  videoBorder: true,
  description:
    "A full-featured e-commerce platform with add-to-cart functionality, product management, and user authentication. Built with modern web technologies.",
  components: [img("E-commerce", "Preview")],
};

export const vendorProjectCaseAiRiskPlatformEn = {
  title: "AI-Powered Customer Insights & Risk Analysis Platform",
  theme: "dark" as const,
  tags: ["python", "sklearn", "xgboost", "react", "aws"],
  live: "https://portfolio-zvso.vercel.app/",
  source: "https://github.com/abhishektec88",
  videoBorder: false,
  description:
    "Designed and developed a secure, AI-powered platform for a leading banking institution. Integrated ML models for credit risk prediction, fraud detection, and personalized financial recommendations using Python, scikit-learn, and XGBoost.",
  components: [img("AI risk platform", "Preview")],
};

export const vendorProjectCaseFinancialSecurityEn = {
  title: "Financial Security Dashboard with AI Insights",
  theme: "dark" as const,
  tags: ["java", "springboot", "react", "typescript"],
  live: "https://portfolio-zvso.vercel.app/",
  source: "https://github.com/abhishektec88",
  videoBorder: false,
  description:
    "Developed a Financial Security Dashboard with integrated AI-driven insights for ITC Infotech. Utilized Java (Spring Boot) and React with TypeScript, contributing to ML models for risk profiling and user behavior prediction.",
  components: [img("Financial security dashboard", "Preview")],
};
