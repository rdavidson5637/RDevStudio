"use client";

import { useEffect, useRef, useState } from "react";

import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import type { Player, Team } from "@/lib/quiz/types";

interface TeamLeaderboardProps {
  teams: Team[];
  players: Player[];
  currentPlayerId: string;
  previousTeamScores?: Record<string, number>;
  showDelta?: boolean;
}

export function TeamLeaderboard({
  teams,
  players,
  currentPlayerId,
  previousTeamScores = {},
  showDelta = true,
}: TeamLeaderboardProps) {
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(
    teams.find((team) => team.playerIds.includes(currentPlayerId))?.id ?? null,
  );
  const [flashingTeamIds, setFlashingTeamIds] = useState<Set<string>>(
    new Set(),
  );
  const previousScoresRef = useRef<Record<string, number>>({});

  const currentTeamId = teams.find((team) =>
    team.playerIds.includes(currentPlayerId),
  )?.id;

  useEffect(() => {
    const nextFlashing = new Set<string>();

    for (const team of teams) {
      const previous = previousScoresRef.current[team.id];

      if (previous !== undefined && team.score > previous) {
        nextFlashing.add(team.id);
      }

      previousScoresRef.current[team.id] = team.score;
    }

    if (nextFlashing.size === 0) {
      return;
    }

    setFlashingTeamIds(nextFlashing);

    const timeout = window.setTimeout(() => {
      setFlashingTeamIds(new Set());
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [teams]);

  return (
    <ul className="space-y-2">
      {teams.map((team, index) => {
        const isCurrentTeam = team.id === currentTeamId;
        const isExpanded = expandedTeamId === team.id;
        const teamPlayers = team.playerIds
          .map((id) => players.find((player) => player.id === id))
          .filter((player): player is Player => Boolean(player))
          .sort((a, b) => b.score - a.score);
        const pointsDelta = showDelta
          ? team.score - (previousTeamScores[team.id] ?? team.score)
          : 0;
        const isFlashing = flashingTeamIds.has(team.id);
        const visibleAvatars = teamPlayers.slice(0, 4);
        const overflow = teamPlayers.length - visibleAvatars.length;

        return (
          <li
            key={team.id}
            className={`overflow-hidden rounded-xl border ${
              isCurrentTeam
                ? "border-l-4 bg-white/5"
                : "border-quiz-border bg-quiz-surface"
            } ${isFlashing ? "score-flash" : ""}`}
            style={isCurrentTeam ? { borderLeftColor: team.colour } : undefined}
          >
            <button
              type="button"
              onClick={() => setExpandedTeamId(isExpanded ? null : team.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <span className="w-8 shrink-0 text-center font-mono text-sm text-quiz-muted">
                {index === 0 ? "👑" : `#${index + 1}`}
              </span>

              <span
                className="h-10 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: team.colour }}
              />

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{team.name}</p>
                <div className="mt-1 flex items-center gap-1">
                  {visibleAvatars.map((player) => (
                    <PlayerAvatar
                      key={player.id}
                      player={player}
                      size="sm"
                      className="!flex-row !gap-0"
                    />
                  ))}
                  {overflow > 0 ? (
                    <span className="text-xs text-quiz-muted">+{overflow}</span>
                  ) : null}
                </div>
              </div>

              {showDelta ? (
                <span
                  className={`shrink-0 font-semibold tabular-nums ${
                    pointsDelta > 0
                      ? "text-quiz-success"
                      : pointsDelta < 0
                        ? "text-quiz-danger"
                        : "text-quiz-muted"
                  }`}
                >
                  {pointsDelta > 0
                    ? `+${pointsDelta}`
                    : pointsDelta < 0
                      ? `${pointsDelta}`
                      : "—"}
                </span>
              ) : null}

              <span className="shrink-0 font-mono font-semibold tabular-nums text-quiz-amber">
                {team.score}
              </span>
            </button>

            {isExpanded ? (
              <ul className="border-t border-quiz-border bg-quiz-bg/40 px-4 py-2">
                {teamPlayers.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <PlayerAvatar player={player} size="sm" />
                      <span
                        className={
                          player.id === currentPlayerId
                            ? "font-semibold text-white"
                            : "text-quiz-muted"
                        }
                      >
                        {player.name}
                      </span>
                    </div>
                    <span className="font-mono text-quiz-amber">
                      {player.score}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
