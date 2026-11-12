export type OptimiserPosition = 1 | 2 | 3 | 4;

export type SquadPlayer = {
  id: number;
  webName: string;
  position: OptimiserPosition;
  pickPosition: number;
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

function points(player: SquadPlayer): number {
  return player.projectedPoints ?? 0;
}

function topN(players: SquadPlayer[], n: number): SquadPlayer[] {
  return [...players].sort((a, b) => points(b) - points(a) || a.pickPosition - b.pickPosition).slice(0, n);
}

export function bestXI(squad: SquadPlayer[], constraints: FormationConstraints = DEFAULT_CONSTRAINTS): OptimiserResult {
  const byPosition: Record<OptimiserPosition, SquadPlayer[]> = { 1: [], 2: [], 3: [], 4: [] };
  for (const player of squad) byPosition[player.position].push(player);

  const risks: string[] = [];
  if (byPosition[1].length === 0) risks.push("No goalkeeper in the squad.");

  let best: { xi: SquadPlayer[]; total: number; formation: string } | null = null;
  const gk = topN(byPosition[1], 1);

  for (let def = constraints.minDef; def <= constraints.maxDef; def++) {
    for (let mid = constraints.minMid; mid <= constraints.maxMid; mid++) {
      const fwd = constraints.totalStarters - 1 - def - mid;
      if (fwd < constraints.minFwd || fwd > constraints.maxFwd) continue;
      if (def > byPosition[2].length || mid > byPosition[3].length || fwd > byPosition[4].length || gk.length < 1) {
        continue;
      }
      const xi = [...gk, ...topN(byPosition[2], def), ...topN(byPosition[3], mid), ...topN(byPosition[4], fwd)];
      const total = xi.reduce((sum, player) => sum + points(player), 0);
      if (!best || total > best.total + 0.001) {
        best = { xi, total, formation: `${def}-${mid}-${fwd}` };
      }
    }
  }

  const xi = best?.xi ?? [];
  const xiIds = new Set(xi.map((player) => player.id));
  const bench = squad
    .filter((player) => !xiIds.has(player.id))
    .sort((a, b) => points(b) - points(a) || a.pickPosition - b.pickPosition);
  const current = squad.filter((player) => player.pickPosition <= 11);
  const currentTotal = current.reduce((sum, player) => sum + points(player), 0);
  const currentIds = new Set(current.map((player) => player.id));
  const incoming = xi.filter((player) => !currentIds.has(player.id));
  const outgoing = current.filter((player) => !xiIds.has(player.id));
  const swaps = incoming.map((player, index) => {
    const out = outgoing[index] ?? outgoing[0];
    return {
      out,
      in: player,
      gain: out ? Number((points(player) - points(out)).toFixed(2)) : Number(points(player).toFixed(2)),
    };
  }).filter((swap) => swap.out);

  for (const starter of xi) {
    if (starter.availabilityScore >= 75) continue;
    const cover = bench.some((player) => player.position === starter.position && player.availabilityScore >= 60);
    if (!cover) {
      risks.push(
        `${starter.webName} is ${starter.availabilityScore < 40 ? "a red flag" : "amber"} and the bench has no fit ${positionName(starter.position)} cover.`,
      );
    }
  }

  return {
    xi,
    bench,
    formation: best?.formation ?? "0-0-0",
    projectedTotal: Number((best?.total ?? 0).toFixed(2)),
    swaps,
    gainOverCurrent: Number(((best?.total ?? 0) - currentTotal).toFixed(2)),
    risks,
  };
}

function positionName(position: OptimiserPosition): string {
  return { 1: "goalkeeper", 2: "defender", 3: "midfielder", 4: "forward" }[position];
}

export function formationIsLegal(xi: SquadPlayer[], constraints: FormationConstraints = DEFAULT_CONSTRAINTS): boolean {
  if (xi.length !== constraints.totalStarters) return false;
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const player of xi) counts[player.position] += 1;
  return (
    counts[1] === 1 &&
    counts[2] >= constraints.minDef &&
    counts[2] <= constraints.maxDef &&
    counts[3] >= constraints.minMid &&
    counts[3] <= constraints.maxMid &&
    counts[4] >= constraints.minFwd &&
    counts[4] <= constraints.maxFwd
  );
}
