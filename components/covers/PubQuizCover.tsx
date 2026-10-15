import { chalk, CoverFrame, faint, kit, line } from "./CoverFrame";

const PILLS = [
  { y: 78, hot: false },
  { y: 102, hot: true },
  { y: 126, hot: false },
  { y: 150, hot: false },
];

export function PubQuizCover() {
  return (
    <CoverFrame>
      <rect x="48" y="28" width="224" height="144" rx="12" stroke={line} fill="rgba(255,255,255,0.02)" />
      <rect x="68" y="46" width="120" height="8" rx="4" fill={faint} />
      <rect x="68" y="60" width="72" height="6" rx="3" fill={faint} />
      {PILLS.map((pill) => (
        <rect
          key={pill.y}
          className={pill.hot ? "cover-pulse" : undefined}
          x="68"
          y={pill.y}
          width="184"
          height="16"
          rx="8"
          fill={pill.hot ? kit : "transparent"}
          stroke={pill.hot ? kit : line}
        />
      ))}
      <text
        x="232"
        y="58"
        textAnchor="end"
        fill={chalk}
        fontFamily="var(--font-studio-display), sans-serif"
        fontWeight={800}
        fontSize="16"
      >
        ABCD
      </text>
    </CoverFrame>
  );
}
