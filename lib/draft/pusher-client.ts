import Pusher from "pusher-js";
import { DRAFT_LIVE_CHANNEL, DRAFT_LIVE_EVENT, type LiveBoardData } from "./live-types";

let pusherClient: Pusher | null = null;

function getPusherClient(): Pusher | null {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) return null;
  if (!pusherClient) {
    pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
  }
  return pusherClient;
}

export function subscribeDraftLive(onBoard: (board: LiveBoardData) => void): () => void {
  const client = getPusherClient();
  if (!client) return () => undefined;

  const channel = client.subscribe(DRAFT_LIVE_CHANNEL);
  channel.bind(DRAFT_LIVE_EVENT, onBoard);
  return () => {
    channel.unbind(DRAFT_LIVE_EVENT, onBoard);
    client.unsubscribe(DRAFT_LIVE_CHANNEL);
  };
}

export function isDraftLivePusherConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_PUSHER_KEY && process.env.NEXT_PUBLIC_PUSHER_CLUSTER);
}
