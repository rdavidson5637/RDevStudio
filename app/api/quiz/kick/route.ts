import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { removePlayerFromTeams } from "@/lib/quiz/teams";

interface KickRequestBody {
  gameId: string;
  hostId: string;
  targetPlayerId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as KickRequestBody;
    const { gameId, hostId, targetPlayerId } = body;

    if (!gameId?.trim() || !hostId?.trim() || !targetPlayerId?.trim()) {
      return NextResponse.json(
        { error: "gameId, hostId, and targetPlayerId are required" },
        { status: 400 },
      );
    }

    const game = await getGame(gameId);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can remove players" },
        { status: 403 },
      );
    }

    if (targetPlayerId === hostId) {
      return NextResponse.json(
        { error: "You cannot remove yourself" },
        { status: 400 },
      );
    }

    const target = game.players.find((player) => player.id === targetPlayerId);
    if (!target) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    if (!game.kickedPlayerIds) {
      game.kickedPlayerIds = [];
    }

    if (!game.kickedPlayerIds.includes(targetPlayerId)) {
      game.kickedPlayerIds.push(targetPlayerId);
    }

    game.players = game.players.filter(
      (player) => player.id !== targetPlayerId,
    );

    if (game.teamMode && game.teams) {
      game.teams = removePlayerFromTeams(game.teams, targetPlayerId);
    }

    await setGame(gameId, game);

    await triggerGameEvent(gameId, "game:player-kicked", {
      kickedPlayerId: targetPlayerId,
      players: game.players,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("kick failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to remove player",
      },
      { status: 500 },
    );
  }
}
