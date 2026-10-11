import { CoverFrame, amber, line } from "./CoverFrame";

export function WardrobeCover() {
  return (
    <CoverFrame>
      <g className="cover-garment cover-garment-a">
        <path d="M118 48 L140 36 L162 48 L176 70 L160 78 L156 150 L124 150 L120 78 L104 70 Z" stroke={line} />
        <path d="M126 158 H154 L160 186 H120 Z" stroke={line} />
        <path d="M124 188 H144 M156 188 H176" stroke={line} />
      </g>
      <g className="cover-garment cover-garment-b">
        <path d="M108 52 H172 L166 150 H114 Z" stroke={line} />
        <path d="M120 158 H160 L154 186 H126 Z" stroke={line} />
        <path d="M118 188 H140 M158 188 H180" stroke={line} />
      </g>
      <rect className="cover-pulse" x="196" y="86" width="78" height="28" rx="14" fill={amber} />
    </CoverFrame>
  );
}
