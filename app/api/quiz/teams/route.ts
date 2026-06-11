import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import {
  isValidTeamColour,
  preserveTeamScores,
} from "@/lib/quiz/teams";
import type { Team } from "@/lib/quiz/types";

interface TeamsRequestBody {
  gameId: string;
  hostId: string;
  teams: Array<{ name: string; colour: string; playerIds: string[] }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TeamsRequestBody;
    const { gameId, hostId, teams } = body;

    if (!gameId?.trim() || !hostId?.trim()) {
      return NextResponse.json(
        { error: "gameId and hostId are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(teams) || teams.length < 2 || teams.length > 4) {
      return NextResponse.json(
        { error: "teams must be an array of 2 to 4 teams" },
        { status: 400 }
      );
    }

    const game = getGame(gameId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can update teams" },
        { status: 403 }
      );
    }

    if (!game.teamMode) {
      return NextResponse.json(
        { error: "This game is not in team mode" },
        { status: 400 }
      );
    }

    if (game.status !== "lobby") {
      return NextResponse.json(
        { error: "Teams can only be updated in the lobby" },
        { status: 400 }
      );
    }

    const playerIds = new Set(game.players.map((player) => player.id));
    const assigned = new Set<string>();

    const normalized: Team[] = teams.map((team, index) => {
      if (!team.name?.trim()) {
        throw new Error("Each team needs a name");
      }

      if (!isValidTeamColour(team.colour)) {
        throw new Error("Invalid team colour");
      }

      if (!Array.isArray(team.playerIds)) {
        throw new Error("Invalid team player list");
      }

      for (const playerId of team.playerIds) {
        if (!playerIds.has(playerId)) {
          throw new Error("Unknown player in team");
        }

        if (assigned.has(playerId)) {
          throw new Error("A player cannot be on more than one team");
        }

        assigned.add(playerId);
      }

      const existing = game.teams?.[index];

      return {
        id: existing?.id ?? `team_${index + 1}`,
        name: team.name.trim(),
        colour: team.colour,
        playerIds: [...team.playerIds],
        score: existing?.score ?? 0,
      };
    });

    game.teams = preserveTeamScores(game.teams, normalized);
    setGame(gameId, game);

    await triggerGameEvent(gameId, "game:teams-updated", {
      teams: game.teams,
      teamMode: true,
    });

    return NextResponse.json({ teams: game.teams });
  } catch (error) {
    console.error("teams update failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update teams",
      },
      { status: 400 }
    );
  }
}
