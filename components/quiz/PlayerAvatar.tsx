"use client";

import { getPlayerAvatar, getPlayerColour } from "@/lib/quiz/player-identity";
import type { Player } from "@/lib/quiz/types";

interface PlayerAvatarProps {
  player: Player;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-base",
  md: "h-10 w-10 text-lg",
  lg: "h-14 w-14 text-2xl",
} as const;

export function PlayerAvatar({
  player,
  size = "md",
  showName = false,
  className = "",
}: PlayerAvatarProps) {
  const colour = getPlayerColour(player);
  const avatar = getPlayerAvatar(player);

  return (
    <div
      className={`flex flex-col items-center gap-1 ${className}`}
      title={player.name}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-full ${SIZE_CLASSES[size]}`}
        style={{ backgroundColor: colour }}
        aria-hidden={!showName}
      >
        <span className="leading-none">{avatar}</span>
      </div>
      {showName ? (
        <span className="max-w-[4.5rem] truncate text-center text-xs font-medium text-white">
          {player.name}
        </span>
      ) : null}
    </div>
  );
}
