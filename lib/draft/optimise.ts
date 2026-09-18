export type OptimiserPosition = 1 | 2 | 3 | 4; // GK, DEF, MID, FWD

export type SquadPlayer = {
  id: number;
  webName: string;
  position: OptimiserPosition;
  pickPosition: number; // current formation slot: 1..11 starting, 12..15 bench
  projectedPoints: number | null;
  availabilityScore: number;
};

export type FormationConstraints = {
  minDef: number;
  maxDef: number;
  minMid: number;
  maxMid: number;
  minFwd: number;
  maxFwd: number;
  totalStarters: number;
};

// Real limits from the live API's settings.squad block (min/max_play_*).
// GK is always exactly 1 - the API doesn't even offer a range for it.
export const DEFAULT_CONSTRAINTS: FormationConstraints = {
  minDef: 3,
  maxDef: 5,
  minMid: 2,
  maxMid: 5,
  minFwd: 1,
  maxFwd: 3,
  totalStarters: 11,
};

export type OptimiserResult = {
  xi: SquadPlayer[];
  bench: SquadPlayer[];
  formation: string;
  projectedTotal: number;
  swaps: { out: SquadPlayer; in: SquadPlayer; gain: number }[];
  gainOverCurrent: number;
  risks: string[];
};

function points(p: SquadPlayer): number {
  return p.projectedPoints ?? 0;
}

function topN(players: SquadPlayer[], n: number): SquadPlayer[] {
  return [...players].sort((a, b) => points(b) - points(a)).slice(0, n);
}

/**
 * Best legal XI from a 15-man squad, by projected points. The search space
 * is tiny (at most a few dozen formations), so this enumerates every legal
 * formation exactly rather than picking greedily - greedy can miss the
 * actual optimum when a position is deep and another is thin.
 */
export function bestXI(
  squad: SquadPlayer[],
  constraints: FormationConstraints = DEFAULT_CONSTRAINTS,
): OptimiserResult {
  const byPosition: Record<OptimiserPosition, SquadPlayer[]> = { 1: [], 2: [], 3: [], 4: [] };
  for (const p of squad) byPosition[p.position].push(p);

  const risks: string[] = [];
  if (byPosition[1].length === 0) risks.push("No goalkeeper in the squad at all.");

  let best: { xi: SquadPlayer[]; total: number; formation: string } | null = null;

  const gk = topN(byPosition[1], 1);
  const gkTotal = gk.reduce((sum, p) => sum + points(p), 0);

  for (let def = constraints.minDef; def <= constraints.maxDef; def++) {
    for (let mid = constraints.minMid; mid <= constraints.maxMid; mid++) {
      const fwd = constraints.totalStarters - 1 - def - mid;
      if (fwd < constraints.minFwd || fwd > constraints.maxFwd) continue;
      if (def > byPosition[2].length || mid > byPosition[3].length || fwd > byPosition[4].length) continue;

      const defs = topN(byPosition[2], def);
      const mids = topN(byPosition[3], mid);
      const fwds = topN(byPosition[4], fwd);
      const total =
        gkTotal + defs.reduce((s, p) => s + points(p), 0) + mids.reduce((s, p) => s + points(p), 0) + fwds.reduce((s, p) => s + points(p), 0);

      if (!best || total > best.total) {
        best = { xi: [...gk, ...defs, ...mids, ...fwds], total, formation: `${def}-${mid}-${fwd}` };
      }
    }
  }

  if (!best) {
    // No legal formation fits this squad's positional depth - fall back to
    // whatever the current XI is rather than returning nothing.
    const currentXi = squad.filter((p) => p.pickPosition <= constraints.totalStarters);
    risks.push("No legal formation fits this squad's positions - showing the current XI unchanged.");
    return {
      xi: currentXi,
      bench: squad.filter((p) => p.pickPosition > constraints.totalStarters),
      formation: "-",
      projectedTotal: currentXi.reduce((s, p) => s + points(p), 0),
      swaps: [],
      gainOverCurrent: 0,
      risks,
    };
  }

  const xiIds = new Set(best.xi.map((p) => p.id));
  const bench = squad.filter((p) => !xiIds.has(p.id)).sort((a, b) => points(b) - points(a));

  const currentXi = squad.filter((p) => p.pickPosition <= constraints.totalStarters);
  const currentTotal = currentXi.reduce((s, p) => s + points(p), 0);
  const currentIds = new Set(currentXi.map((p) => p.id));

  const droppedOut = currentXi.filter((p) => !xiIds.has(p.id)).sort((a, b) => points(a) - points(b));
  const broughtIn = best.xi.filter((p) => !currentIds.has(p.id)).sort((a, b) => points(b) - points(a));
  const swaps = droppedOut.map((out, i) => {
    const inPlayer = broughtIn[i];
    return { out, in: inPlayer, gain: points(inPlayer) - points(out) };
  });

  for (const starter of best.xi) {
    if (starter.availabilityScore < 40) {
      risks.push(`${starter.webName} is flagged red and currently starting.`);
    }
  }
  if (byPosition[1].length < 2) {
    risks.push("No bench cover at goalkeeper.");
  }

  return {
    xi: best.xi,
    bench,
    formation: best.formation,
    projectedTotal: best.total,
    swaps,
    gainOverCurrent: Number((best.total - currentTotal).toFixed(2)),
    risks,
  };
}
