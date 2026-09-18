type Props = { timestamp: string | null; className?: string };

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.round(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

/** Relative "data as of" timestamp. The absolute time always lives in the
 * title attribute, so hovering (or a screen reader's title lookup) gives
 * the precise moment rather than a fuzzy label. */
export function DataFreshness({ timestamp, className }: Props) {
  if (!timestamp) {
    return (
      <span className={`shell-label text-secondary ${className ?? ""}`}>
        Data as of - waiting for first sync
      </span>
    );
  }
  return (
    <span
      className={`shell-label text-secondary ${className ?? ""}`}
      title={new Date(timestamp).toLocaleString("en-GB")}
    >
      Data as of {relativeTime(timestamp)}
    </span>
  );
}
