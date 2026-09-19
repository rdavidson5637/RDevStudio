import Link from "next/link";
import type { TimelineEvent } from "@/lib/draft/timeline";

export function StatusTimeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-secondary">No status changes stored yet. They appear after the daily sync sees a change.</p>;
  }

  return (
    <ol className="divide-y divide-border rounded-lg border border-border bg-raised">
      {events.map((event) => (
        <li key={`${event.playerId}-${event.capturedAt}`} className="px-4 py-3 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Link href={`/draft/player/${event.playerId}`} className="font-medium text-primary hover:text-accent">
              {event.webName}
            </Link>
            <time className="shell-label text-secondary" dateTime={event.capturedAt}>
              {new Date(event.capturedAt).toLocaleString("en-GB", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              })}
            </time>
          </div>
          <p className="mt-1 tabular-nums text-secondary">
            Availability {event.fromScore ?? "-"} → {event.toScore}
            {event.status ? ` · ${event.status}` : ""}
          </p>
          {event.news ? <p className="mt-1 text-secondary">{event.news}</p> : null}
        </li>
      ))}
    </ol>
  );
}
