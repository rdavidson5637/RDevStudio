import "server-only";

function requireInt(name: string): number {
  const raw = process.env[name];
  if (!raw?.trim()) {
    throw new Error(
      `[fpl] Missing required environment variable: ${name}. Add it to .env.local and Vercel.`,
    );
  }
  const value = Number.parseInt(raw, 10);
  if (Number.isNaN(value)) {
    throw new Error(`[fpl] ${name} must be an integer, got: ${raw}`);
  }
  return value;
}

export const FPL_DRAFT_LEAGUE_ID = requireInt("FPL_DRAFT_LEAGUE_ID");
export const FPL_DRAFT_ENTRY_ID = requireInt("FPL_DRAFT_ENTRY_ID");
