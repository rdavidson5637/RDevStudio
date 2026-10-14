import { CoverFrame, kit, line } from "./CoverFrame";

const CHIPS = [
  [36, 36],
  [36, 78],
  [36, 120],
  [36, 162],
  [118, 36],
  [118, 78],
  [118, 120],
  [118, 162],
  [200, 48],
  [200, 96],
  [200, 144],
];

export function DraftAnalyserCover() {
  return (
    <CoverFrame>
      {CHIPS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="64" height="22" rx="11" stroke={line} />
      ))}
      <path
        className="cover-draw"
        d="M40 150 C80 150 90 70 140 80 C190 90 200 40 280 36"
        stroke={kit}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </CoverFrame>
  );
}
