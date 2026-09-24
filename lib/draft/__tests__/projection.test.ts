import { describe, expect, it } from "vitest";
import { FALLBACK_SCORING, projectPoints, type ProjectionInput } from "../projection";

function baseInput(overrides: Partial<ProjectionInput> = {}): ProjectionInput {
  return {
    position: 4,
    availabilityScore: 95,
    startsPer90: 0.9,
    xG90: 0.6,
    xA90: 0.2,
    defconPer90: 1,
    bpsPer90: 28,
    fixtureDifficulty: 3,
    isHome: true,
    settings: FALLBACK_SCORING,
    ...overrides,
  };
}

describe("projectPoints", () => {
  it("projects a nailed high-xG forward higher against an easy fixture than a hard one", () => {
    const easy = projectPoints(baseInput({ fixtureDifficulty: 2 }));
    const hard = projectPoints(baseInput({ fixtureDifficulty: 5 }));
    expect(easy.xP).toBeGreaterThan(hard.xP);
  });

  it("projects a red-flag player near zero regardless of xG", () => {
    const flagged = projectPoints(baseInput({ availabilityScore: 10, startsPer90: 0.1 }));
    const fit = projectPoints(baseInput({ availabilityScore: 95, startsPer90: 0.9 }));
    expect(flagged.xP).toBeLessThan(fit.xP * 0.3);
  });

  it("produces different numbers at home vs away in the expected direction", () => {
    const home = projectPoints(baseInput({ isHome: true }));
    const away = projectPoints(baseInput({ isHome: false }));
    expect(home.xP).toBeGreaterThan(away.xP);
  });

  it("zero-weights clean sheet probability for MID and FWD", () => {
    const mid = projectPoints(baseInput({ position: 3 }));
    const fwd = projectPoints(baseInput({ position: 4 }));
    expect(mid.components.cleanSheet).toBe(0);
    expect(fwd.components.cleanSheet).toBe(0);
  });

  it("gives GK and DEF a non-zero clean sheet contribution", () => {
    const gk = projectPoints(baseInput({ position: 1 }));
    const def = projectPoints(baseInput({ position: 2 }));
    expect(gk.components.cleanSheet).toBeGreaterThan(0);
    expect(def.components.cleanSheet).toBeGreaterThan(0);
  });

  it("sums components to xP within a rounding tolerance", () => {
    const result = projectPoints(baseInput());
    const sum = Object.values(result.components).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - result.xP)).toBeLessThan(0.02);
  });

  it("pulls a tiny minutes sample back toward a normal forward, not a 20-point cameo", () => {
    const freak = projectPoints(
      baseInput({
        minutes: 3,
        xG90: 12,
        xA90: 6,
        bpsPer90: 180,
        startsPer90: 30,
        defconPer90: 40,
      }),
    );
    const season = projectPoints(
      baseInput({
        minutes: 1800,
        xG90: 0.45,
        xA90: 0.15,
        bpsPer90: 28,
        startsPer90: 0.85,
      }),
    );

    expect(freak.xP).toBeLessThan(8);
    expect(freak.confidence).toBe("low");
    expect(season.xP).toBeGreaterThan(freak.xP);
  });

  it("never produces NaN or Infinity across randomised inputs", () => {
    for (let i = 0; i < 1000; i++) {
      const input = baseInput({
        position: ([1, 2, 3, 4] as const)[Math.floor(Math.random() * 4)],
        availabilityScore: Math.random() * 100,
        startsPer90: Math.random() * 1.5,
        xG90: Math.random() * 2,
        xA90: Math.random() * 2,
        defconPer90: Math.random() * 20,
        bpsPer90: Math.random() * 60,
        fixtureDifficulty: Math.ceil(Math.random() * 5),
        isHome: Math.random() > 0.5,
      });
      const result = projectPoints(input);
      expect(Number.isFinite(result.xP)).toBe(true);
      expect(Number.isFinite(result.pStart)).toBe(true);
      for (const v of Object.values(result.components)) {
        expect(Number.isFinite(v)).toBe(true);
      }
    }
  });
});
