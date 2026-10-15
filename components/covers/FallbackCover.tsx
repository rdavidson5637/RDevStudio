import { CoverFrame, kit, faint } from "./CoverFrame";

export function FallbackCover({ initial = "R" }: { initial?: string }) {
  const dots = [];
  for (let x = 36; x <= 284; x += 28) {
    for (let y = 24; y <= 176; y += 28) {
      dots.push(`${x}-${y}`);
    }
  }
  return (
    <CoverFrame>
      {dots.map((id) => {
        const [x, y] = id.split("-").map(Number);
        return <circle key={id} cx={x} cy={y} r="1.4" fill={faint} />;
      })}
      <text
        x="160"
        y="118"
        textAnchor="middle"
        fill={kit}
        fontFamily="var(--font-studio-display), sans-serif"
        fontWeight={800}
        fontSize="72"
      >
        {initial.slice(0, 1).toUpperCase()}
      </text>
    </CoverFrame>
  );
}
