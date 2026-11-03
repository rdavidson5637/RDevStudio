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
      "Reads one page for a title, headings, image alt text, the server response, and a few security headers. It is not a phone speed test.",
    category: "audit",
    href: `${TOOLKIT_BASE_PATH}/website-grader`,
    featured: true,
    badge: "new",
    keywords: ["website", "grader", "score", "audit", "performance", "mobile"],
  },
  {
    id: "ai-landing-page-auditor",
    slug: "ai-landing-page-auditor",
    title: "Landing page checker",
    description:
      "Paste a URL. The check reads the HTML for a heading, a description, a way to respond, and a privacy link.",
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
      "Reads a page for a title, a meta description, a heading, a canonical, and HTTPS.",
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
      "Reads the page HTML for a language, a title, a heading, a viewport, and image alt text.",
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
      "A checklist for your Google listing. It does not invent a score from a website address.",
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
      "Create a QR code for a URL, a Wi-Fi login, or a piece of text. No sign-up.",
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
      "Build an invoice in the browser and print it, or save a PDF from the print dialog.",
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
      "Paste a review and get a short draft that quotes it. Read the draft before you post it.",
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
      "Shuffle name ideas from your keywords and the industry. It mixes words. It does not check if a name is free.",
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
      "Upload a PNG, JPG, WebP, or GIF. A written critique comes back when the roast service is connected.",
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
      "Paste a list of URLs and download an XML sitemap. It does not crawl the site.",
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
      "Upload an image and download PNG favicons at 16, 32, 180, and 512 pixels.",
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
