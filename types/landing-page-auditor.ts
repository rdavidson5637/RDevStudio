import type { AuditCategoryScore } from "@/types/toolkit-audit";

export type LandingPageSectionId =
  | "hero"
  | "cta"
  | "copywriting"
  | "colour"
  | "trust"
  | "hierarchy"
  | "accessibility"
  | "ux";

export type LandingPageAuditResult = {
  url: string;
  scannedAt: string;
  hero: AuditCategoryScore;
  sections: AuditCategoryScore[];
  recommendations: string[];
};
