"use client";

import { useCallback, useRef, useState } from "react";

import { ALLOWED_REACTIONS } from "@/lib/quiz/types";

interface ReactionBarProps {
  gameId: string;
  playerId: string;
}

const COOLDOWN_MS = 2000;

export function ReactionBar({ gameId, playerId }: ReactionBarProps) {
  const [cooldown, setCooldown] = useState(false);
  const [pressedEmoji, setPressedEmoji] = useState<string | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendReaction = useCallback(
    async (emoji: string) => {
      if (cooldown) {
        return;
      }

      setPressedEmoji(emoji);
      setCooldown(true);

      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }

      pressTimerRef.current = setTimeout(() => {
        setPressedEmoji(null);
      }, 200);

      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }

      cooldownTimerRef.current = setTimeout(() => {
        setCooldown(false);
      }, COOLDOWN_MS);

      try {
        await fetch("/api/quiz/react", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId, playerId, emoji }),
        });
      } catch {
        // Reactions are best-effort — no UI error needed
      }
    },
    [cooldown, gameId, playerId],
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-quiz-border bg-quiz-bg/95 px-3 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] md:bottom-8 md:left-auto md:right-4 md:w-auto md:rounded-2xl md:border md:px-4 md:py-3 md:shadow-lg"
      aria-label="Reaction bar"
    >
      <div className="mx-auto flex max-w-md items-center justify-center gap-2 md:max-w-none md:flex-col">
        {ALLOWED_REACTIONS.map((emoji) => {
          const isPressed = pressedEmoji === emoji;

          return (
            <button
              key={emoji}
              type="button"
              disabled={cooldown}
              onClick={() => void sendReaction(emoji)}
              className={`flex h-14 w-14 items-center justify-center rounded-xl bg-quiz-surface text-2xl transition-transform duration-150 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 md:h-12 md:w-12 ${
                isPressed ? "scale-125" : "scale-100 hover:scale-110"
              }`}
              aria-label={`React with ${emoji}`}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}
