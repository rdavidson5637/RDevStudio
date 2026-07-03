export type ScoreBand = "excellent" | "good" | "fair" | "poor";

export type ScoreStyle = {
  band: ScoreBand;
  label: string;
  textClass: string;
  ringClass: string;
  barClass: string;
  badgeClass: string;
};

export function getScoreBand(score: number): ScoreBand {
  if (score >= 90) return "excellent";
  if (score >= 75) return "good";
  if (score >= 55) return "fair";
  return "poor";
}

export function getScoreStyle(score: number): ScoreStyle {
  const band = getScoreBand(score);

  const styles: Record<ScoreBand, Omit<ScoreStyle, "band">> = {
    excellent: {
      label: "Excellent",
      textClass: "text-accent",
      ringClass: "stroke-accent",
      barClass: "bg-accent",
      badgeClass: "border-accent/40 bg-accent/10 text-accent",
    },
    good: {
      label: "Good",
      textClass: "text-primary",
      ringClass: "stroke-primary",
      barClass: "bg-primary",
      badgeClass: "border-border-strong bg-base text-primary",
    },
    fair: {
      label: "Needs work",
      textClass: "text-warning",
      ringClass: "stroke-warning",
      barClass: "bg-warning",
      badgeClass: "border-warning/20 bg-warning/5 text-warning",
    },
    poor: {
      label: "Poor",
      textClass: "text-destructive",
      ringClass: "stroke-destructive",
      barClass: "bg-destructive",
      badgeClass: "border-destructive/20 bg-destructive/5 text-destructive",
    },
  };

  return { band, ...styles[band] };
}

export function getScoreLetter(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
