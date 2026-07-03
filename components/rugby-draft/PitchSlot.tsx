"use client";
import Kit from "./Kit";
import type { DraftSlot } from "@/types/rugby-draft";

interface Props {
  slot: DraftSlot;
  isNext?: boolean;
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function PitchSlot({ slot, isNext = false }: Props) {
  const { player, position } = slot;

  if (player) {
    const badge = (player as { badge?: string }).badge ?? "DEFAULT";
    const initials = getInitials(player.name);
    return (
      <div className="flex flex-col items-center gap-0.5">
        <Kit
          badge={badge}
          initials={initials}
          overall={player.overall}
          size="md"
        />
        <span className="text-white/70 text-[9px] font-medium tracking-wide max-w-[52px] text-center truncate leading-tight">
          {player.name.split(" ").pop()}
        </span>
        <span className="text-white/40 text-[8px] font-bold tabular-nums">
          {player.overall}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={`
          w-[52px] h-[52px] rounded-full border-2 flex items-center justify-center
          ${
            isNext
              ? "border-emerald-400/60 bg-emerald-400/10 animate-pulse ring-2 ring-emerald-400/20"
              : "border-white/20 bg-white/5"
          }
        `}
      >
        <span
          className={`text-[10px] font-bold tracking-wide ${isNext ? "text-white/80" : "text-white/30"}`}
        >
          {position}
        </span>
      </div>
      <span className="text-white/20 text-[9px] tracking-wide">
        {isNext ? "Next" : "—"}
      </span>
    </div>
  );
}
