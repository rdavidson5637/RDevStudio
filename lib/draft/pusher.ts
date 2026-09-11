import "server-only";
import Pusher from "pusher";
import type { LiveBoardData } from "./live-types";
import { DRAFT_LIVE_CHANNEL, DRAFT_LIVE_EVENT } from "./live-types";

let pusher: Pusher | null = null;

function isPusherConfigured(): boolean {
  return Boolean(
    process.env.PUSHER_APP_ID &&
      process.env.PUSHER_KEY &&
      process.env.PUSHER_SECRET &&
      process.env.PUSHER_CLUSTER,
  );
}

function getPusher(): Pusher | null {
  if (!isPusherConfigured()) return null;
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

export async function broadcastLiveBoard(board: LiveBoardData): Promise<boolean> {
  const client = getPusher();
  if (!client) return false;
  await client.trigger(DRAFT_LIVE_CHANNEL, DRAFT_LIVE_EVENT, board);
  return true;
}
