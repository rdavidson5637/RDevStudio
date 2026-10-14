import { CoverFrame, kit, faint } from "./CoverFrame";

const PINS = [
  { x: 70, y: 70, hot: false },
  { x: 140, y: 120, hot: false },
  { x: 190, y: 64, hot: true },
  { x: 230, y: 130, hot: false },
  { x: 100, y: 150, hot: false },
];

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
            d={`M${pin.x} ${pin.y} c0-12 16-12 16 0 c0 10-16 18-16 18 c0 0-16-8-16-18 c0-12 16-12 16 0z`}
            transform="translate(-8 -22)"
            fill={pin.hot ? kit : "rgba(255,255,255,0.55)"}
          />
        </g>
      ))}
    </CoverFrame>
  );
}
