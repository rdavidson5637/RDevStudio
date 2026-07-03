import { getScoreStyle } from "@/lib/toolkit-audit/scoring";

type ScoreRingProps = {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  className = "",
}: ScoreRingProps) {
  const style = getScoreStyle(score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Score ${score} out of 100`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${style.ringClass} transition-all duration-slow ease-out motion-reduce:transition-none`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-display text-3xl leading-none ${style.textClass}`}
        >
          {score}
        </span>
        <span className="mt-1 shell-label text-tertiary">/ 100</span>
      </div>
    </div>
  );
}
