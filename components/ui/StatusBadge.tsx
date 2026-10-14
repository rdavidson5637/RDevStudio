type StatusBadgeProps = {
  variant?: "live" | "soon" | "note";
  children: string;
  className?: string;
};

export function StatusBadge({ children, className = "" }: StatusBadgeProps) {
  return <span className={`text-sm font-bold text-studio-muted ${className}`}>{children}</span>;
}
