export const POSITION_LABELS: Record<number, string> = {
  1: "GK",
  2: "DEF",
  3: "MID",
  4: "FWD",
};

export const POSITION_NAMES: Record<number, string> = {
  1: "Goalkeeper",
  2: "Defender",
  3: "Midfielder",
  4: "Forward",
};

/** FPL Draft squad is a fixed 15: 2 GK, 5 DEF, 5 MID, 3 FWD. */
export const DRAFT_SQUAD_MIN: Record<1 | 2 | 3 | 4, number> = {
  1: 2,
  2: 5,
  3: 5,
  4: 3,
};

export function defconLimit(position: number): number {
  if (position === 2) return 10;
  if (position === 3 || position === 4) return 12;
  return 0;
}
