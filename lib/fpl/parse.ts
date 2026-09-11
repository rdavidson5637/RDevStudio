import "server-only";

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
