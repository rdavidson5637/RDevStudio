/** Canvas draws from the positive x-axis; the fixed pointer sits at the top. */
const POINTER_ANGLE = (3 * Math.PI) / 2;

export function getWheelWinnerIndex(
  rotation: number,
  itemCount: number,
): number {
  if (itemCount <= 0) return 0;

  const slice = (2 * Math.PI) / itemCount;
  const normalized =
    ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const relative =
    ((POINTER_ANGLE - normalized) % (2 * Math.PI) + 2 * Math.PI) %
    (2 * Math.PI);

  return Math.floor(relative / slice) % itemCount;
}
