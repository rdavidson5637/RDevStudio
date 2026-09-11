"use client";

import { useEffect, useState } from "react";

type Props = { deadline: string | null; className?: string };

function formatCountdown(ms: number): string {
  if (ms <= 0) return "deadline passed";
  const totalMinutes = Math.floor(ms / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/** Live countdown to the next deadline. Renders a static placeholder on the
 * server and starts ticking after mount, so SSR output never disagrees with
 * the client (a countdown computed at render time would always mismatch by
 * the network round-trip). */
export function DeadlineCountdown({ deadline, className }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!deadline) {
    return <span className={`shell-label text-secondary ${className ?? ""}`}>Deadline — TBC</span>;
  }

  const deadlineMs = new Date(deadline).getTime();
  const label = now == null ? "…" : formatCountdown(deadlineMs - now);

  return (
    <span className={`shell-label text-accent ${className ?? ""}`} suppressHydrationWarning>
      Deadline in {label}
    </span>
  );
}
