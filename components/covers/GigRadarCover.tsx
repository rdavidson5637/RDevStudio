import { chalk, CoverFrame, kit, line } from "./CoverFrame";

export function GigRadarCover() {
  return (
    <CoverFrame>
      <circle cx="160" cy="100" r="28" stroke={line} />
      <circle cx="160" cy="100" r="52" stroke={line} />
      <circle cx="160" cy="100" r="76" stroke={line} />
      <line x1="160" y1="24" x2="160" y2="176" stroke={line} />
      <line x1="84" y1="100" x2="236" y2="100" stroke={line} />
      <g className="cover-sweep">
        <path d="M160 100 L228 62 A76 76 0 0 0 160 24 Z" fill={chalk} opacity="0.12" />
        <path d="M160 100 L228 62" stroke={kit} strokeWidth="2" />
      </g>
      <circle cx="196" cy="78" r="3.5" fill={chalk} />
      <circle cx="124" cy="132" r="3.5" fill={chalk} />
      <circle cx="210" cy="124" r="3.5" fill={chalk} />
    </CoverFrame>
  );
}
