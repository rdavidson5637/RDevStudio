import type { GameState } from "./types";

const GAME_KEY_PREFIX = "pubquiz:game:";
const GAME_TTL_SECONDS = 4 * 60 * 60;

function getKvCredentials(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url?.trim() || !token?.trim()) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), token };
}

export function isKvConfigured(): boolean {
  return getKvCredentials() !== null;
}

async function runKvCommand(command: (string | number)[]): Promise<unknown> {
  const credentials = getKvCredentials();

  if (!credentials) {
    return null;
  }

  const response = await fetch(credentials.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`KV request failed (${response.status})`);
  }

  const data = (await response.json()) as { result?: unknown };
  return data.result ?? null;
}

export async function loadGameFromKv(
  gameId: string
): Promise<GameState | null> {
  try {
    const result = await runKvCommand(["GET", `${GAME_KEY_PREFIX}${gameId}`]);

    if (!result || typeof result !== "string") {
      return null;
    }

    return JSON.parse(result) as GameState;
  } catch (error) {
    console.error("[Pub Quiz KV] Failed to load game:", error);
    return null;
  }
}

export async function saveGameToKv(
  gameId: string,
  state: GameState
): Promise<void> {
  try {
    await runKvCommand([
      "SET",
      `${GAME_KEY_PREFIX}${gameId}`,
      JSON.stringify(state),
      "EX",
      GAME_TTL_SECONDS,
    ]);
  } catch (error) {
    console.error("[Pub Quiz KV] Failed to save game:", error);
  }
}

export async function deleteGameFromKv(gameId: string): Promise<void> {
  try {
    await runKvCommand(["DEL", `${GAME_KEY_PREFIX}${gameId}`]);
  } catch (error) {
    console.error("[Pub Quiz KV] Failed to delete game:", error);
  }
}
