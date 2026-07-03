import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { getGame } from "@/lib/quiz/game-store";
import { getPlayerAvatar, getPlayerColour } from "@/lib/quiz/player-identity";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { sanitizeChatText } from "@/lib/quiz/social";

interface ChatRequestBody {
  gameId: string;
  playerId: string;
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const { gameId, playerId, text } = body;

    if (!gameId?.trim()) {
      return NextResponse.json(
        { error: "gameId is required" },
        { status: 400 },
      );
    }

    if (!playerId?.trim()) {
      return NextResponse.json(
        { error: "playerId is required" },
        { status: 400 },
      );
    }

    const sanitised = sanitizeChatText(text ?? "");

    if (!sanitised) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 },
      );
    }

    const game = await getGame(gameId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const player = game.players.find((entry) => entry.id === playerId);

    if (!player) {
      return NextResponse.json(
        { error: "Player not in game" },
        { status: 403 },
      );
    }

    const message = {
      id: randomUUID(),
      playerId: player.id,
      playerName: player.name,
      playerColour: getPlayerColour(player),
      playerAvatar: getPlayerAvatar(player),
      text: sanitised,
      timestamp: Date.now(),
    };

    await triggerGameEvent(gameId, "game:chat", message);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
