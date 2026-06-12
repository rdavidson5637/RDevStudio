import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { getGame } from "@/lib/quiz/game-store";
import { getPlayerAvatar, getPlayerColour } from "@/lib/quiz/player-identity";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { isAllowedReaction } from "@/lib/quiz/social";

interface ReactRequestBody {
  gameId: string;
  playerId: string;
  emoji: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReactRequestBody;
    const { gameId, playerId, emoji } = body;

    if (!gameId?.trim()) {
      return NextResponse.json({ error: "gameId is required" }, { status: 400 });
    }

    if (!playerId?.trim()) {
      return NextResponse.json(
        { error: "playerId is required" },
        { status: 400 }
      );
    }

    if (!emoji || !isAllowedReaction(emoji)) {
      return NextResponse.json({ error: "Invalid reaction emoji" }, { status: 400 });
    }

    const game = await getGame(gameId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const player = game.players.find((entry) => entry.id === playerId);

    if (!player) {
      return NextResponse.json({ error: "Player not in game" }, { status: 403 });
    }

    const reaction = {
      id: randomUUID(),
      playerId: player.id,
      playerName: player.name,
      playerColour: getPlayerColour(player),
      playerAvatar: getPlayerAvatar(player),
      emoji,
    };

    await triggerGameEvent(gameId, "game:reaction", reaction);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
