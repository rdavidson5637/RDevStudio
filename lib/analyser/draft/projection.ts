export type Position = 1 | 2 | 3 | 4;

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
  concede_limit: number;
  goals_conceded_GKP: number;
  goals_conceded_DEF: number;
  yellow_cards: number;
  red_cards: number;
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
  concede_limit: 2,
  goals_conceded_GKP: -1,
  goals_conceded_DEF: -1,
  yellow_cards: -1,
  red_cards: -3,
  bonus: 1,
};

const FIXTURE_MULTIPLIER: Record<number, number> = { 1: 1.25, 2: 1.12, 3: 1, 4: 0.88, 5: 0.75 };

const SUFFIX: Record<Position, "GKP" | "DEF" | "MID" | "FWD"> = {
  1: "GKP",
  2: "DEF",
  3: "MID",
  4: "FWD",
};

export type ProjectionInput = {
  position: Position;
  availabilityScore: number;
  starts: number;
  gamesPlayed: number;
  minutesLast4: number[];
  xG90: number;
  xA90: number;
  defconPer90: number;
  defconHitsLast6: number;
  bpsPer90: number;
  teamXgcPer90: number;
  fixtureDifficulty: number;
  isHome: boolean;
  pointsPerGame: number | null;
  yellowsPer90: number;
  redsPer90: number;
  settings: ScoringSettings;
};

export type ProjectionResult = {
  xP: number;
  pStart: number;
  expMins: number;
  components: Record<string, number>;
  confidence: "high" | "medium" | "low";
};

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function finite(n: number, fallback = 0): number {
  return Number.isFinite(n) ? n : fallback;
}

/** Roughly 0 below 20 BPS, 0.5 at 26, 1.4 at 32, 2.4 at 38, capped at 3. */
export function bonusCurve(bps: number): number {
  if (!Number.isFinite(bps) || bps <= 20) return 0;
  const scaled = (bps - 20) / 6;
  return clamp(Math.pow(scaled, 1.3) * 0.5, 0, 3);
}

export function resolveScoringSettings(partial: Partial<ScoringSettings> | null | undefined): ScoringSettings {
  const next = { ...FALLBACK_SCORING };
  if (!partial) return next;
  for (const key of Object.keys(FALLBACK_SCORING) as (keyof ScoringSettings)[]) {
    const value = partial[key];
    if (typeof value === "number" && Number.isFinite(value)) next[key] = value;
  }
  return next;
}

