"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LiveBoardData } from "@/lib/draft/live-types";
import { isDraftLivePusherConfigured, subscribeDraftLive } from "@/lib/draft/pusher-client";

function formatUpdated(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Live";
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function LiveBoard({
  board: initial,
  myEntryId,
  eventId,
}: {
  board: LiveBoardData;
  myEntryId: number;
  eventId: number;
}) {
  const [board, setBoard] = useState(initial);
  const [pusherOn, setPusherOn] = useState(false);

  useEffect(() => {
    setBoard(initial);
  }, [initial]);

  useEffect(() => {
    setPusherOn(isDraftLivePusherConfigured());
    const unsub = subscribeDraftLive((next) => {
      if (next.eventId === eventId) setBoard(next);
    });

    void fetch(`/api/draft/live/refresh?event=${eventId}`, { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload: { board?: LiveBoardData } | null) => {
        if (payload?.board) setBoard(payload.board);
      })
      .catch(() => undefined);

    const poll = window.setInterval(() => {
      void fetch(`/api/draft/live?event=${eventId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((payload: LiveBoardData | null) => {
          if (payload?.eventId === eventId) setBoard(payload);
        })
        .catch(() => undefined);
    }, 60_000);

    return () => {
      unsub();
      window.clearInterval(poll);
    };
  }, [eventId]);

  const winPct = board.h2h?.myWinPct;

  return (
    <div className="space-y-8">
      <p className="text-sm text-secondary" suppressHydrationWarning>
        Live FPL draft endpoint. Updates via {pusherOn ? "Pusher, with a 60s poll fallback" : "a 60s poll"}
        {board.updatedAt ? ` · last pull ${formatUpdated(board.updatedAt)}` : ""}. Hobby cron is daily, so this
        page also asks the server to refresh on load.
      </p>

      {board.h2h ? (
        <div className="rounded-lg border border-border bg-raised px-4 py-3 text-sm text-secondary">
          Live H2H vs {board.h2h.opponentName}: {board.h2h.myPoints}-{board.h2h.theirPoints}
          {winPct != null ? ` · live win ${Math.round(winPct * 100)}%` : ""}. Yet-to-play players are simulated;
          points already scored stay locked.
        </div>
      ) : (
        <p className="text-sm text-secondary">
        Classic league - live points only, no H2H fixture this week.
      </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-secondary">
              <th className="px-2 py-2 font-medium">Team</th>
              <th className="px-2 py-2 font-medium">Live pts</th>
            </tr>
          </thead>
          <tbody>
            {board.byEntry.map((row) => (
              <tr
                key={row.entryId}
                className={`border-t border-border ${row.entryId === myEntryId ? "bg-accent-light" : ""}`}
              >
                <td className="px-2 py-2 text-primary">{row.name}</td>
                <td className="px-2 py-2 tabular-nums">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="shell-label mb-3 text-accent">Players - live points</p>
        <ul className="divide-y divide-border rounded-lg border border-border bg-raised">
          {board.players.slice(0, 40).map((player) => (
            <li key={`${player.entryId}-${player.id}`} className="flex items-center justify-between gap-3 px-4 py-2 text-sm">
              <Link href={`/draft/player/${player.id}`} className="text-primary hover:text-accent">
                {player.webName}
              </Link>
              <span className="shell-label text-secondary">
                {player.owner} · {player.minutes}&apos; · BPS {player.bps} · bonus {player.bonus || player.provisionalBonus}
              </span>
              <span className="tabular-nums text-primary">{player.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
