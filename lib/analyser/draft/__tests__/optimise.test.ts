import { describe, expect, it } from "vitest";
import { bestXI, formationIsLegal, type SquadPlayer } from "../optimise";

function player(partial: Partial<SquadPlayer> & Pick<SquadPlayer, "id" | "position" | "pickPosition">): SquadPlayer {
  return {
    webName: `P${partial.id}`,
    projectedPoints: partial.position === 1 ? 4 : 5,
    availabilityScore: 90,
    ...partial,
  };
}

function legalSquad(seed = 1): SquadPlayer[] {
  const rows: SquadPlayer[] = [];
  let id = seed * 100;
  const add = (position: 1 | 2 | 3 | 4, count: number) => {
    for (let i = 0; i < count; i++) {
      id += 1;
      rows.push(
        player({
          id,
          position,
          pickPosition: rows.length + 1,
          projectedPoints: ((seed + id) % 9) + 1,
          availabilityScore: (id * 13) % 101,
        }),
      );
    }
  };
  add(1, 2);
  add(2, 5);
  add(3, 5);
  add(4, 3);
  return rows;
}

describe("bestXI", () => {
  it("returns a legal XI when the first-choice keeper is injured", () => {
    const squad = legalSquad();
    squad[0].availabilityScore = 5;
    squad[0].projectedPoints = 0.2;
    squad[1].projectedPoints = 4;
    const result = bestXI(squad);
    expect(formationIsLegal(result.xi)).toBe(true);
    expect(result.xi.filter((p) => p.position === 1)).toHaveLength(1);
    expect(result.xi[0].id).not.toBe(squad[0].id);
  });

  it("never breaks formation across random squads", () => {
    for (let seed = 1; seed <= 500; seed++) {
      const result = bestXI(legalSquad(seed));
      expect(formationIsLegal(result.xi)).toBe(true);
      expect(result.xi).toHaveLength(11);
      expect(result.bench).toHaveLength(4);
    }
  });

  it("reports no gain when the saved XI is already best", () => {
    const squad = legalSquad(3);
    const starters = new Set<number>();
    const take = (position: 1 | 2 | 3 | 4, count: number) => {
      for (const player of squad.filter((row) => row.position === position).slice(0, count)) starters.add(player.id);
    };
    take(1, 1);
    take(2, 4);
    take(3, 4);
    take(4, 2);
    let pick = 1;
    const arranged = squad.map((player) => ({
      ...player,
      pickPosition: starters.has(player.id) ? pick++ : 0,
      projectedPoints: starters.has(player.id) ? 10 : 1,
    }));
    let bench = 12;
    const finished = arranged.map((player) =>
      player.pickPosition === 0 ? { ...player, pickPosition: bench++ } : player,
    );
    const result = bestXI(finished);
    expect(result.gainOverCurrent).toBe(0);
    expect(result.swaps).toHaveLength(0);
  });
});
