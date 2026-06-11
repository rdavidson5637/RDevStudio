import type { GameState } from "./types";

// TODO: In-memory only — game state resets on full server restart.
// Migrate to Redis (or similar) for production persistence.
const globalForGameStore = globalThis as typeof globalThis & {
  __pubQuizGameStore?: Map<string, GameState>;
};

function createStore(): Map<string, GameState> {
  return new Map<string, GameState>();
}

export const gameStore =
  globalForGameStore.__pubQuizGameStore ?? createStore();

if (process.env.NODE_ENV !== "production") {
  globalForGameStore.__pubQuizGameStore = gameStore;
}

export function getGame(id: string): GameState | undefined {
  return gameStore.get(id);
}

export function setGame(id: string, state: GameState): void {
  gameStore.set(id, state);
}

export function deleteGame(id: string): boolean {
  return gameStore.delete(id);
}
