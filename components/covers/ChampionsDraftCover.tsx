import { chalk, CoverFrame, kit, line } from "./CoverFrame";

const DOTS = [
  { x: 160, y: 168, dx: 0, dy: 0 },
  { x: 72, y: 142, dx: 0, dy: 2 },
  { x: 124, y: 150, dx: -6, dy: 2 },
  { x: 196, y: 150, dx: 6, dy: 2 },
  { x: 248, y: 142, dx: 0, dy: 2 },
  { x: 96, y: 100, dx: -28, dy: 6 },
  { x: 160, y: 108, dx: -28, dy: 0 },
  { x: 224, y: 100, dx: 28, dy: 6 },
  { x: 88, y: 48, dx: 36, dy: 52 },
  { x: 160, y: 36, dx: -24, dy: 8, hot: true },
  { x: 232, y: 48, dx: -36, dy: -4 },
];

export function ChampionsDraftCover() {
  return (
    <CoverFrame>
      <rect x="28" y="14" width="264" height="172" rx="8" stroke={line} />
      <line x1="28" y1="100" x2="292" y2="100" stroke={line} />
      <circle cx="160" cy="100" r="22" stroke={line} />
      <rect x="108" y="14" width="104" height="28" stroke={line} />
      <rect x="108" y="158" width="104" height="28" stroke={line} />
      {DOTS.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          className="cover-shift"
          cx={dot.x}
          cy={dot.y}
          r={dot.hot ? 5 : 4}
          fill={dot.hot ? kit : chalk}
          style={{ ["--dx" as string]: `${dot.dx}px`, ["--dy" as string]: `${dot.dy}px` }}
        />
      ))}
    </CoverFrame>
  );
}
