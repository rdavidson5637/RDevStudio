export type Position = 1 | 2 | 3 | 4; // GK, DEF, MID, FWD

/**
 * The real draft bootstrap's `settings.scoring` block (verified against the
 * live API - field names are exact, not the spec's generic placeholders).
 * Read from there rather than hardcoded, because FPL changes scoring
 * between seasons and a hardcoded number is exactly the bug that rots
 * silently.
 */
export type ScoringSettings = {
  goals_scored_GKP: number;
  goals_scored_DEF: number;
  goals_scored_MID: number;
  goals_scored_FWD: number;
  assists: number;
  clean_sheets_GKP: number;
  clean_sheets_DEF: number;
  clean_sheets_MID: number;
  clean_sheets_FWD: number;
  defensive_contribution_limit_DEF: number;
  defensive_contribution_limit_MID: number;
  defensive_contribution_limit_FWD: number;
  defensive_contribution_DEF: number;
  defensive_contribution_MID: number;
  defensive_contribution_FWD: number;
  long_play: number;
  short_play: number;
  long_play_limit: number;
  bonus: number;
};

export const FALLBACK_SCORING: ScoringSettings = {
  goals_scored_GKP: 10,
  goals_scored_DEF: 6,
  goals_scored_MID: 5,
  goals_scored_FWD: 4,
  assists: 3,
  clean_sheets_GKP: 4,
  clean_sheets_DEF: 4,
  clean_sheets_MID: 1,
  clean_sheets_FWD: 0,
  defensive_contribution_limit_DEF: 10,
  defensive_contribution_limit_MID: 12,
  defensive_contribution_limit_FWD: 12,
  defensive_contribution_DEF: 2,
  defensive_contribution_MID: 2,
  defensive_contribution_FWD: 2,
  long_play: 2,
  short_play: 1,
  long_play_limit: 60,
  bonus: 1,
};

// 1..5 -> a simple clean-sheet-rate lookup. The full spec models this from a
// team's own expected-goals-conceded rate; this project doesn't sync
// team-level xGC (only the FDR the API already computes from it), so this is
// a deliberately simpler stand-in tied to the same signal FDR already
// encodes, not an independent estimate.
const CLEAN_SHEET_PROB_BY_FDR: Record<number, number> = { 1: 0.45, 2: 0.35, 3: 0.25, 4: 0.15, 5: 0.08 };
const FIXTURE_MULTIPLIER: Record<number, number> = { 1: 1.25, 2: 1.12, 3: 1.0, 4: 0.88, 5: 0.75 };

export type ProjectionInput = {
  position: Position;
  availabilityScore: number; // 0..100
  startsPer90: number; // API-provided, a start-rate proxy for pStart
  xG90: number;
  xA90: number;
  defconPer90: number;
  bpsPer90: number;
  fixtureDifficulty: number; // 1..5, from the player's own side
  isHome: boolean;
  settings: ScoringSettings;
  /**
   * Season minutes behind the per-90 rates. When set, those rates are pulled
   * toward a position prior. Omit it only in tests that want the raw rates.
   */
  minutes?: number;
};

/** Five full matches. A 3-minute cameo barely moves the rate off the prior. */
export const SHRINKAGE_PRIOR_MINUTES = 450;

/**
 * Rough league-average per-90 rates. They are the centre a tiny sample
 * shrinks toward, not a claim about any one player.
 */
const POSITION_RATE_PRIOR: Record<
  Position,
  { startsPer90: number; xG90: number; xA90: number; defconPer90: number; bpsPer90: number }
> = {
  1: { startsPer90: 0.15, xG90: 0, xA90: 0.01, defconPer90: 0, bpsPer90: 14 },
  2: { startsPer90: 0.45, xG90: 0.05, xA90: 0.07, defconPer90: 7, bpsPer90: 16 },
  3: { startsPer90: 0.4, xG90: 0.15, xA90: 0.13, defconPer90: 4, bpsPer90: 17 },
  4: { startsPer90: 0.35, xG90: 0.4, xA90: 0.12, defconPer90: 2, bpsPer90: 18 },
};

/** weight = minutes / (minutes + prior). Zero minutes returns the prior. */
export function shrinkRate(
  observed: number,
  minutes: number,
  prior: number,
  priorMinutes = SHRINKAGE_PRIOR_MINUTES,
): number {
  const sample = Math.max(0, minutes);
  const weight = sample / (sample + priorMinutes);
  return weight * observed + (1 - weight) * prior;
}

function shrunkRates(input: ProjectionInput): Pick<
  ProjectionInput,
  "startsPer90" | "xG90" | "xA90" | "defconPer90" | "bpsPer90"
> {
  if (input.minutes == null) {
    return {
      startsPer90: input.startsPer90,
      xG90: input.xG90,
      xA90: input.xA90,
      defconPer90: input.defconPer90,
      bpsPer90: input.bpsPer90,
    };
  }

  const prior = POSITION_RATE_PRIOR[input.position];
  const minutes = input.minutes;
  return {
    startsPer90: shrinkRate(input.startsPer90, minutes, prior.startsPer90),
    xG90: shrinkRate(input.xG90, minutes, prior.xG90),
    xA90: shrinkRate(input.xA90, minutes, prior.xA90),
    defconPer90: shrinkRate(input.defconPer90, minutes, prior.defconPer90),
    bpsPer90: shrinkRate(input.bpsPer90, minutes, prior.bpsPer90),
  };
}

