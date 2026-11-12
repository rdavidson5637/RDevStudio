export type Status = "a" | "d" | "i" | "s" | "u" | "n";

export type ReportedSignal = {
  signal: "trained" | "missed_training" | "doubt" | "ruled_out" | "returned" | "rested";
  confidence: number;
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

export type AvailabilityResult = {
  score: number;
  band: "green" | "amber" | "red";
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

const SEVERE = ["surgery", "out for the season", "acl", "ruptured", "long-term", "suspended"];
const MODERATE = ["injury", "strain", "hamstring", "groin", "calf", "ankle", "illness"];
const MILD = ["knock", "doubt", "assessed", "late test"];

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function newsPenalty(news: string | null, newsAdded: Date | null, now: Date): number {
  if (!news) return 0;
  const lower = news.toLowerCase();
  let base = 0;
  if (SEVERE.some((k) => lower.includes(k))) base = 25;
  else if (MODERATE.some((k) => lower.includes(k))) base = 15;
  else if (MILD.some((k) => lower.includes(k))) base = 8;
  if (base === 0 || !newsAdded) return base;

  const ageDays = (now.getTime() - newsAdded.getTime()) / 86_400_000;
  let weight = 1;
  if (ageDays >= 21) weight = 0.4;
  else if (ageDays > 3) weight = 1 - ((ageDays - 3) / 18) * 0.6;
  return base * weight;
}

export function minutesTrend(minutesLast4: number[]): number {
  if (minutesLast4.length < 4) return 0;
  const first = (minutesLast4[0] + minutesLast4[1]) / 2;
  const last = (minutesLast4[2] + minutesLast4[3]) / 2;
  return clamp(((last - first) / 90) * 10, -10, 10);
}

function reportedAbsence(signal: ReportedSignal | null | undefined, status: Status): number {
  if (!signal) return 0;
  const weights = {
    ruled_out: -20,
    missed_training: -14,
    doubt: -9,
    rested: -4,
    trained: 5,
    returned: 8,
  } as const;
  return weights[signal.signal] * clamp(signal.confidence, 0, 1);
}

function bandFor(score: number): AvailabilityResult["band"] {
  if (score >= 75) return "green";
  if (score >= 40) return "amber";
  return "red";
}

function summary(input: AvailabilityInput, score: number, returnInDays: number | null): string {
  const name = {
    a: "Available",
    d: "A doubt",
    i: "Injured",
    s: "Suspended",
    u: "Unavailable",
    n: "Not in the matchday squad",
  }[input.status];
  if (input.status === "a" && score >= 90) return "Fit, and the recent minutes back that up.";
  if (returnInDays != null && returnInDays > 0) {
    return `${name}. The official note points to a return in ${returnInDays} day${returnInDays === 1 ? "" : "s"}.`;
  }
  if (input.news) return `${name}. ${input.news}`;
  if (score >= 75) return `${name}, and nothing in the recent record argues against a start.`;
  if (score >= 40) return `${name}. Worth a look at the bench before you lock the side.`;
  return `${name}. Do not count on the minutes.`;
}

export function availabilityScore(input: AvailabilityInput): AvailabilityResult {
  const base = STATUS_BASE[input.status] ?? 15;
  const cop = input.chanceNextRound ?? input.chanceThisRound ?? null;
  let score = cop !== null ? 0.55 * base + 0.45 * cop : base;
  const penalty = newsPenalty(input.news, input.newsAdded, input.now);
  const trend = minutesTrend(input.minutesLast4);
  let reported = reportedAbsence(input.reportedSignal, input.status);
  score = score - penalty + trend + reported;
  score = clamp(score, 0, 100);
  if (input.status === "i") score = Math.min(score, 39);
  score = Math.round(score);

  const returnInDays =
    input.newsReturn == null
      ? null
      : Math.ceil((input.newsReturn.getTime() - input.now.getTime()) / 86_400_000);

  return {
    score,
    band: bandFor(score),
    components: {
      base,
      cop,
      newsPenalty: Number(penalty.toFixed(2)),
      minutesTrend: Number(trend.toFixed(2)),
      reportedAbsence: Number(reported.toFixed(2)),
    },
    returnInDays: returnInDays != null && Number.isFinite(returnInDays) ? returnInDays : null,
    summary: summary(input, score, returnInDays),
  };
}
