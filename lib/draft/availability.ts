export type Status = "a" | "d" | "i" | "s" | "u" | "n";

export type ReportedSignal = {
  signal: "trained" | "missed_training" | "doubt" | "ruled_out" | "returned" | "rested";
  confidence: number; // 0..1
};

export type AvailabilityInput = {
  status: Status;
  news: string | null;
  newsAdded: Date | null;
  newsReturn: Date | null;
  chanceThisRound: number | null;
  chanceNextRound: number | null;
  minutesLast4: number[];
  reportedSignal?: ReportedSignal | null;
  now: Date;
};

export type AvailabilityBand = "green" | "amber" | "red";

export type AvailabilityResult = {
  score: number;
  band: AvailabilityBand;
  components: {
    base: number;
    cop: number | null;
    newsPenalty: number;
    minutesTrend: number;
    reportedAbsence: number;
  };
  returnInDays: number | null;
  summary: string;
};

const STATUS_BASE: Record<Status, number> = { a: 100, d: 55, i: 5, s: 0, u: 0, n: 15 };

const SEVERE_KEYWORDS = ["surgery", "out for the season", "acl", "ruptured", "long-term", "suspended"];
const MODERATE_KEYWORDS = ["injury", "strain", "hamstring", "groin", "calf", "ankle", "illness"];
const MILD_KEYWORDS = ["knock", "doubt", "assessed", "late test"];

const SEVERE_PENALTY = 25;
const MODERATE_PENALTY = 15;
const MILD_PENALTY = 8;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** 0 to 25. Keyword severity from the news text, scaled down as it ages:
 * full weight under 3 days, decaying linearly to 40% weight at 21 days. */
function newsPenalty(news: string | null, newsAdded: Date | null, now: Date): number {
  if (!news) return 0;
  const lower = news.toLowerCase();

  let base = 0;
  if (SEVERE_KEYWORDS.some((k) => lower.includes(k))) base = SEVERE_PENALTY;
  else if (MODERATE_KEYWORDS.some((k) => lower.includes(k))) base = MODERATE_PENALTY;
  else if (MILD_KEYWORDS.some((k) => lower.includes(k))) base = MILD_PENALTY;

  if (base === 0) return 0;
  if (!newsAdded) return base;

  const ageDays = (now.getTime() - newsAdded.getTime()) / 86_400_000;
  let weight: number;
  if (ageDays <= 3) weight = 1;
  else if (ageDays >= 21) weight = 0.4;
  else weight = 1 - ((ageDays - 3) / 18) * 0.6;

  return base * weight;
}

/** -10 to +10. Compares the mean of the last two entries against the mean of
 * the first two, normalised so a full 0-to-90 swing maps to the bounds.
 * Fewer than 4 entries returns 0 - there's nothing to trend. */
function minutesTrend(minutesLast4: number[]): number {
  if (minutesLast4.length < 4) return 0;
  const firstMean = (minutesLast4[0] + minutesLast4[1]) / 2;
  const lastMean = (minutesLast4[2] + minutesLast4[3]) / 2;
  return clamp(((lastMean - firstMean) / 90) * 10, -10, 10);
}

/** 0 to 20, applied only when a reported signal is present. Nothing in this
 * codebase supplies one yet (that's the news layer, not built) - this exists
 * so the model is ready for it and is exercised directly by tests. */
function reportedAbsence(signal: ReportedSignal | null | undefined): number {
  if (!signal) return 0;
  const weights: Record<ReportedSignal["signal"], number> = {
    ruled_out: -20,
    missed_training: -14,
    doubt: -9,
    rested: -4,
    trained: 5,
    returned: 8,
  };
  return weights[signal.signal] * signal.confidence;
}

function bandFromScore(score: number): AvailabilityBand {
  if (score >= 75) return "green";
  if (score >= 40) return "amber";
  return "red";
}

function summarise(status: Status, band: AvailabilityBand, returnInDays: number | null): string {
  if (status === "a" && band === "green") return "Fully available.";
  if (returnInDays != null && returnInDays > 0) {
    return `Expected back in about ${returnInDays} day${returnInDays === 1 ? "" : "s"}.`;
  }
  if (band === "red") return "Very unlikely to feature.";
  if (band === "amber") return "Fitness genuinely in doubt.";
  return "Likely to play.";
}

export function availabilityScore(input: AvailabilityInput): AvailabilityResult {
  const base = STATUS_BASE[input.status];
  const cop = input.chanceNextRound ?? input.chanceThisRound ?? null;
  const preModifiers = cop !== null ? 0.55 * base + 0.45 * cop : base;

  const penalty = newsPenalty(input.news, input.newsAdded, input.now);
  const trend = minutesTrend(input.minutesLast4);
  const absence = reportedAbsence(input.reportedSignal);

  let score = preModifiers - penalty + trend + absence;
  // A player flagged injured by the official feed can't be pushed into
  // "safe to start" territory by an unverified reported signal alone.
  if (input.status === "i") score = Math.min(score, 40);
  score = Math.round(clamp(score, 0, 100));

  const band = bandFromScore(score);
  const returnInDays = input.newsReturn
    ? Math.ceil((input.newsReturn.getTime() - input.now.getTime()) / 86_400_000)
    : null;

  return {
    score,
    band,
    components: { base, cop, newsPenalty: penalty, minutesTrend: trend, reportedAbsence: absence },
    returnInDays,
    summary: summarise(input.status, band, returnInDays),
  };
}
