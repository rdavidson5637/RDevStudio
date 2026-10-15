import { chalk, CoverFrame, faint, kit } from "./CoverFrame";

const PINS = [
  { x: 70, y: 70, hot: false },
  { x: 140, y: 120, hot: false },
  { x: 190, y: 64, hot: true },
  { x: 230, y: 130, hot: false },
  { x: 100, y: 150, hot: false },
];

function glassPath(x: number, y: number) {
  return `M${x - 7} ${y - 18} L${x + 7} ${y - 18} L${x + 4.5} ${y - 4} L${x + 6} ${y - 1} L${x - 6} ${y - 1} L${x - 4.5} ${y - 4} Z`;
}

export function StoutFinderCover() {
  const dots = [];
  for (let x = 40; x <= 280; x += 24) {
    for (let y = 28; y <= 176; y += 24) {
      dots.push(`${x}-${y}`);
    }
  }
  return (
    <CoverFrame>
      {dots.map((id) => {
        const [x, y] = id.split("-").map(Number);
        return <circle key={id} cx={x} cy={y} r="1.2" fill={faint} />;
      })}
      {PINS.map((pin) => (
        <g key={`${pin.x}-${pin.y}`}>
          {pin.hot ? <circle className="cover-ripple" cx={pin.x} cy={pin.y - 10} r="10" stroke={kit} /> : null}
          <path
            d={glassPath(pin.x, pin.y)}
            fill={pin.hot ? kit : "none"}
            stroke={pin.hot ? kit : chalk}
            strokeWidth="1.4"
          />
          {pin.hot ? <ellipse cx={pin.x} cy={pin.y - 18} rx="7" ry="2" fill={chalk} /> : null}
        </g>
      ))}
    </CoverFrame>
  );
}
