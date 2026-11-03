import type { AuditCategoryScore } from "@/types/toolkit-audit";
import type { LogoRoastCategoryId, LogoRoastResult } from "@/types/logo-roast";

const CATEGORIES: { id: LogoRoastCategoryId; title: string }[] = [
  { id: "brand", title: "Brand" },
  { id: "typography", title: "Typography" },
  { id: "colour", title: "Colour" },
  { id: "scalability", title: "Scalability" },
  { id: "memorability", title: "Memorability" },
  { id: "accessibility", title: "Accessibility" },
];

function plain(value: string, max: number): string {
  return value
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function asScore(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function asLines(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => plain(item, 180))
    .filter(Boolean)
    .slice(0, 4);
}

function asCategory(
  value: unknown,
  id: string,
  title: string,
): AuditCategoryScore | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const score = asScore(record.score);
  const summary = typeof record.summary === "string" ? plain(record.summary, 280) : "";
  if (score === null || !summary) return null;
  return {
    id,
    title,
    score,
    summary,
    highlights: asLines(record.highlights),
    issues: asLines(record.issues),
  };
}

/** Turns a model JSON object into a roast. Returns null rather than filling gaps. */
export function parseRoastPayload(raw: unknown, fileName: string): LogoRoastResult | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const overall = asCategory(record.overall, "overall", "Overall");
  if (!overall) return null;

  const incoming = Array.isArray(record.categories) ? record.categories : [];
  const byId = new Map<string, unknown>();
  for (const item of incoming) {
    if (item && typeof item === "object" && typeof (item as { id?: unknown }).id === "string") {
      byId.set((item as { id: string }).id, item);
    }
  }

  const categories: AuditCategoryScore[] = [];
  for (const category of CATEGORIES) {
    const parsed = asCategory(byId.get(category.id), category.id, category.title);
    if (!parsed) return null;
    categories.push(parsed);
  }

  return {
    fileName,
    scannedAt: new Date().toISOString(),
    overall,
    categories,
  };
}

export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error("No JSON object in the roast.");
  }
  return JSON.parse(trimmed.slice(start, end + 1));
}
