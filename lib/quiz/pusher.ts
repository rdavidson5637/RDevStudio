import Pusher from "pusher";

import type { GameEventMap, GameEventType } from "./types";

let pusher: Pusher | null = null;

function isPusherConfigured(): boolean {
  return Boolean(
    process.env.PUSHER_APP_ID &&
      process.env.PUSHER_KEY &&
      process.env.PUSHER_SECRET &&
      process.env.PUSHER_CLUSTER
  );
}

function getPusher(): Pusher | null {
  if (!isPusherConfigured()) {
    return null;
  }

  if (!pusher) {
    pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    });
  }

  return pusher;
}

export async function triggerGameEvent<E extends GameEventType>(
  gameId: string,
  event: E,
  data: GameEventMap[E]
): Promise<void> {
  const client = getPusher();

  if (!client) {
    console.warn(
      `[Pusher] Skipping event "${event}" — Pusher credentials not configured`
    );
    return;
  }

  await client.trigger(`game-${gameId}`, event, data);
}
