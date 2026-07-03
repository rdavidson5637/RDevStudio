import type { AuditCategoryScore } from "@/types/toolkit-audit";
import type { ScanStep } from "@/types/toolkit-audit";

export type UrlAuditResult = {
  url: string;
  scannedAt: string;
  overall: AuditCategoryScore;
  categories: AuditCategoryScore[];
  recommendations?: string[];
};

export type UrlAuditToolConfig = {
  toolSlug: string;
  category: string;
  title: string;
  description: string;
  steps: readonly ScanStep[];
  submitLabel: string;
  hint: string;
  resetLabel: string;
  loadingSubtitle: string;
  progressLabel: string;
  placeholderNotice?: string;
  getResult: (url: string) => UrlAuditResult;
};
