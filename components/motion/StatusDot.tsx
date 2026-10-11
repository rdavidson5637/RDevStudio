type StatusDotProps = {
  status: "live" | "soon";
  label?: string;
};

export function StatusDot({ status, label }: StatusDotProps) {
  const text = label ?? (status === "live" ? "LIVE" : "SOON");
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative inline-flex h-2 w-2" aria-hidden="true">
        {status === "live" ? <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-amber" /> : null}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${status === "live" ? "bg-amber" : "bg-studio-faint"}`}
        />
      </span>
      <span className="type-label text-studio-muted">{text}</span>
    </span>
  );
}
