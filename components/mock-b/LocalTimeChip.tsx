"use client";

import { useEffect, useState } from "react";

function formatCarrickTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function LocalTimeChip() {
  const [time, setTime] = useState<string>("--:--");

  useEffect(() => {
    const update = () => setTime(formatCarrickTime(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mb-sticker bg-[var(--mb-paper)] text-[var(--mb-ink)]">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="h-3.5 w-3.5 text-[var(--mb-terracotta)]"
        >
          <path
            d="M8 14.2S3 9.7 3 6.2a5 5 0 1 1 10 0c0 3.5-5 8-5 8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="6.2" r="1.6" fill="currentColor" />
        </svg>
        <span>Carrickfergus, NI</span>
        <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
          /
        </span>
        <span className="tabular-nums text-[var(--mb-ink-soft)]" suppressHydrationWarning>
          {time} local
        </span>
      </span>

      <span className="mb-sticker mb-sticker-tilt-right mb-sticker-wobble bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)] border-[var(--mb-seaglass)]/35">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="mb-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--mb-seaglass)]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--mb-seaglass)]" />
        </span>
        <span>Open to new projects</span>
      </span>
    </div>
  );
}
