"use client";

import { useState } from "react";

import { PlayerList } from "@/components/quiz/PlayerList";
import { getDifficultyLabel } from "@/lib/quiz/difficulty";
import type { Player, Round } from "@/lib/quiz/types";
import type { PublicQuestion } from "@/components/quiz/QuestionScreen";

type HostView = "lobby" | "question" | "reveal" | "round-break" | "finished";

interface HostPanelProps {
  gameId: string;
  hostId: string;
  isHost: boolean;
  view: HostView;
  players: Player[];
  currentQuestion: PublicQuestion | null;
  currentRound: Round | null;
  questionIndex: number;
  totalQuestions: number;
  questionInRound?: number;
  onSkipQuestion: () => Promise<void>;
  onKickPlayer: (playerId: string) => Promise<void>;
  isSkippingQuestion?: boolean;
}

export function HostPanel({
  hostId,
  isHost,
  view,
  players,
  currentQuestion,
  currentRound,
  questionIndex,
  totalQuestions,
  questionInRound,
  onSkipQuestion,
  onKickPlayer,
  isSkippingQuestion = false,
}: HostPanelProps) {
  const [open, setOpen] = useState(false);
  const [confirmSkip, setConfirmSkip] = useState(false);

  if (!isHost) {
    return null;
  }

  const questionsLeft = totalQuestions - questionIndex;
  const showKickList =
    view === "lobby" || view === "reveal" || view === "round-break";
  const showSkip = view === "question" && currentQuestion;

  async function handleConfirmSkip() {
    await onSkipQuestion();
    setConfirmSkip(false);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed right-4 top-4 z-50 rounded-full border border-quiz-border bg-quiz-surface/95 px-3.5 py-1.5 text-xs font-medium text-quiz-muted shadow-card backdrop-blur-sm transition-colors hover:border-quiz-amber/40 hover:text-quiz-ink"
        aria-expanded={open}
        aria-controls="host-panel"
      >
        Host
      </button>

      {open ? (
        <div
          id="host-panel"
          className="fixed inset-x-0 top-0 z-40 max-h-[min(70vh,32rem)] overflow-y-auto border-b border-quiz-border/60 bg-quiz-bg/95 px-4 pb-5 pt-14 shadow-2xl backdrop-blur-md"
        >
          <div className="mx-auto w-full max-w-2xl space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Host controls</p>
                <p className="text-xs text-quiz-muted">Only you see this</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-quiz-muted hover:text-white"
              >
                Close
              </button>
            </div>

            {currentRound ? (
              <div className="rounded-xl border border-quiz-border/60 bg-quiz-surface/50 px-4 py-3 text-sm">
                <p className="font-medium text-white">{currentRound.name}</p>
                <p className="mt-1 text-xs text-quiz-muted">
                  {questionsLeft} question{questionsLeft === 1 ? "" : "s"} remaining
                  {questionInRound && currentRound.questionCount
                    ? ` · Q${questionInRound} of ${currentRound.questionCount} this round`
                    : ""}
                </p>
              </div>
            ) : null}

            {showSkip && currentQuestion ? (
              <div className="rounded-xl border border-quiz-border/60 bg-quiz-surface/50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                  Current question
                </p>
                <p className="mt-1 text-sm text-white">
                  #{questionIndex + 1}
                  {currentRound
                    ? ` · ${getDifficultyLabel(currentRound.difficulty)}`
                    : ""}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-quiz-muted">
                  {currentQuestion.text}
                </p>

                {confirmSkip ? (
                  <div className="mt-3 space-y-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                    <p className="text-xs text-red-200">
                      Skip this question? (No points awarded)
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => void handleConfirmSkip()}
                        disabled={isSkippingQuestion}
                        className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/30 disabled:opacity-50"
                      >
                        {isSkippingQuestion ? "Skipping..." : "Confirm skip"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmSkip(false)}
                        className="rounded-lg px-3 py-1.5 text-xs text-quiz-muted hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmSkip(true)}
                    className="mt-3 text-xs text-quiz-muted underline-offset-2 hover:text-red-300 hover:underline"
                  >
                    Skip question
                  </button>
                )}
              </div>
            ) : null}

            {showKickList ? (
              <div className="rounded-xl border border-quiz-border/60 bg-quiz-surface/50 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-quiz-muted">
                  Players
                </p>
                <PlayerList
                  players={players}
                  hostId={hostId}
                  isHost
                  onKickPlayer={onKickPlayer}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
