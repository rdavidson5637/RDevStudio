import { describe, expect, it } from "vitest";
import { availabilityScore, minutesTrend } from "../availability";

const now = new Date("2026-10-25T12:00:00Z");

function fit(overrides: Partial<Parameters<typeof availabilityScore>[0]> = {}) {
  return availabilityScore({
    status: "a",
    news: null,
    newsAdded: null,
    newsReturn: null,
    chanceThisRound: null,
    chanceNextRound: null,
    minutesLast4: [90, 90, 85, 90],
    now,
    ...overrides,
  });
}

describe("availabilityScore", () => {
  it("scores a fit player green", () => {
    const result = fit();
    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.band).toBe("green");
    expect(result.summary.length).toBeGreaterThan(10);
  });

  it("puts a 75% doubt in amber", () => {
    const result = fit({ status: "d", chanceNextRound: 75, minutesLast4: [70, 80, 75, 60] });
    expect(result.band).toBe("amber");
    expect(result.score).toBeGreaterThanOrEqual(40);
    expect(result.score).toBeLessThan(75);
  });

  it("keeps a ruptured ACL red even if a report says he trained", () => {
    const result = fit({
      status: "i",
      news: "Ruptured ACL, expected back March",
      newsAdded: new Date("2026-10-24T12:00:00Z"),
      minutesLast4: [0, 0, 0, 0],
      reportedSignal: { signal: "trained", confidence: 1 },
    });
    expect(result.band).toBe("red");
    expect(result.score).toBeLessThan(40);
  });

  it("ages a news penalty down after 30 days", () => {
    const fresh = fit({
      status: "d",
      news: "Hamstring strain",
      newsAdded: new Date("2026-10-24T12:00:00Z"),
      chanceNextRound: null,
      chanceThisRound: null,
    });
    const old = fit({
      status: "d",
      news: "Hamstring strain",
      newsAdded: new Date("2026-09-25T12:00:00Z"),
      chanceNextRound: null,
      chanceThisRound: null,
    });
    expect(old.components.newsPenalty).toBeLessThan(fresh.components.newsPenalty - 4);
  });

  it("reads minutes trend in both directions", () => {
    expect(minutesTrend([0, 15, 62, 90])).toBeGreaterThan(0);
    expect(minutesTrend([90, 78, 20, 0])).toBeLessThan(0);
  });

  it("falls back to the status base when chance fields are null", () => {
    const result = fit({ status: "a", chanceNextRound: null, chanceThisRound: null, minutesLast4: [] });
    expect(result.score).toBe(100);
    expect(Number.isNaN(result.score)).toBe(false);
    expect(result.components.cop).toBeNull();
  });
});
