/** Sample a gameweek score around a projected mean. Fantasy scores are
 * right-skewed, so this uses a lognormal-ish draw rather than a symmetric
 * gaussian. Seeded so tests are deterministic. */
export function sampleScore(xP: number, rng: () => number): number {
  const noise = (rng() + rng() + rng() - 1.5) * 0.55;
  return Math.max(0, xP * (0.85 + noise) + (rng() - 0.5) * 1.2);
}

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export type MatchupResult = {
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
  homeProjected: number;
  awayProjected: number;
  swingers: { name: string; side: "home" | "away"; swing: number }[];
};

export function simulateMatchup(
  home: { name: string; xP: number }[],
  away: { name: string; xP: number }[],
  runs = 4000,
  seed = 1,
): MatchupResult {
  const rng = mulberry32(seed);
  const homeProjected = home.reduce((sum, p) => sum + p.xP, 0);
  const awayProjected = away.reduce((sum, p) => sum + p.xP, 0);

  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  for (let i = 0; i < runs; i++) {
    const h = home.reduce((sum, p) => sum + sampleScore(p.xP, rng), 0);
    const a = away.reduce((sum, p) => sum + sampleScore(p.xP, rng), 0);
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

/** Live H2H: points already on the board stay locked; only yet-to-play
 * players are sampled. */
export function simulateRemaining(
  homeLocked: number,
  awayLocked: number,
  homeRemaining: { name: string; xP: number }[],
  awayRemaining: { name: string; xP: number }[],
  runs = 4000,
  seed = 1,
): MatchupResult {
  const rng = mulberry32(seed);
  const homeProjected = homeLocked + homeRemaining.reduce((sum, p) => sum + p.xP, 0);
  const awayProjected = awayLocked + awayRemaining.reduce((sum, p) => sum + p.xP, 0);

  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  for (let i = 0; i < runs; i++) {
    const h = homeLocked + homeRemaining.reduce((sum, p) => sum + sampleScore(p.xP, rng), 0);
    const a = awayLocked + awayRemaining.reduce((sum, p) => sum + sampleScore(p.xP, rng), 0);
    if (h > a + 0.05) homeWins += 1;
    else if (a > h + 0.05) awayWins += 1;
    else draws += 1;
  }

  const swingers = [...homeRemaining.map((p) => ({ name: p.name, side: "home" as const, swing: p.xP })), ...awayRemaining.map((p) => ({ name: p.name, side: "away" as const, swing: p.xP }))]
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

export type SeasonOdds = {
  entryId: number;
  titlePct: number;
  topFourPct: number;
  projectedTotal: number;
};

/** Remaining-schedule Monte Carlo for a classic or H2H table.
 * Each remaining gameweek, every side scores their XI mean with noise. */
export function simulateSeason(
  sides: { entryId: number; currentTotal: number; remainingGwMeans: number[] }[],
  runs = 2500,
  seed = 7,
): SeasonOdds[] {
  const rng = mulberry32(seed);
  const titles = new Map<number, number>();
  const topFour = new Map<number, number>();
  const totals = new Map<number, number>();

  for (const side of sides) {
    titles.set(side.entryId, 0);
    topFour.set(side.entryId, 0);
    totals.set(side.entryId, 0);
  }

  for (let i = 0; i < runs; i++) {
    const finish = sides.map((side) => {
      let total = side.currentTotal;
      for (const mean of side.remainingGwMeans) {
        total += sampleScore(mean, rng);
      }
      return { entryId: side.entryId, total };
    });
    finish.sort((a, b) => b.total - a.total);
    titles.set(finish[0].entryId, (titles.get(finish[0].entryId) ?? 0) + 1);
    for (const row of finish.slice(0, Math.min(4, finish.length))) {
      topFour.set(row.entryId, (topFour.get(row.entryId) ?? 0) + 1);
    }
    for (const row of finish) {
      totals.set(row.entryId, (totals.get(row.entryId) ?? 0) + row.total);
    }
  }

  return sides.map((side) => ({
    entryId: side.entryId,
    titlePct: (titles.get(side.entryId) ?? 0) / runs,
    topFourPct: (topFour.get(side.entryId) ?? 0) / runs,
    projectedTotal: (totals.get(side.entryId) ?? 0) / runs,
  }));
}
