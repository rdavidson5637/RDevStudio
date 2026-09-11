export type TickerFixture = {
  event: number;
  opponent: string;
  isHome: boolean;
  difficulty: number;
  kickoff: string | null;
};

export type TickerCell = {
  event: number;
  fixtures: TickerFixture[];
};

export function difficultyRating(cumulative: number, gameweeks: number): string {
  const avg = gameweeks > 0 ? cumulative / gameweeks : 3;
  if (avg <= 2.2) return "Easy";
  if (avg <= 3.2) return "Medium";
  return "Hard";
}

/** Group a player's upcoming fixtures into a fixed gameweek window.
 * Double gameweeks stack two chips in one cell; blanks stay as empty cells. */
export function buildTickerRow(
  upcoming: TickerFixture[],
  fromEvent: number,
  gameweeks: number,
): TickerCell[] {
  const byEvent = new Map<number, TickerFixture[]>();
  for (const fixture of upcoming) {
    if (fixture.event < fromEvent || fixture.event >= fromEvent + gameweeks) continue;
    const list = byEvent.get(fixture.event) ?? [];
    list.push(fixture);
    byEvent.set(fixture.event, list);
  }

  const cells: TickerCell[] = [];
  for (let event = fromEvent; event < fromEvent + gameweeks; event++) {
    cells.push({ event, fixtures: byEvent.get(event) ?? [] });
  }
  return cells;
}

export function cumulativeDifficulty(cells: TickerCell[]): number {
  let total = 0;
  let count = 0;
  for (const cell of cells) {
    if (cell.fixtures.length === 0) {
      total += 3;
      count += 1;
      continue;
    }
    for (const fixture of cell.fixtures) {
      total += fixture.difficulty;
      count += 1;
    }
  }
  return count > 0 ? total : 0;
}
