"use client";

import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import type { Player } from "@/lib/quiz/types";

interface PlayerResult {
  playerId: string;
  answer: string;
  isCorrect: boolean;
  pointsAwarded: number;
}

interface PlayerResultsGridProps {
  players: Player[];
  playerResults: PlayerResult[];
}

export function PlayerResultsGrid({
  players,
  playerResults,
}: PlayerResultsGridProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-center text-sm font-medium text-quiz-muted">
        Who got it?
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {players.map((player) => {
          const result = playerResults.find(
            (entry) => entry.playerId === player.id
          );
          const timedOut = !result?.answer?.trim();
          const isCorrect = result?.isCorrect ?? false;

          let ringClass = "ring-quiz-border";
          let label = "—";

          if (timedOut) {
            ringClass = "ring-quiz-muted/40";
            label = "Time";
          } else if (isCorrect) {
            ringClass = "ring-quiz-success/60";
            label = `+${result?.pointsAwarded ?? 0}`;
          } else {
            ringClass = "ring-quiz-danger/50";
            label = "Wrong";
          }

          return (
            <div
              key={player.id}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 ring-2 ${ringClass}`}
            >
              <PlayerAvatar player={player} size="sm" />
              <span
                className={`text-xs font-medium ${
                  isCorrect
                    ? "text-quiz-success"
                    : timedOut
                      ? "text-quiz-muted"
                      : "text-quiz-danger"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
