import { describe, expect, it } from "vitest";
import { toPublicPlayer } from "./public-state";
import type { Player } from "./types";
import { generateGameId } from "./utils";

describe("generateGameId", () => {
  it("only makes codes that survive being upper-cased by the join form", () => {
    for (let i = 0; i < 5000; i++) {
      const code = generateGameId();
      expect(code).toHaveLength(6);
      expect(code).toBe(code.toUpperCase());
      expect(code).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
    }
  });
});

describe("toPublicPlayer", () => {
  it("never sends a player's answers to other clients", () => {
    const player = {
      id: "p1",
      name: "Rudi",
      colour: "#1E5C3A",
      avatar: "🐶",
      score: 300,
      answers: [{ questionId: "q1", answer: "Belfast" }],
    } as unknown as Player;

    const shown = toPublicPlayer(player);
    expect(shown.answers).toEqual([]);
    expect(shown.score).toBe(300);
    expect(player.answers).toHaveLength(1);
  });
});
