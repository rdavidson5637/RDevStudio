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
    <div className="mb-meta gap-x-4 gap-y-2 text-[length:var(--mb-text-sm)]">
      <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-bold text-[var(--mb-ink)]">
        <span>Carrickfergus, NI</span>
        <span aria-hidden="true" className="mb-meta-sep">
          /
        </span>
        <span
          className="inline-block min-w-[9ch] tabular-nums font-normal text-[var(--mb-muted)]"
          suppressHydrationWarning
        >
          {time} local
        </span>
      </span>

      <span
        aria-hidden="true"
        className="hidden h-3 w-px bg-[var(--mb-line-strong)] sm:inline-block"
      />

      <span className="font-bold text-[var(--mb-link)]">Open to new projects</span>
    </div>
  );
}
