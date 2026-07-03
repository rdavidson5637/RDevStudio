import type { AuditCategoryScore } from "@/types/toolkit-audit";

export type LogoRoastCategoryId =
  | "overall"
  | "brand"
  | "typography"
  | "colour"
  | "scalability"
  | "memorability"
  | "accessibility";

export type LogoRoastResult = {
  fileName: string;
  scannedAt: string;
  overall: AuditCategoryScore;
  categories: AuditCategoryScore[];
};

export type ImageValidationResult =
  | { valid: true; file: File }
  | { valid: false; message: string };
