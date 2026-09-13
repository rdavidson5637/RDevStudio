import "server-only";

import type { DraftLiveElement } from "./types";

/**
 * The draft API sends several numeric fields (form, ep_next, expected_goals, ...)
 * as strings, and uses "" rather than null for "no value yet". Never coerce to 0 -
 * a false zero (e.g. form 0.0) is meaningfully different from no data.
 */
export function parseNum(raw: string | number | null | undefined): number | null {
  if (raw == null || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number(raw);
  return Number.isNaN(n) ? null : n;
}

/** ISO timestamp or date string from the API, "" treated the same as null. */
export function parseDate(raw: string | null | undefined): string | null {
  if (raw == null || raw === "") return null;
  return raw;
}

export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

/**
 * Draft `/event/{id}/live` currently returns `elements` as a map keyed by
 * player id (`{ "1": { stats, explain } }`). Older seasons (and the typed
 * client) expected an array of `{ id, stats, explain }`. Accept both.
 */
export function normalizeLiveElements(raw: unknown): DraftLiveElement[] {
  if (Array.isArray(raw)) {
    return raw.flatMap((item) => liveElementFromUnknown(item));
  }
  if (raw && typeof raw === "object") {
    return Object.entries(raw as Record<string, unknown>).flatMap(([key, item]) =>
      liveElementFromUnknown(item, Number(key)),
    );
  }
  return [];
}

function liveElementFromUnknown(item: unknown, fallbackId?: number): DraftLiveElement[] {
  if (!item || typeof item !== "object") return [];
  const rec = item as Record<string, unknown>;
  const stats = rec.stats;
  if (!stats || typeof stats !== "object") return [];
  const id = typeof rec.id === "number" && Number.isFinite(rec.id) ? rec.id : fallbackId;
  if (id == null || !Number.isFinite(id) || id <= 0) return [];
  return [
    {
      id,
      stats: stats as DraftLiveElement["stats"],
      explain: Array.isArray(rec.explain) ? rec.explain : [],
    },
  ];
}
