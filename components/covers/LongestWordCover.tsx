import { CoverFrame, amber, line } from "./CoverFrame";

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
        const onPath = [0, 1, 5, 6, 7].includes(index);
        return (
          <g key={letter + index}>
            <rect x={x} y={y} width="40" height="32" rx="4" stroke={line} fill={onPath ? "rgba(245,158,11,0.12)" : "transparent"} />
            <text
              x={x + 20}
              y={y + 21}
              textAnchor="middle"
              fill={onPath ? amber : "rgba(255,255,255,0.8)"}
              fontFamily="var(--font-studio-mono), ui-monospace, monospace"
              fontSize="14"
            >
              {letter}
            </text>
          </g>
        );
      })}
      <path className="cover-draw" d={PATH} stroke={amber} strokeWidth="2" strokeLinecap="round" />
    </CoverFrame>
  );
}
