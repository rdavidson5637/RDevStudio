import type { Confidence, Drink, NearbyPub } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;
const NINETY_DAYS_MS = 90 * DAY_MS;
const YEAR_MS = 365 * DAY_MS;

export type ConfidenceInput = {
  lastConfirmedAt: string | null;
  lastDeniedAt: string | null;
  yesCount: number;
  noCount: number;
};

/**
 * Mirrors public.drink_confidence(). Recency wins: a newer denial beats an
 * older confirmation, and a confirmation inside 90 days is Confirmed even if
 * historical no-votes outweigh yes-votes. Keep this in lockstep with the SQL.
 */
export function deriveConfidence(
  input: ConfidenceInput,
  nowMs: number = Date.now(),
): Confidence {
  const confirmedMs = input.lastConfirmedAt
    ? Date.parse(input.lastConfirmedAt)
    : null;
  const deniedMs = input.lastDeniedAt ? Date.parse(input.lastDeniedAt) : null;

  if (confirmedMs == null && deniedMs == null) return "unknown";
  if (deniedMs != null && (confirmedMs == null || deniedMs > confirmedMs)) {
    return "unlikely";
  }
  if (confirmedMs != null && confirmedMs >= nowMs - NINETY_DAYS_MS) {
    return "confirmed";
  }
  if (confirmedMs != null && confirmedMs >= nowMs - YEAR_MS) {
    return "likely";
  }
  return "stale";
}

export function formatLastSeen(
  iso: string | null,
  nowMs: number = Date.now(),
): string {
  if (!iso) return "never";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "never";
  const days = Math.floor((nowMs - then) / DAY_MS);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (days < 365) {
    return months <= 1 ? "1 month ago" : `${months} months ago`;
  }
  return "over a year ago";
}

export function confidenceRank(confidence: Confidence): number {
  switch (confidence) {
    case "confirmed":
      return 5;
    case "likely":
      return 4;
    case "stale":
      return 3;
    case "unlikely":
      return 2;
    case "unknown":
      return 1;
  }
}

export function pinStyleFor(confidence: Confidence): {
  className: string;
  opacity: number;
  strike: boolean;
} {
  switch (confidence) {
    case "confirmed":
      return {
        className:
          "block h-3.5 w-3.5 rounded-full bg-accent ring-2 ring-paper",
        opacity: 1,
        strike: false,
      };
    case "likely":
      return {
        className:
          "block h-3.5 w-3.5 rounded-full border-2 border-accent bg-paper",
        opacity: 1,
        strike: false,
      };
    case "stale":
      return {
        className:
          "block h-3.5 w-3.5 rounded-full bg-tertiary ring-2 ring-paper",
        opacity: 0.7,
        strike: false,
      };
    case "unlikely":
      return {
        className:
          "block h-3.5 w-3.5 rounded-full bg-tertiary ring-2 ring-paper",
        opacity: 0.55,
        strike: true,
      };
    case "unknown":
      return {
        className:
          "block h-3.5 w-3.5 rounded-full bg-tertiary ring-2 ring-paper",
        opacity: 0.3,
        strike: false,
      };
  }
}

export function bestDrinkAt(
  pub: Pick<NearbyPub, "drinks">,
  selectedDrinks: Drink[],
): Confidence {
  const pool = selectedDrinks.length > 0 ? selectedDrinks : (Object.keys(pub.drinks) as Drink[]);
  let best: Confidence = "unknown";
  for (const drink of pool) {
    const status = pub.drinks[drink];
    if (!status) continue;
    if (confidenceRank(status.confidence) > confidenceRank(best)) {
      best = status.confidence;
    }
  }
  return best;
}
