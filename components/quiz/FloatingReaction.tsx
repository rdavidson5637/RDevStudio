"use client";

import { useMemo } from "react";

import type { ReactionEvent } from "@/lib/quiz/types";

interface FloatingReactionProps {
  reaction: ReactionEvent;
  onComplete: () => void;
}

export function FloatingReaction({
  reaction,
  onComplete,
}: FloatingReactionProps) {
  const horizontalPosition = useMemo(
    () => 10 + Math.random() * 80,
    [reaction.id]
  );

  return (
    <div
      className="pointer-events-none fixed bottom-24 z-50 -translate-x-1/2"
      style={{ left: `${horizontalPosition}%` }}
    >
      <div className="reaction-float flex flex-col items-center" onAnimationEnd={onComplete}>
        <span className="text-5xl leading-none">{reaction.emoji}</span>
        <div
          className="mt-1 flex h-8 w-8 items-center justify-center rounded-full text-base"
          style={{ backgroundColor: reaction.playerColour }}
        >
          {reaction.playerAvatar}
        </div>
        <span className="mt-1 max-w-[6rem] truncate text-xs font-medium text-white drop-shadow">
          {reaction.playerName}
        </span>
      </div>
    </div>
  );
}
