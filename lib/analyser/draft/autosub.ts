export type AutosubPlayer = {
  id: number;
  position: 1 | 2 | 3 | 4;
  pickPosition: number;
  minutes: number;
  fixtureFinished: boolean;
  points: number;
};

const MIN = { 2: 3, 3: 2, 4: 1 };

/** FPL draft autosubs: bench order, and only once a starter's match is over with 0 minutes. */
export function applyAutosubs(squad: AutosubPlayer[]): {
  starterIds: number[];
  points: number;
  subs: { out: number; in: number }[];
} {
  const starters = squad.filter((player) => player.pickPosition <= 11).sort((a, b) => a.pickPosition - b.pickPosition);
  const bench = squad.filter((player) => player.pickPosition > 11).sort((a, b) => a.pickPosition - b.pickPosition);
  const subs: { out: number; in: number }[] = [];
  const counts = () => {
    const tally = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const player of starters) tally[player.position] += 1;
    return tally;
  };

  for (const starter of starters) {
    if (starter.minutes > 0 || !starter.fixtureFinished) continue;
    const before = counts();
    before[starter.position] -= 1;
    const replacement = bench.find((player) => {
      if (player.minutes <= 0) return false;
      if (player.position === starter.position) return true;
      const next = { ...before, [player.position]: before[player.position] + 1 };
      return next[1] === 1 && next[2] >= MIN[2] && next[3] >= MIN[3] && next[4] >= MIN[4] && next[2] + next[3] + next[4] === 10;
    });
    if (!replacement) continue;
    const index = starters.findIndex((player) => player.id === starter.id);
    const benchIndex = bench.findIndex((player) => player.id === replacement.id);
    starters[index] = replacement;
    bench.splice(benchIndex, 1);
    subs.push({ out: starter.id, in: replacement.id });
  }

  return {
    starterIds: starters.map((player) => player.id),
    points: Number(starters.reduce((sum, player) => sum + player.points, 0).toFixed(1)),
    subs,
  };
}
