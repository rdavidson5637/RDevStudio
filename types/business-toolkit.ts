export type ToolCategory = "audit" | "generator" | "creative";

export type ToolBadge = "new" | "coming-soon";

/**
 * "live" tools have their own dedicated static page under /toolkit.
 * "soon" tools have no page yet and are served by the [slug] placeholder route.
 * Omitted = "live".
 */
export type ToolStatus = "live" | "soon";

export type BusinessTool = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  href: string;
  featured: boolean;
  badge?: ToolBadge;
  status?: ToolStatus;
  keywords: string[];
};

export type ToolCategoryMeta = {
  id: ToolCategory | "all";
  label: string;
  description: string;
};
