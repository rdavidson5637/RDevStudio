import { NextRequest, NextResponse } from "next/server";

import { pauseGameTimer } from "@/lib/quiz/buzzer";
import { getGame, setGame } from "@/lib/quiz/game-store";
import { getPlayerAvatar, getPlayerColour } from "@/lib/quiz/player-identity";
import { getRoundForQuestionIndex } from "@/lib/quiz/rounds";
import { findTeamForPlayer } from "@/lib/quiz/teams";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { RoundFormat } from "@/lib/quiz/types";

interface BuzzRequestBody {
  gameId: string;
  playerId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BuzzRequestBody;
    const { gameId, playerId } = body;

    if (!gameId?.trim() || !playerId?.trim()) {
      return NextResponse.json(
        { error: "gameId and playerId are required" },
        { status: 400 },
      );
    }

    const game = await getGame(gameId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.status !== "question") {
      return NextResponse.json(
        { error: "Game is not accepting buzzes" },
        { status: 400 },
      );
    }

    const round = getRoundForQuestionIndex(game, game.currentQuestionIndex);

    if (round?.format !== RoundFormat.BUZZER) {
      return NextResponse.json(
        { error: "This is not a buzzer round" },
        { status: 400 },
      );
    }

    const player = game.players.find((entry) => entry.id === playerId);

    if (!player) {
      return NextResponse.json(
        { error: "Player not in game" },
        { status: 403 },
      );
    }

    if (game.buzzLockedOutPlayerIds.includes(playerId)) {
      return NextResponse.json(
        { error: "You cannot buzz in again on this question" },
        { status: 403 },
      );
    }

    if (game.teamMode && game.teams) {
      const team = findTeamForPlayer(game.teams, playerId);

      if (team && (game.buzzLockedOutTeamIds ?? []).includes(team.id)) {
        return NextResponse.json(
          { error: "Your team is locked out on this question" },
          { status: 403 },
        );
      }
    }

    if (game.activeBuzz) {
      return NextResponse.json(
        { ok: false, alreadyBuzzed: true },
        { status: 409 },
      );
    }

    const pausedAt = pauseGameTimer(game);
    const playerColour = getPlayerColour(player);
    const playerAvatar = getPlayerAvatar(player);

    game.activeBuzz = {
      playerId: player.id,
      playerName: player.name,
      playerColour,
      playerAvatar,
      buzzedAt: pausedAt,
    };

    await setGame(gameId, game);

    await triggerGameEvent(gameId, "game:buzz", {
      playerId: player.id,
      playerName: player.name,
      playerColour,
      playerAvatar,
      pausedAt,
      questionStartedAt: game.questionStartedAt ?? pausedAt,
      buzzLockedOutTeamIds: [...(game.buzzLockedOutTeamIds ?? [])],
    });

    return NextResponse.json({ ok: true, youBuzzedIn: true });
  } catch (error) {
    console.error("buzz failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to buzz in" },
      { status: 500 },
    );
  }
}
