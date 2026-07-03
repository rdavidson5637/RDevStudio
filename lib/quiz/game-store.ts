import { deleteGameFromKv, loadGameFromKv, saveGameToKv } from "./kv-store";
import type { GameState } from "./types";

const globalForGameStore = globalThis as typeof globalThis & {
  __pubQuizGameStore?: Map<string, GameState>;
};

function createStore(): Map<string, GameState> {
  return new Map<string, GameState>();
}

export const gameStore = globalForGameStore.__pubQuizGameStore ?? createStore();

globalForGameStore.__pubQuizGameStore = gameStore;

export async function getGame(id: string): Promise<GameState | undefined> {
  const cached = gameStore.get(id);
  if (cached) {
    return cached;
  }

  const remote = await loadGameFromKv(id);
  if (!remote) {
    return undefined;
  }

  gameStore.set(id, remote);
  return remote;
}

export async function setGame(id: string, state: GameState): Promise<void> {
  gameStore.set(id, state);
  await saveGameToKv(id, state);
}

export async function deleteGame(id: string): Promise<boolean> {
  const deleted = gameStore.delete(id);
  await deleteGameFromKv(id);
  return deleted;
}