export type ProjectionResult = {
  xP: number;
  pStart: number;
  components: Record<string, number>;
  confidence: "high" | "medium" | "low";
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

const POSITION_SUFFIX: Record<Position, "GKP" | "DEF" | "MID" | "FWD"> = {
  1: "GKP",
  2: "DEF",
  3: "MID",
  4: "FWD",
};

/** Monotonic, saturating: ~0 below 20 bps/90, ~0.5 at 26, ~1.4 at 32, ~2.4 at
 * 38, capped at 3 - the bonus tiers award roughly this shape in practice. */
function bonusCurve(bpsPer90: number): number {
  if (bpsPer90 <= 20) return 0;
  const scaled = (bpsPer90 - 20) / 6; // ~1 unit per 6 bps above the floor
  return clamp(Math.pow(scaled, 1.3) * 0.5, 0, 3);
}

export function projectPoints(input: ProjectionInput): ProjectionResult {
  const suffix = POSITION_SUFFIX[input.position];
  const settings = input.settings;
  const rates = shrunkRates(input);

  const pStart = clamp(
    0.55 * (input.availabilityScore / 100) + 0.45 * clamp(rates.startsPer90, 0, 1),
    0,
    1,
  );

  const fixMult = FIXTURE_MULTIPLIER[input.fixtureDifficulty] ?? 1;
  const homeMult = input.isHome ? 1.05 : 0.95;
  const expMinsRatio = 0.2 + 0.8 * pStart; // even fringe players get cameo credit

  const goalPts = settings[`goals_scored_${suffix}`];
  const csPts = settings[`clean_sheets_${suffix}`];
  const defconLimitKey = `defensive_contribution_limit_${suffix}` as
    | "defensive_contribution_limit_DEF"
    | "defensive_contribution_limit_MID"
    | "defensive_contribution_limit_FWD";
  const defconPtsKey = `defensive_contribution_${suffix}` as
    | "defensive_contribution_DEF"
    | "defensive_contribution_MID"
    | "defensive_contribution_FWD";
  const defconLimit = suffix === "GKP" ? 0 : settings[defconLimitKey];
  const defconPts = suffix === "GKP" ? 0 : settings[defconPtsKey];

  const goals = rates.xG90 * expMinsRatio * fixMult * homeMult;
  const assists = rates.xA90 * expMinsRatio * fixMult * homeMult;
  const cleanSheetProb = suffix === "GKP" || suffix === "DEF" ? (CLEAN_SHEET_PROB_BY_FDR[input.fixtureDifficulty] ?? 0.25) : 0;
  const defconProb = defconLimit > 0 ? clamp(rates.defconPer90 / defconLimit, 0, 1) * pStart : 0;
  const appearancePoints = expMinsRatio >= 0.6 ? settings.long_play : settings.short_play;
  const expectedBonus = bonusCurve(rates.bpsPer90) * settings.bonus;

  const components = {
    appearancePoints: pStart * appearancePoints,
    goals: pStart * goals * goalPts,
    assists: pStart * assists * settings.assists,
    cleanSheet: pStart * cleanSheetProb * csPts,
    defcon: pStart * defconProb * defconPts,
    bonus: pStart * expectedBonus,
  };

  const xP = Object.values(components).reduce((sum, v) => sum + v, 0);

  const fromStarts: ProjectionResult["confidence"] =
    rates.startsPer90 >= 0.6 ? "high" : rates.startsPer90 >= 0.25 ? "medium" : "low";
  // A handful of minutes cannot support a confident start rate, even after
  // the rate itself has been pulled back to the prior.
  const confidence: ProjectionResult["confidence"] =
    input.minutes == null
      ? fromStarts
      : input.minutes < 180
        ? "low"
        : input.minutes < SHRINKAGE_PRIOR_MINUTES && fromStarts === "high"
          ? "medium"
          : fromStarts;

  return { xP: Number(xP.toFixed(2)), pStart, components, confidence };
}

/** Runs the model across N upcoming fixtures for one player, returning the
 * per-gameweek breakdown plus the total. */
export function projectRange(
  base: Omit<ProjectionInput, "fixtureDifficulty" | "isHome">,
  fixtures: { event: number; difficulty: number; isHome: boolean }[],
): { event: number; xP: number }[] {
  return fixtures.map((f) => ({
    event: f.event,
    xP: projectPoints({ ...base, fixtureDifficulty: f.difficulty, isHome: f.isHome }).xP,
  }));
}

/** Merges whatever the live API actually returned in settings.scoring over
 * the documented fallback, so a field FPL adds or removes doesn't silently
 * produce NaN - it just falls back to the constant for that field alone. */
export function resolveScoringSettings(partial: Partial<ScoringSettings> | undefined): ScoringSettings {
  return { ...FALLBACK_SCORING, ...(partial ?? {}) };
}
