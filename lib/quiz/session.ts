import { getPlayerAvatar, getPlayerColour } from "./player-identity";
import type { GameState } from "./types";
import { toLobbyGameState } from "./public-state";

export const QUIZ_SESSION_KEY = "quiz_session";
export const LOBBY_CACHE_KEY = "quiz_lobby_cache";

export interface QuizSession {
  playerId: string;
  isHost: boolean;
  gameId: string;
  playerName: string;
  colour: string;
  avatar: string;
}

interface LegacyQuizSession {
  playerId: string;
  isHost: boolean;
  gameState?: GameState;
}

export function saveQuizSession(session: QuizSession): void {
  sessionStorage.setItem(QUIZ_SESSION_KEY, JSON.stringify(session));
}

export function saveLobbyCache(gameState: GameState): void {
  if (gameState.status !== "lobby") {
    return;
  }

  sessionStorage.setItem(
    LOBBY_CACHE_KEY,
    JSON.stringify(toLobbyGameState(gameState)),
  );
}

export function loadLobbyCache(): GameState | null {
  const raw = sessionStorage.getItem(LOBBY_CACHE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function loadQuizSession(): QuizSession | null {
  const raw = sessionStorage.getItem(QUIZ_SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as QuizSession | LegacyQuizSession;

    if ("gameId" in parsed && parsed.gameId) {
      const session = parsed as QuizSession;

      if (!session.colour || !session.avatar) {
        return {
          ...session,
          colour: session.colour ?? "#F59E0B",
          avatar: session.avatar ?? "🦊",
        };
      }

      return session;
    }

    const legacy = parsed as LegacyQuizSession;

    if (legacy.gameState?.id) {
      const hostPlayer = legacy.gameState.players.find(
        (player) => player.id === legacy.playerId,
      );

      return {
        playerId: legacy.playerId,
        isHost: legacy.isHost,
        gameId: legacy.gameState.id,
        playerName: hostPlayer?.name ?? "Player",
        colour: hostPlayer ? getPlayerColour(hostPlayer) : "#F59E0B",
        avatar: hostPlayer ? getPlayerAvatar(hostPlayer) : "🦊",
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function clearQuizSession(): void {
  sessionStorage.removeItem(QUIZ_SESSION_KEY);
  sessionStorage.removeItem(LOBBY_CACHE_KEY);
}
