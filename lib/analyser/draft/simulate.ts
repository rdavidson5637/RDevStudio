export type SimPlayer = { name: string; xP: number };

export type MatchupResult = {
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
  homeProjected: number;
  awayProjected: number;
  swingers: { name: string; side: "home" | "away"; swing: number }[];
};

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Right-skewed draw around a projected mean. Seeded so tests stay put. */
export function sampleScore(xP: number, rng: () => number): number {
  const noise = (rng() + rng() + rng() - 1.5) * 0.55;
  return Math.max(0, xP * (0.85 + noise) + (rng() - 0.5) * 1.2);
}

export function simulateMatchup(home: SimPlayer[], away: SimPlayer[], runs = 4000, seed = 1): MatchupResult {
  const rng = mulberry32(seed);
  const homeProjected = home.reduce((sum, player) => sum + player.xP, 0);
  const awayProjected = away.reduce((sum, player) => sum + player.xP, 0);
  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  for (let i = 0; i < runs; i++) {
    const h = home.reduce((sum, player) => sum + sampleScore(player.xP, rng), 0);
    const a = away.reduce((sum, player) => sum + sampleScore(player.xP, rng), 0);
    if (h > a + 0.05) homeWins += 1;
    else if (a > h + 0.05) awayWins += 1;
    else draws += 1;
  }

  const swingers = [...home.map((p) => ({ name: p.name, side: "home" as const, swing: p.xP })), ...away.map((p) => ({ name: p.name, side: "away" as const, swing: p.xP }))]
    .sort((a, b) => b.swing - a.swing)
    .slice(0, 3);

  return {
    homeWinPct: homeWins / runs,
    drawPct: draws / runs,
    awayWinPct: awayWins / runs,
    homeProjected: Number(homeProjected.toFixed(1)),
    awayProjected: Number(awayProjected.toFixed(1)),
    swingers,
  };
}

export type SeasonSide = {
  entryId: number;
  currentTotal: number;
  weeklyMean: number;
};

export type SeasonRow = {
  entryId: number;
  titlePct: number;
  topFourPct: number;
  projectedTotal: number;
  meanRank: number;
};

export function simulateSeason(sides: SeasonSide[], gameweeks: number, runs = 8000, seed = 7): SeasonRow[] {
  const rng = mulberry32(seed);
  const titles = new Map<number, number>();
  const topFour = new Map<number, number>();
  const rankSum = new Map<number, number>();
  const totalSum = new Map<number, number>();
  for (const side of sides) {
    titles.set(side.entryId, 0);
    topFour.set(side.entryId, 0);
    rankSum.set(side.entryId, 0);
    totalSum.set(side.entryId, 0);
  }

  for (let run = 0; run < runs; run++) {
    const scored = sides.map((side) => {
      let total = side.currentTotal;
      for (let gw = 0; gw < gameweeks; gw++) total += sampleScore(side.weeklyMean, rng);
      return { entryId: side.entryId, total };
    });
    scored.sort((a, b) => b.total - a.total);
    scored.forEach((row, index) => {
      rankSum.set(row.entryId, (rankSum.get(row.entryId) ?? 0) + index + 1);
      totalSum.set(row.entryId, (totalSum.get(row.entryId) ?? 0) + row.total);
      if (index === 0) titles.set(row.entryId, (titles.get(row.entryId) ?? 0) + 1);
      if (index < 4) topFour.set(row.entryId, (topFour.get(row.entryId) ?? 0) + 1);
    });
  }

  return sides.map((side) => ({
    entryId: side.entryId,
    titlePct: (titles.get(side.entryId) ?? 0) / runs,
    topFourPct: (topFour.get(side.entryId) ?? 0) / runs,
    projectedTotal: (totalSum.get(side.entryId) ?? 0) / runs,
    meanRank: (rankSum.get(side.entryId) ?? 0) / runs,
  }));
}
