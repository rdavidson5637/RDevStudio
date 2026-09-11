export type NewsSignal = "trained" | "missed_training" | "doubt" | "ruled_out" | "returned" | "rested";

export type ExtractedSignal = {
  player: string;
  team: string;
  signal: NewsSignal;
  confidence: number;
  quote: string;
};

const SIGNALS: NewsSignal[] = [
  "trained",
  "missed_training",
  "doubt",
  "ruled_out",
  "returned",
  "rested",
];

function norm(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function matchPlayerId(
  reportedName: string,
  teamId: number | null,
  players: { id: number; web_name: string; first_name: string; second_name: string; team_id: number }[],
): number | null {
  const needle = norm(reportedName);
  if (!needle) return null;

  const pool = teamId != null ? players.filter((p) => p.team_id === teamId) : players;
  const search = pool.length > 0 ? pool : players;

  let best: { id: number; score: number } | null = null;
  for (const player of search) {
    const web = norm(player.web_name);
    const last = norm(player.second_name);
    const full = norm(`${player.first_name} ${player.second_name}`);
    let score = 0;
    if (needle === web || needle === full) score = 3;
    else if (needle === last && last.length > 2) score = 2;
    else if (full.includes(needle) || needle.includes(web) || needle.endsWith(` ${last}`)) score = 1;
    if (score > 0 && (!best || score > best.score)) best = { id: player.id, score };
  }

  return best?.id ?? null;
}

export function isNewsSignal(value: string): value is NewsSignal {
  return (SIGNALS as string[]).includes(value);
}

const AVAILABILITY_HINT =
  /\b(train(?:ed|ing)?|missed|doubt|ruled out|return(?:ed|s)?|rested|fitness|available|injur(?:y|ed)|knock|hamstring|illness|sidelined|session|not in (?:the )?squad)\b/i;

/** Cheap pre-filter so Claude only sees headlines that might be a training/fitness signal. */
export function looksLikeAvailabilityNews(title: string, description = ""): boolean {
  return AVAILABILITY_HINT.test(`${title} ${description}`);
}
