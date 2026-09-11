import { describe, expect, it } from "vitest";
import { bestXI, DEFAULT_CONSTRAINTS, type SquadPlayer } from "../optimise";

function player(overrides: Partial<SquadPlayer> & { id: number }): SquadPlayer {
  return {
    webName: `Player ${overrides.id}`,
    position: 3,
    pickPosition: 15,
    projectedPoints: 0,
    availabilityScore: 100,
    ...overrides,
  };
}

/** A realistic draft squad: 2 GK, 5 DEF, 5 MID, 3 FWD, so a legal XI always
 * exists regardless of how points are distributed. */
function realisticSquad(pointsFor: (id: number) => number): SquadPlayer[] {
  const squad: SquadPlayer[] = [];
  let id = 1;
  for (let i = 0; i < 2; i++) squad.push(player({ id: id++, position: 1, projectedPoints: pointsFor(id) }));
  for (let i = 0; i < 5; i++) squad.push(player({ id: id++, position: 2, projectedPoints: pointsFor(id) }));
  for (let i = 0; i < 5; i++) squad.push(player({ id: id++, position: 3, projectedPoints: pointsFor(id) }));
  for (let i = 0; i < 3; i++) squad.push(player({ id: id++, position: 4, projectedPoints: pointsFor(id) }));
  return squad;
}

describe("bestXI", () => {
  it("still returns a legal XI when the only goalkeeper is injured", () => {
    const squad = realisticSquad(() => 5).filter((p) => p.position !== 1 || p.id === 1);
    squad[0] = { ...squad[0], availabilityScore: 5, projectedPoints: 0.1 };

    const result = bestXI(squad);
    const gkInXi = result.xi.filter((p) => p.position === 1);
    expect(gkInXi).toHaveLength(1);
    expect(gkInXi[0].id).toBe(1);
    expect(result.xi).toHaveLength(11);
  });

  it("never violates the formation constraint across 500 random squads", () => {
    for (let i = 0; i < 500; i++) {
      const squad = realisticSquad(() => Math.random() * 10);
      const result = bestXI(squad);

      const def = result.xi.filter((p) => p.position === 2).length;
      const mid = result.xi.filter((p) => p.position === 3).length;
      const fwd = result.xi.filter((p) => p.position === 4).length;
      const gk = result.xi.filter((p) => p.position === 1).length;

      expect(gk).toBe(1);
      expect(def).toBeGreaterThanOrEqual(DEFAULT_CONSTRAINTS.minDef);
      expect(def).toBeLessThanOrEqual(DEFAULT_CONSTRAINTS.maxDef);
      expect(mid).toBeGreaterThanOrEqual(DEFAULT_CONSTRAINTS.minMid);
      expect(mid).toBeLessThanOrEqual(DEFAULT_CONSTRAINTS.maxMid);
      expect(fwd).toBeGreaterThanOrEqual(DEFAULT_CONSTRAINTS.minFwd);
      expect(fwd).toBeLessThanOrEqual(DEFAULT_CONSTRAINTS.maxFwd);
      expect(result.xi).toHaveLength(11);
    }
  });

  it("reports zero gain when the current XI is already the best XI", () => {
    // 1 GK, 3 DEF, 5 MID, 2 FWD = 11 starters, a legal formation. Bench (4
    // players) scores lower than every starter, so nothing should swap in.
    const squad: SquadPlayer[] = [
      player({ id: 1, position: 1, pickPosition: 1, projectedPoints: 5 }),
      player({ id: 2, position: 2, pickPosition: 2, projectedPoints: 5 }),
      player({ id: 3, position: 2, pickPosition: 3, projectedPoints: 5 }),
      player({ id: 4, position: 2, pickPosition: 4, projectedPoints: 5 }),
      player({ id: 5, position: 3, pickPosition: 5, projectedPoints: 5 }),
      player({ id: 6, position: 3, pickPosition: 6, projectedPoints: 5 }),
      player({ id: 7, position: 3, pickPosition: 7, projectedPoints: 5 }),
      player({ id: 8, position: 3, pickPosition: 8, projectedPoints: 5 }),
      player({ id: 9, position: 3, pickPosition: 9, projectedPoints: 5 }),
      player({ id: 10, position: 4, pickPosition: 10, projectedPoints: 5 }),
      player({ id: 11, position: 4, pickPosition: 11, projectedPoints: 5 }),
      player({ id: 12, position: 1, pickPosition: 12, projectedPoints: 0 }),
      player({ id: 13, position: 2, pickPosition: 13, projectedPoints: 0 }),
      player({ id: 14, position: 3, pickPosition: 14, projectedPoints: 0 }),
      player({ id: 15, position: 4, pickPosition: 15, projectedPoints: 0 }),
    ];

    const result = bestXI(squad);
    expect(result.gainOverCurrent).toBe(0);
    expect(result.swaps).toHaveLength(0);
  });
});
