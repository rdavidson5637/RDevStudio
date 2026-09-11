"use client";

import { useMemo, useState } from "react";
import { FdrChip } from "./FdrChip";
import { difficultyRating, type TickerCell } from "@/lib/draft/ticker";
import { POSITION_LABELS } from "@/lib/draft/positions";

export type TickerPlayer = {
  id: number;
  name: string;
  teamId: number;
  teamShortName: string;
  position: number;
  cells: TickerCell[];
};

type Props = {
  players: TickerPlayer[];
  mode: "squad" | "pool";
};

export function FixtureTicker({ players, mode }: Props) {
  const [byClub, setByClub] = useState(false);
  const [sortHard, setSortHard] = useState(false);

  const gameweeks = players[0]?.cells.map((cell) => cell.event) ?? [];

  const rows = useMemo(() => {
    const source = byClub
      ? collapseByClub(players)
      : players.map((p) => ({
          key: String(p.id),
          label: p.name,
          meta: `${p.teamShortName} · ${POSITION_LABELS[p.position] ?? ""}`,
          cells: p.cells,
        }));

    const withScore = source.map((row) => ({
      ...row,
      cumulative: row.cells.reduce((sum, cell) => {
        if (cell.fixtures.length === 0) return sum + 3;
        return sum + cell.fixtures.reduce((inner, f) => inner + f.difficulty, 0);
      }, 0),
    }));

    return [...withScore].sort((a, b) =>
      sortHard ? b.cumulative - a.cumulative : a.cumulative - b.cumulative,
    );
  }, [players, byClub, sortHard]);

  if (players.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <p className="shell-label text-secondary">
          {mode === "squad" ? "Your next six" : "Top of the wire"}
        </p>
        <button
          type="button"
          onClick={() => setByClub((v) => !v)}
          className="shell-label rounded-full border border-border px-3 py-1 text-secondary hover:border-accent hover:text-accent"
        >
          {byClub ? "By player" : "By club"}
        </button>
        <button
          type="button"
          onClick={() => setSortHard((v) => !v)}
          className="shell-label rounded-full border border-border px-3 py-1 text-secondary hover:border-accent hover:text-accent"
        >
          {sortHard ? "Easiest first" : "Hardest first"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-base px-2 py-2 text-left font-medium text-secondary">
                {byClub ? "Club" : "Player"}
              </th>
              {gameweeks.map((gw) => (
                <th key={gw} className="px-2 py-2 text-center font-medium text-secondary">
                  GW{gw}
                </th>
              ))}
              <th className="px-2 py-2 text-right font-medium text-secondary">Run</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-border">
                <td className="sticky left-0 z-10 bg-base px-2 py-2">
                  <p className="font-medium text-primary">{row.label}</p>
                  <p className="shell-label text-secondary">{row.meta}</p>
                </td>
                {row.cells.map((cell) => (
                  <td key={cell.event} className="px-2 py-2 align-top">
                    {cell.fixtures.length === 0 ? (
                      <span
                        aria-label={`No fixture in gameweek ${cell.event}`}
                        className="inline-flex min-h-6 min-w-10 rounded border border-dashed border-border-strong px-1.5 py-0.5 font-mono text-[10px] text-secondary"
                      >
                        —
                      </span>
                    ) : (
                      <span className="flex flex-col gap-1">
                        {cell.fixtures.map((fixture, index) => (
                          <FdrChip
                            key={`${fixture.opponent}-${index}`}
                            opponent={fixture.opponent}
                            isHome={fixture.isHome}
                            difficulty={fixture.difficulty}
                            postponed={fixture.kickoff == null}
                          />
                        ))}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-2 py-2 text-right">
                  <p className="tabular-nums text-primary">{row.cumulative.toFixed(0)}</p>
                  <p className="shell-label text-secondary">
                    {difficultyRating(row.cumulative, row.cells.length)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function collapseByClub(players: TickerPlayer[]) {
  const byTeam = new Map<number, TickerPlayer[]>();
  for (const player of players) {
    const list = byTeam.get(player.teamId) ?? [];
    list.push(player);
    byTeam.set(player.teamId, list);
  }
  return [...byTeam.values()].map((group) => {
    const first = group[0];
    return {
      key: `club-${first.teamId}`,
      label: first.teamShortName,
      meta: `${group.length} in this view`,
      cells: first.cells,
    };
  });
}