export function projectPoints(input: ProjectionInput): ProjectionResult {
  const settings = input.settings ?? FALLBACK_SCORING;
  const suffix = SUFFIX[input.position] ?? "MID";
  const startRate = input.gamesPlayed > 0 ? clamp(input.starts / input.gamesPlayed, 0, 1) : 0;
  const recent = input.minutesLast4.filter((m) => Number.isFinite(m));
  const meanMins = recent.length ? recent.reduce((s, m) => s + m, 0) / recent.length : 0;
  const role = 0.65 * startRate + 0.35 * clamp(meanMins / 90, 0, 1);
  let pStart = clamp((input.availabilityScore / 100) * (0.15 + 0.85 * role), 0, 1);
  if (input.availabilityScore < 40) pStart = Math.min(pStart, input.availabilityScore / 100);

  const expMins = pStart * 78 + (1 - pStart) * 18;
  const share = expMins / 90;
  const fixMult = FIXTURE_MULTIPLIER[input.fixtureDifficulty] ?? 1;
  const homeMult = input.isHome ? 1.05 : 0.95;
  const opponentXg = finite(input.teamXgcPer90) * (2 - fixMult) * (input.isHome ? 0.92 : 1.08);
  const cleanSheetProb = Math.exp(-Math.max(0, opponentXg));

  const goalKey = `goals_scored_${suffix}` as const;
  const csKey = `clean_sheets_${suffix}` as const;
  const goalPts = settings[goalKey];
  const csPts = settings[csKey];
  const defconLimit =
    suffix === "GKP" ? 0 : settings[`defensive_contribution_limit_${suffix}` as "defensive_contribution_limit_DEF"];
  const defconPts = suffix === "GKP" ? 0 : settings[`defensive_contribution_${suffix}` as "defensive_contribution_DEF"];

  const goals = finite(input.xG90) * share * fixMult * homeMult;
  const assists = finite(input.xA90) * share * fixMult * homeMult;
  const appearance = expMins >= settings.long_play_limit ? settings.long_play : expMins >= 1 ? settings.short_play : 0;
  const defconProb = defconLimit > 0 ? clamp(input.defconHitsLast6 / 6, 0, 1) * pStart : 0;
  const expectedBonus = bonusCurve(finite(input.bpsPer90) * share) * settings.bonus;
  const csWeight = suffix === "GKP" || suffix === "DEF" ? pStart : 0;
  const concedeRate = suffix === "GKP" ? settings.goals_conceded_GKP : suffix === "DEF" ? settings.goals_conceded_DEF : 0;
  const concededPenalty =
    concedeRate === 0 ? 0 : Math.max(0, opponentXg - settings.concede_limit) * Math.abs(concedeRate) * pStart;
  const cardRisk =
    (finite(input.yellowsPer90) * share * Math.abs(settings.yellow_cards) +
      finite(input.redsPer90) * share * Math.abs(settings.red_cards)) *
    pStart;

  const appearancePoints = pStart * appearance;
  const goalPoints = pStart * goals * goalPts;
  const assistPoints = pStart * assists * settings.assists;
  const cleanSheet = csWeight * cleanSheetProb * csPts;
  const defcon = defconProb * defconPts;
  const bonus = pStart * expectedBonus;

  const model =
    appearancePoints + goalPoints + assistPoints + cleanSheet + defcon + bonus - concededPenalty - cardRisk;

  const anchor =
    input.pointsPerGame == null
      ? model
      : input.pointsPerGame * pStart * fixMult * homeMult;
  const formWeight = input.pointsPerGame == null ? 0 : input.gamesPlayed >= 4 ? 0.6 : 0.3;
  const xP = (1 - formWeight) * model + formWeight * anchor;

  const components: Record<string, number> = {
    appearance: round(appearancePoints * (1 - formWeight)),
    goals: round(goalPoints * (1 - formWeight)),
    assists: round(assistPoints * (1 - formWeight)),
    cleanSheet: round(cleanSheet * (1 - formWeight)),
    defcon: round(defcon * (1 - formWeight)),
    bonus: round(bonus * (1 - formWeight)),
    conceded: round(-concededPenalty * (1 - formWeight)),
    cards: round(-cardRisk * (1 - formWeight)),
    recentForm: round(formWeight * anchor),
  };

  const summed = Object.values(components).reduce((s, v) => s + v, 0);
  components.recentForm = round(components.recentForm + (xP - summed));

  const confidence: ProjectionResult["confidence"] =
    input.gamesPlayed < 3 || recent.length < 3 ? "low" : input.gamesPlayed < 6 ? "medium" : "high";

  return {
    xP: round(Object.values(components).reduce((s, v) => s + v, 0)),
    pStart: round(pStart),
    expMins: round(expMins),
    components,
    confidence,
  };
}

function round(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
}

export type FixtureOutlook = {
  event: number;
  difficulty: number;
  isHome: boolean;
};

/** One row per fixture. Double gameweeks come back as two rows with the same event. */
export function projectRange(input: Omit<ProjectionInput, "fixtureDifficulty" | "isHome">, fixtures: FixtureOutlook[]) {
  const rows = fixtures.map((fixture) => {
    const projected = projectPoints({
      ...input,
      fixtureDifficulty: fixture.difficulty,
      isHome: fixture.isHome,
    });
    return { event: fixture.event, xP: projected.xP, pStart: projected.pStart };
  });
  const byEvent = new Map<number, number>();
  for (const row of rows) byEvent.set(row.event, (byEvent.get(row.event) ?? 0) + row.xP);
  const perEvent = [...byEvent.entries()].map(([event, xP]) => ({ event, xP: round(xP) }));
  return {
    fixtures: rows,
    perEvent,
    total: round(perEvent.reduce((s, row) => s + row.xP, 0)),
  };
}
