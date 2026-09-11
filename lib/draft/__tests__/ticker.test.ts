import { describe, expect, it } from "vitest";
import { buildTickerRow, cumulativeDifficulty, type TickerFixture } from "../ticker";

const fixtures: TickerFixture[] = [
  { event: 5, opponent: "MCI", isHome: true, difficulty: 4, kickoff: "2026-09-20T14:00:00Z" },
  { event: 5, opponent: "AVL", isHome: false, difficulty: 3, kickoff: "2026-09-21T14:00:00Z" },
  { event: 7, opponent: "EVE", isHome: true, difficulty: 2, kickoff: null },
];

describe("buildTickerRow", () => {
  it("stacks double gameweeks in one cell and keeps blanks visible", () => {
    const row = buildTickerRow(fixtures, 5, 4);
    expect(row).toHaveLength(4);
    expect(row[0].fixtures).toHaveLength(2);
    expect(row[1].fixtures).toHaveLength(0);
    expect(row[2].fixtures).toHaveLength(1);
    expect(row[2].fixtures[0].kickoff).toBeNull();
    expect(row[3].fixtures).toHaveLength(0);
  });

  it("scores blanks as a mid-table fixture so a DGW is harder than a blank week", () => {
    const row = buildTickerRow(fixtures, 5, 3);
    expect(cumulativeDifficulty(row)).toBeGreaterThan(8);
  });
});
