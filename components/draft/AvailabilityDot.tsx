type Band = "green" | "amber" | "red";

type Props = {
  score: number;
  band?: Band;
  className?: string;
};

function bandFromScore(score: number): Band {
  if (score >= 75) return "green";
  if (score >= 40) return "amber";
  return "red";
}

const BAND_STYLES: Record<Band, string> = {
  green: "bg-accent",
  amber: "bg-warning",
  red: "bg-destructive",
};

const BAND_LABELS: Record<Band, string> = {
  green: "Likely to play",
  amber: "Fitness doubt",
  red: "Unlikely to play",
};

/** Small status dot for a 0-100 availability score. Colour alone never
 * carries the meaning - band + score are always in the accessible label. */
export function AvailabilityDot({ score, band, className }: Props) {
  const resolved = band ?? bandFromScore(score);
  return (
    <span
      role="img"
      aria-label={`${BAND_LABELS[resolved]} — availability score ${score} of 100`}
      title={`${BAND_LABELS[resolved]} (${score}/100)`}
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${BAND_STYLES[resolved]} ${className ?? ""}`}
    />
  );
}
