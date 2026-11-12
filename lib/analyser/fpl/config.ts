export function leagueId() {
  return requireInt("FPL_DRAFT_LEAGUE_ID");
}

export function entryId() {
  return requireInt("FPL_DRAFT_ENTRY_ID");
}

function requireInt(name: string) {
  const raw = process.env[name];
  const value = Number(raw);
  if (!raw || !Number.isInteger(value)) {
    throw new Error(`${name} is missing or not an integer`);
  }
  return value;
}

export function parseNum(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}
