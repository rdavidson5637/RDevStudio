import { CoverFrame, kit, line } from "./CoverFrame";

const DOTS = [
  [160, 168],
  [70, 132],
  [112, 140],
  [160, 146],
  [208, 140],
  [250, 132],
  [96, 108],
  [160, 114],
  [224, 108],
  [120, 82],
  [200, 82],
  [64, 48],
  [120, 40],
  [200, 40],
  [256, 48],
];

export function RugbyDraftCover() {
  return (
    <CoverFrame>
      <rect x="24" y="16" width="272" height="168" stroke={line} />
      <line x1="24" y1="48" x2="296" y2="48" stroke={line} />
      <line x1="24" y1="152" x2="296" y2="152" stroke={line} />
      <line x1="24" y1="100" x2="296" y2="100" stroke={line} strokeDasharray="4 6" />
      <path d="M148 16 V36 H172 V16" stroke={line} />
      <path d="M148 184 V164 H172 V184" stroke={line} />
      {DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="rgba(255,255,255,0.7)" />
      ))}
      <g className="cover-pass">
        <ellipse cx="78" cy="108" rx="7" ry="4.5" fill={kit} transform="rotate(-24 78 108)" />
      </g>
    </CoverFrame>
  );
}
