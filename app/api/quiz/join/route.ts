import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { resolvePlayerIdentity } from "@/lib/quiz/player-identity";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import type { Player } from "@/lib/quiz/types";
import { generatePlayerId } from "@/lib/quiz/utils";

interface JoinRequestBody {
  gameId: string;
  playerName: string;
  colour?: string;
  avatar?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as JoinRequestBody;
    const { gameId, playerName, colour, avatar } = body;

    if (!gameId?.trim()) {
      return NextResponse.json({ error: "gameId is required" }, { status: 400 });
    }

    if (!playerName?.trim()) {
      return NextResponse.json(
        { error: "playerName is required" },
        { status: 400 }
      );
    }

    const game = getGame(gameId);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.status !== "lobby") {
      return NextResponse.json(
        { error: "Game has already started" },
        { status: 400 }
      );
    }

    const trimmedName = playerName.trim();
    const nameTaken = game.players.some(
      (player) => player.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (nameTaken) {
      return NextResponse.json(
        { error: "Player name is already taken" },
        { status: 400 }
      );
    }

    const identity = resolvePlayerIdentity(game.players, { colour, avatar });

    if ("error" in identity) {
      return NextResponse.json({ error: identity.error }, { status: 400 });
    }

    const playerId = generatePlayerId();
    const player: Player = {
      id: playerId,
      name: trimmedName,
      colour: identity.colour,
      avatar: identity.avatar,
      score: 0,
      answers: [],
    };

    game.players.push(player);
    setGame(gameId, game);

    await triggerGameEvent(gameId, "game:player-joined", {
      player,
      gameState: game,
    });

    return NextResponse.json({ playerId, gameState: game });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
