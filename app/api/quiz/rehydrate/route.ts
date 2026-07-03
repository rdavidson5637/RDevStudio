import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import type { GameState } from "@/lib/quiz/types";

interface RehydrateRequestBody {
  gameState: GameState;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RehydrateRequestBody;
    const { gameState } = body;

    if (!gameState?.id) {
      return NextResponse.json(
        { error: "gameState with id is required" },
        { status: 400 },
      );
    }

    if (await getGame(gameState.id)) {
      return NextResponse.json({ ok: true, restored: false });
    }

    if (gameState.status !== "lobby") {
      return NextResponse.json(
        { error: "Can only rehydrate games still in the lobby" },
        { status: 400 },
      );
    }

    const hasRounds =
      Array.isArray(gameState.roundConfigs) &&
      gameState.roundConfigs.length > 0;
    const hasCategories =
      Array.isArray(gameState.categories) && gameState.categories.length > 0;

    if (!hasRounds && !hasCategories) {
      return NextResponse.json(
        { error: "Invalid lobby state — missing round configuration" },
        { status: 400 },
      );
    }

    const restored: GameState = {
      ...gameState,
      roundConfigs: gameState.roundConfigs ?? [],
      rounds: [],
      currentRoundIndex: 0,
      questions: [],
      currentQuestionIndex: 0,
      status: "lobby",
      activeBuzz: null,
      buzzLockedOutPlayerIds: [],
      buzzLockedOutTeamIds: [],
      teamMode: gameState.teamMode ?? false,
      teams: gameState.teams ?? null,
      teamCount: gameState.teamCount ?? 0,
      kickedPlayerIds: gameState.kickedPlayerIds ?? [],
      skippedQuestionIds: [],
    };

    await setGame(gameState.id, restored);

    return NextResponse.json({ ok: true, restored: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
