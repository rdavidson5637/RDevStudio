"use client";

import { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
  durationSeconds: number;
  onExpire: () => void;
  isActive: boolean;
  /** Server-synced remaining time — overrides duration when provided */
  initialRemainingSeconds?: number;
}

const SIZE = 64;
const STROKE = 5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getRingColor(progress: number): string {
  if (progress <= 0.25) {
    return "#EF4444";
  }
  if (progress <= 0.5) {
    return "#F59E0B";
  }
  return "#22C55E";
}

export function CountdownTimer({
  durationSeconds,
  onExpire,
  isActive,
  initialRemainingSeconds,
}: CountdownTimerProps) {
  const startRemaining = initialRemainingSeconds ?? durationSeconds;

  const [timeLeft, setTimeLeft] = useState(startRemaining);
  const hasExpiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  onExpireRef.current = onExpire;

  useEffect(() => {
    setTimeLeft(initialRemainingSeconds ?? durationSeconds);
    hasExpiredRef.current = false;
  }, [durationSeconds, initialRemainingSeconds]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            onExpireRef.current();
          }
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isActive, durationSeconds, initialRemainingSeconds]);

  const progress = durationSeconds > 0 ? timeLeft / durationSeconds : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const ringColor = getRingColor(progress);

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg width={SIZE} height={SIZE} className="-rotate-90" aria-hidden="true">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#2A2A38"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={ringColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke,stroke-dashoffset] duration-1000 ease-linear"
        />
      </svg>
      <span
        className="absolute font-mono text-lg font-bold tabular-nums text-white"
        aria-live="polite"
        aria-label={`${timeLeft} seconds remaining`}
      >
        {timeLeft}
      </span>
    </div>
  );
}
