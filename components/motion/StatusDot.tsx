type StatusDotProps = {
  status: "live" | "soon";
  label?: string;
};

export function StatusDot({ status, label }: StatusDotProps) {
  const text = label ?? (status === "live" ? "Live" : "Soon");
  return <span className="text-sm text-studio-muted">{text}</span>;
}
