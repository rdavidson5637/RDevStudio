import { describe, expect, it } from "vitest";
import { availabilityScore, type AvailabilityInput } from "../availability";

const NOW = new Date("2026-09-11T12:00:00Z");

function baseInput(overrides: Partial<AvailabilityInput> = {}): AvailabilityInput {
  return {
    status: "a",
    news: null,
    newsAdded: null,
    newsReturn: null,
    chanceThisRound: null,
    chanceNextRound: null,
    minutesLast4: [],
    now: NOW,
    ...overrides,
  };
}

describe("availabilityScore", () => {
  it("scores a fit, unflagged player 90 or above and green", () => {
    const result = availabilityScore(
      baseInput({ minutesLast4: [90, 90, 88, 90] }),
    );
    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.band).toBe("green");
  });

  it("lands a doubtful player with a 75% chance in amber", () => {
    const result = availabilityScore(baseInput({ status: "d", chanceNextRound: 75 }));
    expect(result.band).toBe("amber");
  });

  it("is red for a season-ending injury and stays red even with a trained signal", () => {
    const withoutSignal = availabilityScore(
      baseInput({
        status: "i",
        news: "Ruptured ACL, expected back March",
        newsAdded: NOW,
      }),
    );
    expect(withoutSignal.band).toBe("red");

    const withTrainedSignal = availabilityScore(
      baseInput({
        status: "i",
        news: "Ruptured ACL, expected back March",
        newsAdded: NOW,
        reportedSignal: { signal: "trained", confidence: 1 },
      }),
    );
    expect(withTrainedSignal.band).toBe("red");
    expect(withTrainedSignal.score).toBeLessThanOrEqual(40);
  });

  it("gives old news clearly less penalty than fresh news", () => {
    const fresh = availabilityScore(
      baseInput({
        status: "d",
        news: "Knock, assessed after training",
        newsAdded: new Date(NOW.getTime() - 1 * 86_400_000),
      }),
    );
    const stale = availabilityScore(
      baseInput({
        status: "d",
        news: "Knock, assessed after training",
        newsAdded: new Date(NOW.getTime() - 30 * 86_400_000),
      }),
    );
    expect(stale.components.newsPenalty).toBeLessThan(fresh.components.newsPenalty);
  });

  it("reads an upward minutes trend as positive and a downward one as negative", () => {
    const rising = availabilityScore(baseInput({ minutesLast4: [0, 15, 62, 90] }));
    const falling = availabilityScore(baseInput({ minutesLast4: [90, 78, 20, 0] }));
    expect(rising.components.minutesTrend).toBeGreaterThan(0);
    expect(falling.components.minutesTrend).toBeLessThan(0);
  });

  it("falls back to the status base cleanly with null chance fields, never NaN", () => {
    const result = availabilityScore(
      baseInput({ status: "d", chanceThisRound: null, chanceNextRound: null }),
    );
    expect(Number.isNaN(result.score)).toBe(false);
    expect(result.components.cop).toBeNull();
    expect(result.score).toBe(55);
  });
});
