type Props = {
  opponent: string;
  isHome: boolean;
  difficulty: number; // 1 (easiest) .. 5 (hardest)
  className?: string;
  postponed?: boolean;
};

const DIFFICULTY_STYLES: Record<number, string> = {
  1: "border-accent text-accent",
  2: "border-accent text-accent",
  3: "border-border-strong text-secondary",
  4: "border-warning text-warning",
  5: "border-destructive text-destructive",
};

/**
 * Fixture difficulty chip. Colour is never the only signal - the numeral is
 * always printed, so the 1-5 scale reads without relying on red/green.
 */
export function FdrChip({ opponent, isHome, difficulty, className, postponed }: Props) {
  const style = DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES[3];
  return (
    <span
      title={`${postponed ? "Provisional - " : ""}${isHome ? "Home" : "Away"} vs ${opponent} - difficulty ${difficulty} of 5`}
      className={`inline-flex items-center gap-1 rounded border bg-raised px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${style} ${className ?? ""}`}
    >
      <span>{opponent}</span>
      <span aria-hidden="true" className="opacity-70">
        {isHome ? "H" : "A"}
      </span>
      <span aria-hidden="true" className="font-bold">
        {difficulty}
      </span>
      {postponed ? (
        <span className="opacity-70" aria-label="kickoff not set">
          P
        </span>
      ) : null}
    </span>
  );
}
