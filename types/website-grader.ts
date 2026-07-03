import type { AuditCategoryScore } from "@/types/toolkit-audit";

export type GraderCategoryId =
  | "overall"
  | "seo"
  | "accessibility"
  | "performance"
  | "security"
  | "best-practices";

export type GraderCategoryScore = AuditCategoryScore & {
  id: GraderCategoryId | "overall";
};

export type WebsiteGraderResult = {
  url: string;
  scannedAt: string;
  overall: GraderCategoryScore;
  categories: GraderCategoryScore[];
};
