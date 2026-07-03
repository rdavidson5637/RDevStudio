export type AuditPhase = "input" | "loading" | "results";

export type UrlValidationResult =
  | { valid: true; normalizedUrl: string }
  | { valid: false; message: string };

export type ScanStep = {
  id: string;
  label: string;
};

export type AuditCategoryScore = {
  id: string;
  title: string;
  score: number;
  summary: string;
  highlights: string[];
  issues: string[];
};

export type AuditScanResult = {
  scannedAt: string;
  overall: AuditCategoryScore;
  categories: AuditCategoryScore[];
};
