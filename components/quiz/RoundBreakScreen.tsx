"use client";

import { LeaderboardRow } from "@/components/quiz/LeaderboardRow";
import { ROUND_FORMAT_OPTIONS } from "@/lib/quiz/rounds";
import type { Player, Round } from "@/lib/quiz/types";

interface RoundBreakScreenProps {
  completedRound: Round;
  roundNumber: number;
  nextRound?: Round;
  leaderboard: Player[];
  playerId: string;
  isHost: boolean;
  onContinue: () => void;
  isAdvancing?: boolean;
}

export function RoundBreakScreen({
  completedRound,
  roundNumber,
  nextRound,
  leaderboard,
  playerId,
  isHost,
  onContinue,
  isAdvancing = false,
}: RoundBreakScreenProps) {
  const formatLabel =
    ROUND_FORMAT_OPTIONS.find(
      (option) => option.value === completedRound.format,
    )?.label ?? "Round";

  const nextFormatLabel = nextRound
    ? ROUND_FORMAT_OPTIONS.find((option) => option.value === nextRound.format)
        ?.label
    : null;

  return (
    <div className="flex min-h-[calc(100vh-6rem)] w-full max-w-2xl flex-col gap-8">
      <section className="space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-quiz-amber">
          Round {roundNumber} complete
        </p>
        <h2 className="font-serif text-3xl text-white sm:text-4xl">
          {completedRound.name}
        </h2>
        <p className="text-sm text-quiz-muted">
          {formatLabel} round · {completedRound.questionCount} questions
        </p>
      </section>

      <section className="flex-1 space-y-4">
        <h3 className="text-center text-sm font-medium uppercase tracking-[0.15em] text-quiz-muted">
          Standings so far
        </h3>

        <ul className="space-y-2">
          {leaderboard.map((player, index) => (
            <LeaderboardRow
              key={player.id}
              rank={index + 1}
              player={player}
              isCurrentPlayer={player.id === playerId}
              pointsDelta={0}
            />
          ))}
        </ul>
      </section>

      {nextRound ? (
        <section className="rounded-2xl border border-quiz-amber/30 bg-quiz-amber/5 p-5 text-center">
          <p className="text-sm text-quiz-muted">Up next</p>
          <p className="mt-1 font-serif text-xl text-white">{nextRound.name}</p>
          <p className="mt-1 text-sm text-quiz-muted">
            {nextFormatLabel} · {nextRound.questionCount} questions
          </p>
        </section>
      ) : null}

      <section className="space-y-3 pb-4 text-center">
        {isHost ? (
          <>
            <button
              type="button"
              onClick={onContinue}
              disabled={isAdvancing}
              className="quiz-btn-primary w-full sm:w-auto"
            >
              {isAdvancing
                ? "Starting..."
                : nextRound
                  ? `Start Round ${roundNumber + 1} →`
                  : "Continue →"}
            </button>
            <p className="text-xs text-quiz-muted">(only you can see this)</p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-quiz-muted">
              Waiting for host to start the next round...
            </p>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
