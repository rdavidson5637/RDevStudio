import { describe, expect, it } from "vitest";
import { deadlineFlags, inDeadlineAlertWindow } from "../deadline";

describe("deadlineFlags", () => {
  it("returns nothing for a full, fit XI with fixtures", () => {
    const squad = Array.from({ length: 11 }, (_, i) => ({
      pickPosition: i + 1,
      availabilityScore: 90,
      nextFixture: { opponent: "ARS", isHome: true, difficulty: 3 },
    }));
    expect(deadlineFlags(squad)).toEqual([]);
  });

  it("flags a short XI, a red starter, an amber starter, and a blank", () => {
    const flags = deadlineFlags([
      { pickPosition: 1, availabilityScore: 30, nextFixture: null },
      { pickPosition: 2, availabilityScore: 60, nextFixture: { opponent: "MCI" } },
    ]);
    expect(flags).toContain("XI is short of 11");
    expect(flags).toContain("a red-flagged starter");
    expect(flags).toContain("an amber starter");
    expect(flags).toContain("someone with no fixture");
  });
});

describe("inDeadlineAlertWindow", () => {
  const now = Date.parse("2026-09-11T06:00:00Z");

  it("sends when the deadline is later today", () => {
    expect(inDeadlineAlertWindow("2026-09-11T18:30:00Z", now)).toBe(true);
  });

  it("skips deadlines more than a day away or already inside 90 minutes", () => {
    expect(inDeadlineAlertWindow("2026-09-12T18:30:00Z", now)).toBe(false);
    expect(inDeadlineAlertWindow("2026-09-11T07:00:00Z", now)).toBe(false);
  });
});
