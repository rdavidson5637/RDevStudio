import { describe, expect, it } from "vitest";
import { hostAuthorised, withoutHostSecret } from "./host-auth";
import { toLobbyGameState, toPublicGameState } from "./public-state";
import type { GameState } from "./types";

function game(overrides: Partial<GameState> = {}): GameState {
  return {
    id: "ABCDEF",
    hostId: "host-player",
    hostSecret: "secret-value",
    players: [],
    questions: [],
    currentQuestionIndex: 0,
    status: "lobby",
    categories: [],
    totalQuestions: 0,
    createdAt: 0,
    roundConfigs: [],
    rounds: [],
    currentRoundIndex: 0,
    activeBuzz: null,
    buzzLockedOutPlayerIds: [],
    buzzLockedOutTeamIds: [],
    teamMode: false,
    teams: null,
    teamCount: 0,
    kickedPlayerIds: [],
    skippedQuestionIds: [],
    ...overrides,
  };
}

describe("hostAuthorised", () => {
  it("accepts the host id together with the secret", () => {
    expect(hostAuthorised(game(), "host-player", "secret-value")).toBe(true);
  });

  it("rejects the public host id on its own", () => {
    expect(hostAuthorised(game(), "host-player", undefined)).toBe(false);
    expect(hostAuthorised(game(), "host-player", "wrong")).toBe(false);
  });

  it("rejects a game that was saved before secrets existed", () => {
    expect(hostAuthorised(game({ hostSecret: undefined }), "host-player", "secret-value")).toBe(
      false,
    );
  });
});

describe("host secret stays off anything a player can read", () => {
  it("strips the secret from a game object", () => {
    const visible = withoutHostSecret(game());
    expect(visible).not.toHaveProperty("hostSecret");
    expect(visible.hostId).toBe("host-player");
  });

  it("leaves the secret out of public state and the lobby cache", () => {
    const state = game();
    expect(toPublicGameState(state)).not.toHaveProperty("hostSecret");
    expect(toLobbyGameState(state)).not.toHaveProperty("hostSecret");
  });
});
