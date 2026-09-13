import { describe, expect, it } from "vitest";
import { normalizeLiveElements } from "../parse";

const stats = { total_points: 6, minutes: 90, bps: 22, bonus: 1 };

describe("normalizeLiveElements", () => {
  it("reads the current live payload, a map keyed by player id", () => {
    const elements = normalizeLiveElements({
      "12": { stats, explain: [] },
      "44": { stats: { ...stats, total_points: 2 }, explain: ["x"] },
    });
    expect(elements).toEqual([
      { id: 12, stats, explain: [] },
      { id: 44, stats: { ...stats, total_points: 2 }, explain: ["x"] },
    ]);
  });

  it("still accepts the older array shape", () => {
    const elements = normalizeLiveElements([{ id: 7, stats, explain: [] }]);
    expect(elements).toEqual([{ id: 7, stats, explain: [] }]);
  });

  it("returns an empty list for missing or junk payloads", () => {
    expect(normalizeLiveElements(undefined)).toEqual([]);
    expect(normalizeLiveElements(null)).toEqual([]);
    expect(normalizeLiveElements({ "1": { explain: [] } })).toEqual([]);
  });
});
