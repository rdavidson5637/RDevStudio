import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { withoutHostSecret } from "@/lib/quiz/host-auth";
import type { GameState } from "@/lib/quiz/types";

interface RehydrateRequestBody {
  gameState: GameState;
  hostSecret?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RehydrateRequestBody;
    const { gameState, hostSecret } = body;

    if (!gameState?.id) {
      return NextResponse.json(
        { error: "gameState with id is required" },
        { status: 400 },
      );
    }

    if (await getGame(gameState.id)) {
      return NextResponse.json({ ok: true, restored: false });
    }

    if (!hostSecret?.trim()) {
      return NextResponse.json(
        { error: "hostSecret is required to restore a lobby" },
        { status: 403 },
      );
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
        { error: "Invalid lobby state - missing round configuration" },
        { status: 400 },
      );
    }

    const lobby = withoutHostSecret(gameState);
    const restored: GameState = {
      ...lobby,
      hostSecret: hostSecret || undefined,
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
