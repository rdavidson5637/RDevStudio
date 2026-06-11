"use client";

import { useState } from "react";

import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import type { Player } from "@/lib/quiz/types";

interface PlayerListProps {
  players: Player[];
  hostId: string;
  isHost?: boolean;
  onKickPlayer?: (playerId: string) => Promise<void>;
}

function CrownIcon() {
  return (
    <svg
      className="h-4 w-4 text-quiz-amber"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="Host"
    >
      <path d="M5 16l-1-9 4 3 3-6 3 6 4-3-1 9H5zm1.2 2h11.6l.6 2H5.6l.6-2z" />
    </svg>
  );
}

export function PlayerList({
  players,
  hostId,
  isHost = false,
  onKickPlayer,
}: PlayerListProps) {
  const [confirmKickId, setConfirmKickId] = useState<string | null>(null);
  const [kickingId, setKickingId] = useState<string | null>(null);
  const count = players.length;

  async function handleConfirmKick(playerId: string) {
    if (!onKickPlayer) {
      return;
    }

    setKickingId(playerId);

    try {
      await onKickPlayer(playerId);
      setConfirmKickId(null);
    } finally {
      setKickingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-quiz-muted">
        {count} {count === 1 ? "player" : "players"} in lobby
      </p>

      <ul className="space-y-2">
        {players.map((player) => {
          const isPlayerHost = player.id === hostId;
          const canKick = isHost && !isPlayerHost && onKickPlayer;
          const confirming = confirmKickId === player.id;

          return (
            <li
              key={player.id}
              className="player-enter rounded-xl border border-quiz-border bg-quiz-surface px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <PlayerAvatar player={player} size="md" />
                  <span className="font-medium text-white">{player.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isPlayerHost ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-quiz-amber">
                      <CrownIcon />
                      Host
                    </span>
                  ) : null}

                  {canKick && !confirming ? (
                    <button
                      type="button"
                      onClick={() => setConfirmKickId(player.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-quiz-muted transition-colors hover:bg-red-500/15 hover:text-red-400"
                      aria-label={`Remove ${player.name}`}
                    >
                      ✕
                    </button>
                  ) : null}
                </div>
              </div>

              {canKick && confirming ? (
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-quiz-border/60 pt-3">
                  <p className="text-xs text-quiz-muted">
                    Remove {player.name}?
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleConfirmKick(player.id)}
                    disabled={kickingId === player.id}
                    className="rounded-lg bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-300 hover:bg-red-500/30 disabled:opacity-50"
                  >
                    {kickingId === player.id ? "Removing..." : "Confirm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmKickId(null)}
                    className="rounded-lg px-2.5 py-1 text-xs text-quiz-muted hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
