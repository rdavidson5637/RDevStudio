"use client";

import { useState } from "react";

interface BuzzerButtonProps {
  gameId: string;
  playerId: string;
  disabled: boolean;
  youBuzzed: boolean;
  lockedOut: boolean;
  teamLockedOut?: boolean;
  onBuzzed?: () => void;
}

export function BuzzerButton({
  gameId,
  playerId,
  disabled,
  youBuzzed,
  lockedOut,
  teamLockedOut = false,
  onBuzzed,
}: BuzzerButtonProps) {
  const [pressing, setPressing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleBuzz() {
    if (disabled || youBuzzed || lockedOut || teamLockedOut || loading) {
      return;
    }

    setPressing(true);
    setLoading(true);

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }

    window.setTimeout(() => setPressing(false), 150);

    try {
      const response = await fetch("/api/quiz/buzz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, playerId }),
      });

      if (response.ok) {
        onBuzzed?.();
      }
    } finally {
      setLoading(false);
    }
  }

  if (youBuzzed) {
    return (
      <div className="flex min-h-[120px] w-full items-center justify-center rounded-2xl border-2 border-quiz-amber bg-quiz-amber/15 px-6 py-8 text-center">
        <p className="font-serif text-2xl font-bold text-quiz-amber sm:text-3xl">
          You buzzed! Answer out loud!
        </p>
      </div>
    );
  }

  if (teamLockedOut) {
    return (
      <div className="flex min-h-[120px] w-full items-center justify-center rounded-2xl border border-quiz-border bg-quiz-surface/50 px-6 py-8 text-center opacity-60">
        <p className="text-lg font-medium text-quiz-muted">Team locked out!</p>
      </div>
    );
  }

  if (lockedOut) {
    return (
      <div className="flex min-h-[120px] w-full items-center justify-center rounded-2xl border border-quiz-border bg-quiz-surface/50 px-6 py-8 text-center opacity-60">
        <p className="text-lg font-medium text-quiz-muted">
          Wrong buzz — can&apos;t buzz again
        </p>
      </div>
    );
  }

  if (disabled) {
    return (
      <div className="flex min-h-[120px] w-full items-center justify-center rounded-2xl border border-quiz-border bg-quiz-surface/50 px-6 py-8 text-center opacity-60">
        <p className="text-lg font-medium text-quiz-muted">Buzzed!</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void handleBuzz()}
      disabled={loading}
      className={`buzzer-glow flex min-h-[120px] w-full items-center justify-center rounded-2xl border-2 border-quiz-amber bg-quiz-bg px-6 py-8 transition-transform duration-150 hover:scale-[1.02] active:scale-95 disabled:opacity-70 ${
        pressing ? "scale-95 bg-quiz-amber text-quiz-bg" : "text-quiz-amber"
      }`}
    >
      <span className="font-serif text-4xl font-bold tracking-wide sm:text-5xl">
        {loading ? "..." : "BUZZ IN!"}
      </span>
    </button>
  );
}
