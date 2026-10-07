type StatusBadgeProps = {
  variant?: "live" | "soon" | "note";
  children: string;
  className?: string;
};

const dots = {
  live: "bg-status-live studio-pulse",
  soon: "bg-status-soon",
  note: "bg-studio-faint",
} as const;

export function StatusBadge({
  variant = "note",
  children,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-6 items-center gap-2 rounded-full border border-studio-border bg-studio-surface-2 px-2.5 py-1 type-label text-studio-text ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${dots[variant]}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
