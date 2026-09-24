import { timingSafeEqual } from "crypto";

import type { GameState } from "./types";

/**
 * Host actions used to trust `hostId`, which every player can read from the
 * public game state. The secret is issued once, at create, and stays in the
 * host's session. It is never copied into public state, lobby cache, or
 * Pusher payloads.
 *
 * Games saved before secrets existed have no `hostSecret`. Those cannot be
 * driven any more: a public player id is not enough.
 */
export function hostAuthorised(
  game: Pick<GameState, "hostId" | "hostSecret">,
  hostId: string | undefined,
  hostSecret: string | undefined,
): boolean {
  if (!hostId || !hostSecret || !game.hostSecret) return false;
  if (game.hostId !== hostId) return false;

  const stored = Buffer.from(game.hostSecret);
  const given = Buffer.from(hostSecret);
  if (stored.length !== given.length) return false;
  return timingSafeEqual(stored, given);
}

/** Drop the host secret before a game object leaves the server. */
export function withoutHostSecret<T extends { hostSecret?: string }>(
  game: T,
): Omit<T, "hostSecret"> {
  const { hostSecret: _secret, ...rest } = game;
  return rest;
}
