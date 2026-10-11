import { CoverFrame, amber, line } from "./CoverFrame";

const FRETS = [56, 108, 160, 212, 264];
const STRINGS = [48, 70, 92, 114, 136, 158];
const NOTES = [
  { x: 56, y: 48, root: true, delay: "0ms" },
  { x: 108, y: 92, root: false, delay: "80ms" },
  { x: 160, y: 70, root: false, delay: "160ms" },
  { x: 160, y: 136, root: true, delay: "240ms" },
  { x: 212, y: 114, root: false, delay: "320ms" },
  { x: 264, y: 48, root: true, delay: "400ms" },
];

export function GuitarLabCover() {
  return (
    <CoverFrame>
      {STRINGS.map((y) => (
        <line key={y} x1="36" y1={y} x2="284" y2={y} stroke={line} />
      ))}
      {FRETS.map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="166" stroke={line} />
      ))}
      {NOTES.map((note) => (
        <circle
          key={`${note.x}-${note.y}`}
          className="cover-note"
          cx={note.x}
          cy={note.y}
          r={note.root ? 6 : 4.5}
          fill={note.root ? amber : "rgba(255,255,255,0.75)"}
          style={{ animationDelay: note.delay }}
        />
      ))}
    </CoverFrame>
  );
}
