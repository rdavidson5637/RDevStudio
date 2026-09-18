"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AvailabilityDot } from "./AvailabilityDot";
import type { LeagueBoardData, TradePiece } from "@/lib/draft/league-types";
import { POSITION_LABELS } from "@/lib/draft/positions";

export function LeagueBoard({ board }: { board: LeagueBoardData }) {
  return (
    <div className="space-y-10">
      {board.matchup ? (
        <section>
          <p className="shell-label mb-2 text-accent">This gameweek</p>
          <h2 className="font-display text-2xl uppercase text-primary">Matchup vs {board.matchup.opponentName}</h2>
          <p className="mt-3 text-sm text-secondary">
            Projected {board.matchup.homeProjected.toFixed(1)} - {board.matchup.awayProjected.toFixed(1)}. Win chance{" "}
            {Math.round(board.matchup.homeWinPct * 100)}% / draw {Math.round(board.matchup.drawPct * 100)}% / lose{" "}
            {Math.round(board.matchup.awayWinPct * 100)}%.
          </p>
          <p className="mt-2 text-sm text-secondary">
            Biggest swingers: {board.matchup.swingers.map((s) => s.name).join(", ")}.
          </p>
        </section>
      ) : board.classicNote ? (
        <p className="text-sm text-secondary">
          This league is not H2H - there is no single opponent this week. The table below is projected
          gameweek totals against the field.
        </p>
      ) : null}

      <section>
        <p className="shell-label mb-3 text-accent">Rival scanner</p>
        <div className="grid gap-4 md:grid-cols-2">
          {board.teams.map((team) => (
            <article key={team.entryId} className="rounded-lg border border-border bg-raised p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-primary">{team.name}</h3>
                  <p className="shell-label text-secondary">{team.manager}</p>
                </div>
                <p className="tabular-nums text-primary">{team.projectedGw.toFixed(1)}</p>
              </div>
              <p className="mt-2 text-sm text-secondary">
                {team.injuryCount} red-flagged · {team.thinPositions.length > 0 ? `thin at ${team.thinPositions.join(", ")}` : "full depth"}
              </p>
              <ul className="mt-3 space-y-1">
                {team.players.slice(0, 6).map((player) => (
                  <li key={player.id} className="flex items-center gap-2 text-sm">
                    <AvailabilityDot score={player.availabilityScore} />
                    <Link href={`/draft/player/${player.id}`} className="text-primary hover:text-accent">
                      {player.webName}
                    </Link>
                    <span className="shell-label text-secondary">{POSITION_LABELS[player.position]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <SeasonTable board={board} />
      <TradeAnalyser pool={board.tradePool} myEntryId={board.myEntryId} />

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="shell-label mb-3 text-accent">Best value picks</p>
          <PostList rows={board.postMortem.best} />
        </div>
        <div>
          <p className="shell-label mb-3 text-accent">Draft busts</p>
          <PostList rows={board.postMortem.worst} />
        </div>
      </section>
    </div>
  );
}

function SeasonTable({ board }: { board: LeagueBoardData }) {
  const byId = new Map(board.teams.map((t) => [t.entryId, t]));
  const rows = [...board.season].sort((a, b) => b.titlePct - a.titlePct);
  return (
    <section>
      <p className="shell-label mb-3 text-accent">Season simulator - 2,500 runs, next six GWs</p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-secondary">
              <th className="px-2 py-2 font-medium">Team</th>
              <th className="px-2 py-2 font-medium">Title</th>
              <th className="px-2 py-2 font-medium">Top 4</th>
              <th className="px-2 py-2 font-medium">Projected</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.entryId} className="border-t border-border">
                <td className="px-2 py-2 text-primary">{byId.get(row.entryId)?.name ?? row.entryId}</td>
                <td className="px-2 py-2 tabular-nums">{Math.round(row.titlePct * 100)}%</td>
                <td className="px-2 py-2 tabular-nums">{Math.round(row.topFourPct * 100)}%</td>
                <td className="px-2 py-2 tabular-nums">{row.projectedTotal.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PostList({ rows }: { rows: LeagueBoardData["postMortem"]["best"] }) {
  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-raised">
      {rows.map((row) => (
        <li key={`${row.id}-${row.owner}`} className="flex items-center justify-between gap-3 px-4 py-2 text-sm">
          <Link href={`/draft/player/${row.id}`} className="text-primary hover:text-accent">
            {row.webName}
          </Link>
          <span className="shell-label text-secondary">
            ADP {row.draftRank} · {row.totalPoints} pts · {row.owner}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TradeAnalyser({ pool, myEntryId }: { pool: TradePiece[]; myEntryId: number }) {
  const mine = pool.filter((p) => p.entryId === myEntryId);
  const theirs = pool.filter((p) => p.entryId !== myEntryId);
  const [outId, setOutId] = useState(mine[0]?.id ?? 0);
  const [inId, setInId] = useState(theirs[0]?.id ?? 0);

  const verdict = useMemo(() => {
    const send = mine.find((p) => p.id === outId);
    const receive = theirs.find((p) => p.id === inId);
    if (!send || !receive) return null;
    const delta = receive.projected6 - send.projected6;
    return { send, receive, delta };
  }, [mine, theirs, outId, inId]);

  if (mine.length === 0 || theirs.length === 0) return null;

  return (
    <section>
      <p className="shell-label mb-3 text-accent">Trade analyser</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-secondary">
          You send
          <select
            value={outId}
            onChange={(e) => setOutId(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
          >
            {mine.map((p) => (
              <option key={p.id} value={p.id}>
                {p.webName} ({POSITION_LABELS[p.position]}, {p.projected6.toFixed(1)})
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-secondary">
          You receive
          <select
            value={inId}
            onChange={(e) => setInId(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
          >
            {theirs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.webName} - {p.owner} ({p.projected6.toFixed(1)})
              </option>
            ))}
          </select>
        </label>
      </div>
      {verdict ? (
        <p className="mt-4 text-sm text-secondary">
          {verdict.receive.webName} vs {verdict.send.webName} over six gameweeks:{" "}
          <span className="font-medium text-primary">
            {verdict.delta >= 0 ? "+" : ""}
            {verdict.delta.toFixed(1)}
          </span>
          . Same-position swaps keep both squads legal; mixed-position deals still need a 2-5-5-3 check in the app.
        </p>
      ) : null}
    </section>
  );
}
