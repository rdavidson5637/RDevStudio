"use client";

import { useState } from "react";

import { POINTS_BASE } from "@/lib/quiz/scoring";

interface ScorePopupProps {
  points: number;
  isBonus?: boolean;
}

export function ScorePopup({ points, isBonus = false }: ScorePopupProps) {
  const [visible, setVisible] = useState(true);
  const speedBonus = isBonus ? points - POINTS_BASE : 0;

  if (!visible) {
    return null;
  }

  return (
    <div
      className="score-popup-float pointer-events-none fixed left-1/2 top-24 z-50 text-center"
      onAnimationEnd={() => setVisible(false)}
    >
      <p className="text-3xl font-bold text-white">+{points}</p>
      {isBonus && speedBonus > 0 ? (
        <p className="mt-1 text-sm font-medium text-quiz-amber">
          + {speedBonus} speed bonus
        </p>
      ) : null}
    </div>
  );
}
