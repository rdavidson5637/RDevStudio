import Link from "next/link";
import type { Chip, Player } from "@/lib/analyser/data/types";

export const POS: Record<number, string> = { 1: "GK", 2: "DEF", 3: "MID", 4: "FWD" };

export function Dot({ score, band }: { score: number; band: "green" | "amber" | "red" }) {
  const label = band === "green" ? "fit" : band === "amber" ? "doubt" : "unlikely to play";
  return <span className="dot" data-band={band} role="img" aria-label={`${score} out of 100, ${label}`} />;
}

export function Fdr({ chip }: { chip: Chip }) {
  const label = chip.provisional
    ? `${chip.opponent} ${chip.side}, difficulty ${chip.fdr}, kickoff not confirmed`
    : `${chip.opponent} ${chip.side}, difficulty ${chip.fdr}`;
  return (
    <span className="fdr nums" data-d={chip.fdr} title={label}>
      <span>{chip.fdr}</span>
      {chip.opponent} {chip.side}
      {chip.provisional ? "*" : ""}
    </span>
  );
}

export function Cells({ cells }: { cells: { event: number; chips: Chip[] }[] }) {
  return (
    <span style={{ display: "inline-flex", gap: "0.25rem", flexWrap: "wrap" }}>
      {cells.map((cell) =>
        cell.chips.length === 0 ? (
          <span key={cell.event} className="blank" title={`Gameweek ${cell.event}, no fixture`}>
            Blank
          </span>
        ) : (
          <span key={cell.event} style={{ display: "inline-flex", flexDirection: "column", gap: "0.15rem" }}>
            {cell.chips.map((chip, index) => (
              <Fdr key={`${chip.opponent}-${index}`} chip={chip} />
            ))}
          </span>
        ),
      )}
    </span>
  );
}

export function Minutes({ values }: { values: number[] }) {
  return (
    <svg className="mins" viewBox="0 0 80 28" role="img" aria-label={`Minutes ${values.join(", ")}`}>
      {values.map((value, index) => {
        const height = Math.max(1, (value / 90) * 26);
        return <rect key={index} x={index * 20 + 2} y={28 - height} width="14" height={height} fill="currentColor" />;
      })}
    </svg>
  );
}

export function PlayerLink({ player }: { player: Pick<Player, "id" | "name" | "team" | "position"> }) {
  return (
    <Link href={`/draft/player/${player.id}`}>
      {player.name}
      <span className="t-label soft"> {player.team} {POS[player.position]}</span>
    </Link>
  );
}

export function relativeTime(iso: string | null) {
  if (!iso) return "not synced";
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 36) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} days ago`;
}
