import Pusher, { type Channel } from "pusher-js";

let pusherClient: Pusher | null = null;

function isPusherConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_PUSHER_KEY &&
      process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  );
}

function getPusherClient(): Pusher | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!isPusherConfigured()) {
    return null;
  }

  if (!pusherClient) {
    pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
  }

  return pusherClient;
}

export function getChannel(gameId: string): Channel | null {
  const client = getPusherClient();
  if (!client) {
    return null;
  }

  return client.subscribe(`game-${gameId}`);
}
