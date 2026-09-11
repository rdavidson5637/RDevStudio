import { DRAFT_SQUAD_MIN } from "./positions";

export type DropPlayer = {
  id: number;
  webName: string;
  position: 1 | 2 | 3 | 4;
  projected6: number;
};

export type DropPairing = {
  drop: DropPlayer;
  incoming: DropPlayer;
  netGain: number;
  leavesThin: boolean;
};

function counts(squad: DropPlayer[]): Record<1 | 2 | 3 | 4, number> {
  const next: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const player of squad) next[player.position] += 1;
  return next;
}

function isLegal(squad: DropPlayer[]): boolean {
  const c = counts(squad);
  return (
    c[1] >= DRAFT_SQUAD_MIN[1] &&
    c[2] >= DRAFT_SQUAD_MIN[2] &&
    c[3] >= DRAFT_SQUAD_MIN[3] &&
    c[4] >= DRAFT_SQUAD_MIN[4]
  );
}

/** Lowest 6-gameweek projected squad player you can drop for this free agent
 * without breaking the 2-5-5-3 draft squad. */
export function bestDrop(squad: DropPlayer[], incoming: DropPlayer): DropPairing | null {
  if (squad.some((p) => p.id === incoming.id)) return null;

  let best: DropPairing | null = null;

  for (const drop of squad) {
    const nextSquad = squad.filter((p) => p.id !== drop.id).concat(incoming);
    if (!isLegal(nextSquad)) continue;

    const remainingAtPosition = nextSquad.filter((p) => p.position === drop.position).length;
    const pairing: DropPairing = {
      drop,
      incoming,
      netGain: Number((incoming.projected6 - drop.projected6).toFixed(2)),
      leavesThin: remainingAtPosition <= DRAFT_SQUAD_MIN[drop.position],
    };

    if (!best || drop.projected6 < best.drop.projected6) {
      best = pairing;
    }
  }

  return best;
}
