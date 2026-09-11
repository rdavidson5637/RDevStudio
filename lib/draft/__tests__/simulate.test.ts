import { describe, expect, it } from "vitest";
import { simulateMatchup, simulateRemaining, simulateSeason } from "../simulate";

describe("simulateMatchup", () => {
  it("gives the stronger XI the higher win probability", () => {
    const strong = [
      { name: "A", xP: 8 },
      { name: "B", xP: 7 },
      { name: "C", xP: 6 },
    ];
    const weak = [
      { name: "D", xP: 3 },
      { name: "E", xP: 2 },
      { name: "F", xP: 2 },
    ];
    const result = simulateMatchup(strong, weak, 2000, 42);
    expect(result.homeWinPct).toBeGreaterThan(0.7);
    expect(result.homeProjected).toBeGreaterThan(result.awayProjected);
    expect(result.swingers[0].name).toBe("A");
  });
});

describe("simulateRemaining", () => {
  it("treats locked points as already scored", () => {
    const result = simulateRemaining(40, 10, [{ name: "A", xP: 4 }], [{ name: "B", xP: 4 }], 800, 2);
    expect(result.homeWinPct).toBeGreaterThan(0.9);
    expect(result.homeProjected).toBe(44);
    expect(result.awayProjected).toBe(14);
  });
});

describe("simulateSeason", () => {
  it("makes the current leader the title favourite when remaining schedules are equal", () => {
    const odds = simulateSeason(
      [
        { entryId: 1, currentTotal: 400, remainingGwMeans: [50, 50, 50] },
        { entryId: 2, currentTotal: 300, remainingGwMeans: [50, 50, 50] },
        { entryId: 3, currentTotal: 280, remainingGwMeans: [50, 50, 50] },
        { entryId: 4, currentTotal: 260, remainingGwMeans: [50, 50, 50] },
        { entryId: 5, currentTotal: 200, remainingGwMeans: [50, 50, 50] },
      ],
      800,
      3,
    );
    const leader = odds.find((row) => row.entryId === 1);
    expect(leader?.titlePct).toBeGreaterThan(0.8);
    expect(leader?.topFourPct).toBeGreaterThan(0.95);
  });
});
