import { chalk, CoverFrame, kit, line } from "./CoverFrame";

const LETTERS = ["R", "A", "N", "D", "E", "V", "S", "T", "U", "O", "I", "L", "M", "C", "H", "Y"];
const PATH = "M78 58 L130 58 L130 98 L182 98 L234 98";

export function LongestWordCover() {
  return (
    <CoverFrame>
      {LETTERS.map((letter, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const x = 54 + col * 52;
        const y = 34 + row * 40;
        return (
          <g key={letter + index}>
            <rect x={x} y={y} width="40" height="32" rx="4" stroke={line} />
            <text
              x={x + 20}
              y={y + 22}
              textAnchor="middle"
              fill={chalk}
              fontFamily="var(--font-studio-display), sans-serif"
              fontWeight={800}
              fontSize="16"
            >
              {letter}
            </text>
          </g>
        );
      })}
      <path className="cover-draw" d={PATH} pathLength="1" stroke={kit} strokeWidth="2" strokeLinecap="round" />
    </CoverFrame>
  );
}
