import Link from "next/link";
import { AvailabilityDot } from "./AvailabilityDot";

const POSITION_LABELS: Record<number, string> = { 1: "GK", 2: "DEF", 3: "MID", 4: "FWD" };

type Props = {
  playerId: number;
  name: string;
  teamShortName: string;
  position: number;
  availabilityScore: number;
  projectedPoints: number | null;
  flagged?: boolean;
  children?: React.ReactNode;
  className?: string;
};

/** One player line: dot, name, team, position, projected points, plus
 * whatever extra columns the caller slots in after. */
export function PlayerRow({
  playerId,
  name,
  teamShortName,
  position,
  availabilityScore,
  projectedPoints,
  flagged,
  children,
  className,
}: Props) {
  return (
    <Link
      href={`/draft/player/${playerId}`}
      className={`flex items-center gap-3 border-b border-border px-2 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-accent-light ${
        flagged ? "border-l-2 border-l-destructive" : ""
      } ${className ?? ""}`}
    >
      <AvailabilityDot score={availabilityScore} />
      <span className="min-w-0 flex-1 truncate font-medium text-primary">{name}</span>
      <span className="shell-label w-10 shrink-0 text-secondary">{teamShortName}</span>
      <span className="shell-label w-8 shrink-0 text-secondary">{POSITION_LABELS[position] ?? "—"}</span>
      <span className="w-12 shrink-0 text-right tabular-nums text-primary">
        {projectedPoints != null ? projectedPoints.toFixed(1) : "—"}
      </span>
      {children}
    </Link>
  );
}
