import Link from "next/link";
import type { ReportedNewsItem } from "@/lib/draft/news/queries";

const SIGNAL_LABEL: Record<ReportedNewsItem["signal"], string> = {
  trained: "Trained",
  missed_training: "Missed training",
  doubt: "Doubt",
  ruled_out: "Ruled out",
  returned: "Returned",
  rested: "Rested",
};

function formatWhen(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ReportedNews({
  items,
  heading = "Reported - not confirmed",
}: {
  items: ReportedNewsItem[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section>
      <p className="shell-label mb-3 text-accent">{heading}</p>
      <p className="mb-3 text-sm text-secondary">
        Club-feed extracts only. They never overwrite official FPL status.
      </p>
      <ul className="divide-y divide-border rounded-lg border border-border bg-raised">
        {items.map((item) => (
          <li key={`${item.playerId}-${item.sourceUrl}-${item.publishedAt}`} className="px-4 py-3 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              {item.webName ? (
                <Link href={`/draft/player/${item.playerId}`} className="font-medium text-primary hover:text-accent">
                  {item.webName}
                </Link>
              ) : (
                <span className="font-medium text-primary">{SIGNAL_LABEL[item.signal]}</span>
              )}
              <span className="shell-label text-secondary">
                {SIGNAL_LABEL[item.signal]}
                {item.publishedAt ? ` · ${formatWhen(item.publishedAt)}` : ""}
              </span>
            </div>
            {item.quote ? <p className="mt-1 text-secondary">{item.quote}</p> : null}
            {item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-accent hover:underline"
              >
                {item.sourceName || "Source"}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
