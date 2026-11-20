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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[var(--mb-muted)]">
      <span className="inline-flex items-center gap-2 text-[var(--mb-ink)]">
        <span className="font-semibold">Carrickfergus, NI</span>
        <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
          /
        </span>
        <span
          className="inline-block min-w-[9ch] tabular-nums text-[var(--mb-muted)]"
          suppressHydrationWarning
        >
          {time} local
        </span>
      </span>

      <span
        aria-hidden="true"
        className="hidden h-3 w-px bg-[var(--mb-line-strong)] sm:inline-block"
      />

      <span className="inline-flex items-center gap-2 font-semibold text-[var(--mb-link)]">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-[var(--mb-accent)]"
        />
        <span>Open to new projects</span>
      </span>
    </div>
  );
}
