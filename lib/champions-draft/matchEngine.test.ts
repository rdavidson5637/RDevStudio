import { describe, expect, it } from "vitest";
import {
  CL_LEAGUE_MATCHES_PER_TEAM,
  CL_LEAGUE_PHASE_SIZE,
  buildLeaguePhaseFixtures,
} from "./matchEngine";

const TEAMS = Array.from(
  { length: CL_LEAGUE_PHASE_SIZE },
  (_, i) => `Club ${i + 1}`,
);

function tally(fixtures: Array<{ home: string; away: string }>) {
  const games = new Map<string, number>();
  const home = new Map<string, number>();
  for (const { home: h, away: a } of fixtures) {
    games.set(h, (games.get(h) ?? 0) + 1);
    games.set(a, (games.get(a) ?? 0) + 1);
    home.set(h, (home.get(h) ?? 0) + 1);
  }
  return { games, home };
}

describe("buildLeaguePhaseFixtures", () => {
  it("gives every club exactly eight games, four at home, over many runs", () => {
    for (let run = 0; run < 2000; run++) {
      const fixtures = buildLeaguePhaseFixtures(TEAMS);
      expect(fixtures).toHaveLength(
        (CL_LEAGUE_PHASE_SIZE * CL_LEAGUE_MATCHES_PER_TEAM) / 2,
      );
      const { games, home } = tally(fixtures);
      for (const team of TEAMS) {
        expect(games.get(team)).toBe(CL_LEAGUE_MATCHES_PER_TEAM);
        expect(home.get(team)).toBe(CL_LEAGUE_MATCHES_PER_TEAM / 2);
      }
    }
  });

  it("never pairs the same two clubs twice or a club with itself", () => {
    for (let run = 0; run < 500; run++) {
      const seen = new Set<string>();
      for (const { home, away } of buildLeaguePhaseFixtures(TEAMS)) {
        expect(home).not.toBe(away);
        const key = [home, away].sort().join("|");
        expect(seen.has(key)).toBe(false);
        seen.add(key);
      }
    }
  });

  it("falls back to a single round robin when there are too few clubs", () => {
    const small = ["A", "B", "C", "D", "E"];
    const fixtures = buildLeaguePhaseFixtures(small);
    expect(fixtures).toHaveLength(10);
    const { games } = tally(fixtures);
    for (const team of small) expect(games.get(team)).toBe(4);
  });
});
