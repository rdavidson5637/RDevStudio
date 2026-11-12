import { describe, expect, it } from "vitest";
import { FALLBACK_SCORING, projectPoints, type ProjectionInput } from "../projection";

function base(overrides: Partial<ProjectionInput> = {}): ProjectionInput {
  return {
    position: 4,
    availabilityScore: 100,
    starts: 7,
    gamesPlayed: 7,
    minutesLast4: [90, 90, 85, 90],
    xG90: 0.7,
    xA90: 0.15,
    defconPer90: 0,
    defconHitsLast6: 0,
    bpsPer90: 32,
    teamXgcPer90: 1.2,
    fixtureDifficulty: 3,
    isHome: true,
    pointsPerGame: 7,
    yellowsPer90: 0.1,
    redsPer90: 0,
    settings: FALLBACK_SCORING,
    ...overrides,
  };
}

describe("projectPoints", () => {
  it("projects more against an easier fixture", () => {
    const easy = projectPoints(base({ fixtureDifficulty: 2 }));
    const hard = projectPoints(base({ fixtureDifficulty: 5 }));
    expect(easy.xP).toBeGreaterThan(hard.xP);
  });

  it("projects a red-flag player near zero", () => {
    const result = projectPoints(
      base({ availabilityScore: 10, minutesLast4: [0, 0, 0, 0], starts: 0, gamesPlayed: 7, pointsPerGame: 8 }),
    );
    expect(result.xP).toBeLessThan(1.5);
  });

  it("prefers home to away", () => {
    const home = projectPoints(base({ isHome: true }));
    const away = projectPoints(base({ isHome: false }));
    expect(home.xP).toBeGreaterThan(away.xP);
  });

  it("does not give midfielders or forwards a clean sheet term", () => {
    expect(projectPoints(base({ position: 3 })).components.cleanSheet).toBe(0);
    expect(projectPoints(base({ position: 4 })).components.cleanSheet).toBe(0);
    expect(projectPoints(base({ position: 2, xG90: 0.05 })).components.cleanSheet).toBeGreaterThan(0);
  });

  it("keeps components summing to xP", () => {
    const result = projectPoints(base());
    const sum = Object.values(result.components).reduce((total, value) => total + value, 0);
    expect(Math.abs(sum - result.xP)).toBeLessThan(0.02);
  });

  it("stays finite across random inputs", () => {
    for (let i = 0; i < 1000; i++) {
      const result = projectPoints(
        base({
          position: ((i % 4) + 1) as 1 | 2 | 3 | 4,
          availabilityScore: (i * 17) % 101,
          starts: i % 12,
          gamesPlayed: i % 15,
          minutesLast4: [i % 91, (i * 3) % 91, (i * 7) % 91, (i * 11) % 91],
          xG90: ((i % 50) - 10) / 10,
          xA90: ((i % 40) - 5) / 20,
          defconPer90: (i % 30) / 2,
          defconHitsLast6: i % 7,
          bpsPer90: (i % 80) - 5,
          teamXgcPer90: ((i % 40) - 5) / 10,
          fixtureDifficulty: (i % 5) + 1,
          isHome: i % 2 === 0,
          pointsPerGame: i % 11 === 0 ? null : (i % 20) / 2,
          yellowsPer90: (i % 10) / 10,
          redsPer90: i % 17 === 0 ? Number.NaN : 0,
        }),
      );
      expect(Number.isFinite(result.xP)).toBe(true);
      expect(Number.isFinite(result.pStart)).toBe(true);
      expect(Number.isFinite(result.expMins)).toBe(true);
    }
  });
});
