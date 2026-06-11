import { NextRequest, NextResponse } from "next/server";

import { getGame } from "@/lib/quiz/game-store";
import { toPublicGameState } from "@/lib/quiz/public-state";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("gameId");
  const playerId = searchParams.get("playerId");

  if (!gameId?.trim()) {
    return NextResponse.json({ error: "gameId is required" }, { status: 400 });
  }

  const game = getGame(gameId);

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  if (playerId && !game.players.some((player) => player.id === playerId)) {
    return NextResponse.json({ error: "Player not found in game" }, { status: 404 });
  }

  return NextResponse.json({ state: toPublicGameState(game) });
}
