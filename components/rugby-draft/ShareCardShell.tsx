"use client";
import type { ReactNode } from "react";
import ShareSquadMini from "./ShareSquadMini";
import ShareTeamRatings from "./ShareTeamRatings";
import { SHARE_CHALLENGE, type ShareSquadPlayer } from "./shareHelpers";

export type ShareAccent = "emerald" | "amber" | "red";

const ACCENT_STYLES: Record<
  ShareAccent,
  {
    border: string;
    gradient: string;
    glow: string;
    brand: string;
    stripe: string;
  }
> = {
  emerald: {
    border: "border-emerald-400/25",
    gradient: "from-[#0d1a14] via-[#0a0a12] to-[#0a1218]",
    glow: "bg-emerald-400/12",
    brand: "text-emerald-400/90",
    stripe: "from-emerald-400/60 via-emerald-400/20 to-transparent",
  },
  amber: {
    border: "border-amber-400/30",
    gradient: "from-[#1a1408] via-[#0a0a12] to-[#12100a]",
    glow: "bg-amber-400/12",
    brand: "text-amber-400/90",
    stripe: "from-amber-400/60 via-amber-400/20 to-transparent",
  },
  red: {
    border: "border-red-400/20",
    gradient: "from-[#1a0d0d] via-[#0a0a12] to-[#120a0a]",
    glow: "bg-red-400/8",
    brand: "text-red-400/80",
    stripe: "from-red-400/50 via-red-400/15 to-transparent",
  },
};

interface TeamRatings {
  forwards: number;
  backs: number;
  overall: number;
}

interface Props {
  accent: ShareAccent;
  modeIcon: string;
  title: string;
  subtitle?: string;
  result: ReactNode;
  stats?: ReactNode;
  teamRatings?: TeamRatings;
  squad: ShareSquadPlayer[];
  className?: string;
  captureId?: string;
}

export default function ShareCardShell({
  accent,
  modeIcon,
  title,
  subtitle,
  result,
  stats,
  teamRatings,
  squad,
  className = "",
  captureId,
}: Props) {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      id={captureId}
      className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${styles.border} ${styles.gradient} ${className}`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${styles.stripe}`}
      />
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 ${styles.glow} rounded-full blur-2xl`}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`text-[10px] font-black uppercase tracking-[0.2em] ${styles.brand}`}
            >
              Rugby Draft
            </p>
            <h3 className="text-white font-black text-lg uppercase tracking-tight mt-1 truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/45 text-xs mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-2xl flex-shrink-0 drop-shadow-lg">
            {modeIcon}
          </span>
        </div>

        <div className="mt-4">{result}</div>
        {stats && <div className="mt-3">{stats}</div>}
        {teamRatings && <ShareTeamRatings ratings={teamRatings} />}
        <ShareSquadMini squad={squad} />

        <p className="mt-4 px-2 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 text-[10px] text-center leading-snug">
          {SHARE_CHALLENGE}
        </p>
      </div>
    </div>
  );
}
