type Props = {
  label: string;
  value: string | number;
  delta?: { value: string; direction: "up" | "down" | "flat" };
  className?: string;
};

const DELTA_STYLES = {
  up: "text-accent",
  down: "text-destructive",
  flat: "text-secondary",
};

const DELTA_ARROW = { up: "▲", down: "▼", flat: "-" };

export function StatTile({ label, value, delta, className }: Props) {
  return (
    <div className={`rounded-lg border border-border bg-raised px-4 py-3 ${className ?? ""}`}>
      <p className="shell-label text-secondary">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums text-primary">{value}</p>
      {delta ? (
        <p className={`mt-1 font-mono text-[11px] tabular-nums ${DELTA_STYLES[delta.direction]}`}>
          {DELTA_ARROW[delta.direction]} {delta.value}
        </p>
      ) : null}
    </div>
  );
}
