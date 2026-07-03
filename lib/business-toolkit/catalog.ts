import type { BusinessTool, ToolCategoryMeta } from "@/types/business-toolkit";

export const TOOLKIT_BASE_PATH = "/toolkit";

export const TOOL_CATEGORIES: ToolCategoryMeta[] = [
  {
    id: "all",
    label: "All tools",
    description: "Every tool in the Business Toolkit",
  },
  {
    id: "audit",
    label: "Audit & analysis",
    description: "Check websites, SEO, accessibility, and local listings",
  },
  {
    id: "generator",
    label: "Generators",
    description: "Create invoices, QR codes, sitemaps, and more",
  },
  {
    id: "creative",
    label: "Creative & brand",
    description: "Naming, logos, and brand-facing experiments",
  },
];

export const BUSINESS_TOOLS: BusinessTool[] = [
  {
    id: "website-grader",
    slug: "website-grader",
    title: "Website Grader",
    description:
      "Score any site on speed, mobile readiness, and first impressions - with plain-English fixes.",
    category: "audit",
    href: `${TOOLKIT_BASE_PATH}/website-grader`,
    featured: true,
    badge: "new",
    keywords: ["website", "grader", "score", "audit", "performance", "mobile"],
  },
  {
    id: "ai-landing-page-auditor",
    slug: "ai-landing-page-auditor",
    title: "AI Landing Page Auditor",
    description:
      "Paste a URL and get an AI breakdown of messaging, structure, and conversion opportunities.",
    category: "audit",
    href: `${TOOLKIT_BASE_PATH}/ai-landing-page-auditor`,
    featured: true,
    badge: "new",
    keywords: ["ai", "landing page", "auditor", "conversion", "copy"],
  },
  {
    id: "seo-checker",
    slug: "seo-checker",
    title: "SEO Checker",
    description:
      "Quick on-page SEO scan - titles, meta tags, headings, and the basics that actually matter.",
    category: "audit",
    href: `${TOOLKIT_BASE_PATH}/seo-checker`,
    featured: true,
    badge: "new",
    keywords: ["seo", "meta", "titles", "headings", "search"],
  },
  {
    id: "accessibility-checker",
    slug: "accessibility-checker",
    title: "Accessibility Checker",
    description:
      "Spot common a11y issues - contrast, alt text, labels, and keyboard traps - before your users do.",
    category: "audit",
    href: `${TOOLKIT_BASE_PATH}/accessibility-checker`,
    featured: false,
    badge: "new",
    keywords: ["accessibility", "a11y", "wcag", "contrast", "alt text"],
  },
  {
    id: "google-business-profile-audit",
    slug: "google-business-profile-audit",
    title: "Google Business Profile Audit",
    description:
      "Review your GBP listing for completeness, consistency, and the details local customers notice.",
    category: "audit",
    href: `${TOOLKIT_BASE_PATH}/google-business-profile-audit`,
    featured: false,
    badge: "new",
    keywords: ["google", "business profile", "gbp", "local", "listings"],
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description:
      "Create downloadable QR codes for URLs, Wi-Fi, and contact details - no sign-up required.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/qr-code-generator`,
    featured: true,
    badge: "new",
    keywords: ["qr", "code", "generator", "download", "wifi"],
  },
  {
    id: "invoice-generator",
    slug: "invoice-generator",
    title: "Invoice Generator",
    description:
      "Build clean, professional invoices in the browser and export as PDF when you're ready to send.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/invoice-generator`,
    featured: false,
    badge: "new",
    keywords: ["invoice", "pdf", "billing", "freelance", "payment"],
  },
  {
    id: "review-response-generator",
    slug: "review-response-generator",
    title: "Review Response Generator",
    description:
      "Draft on-brand replies to Google and social reviews - polite, professional, and ready to tweak.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/review-response-generator`,
    featured: false,
    badge: "new",
    keywords: ["review", "response", "google", "reputation", "reply"],
  },
  {
    id: "business-name-generator",
    slug: "business-name-generator",
    title: "Business Name Generator",
    description:
      "Brainstorm name ideas by industry, tone, and keywords - then shortlist your favourites.",
    category: "creative",
    href: `${TOOLKIT_BASE_PATH}/business-name-generator`,
    featured: false,
    badge: "new",
    keywords: ["business", "name", "brand", "startup", "naming"],
  },
  {
    id: "logo-roast",
    slug: "logo-roast",
    title: "Logo Roast",
    description:
      "Upload a logo for a blunt-but-fair critique - typography, colour, scalability, and first impressions.",
    category: "creative",
    href: `${TOOLKIT_BASE_PATH}/logo-roast`,
    featured: false,
    badge: "new",
    keywords: ["logo", "roast", "critique", "brand", "design"],
  },
  {
    id: "sitemap-generator",
    slug: "sitemap-generator",
    title: "Sitemap Generator",
    description:
      "Crawl a site or paste your URLs to generate a standards-compliant XML sitemap.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/sitemap-generator`,
    featured: false,
    badge: "new",
    keywords: ["sitemap", "xml", "seo", "crawl", "urls"],
  },
  {
    id: "robots-txt-generator",
    slug: "robots-txt-generator",
    title: "robots.txt Generator",
    description:
      "Build a robots.txt file with sensible defaults - allow, disallow, and sitemap directives included.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/robots-txt-generator`,
    featured: false,
    badge: "new",
    keywords: ["robots", "txt", "crawler", "seo", "disallow"],
  },
  {
    id: "favicon-generator",
    slug: "favicon-generator",
    title: "Favicon Generator",
    description:
      "Turn an image or lettermark into favicon sizes and a web app manifest - ready to drop in your project.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/favicon-generator`,
    featured: false,
    badge: "new",
    keywords: ["favicon", "icon", "manifest", "pwa", "brand"],
  },
  {
    id: "colour-palette-generator",
    slug: "colour-palette-generator",
    title: "Colour Palette Generator",
    description:
      "Pick a base colour and generate a harmonious palette - copy hex values into your project.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/colour-palette-generator`,
    featured: false,
    badge: "new",
    keywords: ["colour", "palette", "hex", "design", "harmony"],
  },
  {
    id: "gradient-generator",
    slug: "gradient-generator",
    title: "Gradient Generator",
    description:
      "Build linear or radial CSS gradients with live preview - copy CSS or Tailwind classes.",
    category: "generator",
    href: `${TOOLKIT_BASE_PATH}/gradient-generator`,
    featured: false,
    badge: "new",
    keywords: ["gradient", "css", "tailwind", "linear", "radial"],
  },
];

export function getToolBySlug(slug: string): BusinessTool | undefined {
  return BUSINESS_TOOLS.find((tool) => tool.slug === slug);
}

export function isToolSoon(tool: BusinessTool): boolean {
  return tool.status === "soon";
}

export function getLiveTools(): BusinessTool[] {
  return BUSINESS_TOOLS.filter((tool) => tool.status !== "soon");
}

export function getComingSoonTools(): BusinessTool[] {
  return BUSINESS_TOOLS.filter((tool) => tool.status === "soon");
}

export function getFeaturedTools(): BusinessTool[] {
  return getLiveTools().filter((tool) => tool.featured);
}

export function getToolsByCategory(
  category: BusinessTool["category"],
): BusinessTool[] {
  return BUSINESS_TOOLS.filter((tool) => tool.category === category);
}

export function getCategoryLabel(category: BusinessTool["category"]): string {
  return (
    TOOL_CATEGORIES.find((entry) => entry.id === category)?.label ?? category
  );
}
