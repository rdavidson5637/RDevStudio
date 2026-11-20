import Image from "next/image";
import type { MockProject } from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

const TONES = {
  lime: { bg: "#151517", block: "#d4ff3a", ink: "#0a0a0b", soft: "#2b2b2f" },
  blue: { bg: "#10132b", block: "#6f80ff", ink: "#0a0a0b", soft: "#262b52" },
  white: { bg: "#f4f3ee", block: "#0a0a0b", ink: "#f4f3ee", soft: "#d9d8d1" },
} as const;

/**
 * Abstract SVG "screen" for projects with no approved screenshot.
 * Labelled as an illustration so it is never mistaken for the real product.
 */
function Illustration({
  name,
  tone,
  layout,
}: {
  name: string;
  tone: keyof typeof TONES;
  layout: "dashboard" | "site" | "hub" | "app";
}) {
  const t = TONES[tone];
  const label = name.toUpperCase();
  // Shrink long names so they never run into the shapes beside them.
  const fit = (max: number, width: number) => Math.min(max, Math.floor(width / (label.length * 0.62)));

  return (
    <svg className={s.illo} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill={t.bg} />
      {layout === "site" ? (
        <>
          <rect x="16" y="14" width="40" height="8" rx="2" fill={t.block} />
          <rect x="200" y="15" width="24" height="6" rx="3" fill={t.soft} />
          <rect x="230" y="15" width="24" height="6" rx="3" fill={t.soft} />
          <rect x="262" y="12" width="42" height="12" rx="6" fill={t.block} />
          <text x="16" y="78" fill={t.block} fontFamily="Arial, sans-serif" fontWeight="700" fontSize={fit(34, 190)} letterSpacing="-1.5">
            {label}
          </text>
          <rect x="16" y="92" width="150" height="6" rx="3" fill={t.soft} />
          <rect x="16" y="104" width="110" height="6" rx="3" fill={t.soft} />
          <rect x="16" y="126" width="60" height="16" rx="8" fill={t.block} />
          <rect x="16" y="156" width="92" height="34" rx="4" fill={t.soft} />
          <rect x="114" y="156" width="92" height="34" rx="4" fill={t.soft} />
          <rect x="212" y="156" width="92" height="34" rx="4" fill={t.soft} />
          <circle cx="268" cy="96" r="34" fill={t.block} opacity="0.9" />
        </>
      ) : null}
      {layout === "hub" ? (
        <>
          <rect x="0" y="0" width="70" height="200" fill={t.block} />
          <rect x="12" y="16" width="36" height="8" rx="2" fill={t.ink} />
          {[44, 60, 76, 92].map((y) => (
            <rect key={y} x="12" y={y} width="44" height="6" rx="3" fill={t.ink} opacity="0.5" />
          ))}
          <text x="84" y="44" fill={t.block} fontFamily="Arial, sans-serif" fontWeight="700" fontSize={fit(26, 220)} letterSpacing="-1.5">
            {label}
          </text>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={84 + i * 76} y="62" width="68" height="52" rx="6" fill={t.soft} />
          ))}
          <rect x="84" y="124" width="220" height="62" rx="6" fill={t.soft} />
          <rect x="96" y="138" width="120" height="6" rx="3" fill={t.block} opacity="0.6" />
          <rect x="96" y="152" width="170" height="6" rx="3" fill={t.block} opacity="0.3" />
        </>
      ) : null}
      {layout === "app" ? (
        <>
          <circle cx="160" cy="92" r="58" fill="none" stroke={t.block} strokeWidth="10" />
          <circle cx="160" cy="92" r="58" fill="none" stroke={t.soft} strokeWidth="10" strokeDasharray="90 300" />
          <circle cx="160" cy="34" r="8" fill={t.block} />
          <text x="160" y="104" textAnchor="middle" fill={t.block} fontFamily="Arial, sans-serif" fontWeight="700" fontSize={fit(30, 100)} letterSpacing="-1.5">
            {label}
          </text>
          <rect x="96" y="168" width="128" height="16" rx="8" fill={t.block} />
        </>
      ) : null}
      {layout === "dashboard" ? (
        <>
          <rect x="16" y="16" width="288" height="20" rx="4" fill={t.soft} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={16 + i * 74} y="48" width="66" height="44" rx="4" fill={i === 0 ? t.block : t.soft} />
          ))}
          <rect x="16" y="104" width="288" height="80" rx="4" fill={t.soft} />
        </>
      ) : null}
    </svg>
  );
}

export function ScreenArt({
  project,
  sizes = "(min-width: 1000px) 45vw, 100vw",
  priority = false,
  showUrl = true,
}: {
  project: MockProject;
  sizes?: string;
  priority?: boolean;
  showUrl?: boolean;
}) {
  const { art } = project;
  // Only show a URL that really exists.
  const url = project.link?.external
    ? project.link.label
    : project.caseStudy
      ? `rdevstudio.co.uk${project.caseStudy.href}`
      : null;

  return (
    <figure className={s.screen} style={{ margin: 0 }}>
      <div className={s.screenBar} aria-hidden="true">
        <span />
        <span />
        <span />
        {showUrl && url ? <p className={s.screenUrl}>{url}</p> : null}
      </div>
      <div className={s.screenBody}>
        {art.kind === "image" ? (
          <Image src={art.src} alt={art.alt} fill sizes={sizes} priority={priority} />
        ) : (
          <>
            <Illustration name={project.name} tone={art.tone} layout={art.layout} />
            <span className={s.illoTag}>Illustration</span>
          </>
        )}
      </div>
      {art.kind === "illustration" ? (
        <figcaption className="sr-only">Illustration for {project.name}, not a screenshot.</figcaption>
      ) : null}
    </figure>
  );
}
