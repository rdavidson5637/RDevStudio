export type InteractiveToolCategory =
  | "events"
  | "rankings"
  | "pickers"
  | "quizzes";

export type InteractiveToolBadge = "new" | "coming-soon";

/**
 * "live" tools have their own dedicated static page under the section.
 * "soon" tools have no page yet and are served by the [slug] placeholder route.
 * Omitted = "live".
 */
export type InteractiveToolStatus = "live" | "soon";

export type InteractiveTool = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: InteractiveToolCategory;
  href: string;
  featured: boolean;
  trending: boolean;
  badge?: InteractiveToolBadge;
  status?: InteractiveToolStatus;
  keywords: string[];
};

export type InteractiveToolCategoryMeta = {
  id: InteractiveToolCategory | "all";
  label: string;
  description: string;
};
