"use client";

import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import { getPlayerColour } from "@/lib/quiz/player-identity";
import type { Player } from "@/lib/quiz/types";

interface LeaderboardRowProps {
  rank: number;
  player: Player;
  isCurrentPlayer: boolean;
  pointsDelta: number;
  animationDelayMs?: number;
  showDelta?: boolean;
}

function formatDelta(pointsDelta: number): { text: string; className: string } {
  if (pointsDelta > 0) {
    return { text: `+${pointsDelta}`, className: "text-quiz-success" };
  }

  if (pointsDelta < 0) {
    return { text: `${pointsDelta}`, className: "text-quiz-danger" };
  }

  return { text: "—", className: "text-quiz-muted" };
}

export function LeaderboardRow({
  rank,
  player,
  isCurrentPlayer,
  pointsDelta,
  animationDelayMs = 0,
  showDelta = true,
}: LeaderboardRowProps) {
  const accentColour = getPlayerColour(player);
  const delta = formatDelta(pointsDelta);

  return (
    <li
      className={`leaderboard-slide-in flex items-center gap-3 rounded-xl border px-4 py-3 ${
        isCurrentPlayer
          ? "border-l-4 border-quiz-border bg-white/[0.04]"
          : "border-quiz-border bg-quiz-surface/60"
      }`}
      style={{
        animationDelay: `${animationDelayMs}ms`,
        ...(isCurrentPlayer ? { borderLeftColor: accentColour } : {}),
      }}
    >
      <span
        className={`w-8 shrink-0 text-center font-mono text-sm ${
          rank === 1 ? "font-semibold text-quiz-amber" : "text-quiz-muted"
        }`}
      >
        {rank === 1 ? "1st" : `#${rank}`}
      </span>

      <PlayerAvatar player={player} size="sm" showName />

      <div className="min-w-0 flex-1" />

      {showDelta ? (
        <span
          className={`shrink-0 font-semibold tabular-nums ${delta.className}`}
        >
          {delta.text}
        </span>
      ) : null}

      <span className="shrink-0 font-mono font-semibold tabular-nums text-quiz-amber">
        {player.score}
      </span>
    </li>
  );
}
