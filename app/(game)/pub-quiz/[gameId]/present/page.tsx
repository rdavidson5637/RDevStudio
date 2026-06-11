"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { JoinQrCode } from "@/components/quiz/JoinQrCode";
import { LeaderboardRow } from "@/components/quiz/LeaderboardRow";
import { QuestionImage } from "@/components/quiz/QuestionImage";
import { getRemainingSeconds } from "@/lib/quiz/client-state";
import type { PublicGameState } from "@/lib/quiz/public-state";
import { getRoundFormatBadge } from "@/lib/quiz/round-badges";
import { getChannel } from "@/lib/quiz/pusher-client";
import type { GameEventMap } from "@/lib/quiz/types";

export default function PresenterPage() {
  const params = useParams();
  const gameId = (params.gameId as string).toUpperCase();
  const [state, setState] = useState<PublicGameState | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const joinUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/pub-quiz?join=${gameId}`
      : `/pub-quiz?join=${gameId}`;

  useEffect(() => {
    async function loadState() {
      const response = await fetch(
        `/api/quiz/state?gameId=${encodeURIComponent(gameId)}`
      );
      const data = await response.json();

      if (response.ok && data.state) {
        setState(data.state);
      } else {
        setError(data.error ?? "Game not found");
      }
    }

    void loadState();
  }, [gameId]);

  useEffect(() => {
    const channel = getChannel(gameId);

    if (!channel) {
      return;
    }

    const refresh = async () => {
      const response = await fetch(
        `/api/quiz/state?gameId=${encodeURIComponent(gameId)}`
      );
      const data = await response.json();

      if (response.ok && data.state) {
        setState(data.state);
      }
    };

    const events: Array<keyof GameEventMap> = [
      "game:player-joined",
      "game:started",
      "game:question",
      "game:reveal",
      "game:round-break",
      "game:round-started",
      "game:finished",
      "game:answer-submitted",
    ];

    for (const event of events) {
      channel.bind(event, () => void refresh());
    }

    return () => {
      for (const event of events) {
        channel.unbind(event);
      }
    };
  }, [gameId]);

  useEffect(() => {
    if (!state?.questionStartedAt || !state.timeLimitMs) {
      return;
    }

    const tick = () => {
      setTimeRemaining(
        getRemainingSeconds(state.questionStartedAt!, state.timeLimitMs)
      );
    };

    tick();
    const interval = window.setInterval(tick, 500);

    return () => window.clearInterval(interval);
  }, [state?.questionStartedAt, state?.timeLimitMs, state?.status]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 text-center">
        <p className="text-quiz-danger">{error}</p>
      </main>
    );
  }

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-quiz-muted">Loading presenter view...</p>
      </main>
    );
  }

  const formatBadge = getRoundFormatBadge(
    state.currentRound?.format ?? state.currentQuestion?.format
  );

  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="quiz-kicker">Presenter view</p>
            <h1 className="font-serif text-3xl text-quiz-ink sm:text-4xl">
              {gameId}
            </h1>
          </div>
          <Link
            href={`/pub-quiz/${gameId}`}
            className="quiz-btn-secondary text-sm"
          >
            Back to game
          </Link>
        </header>

        {state.status === "lobby" ? (
          <section className="quiz-card flex flex-col items-center gap-6 p-10 text-center">
            <p className="font-serif text-4xl text-quiz-ink">Waiting to start</p>
            <p className="font-mono text-5xl font-bold tracking-[0.2em] text-quiz-amber">
              {gameId}
            </p>
            <JoinQrCode joinUrl={joinUrl} size={200} />
            <p className="text-quiz-muted">Scan to join · {state.players.length} players</p>
          </section>
        ) : null}

        {state.status === "question" && state.currentQuestion ? (
          <section className="quiz-card space-y-6 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-quiz-muted">
                {state.currentRound?.name ?? "Question"}
              </p>
              <div className="flex items-center gap-3">
                {formatBadge ? (
                  <span
                    className={`rounded-full border px-3 py-1 text-sm ${formatBadge.className}`}
                  >
                    {formatBadge.label}
                  </span>
                ) : null}
                <span className="font-mono text-3xl font-bold text-quiz-amber">
                  {timeRemaining}s
                </span>
              </div>
            </div>

            {state.currentQuestion.imageUrl ? (
              <QuestionImage
                imageUrl={state.currentQuestion.imageUrl}
                imageAlt={
                  state.currentQuestion.imageAlt ?? "Picture round image"
                }
                prominent
              />
            ) : null}

            <h2 className="text-center font-serif text-3xl leading-tight text-quiz-ink sm:text-5xl">
              {state.currentQuestion.text}
            </h2>

            {state.currentQuestion.options?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {state.currentQuestion.options.map((option, index) => (
                  <div
                    key={option}
                    className="rounded-xl border border-quiz-border bg-quiz-bg-elevated px-4 py-3 text-lg text-quiz-ink"
                  >
                    <span className="mr-2 font-bold text-quiz-amber">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </div>
                ))}
              </div>
            ) : null}

            <p className="text-center text-sm text-quiz-muted">
              {state.answeredCount ?? 0} / {state.players.length} answered
            </p>
          </section>
        ) : null}

        {state.status === "reveal" && state.reveal ? (
          <section className="quiz-card space-y-4 p-8 text-center sm:p-10">
            <p className="text-sm text-quiz-muted">The answer was</p>
            <p className="font-serif text-5xl font-bold text-quiz-amber">
              {state.reveal.correctAnswer}
            </p>
          </section>
        ) : null}

        {state.status === "finished" ? (
          <section className="quiz-card p-8 text-center">
            <p className="font-serif text-4xl text-quiz-ink">Final results</p>
          </section>
        ) : null}

        <section className="quiz-card p-6">
          <h3 className="mb-4 text-center text-sm font-medium text-quiz-muted">
            Leaderboard
          </h3>
          <ul className="space-y-2">
            {state.players.map((player, index) => (
              <LeaderboardRow
                key={player.id}
                rank={index + 1}
                player={player}
                isCurrentPlayer={false}
                pointsDelta={0}
                showDelta={false}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
