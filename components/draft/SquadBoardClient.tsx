"use client";

import Link from "next/link";
import { useState } from "react";
import { AvailabilityDot } from "./AvailabilityDot";
import { FdrChip } from "./FdrChip";
import type { SquadPlayer } from "@/lib/draft/squad";

const POSITION_LABELS: Record<number, string> = { 1: "GK", 2: "DEF", 3: "MID", 4: "FWD" };

type SortKey = "player" | "availability" | "fdr" | "projected" | "form";

function PlayerCard({ player }: { player: SquadPlayer }) {
  const flagged = player.availabilityScore < 75;
  return (
    <div
      className={`rounded-lg border bg-raised px-3 py-2.5 text-center ${
        flagged ? "border-destructive" : "border-border"
      }`}
    >
      <div className="flex items-center justify-center gap-1.5">
        <AvailabilityDot score={player.availabilityScore} />
        <p className="truncate text-sm font-semibold text-primary">{player.webName}</p>
      </div>
      <p className="shell-label mt-1 text-secondary">{player.teamShortName}</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        {player.nextFixture ? (
          <FdrChip
            opponent={player.nextFixture.opponent}
            isHome={player.nextFixture.isHome}
            difficulty={player.nextFixture.difficulty}
          />
        ) : (
          <span className="shell-label text-secondary">No fixture</span>
        )}
        <span className="tabular-nums text-sm font-semibold text-primary">
          {player.projectedPoints != null ? player.projectedPoints.toFixed(1) : "-"}
        </span>
      </div>
    </div>
  );
}

function PitchView({ squad }: { squad: SquadPlayer[] }) {
  const xi = squad.filter((p) => p.pickPosition <= 11);
  const bench = squad.filter((p) => p.pickPosition > 11).sort((a, b) => a.pickPosition - b.pickPosition);

  const rows = [4, 3, 2, 1].map((pos) => xi.filter((p) => p.position === pos));

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-lg border border-border bg-overlay p-4">
        {rows.map((row, i) =>
          row.length > 0 ? (
            <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {row.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          ) : null,
        )}
      </div>

      <div>
        <p className="shell-label mb-2 text-secondary">Bench</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bench.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TableView({ squad }: { squad: SquadPlayer[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("projected");
  const [asc, setAsc] = useState(false);

  const sorted = [...squad].sort((a, b) => {
    let diff = 0;
    if (sortKey === "player") diff = a.webName.localeCompare(b.webName);
    if (sortKey === "availability") diff = a.availabilityScore - b.availabilityScore;
    if (sortKey === "fdr") diff = (a.nextFixture?.difficulty ?? 99) - (b.nextFixture?.difficulty ?? 99);
    if (sortKey === "projected") diff = (a.projectedPoints ?? -1) - (b.projectedPoints ?? -1);
    if (sortKey === "form") diff = (a.form ?? -1) - (b.form ?? -1);
    return asc ? diff : -diff;
  });

  function toggleSort(key: SortKey) {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(false);
    }
  }

  const headers: { key: SortKey; label: string }[] = [
    { key: "player", label: "Player" },
    { key: "availability", label: "Avail." },
    { key: "fdr", label: "Next FDR" },
    { key: "projected", label: "Proj. pts" },
    { key: "form", label: "Form" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-raised">
      <table className="w-full min-w-[620px] text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-2 text-left">
              <button
                type="button"
                onClick={() => toggleSort("player")}
                className={`shell-label transition-colors hover:text-accent ${
                  sortKey === "player" ? "text-accent" : "text-secondary"
                }`}
              >
                Player {sortKey === "player" ? (asc ? "↑" : "↓") : ""}
              </button>
            </th>
            <th className="px-3 py-2 text-left">
              <span className="shell-label text-secondary">Pos</span>
            </th>
            <th className="px-3 py-2 text-left">
              <span className="shell-label text-secondary">Team</span>
            </th>
            {headers.slice(1).map((h) => (
              <th key={h.key} className="px-3 py-2 text-left">
                <button
                  type="button"
                  onClick={() => toggleSort(h.key)}
                  className={`shell-label transition-colors hover:text-accent ${
                    sortKey === h.key ? "text-accent" : "text-secondary"
                  }`}
                >
                  {h.label} {sortKey === h.key ? (asc ? "↑" : "↓") : ""}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => {
            const flagged = p.availabilityScore < 75;
            return (
              <tr key={p.id} className="border-b border-border last:border-b-0">
                <td className="px-3 py-2">
                  <Link
                    href={`/draft/player/${p.id}`}
                    className="flex items-center gap-2 font-medium text-primary hover:text-accent"
                  >
                    <AvailabilityDot score={p.availabilityScore} />
                    {p.webName}
                  </Link>
                </td>
                <td className="px-3 py-2 text-secondary">{POSITION_LABELS[p.position] ?? "-"}</td>
                <td className="shell-label px-3 py-2 text-secondary">{p.teamShortName}</td>
                <td className={`px-3 py-2 tabular-nums ${flagged ? "text-destructive" : "text-secondary"}`}>
                  {p.availabilityScore}
                </td>
                <td className="px-3 py-2">
                  {p.nextFixture ? (
                    <FdrChip
                      opponent={p.nextFixture.opponent}
                      isHome={p.nextFixture.isHome}
                      difficulty={p.nextFixture.difficulty}
                    />
                  ) : (
                    <span className="text-secondary">-</span>
                  )}
                </td>
                <td className="px-3 py-2 tabular-nums text-primary">
                  {p.projectedPoints != null ? p.projectedPoints.toFixed(1) : "-"}
                </td>
                <td className="px-3 py-2 tabular-nums text-secondary">{p.form ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function SquadBoardClient({ squad }: { squad: SquadPlayer[] }) {
  const [view, setView] = useState<"pitch" | "table">("pitch");

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {(["pitch", "table"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`shell-label rounded-full border px-3 py-1.5 capitalize transition-colors ${
              view === v ? "border-accent bg-accent text-on-accent" : "border-border text-secondary hover:border-accent"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      {view === "pitch" ? <PitchView squad={squad} /> : <TableView squad={squad} />}
    </div>
  );
}
