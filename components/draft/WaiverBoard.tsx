"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AvailabilityDot } from "./AvailabilityDot";
import { FdrChip } from "./FdrChip";
import { bestDrop } from "@/lib/draft/drop";
import type { WaiverBoardData, WirePlayer } from "@/lib/draft/waiver-types";
import { POSITION_LABELS } from "@/lib/draft/positions";
import { FixtureTicker } from "./FixtureTicker";

type Props = { board: WaiverBoardData };

export function WaiverBoard({ board }: Props) {
  const [position, setPosition] = useState<number | "all">("all");
  const [minAvail, setMinAvail] = useState(0);
  const [minMinutes, setMinMinutes] = useState(0);
  const [hideBlanks, setHideBlanks] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(board.players[0]?.id ?? null);
  const [sortKey, setSortKey] = useState<"projected3" | "projected6" | "projected1" | "form">("projected3");

  const filtered = useMemo(() => {
    return board.players
      .filter((p) => (position === "all" ? true : p.position === position))
      .filter((p) => p.availabilityScore >= minAvail)
      .filter((p) => p.minutes >= minMinutes)
      .filter((p) => (hideBlanks ? p.hasNextGwFixture : true))
      .sort((a, b) => (Number(b[sortKey] ?? 0) - Number(a[sortKey] ?? 0)));
  }, [board.players, position, minAvail, minMinutes, hideBlanks, sortKey]);

  const selected = filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? null;
  const pairing = selected
    ? bestDrop(board.squadDrops, {
        id: selected.id,
        webName: selected.webName,
        position: selected.position,
        projected6: selected.projected6,
      })
    : null;
  const cards = filtered.slice(0, 3);
  const tickerPlayers = filtered.slice(0, 20).map((p) => ({
    id: p.id,
    name: p.webName,
    teamId: p.teamId,
    teamShortName: p.teamShortName,
    position: p.position,
    cells: p.cells,
  }));

  return (
    <div className="space-y-8">
      {board.trending.availabilityRisers.length > 0 ? (
        <div>
          <p className="shell-label mb-3 text-accent">Trending — availability up in 72h</p>
          <div className="flex flex-wrap gap-2">
            {board.trending.availabilityRisers.map((row) => (
              <Link
                key={row.id}
                href={`/draft/player/${row.id}`}
                className="rounded-full border border-border bg-raised px-3 py-1 text-sm text-primary hover:border-accent"
              >
                {row.webName}{" "}
                <span className="text-secondary">
                  {row.from}→{row.to}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="rounded-md border border-border bg-raised px-3 py-2 text-sm text-primary"
          aria-label="Filter by position"
        >
          <option value="all">All positions</option>
          <option value={1}>GK</option>
          <option value={2}>DEF</option>
          <option value={3}>MID</option>
          <option value={4}>FWD</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-secondary">
          Min availability
          <input
            type="number"
            min={0}
            max={100}
            value={minAvail}
            onChange={(e) => setMinAvail(Number(e.target.value))}
            className="w-16 rounded-md border border-border bg-raised px-2 py-1 text-primary"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-secondary">
          Min minutes
          <input
            type="number"
            min={0}
            value={minMinutes}
            onChange={(e) => setMinMinutes(Number(e.target.value))}
            className="w-20 rounded-md border border-border bg-raised px-2 py-1 text-primary"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="checkbox"
            checked={hideBlanks}
            onChange={(e) => setHideBlanks(e.target.checked)}
          />
          Hide no-fixture this GW
        </label>
      </div>

      <div className="grid gap-3 md:hidden">
        {cards.map((player) => (
          <WireCard
            key={player.id}
            player={player}
            active={selected?.id === player.id}
            onSelect={() => setSelectedId(player.id)}
          />
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full text-sm">
          <thead>
            <tr className="text-left text-secondary">
              <th className="px-2 py-2 font-medium">Player</th>
              <SortHead label="1 GW" active={sortKey === "projected1"} onClick={() => setSortKey("projected1")} />
              <SortHead label="3 GW" active={sortKey === "projected3"} onClick={() => setSortKey("projected3")} />
              <SortHead label="6 GW" active={sortKey === "projected6"} onClick={() => setSortKey("projected6")} />
              <th className="px-2 py-2 font-medium">Next 3</th>
              <SortHead label="Form" active={sortKey === "form"} onClick={() => setSortKey("form")} />
              <th className="px-2 py-2 font-medium">Mins</th>
              <th className="px-2 py-2 font-medium">DefCon</th>
              <th className="px-2 py-2 font-medium">Moves</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((player) => (
              <tr
                key={player.id}
                onClick={() => setSelectedId(player.id)}
                className={`cursor-pointer border-t border-border hover:bg-accent-light ${
                  selected?.id === player.id ? "bg-accent-light" : ""
                }`}
              >
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <AvailabilityDot score={player.availabilityScore} />
                    <Link href={`/draft/player/${player.id}`} className="font-medium text-primary hover:text-accent" onClick={(e) => e.stopPropagation()}>
                      {player.webName}
                    </Link>
                    <span className="shell-label text-secondary">
                      {player.teamShortName} · {POSITION_LABELS[player.position]}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 tabular-nums">{player.projected1.toFixed(1)}</td>
                <td className="px-2 py-2 tabular-nums">{player.projected3.toFixed(1)}</td>
                <td className="px-2 py-2 tabular-nums">{player.projected6.toFixed(1)}</td>
                <td className="px-2 py-2">
                  <span className="flex flex-wrap gap-1">
                    {player.next3.map((f, i) => (
                      <FdrChip key={i} opponent={f.opponent} isHome={f.isHome} difficulty={f.difficulty} />
                    ))}
                  </span>
                </td>
                <td className="px-2 py-2 tabular-nums">{player.form?.toFixed(1) ?? "—"}</td>
                <td className="px-2 py-2 tabular-nums">{player.minutes}</td>
                <td className="px-2 py-2 tabular-nums">{Math.round(player.defconRate * 100)}%</td>
                <td className="px-2 py-2 text-secondary">
                  +{player.pickupCount}/−{player.dropCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && pairing ? (
        <div className="rounded-lg border border-border bg-raised p-5">
          <p className="shell-label mb-2 text-accent">Drop pairing</p>
          <p className="text-sm text-secondary">
            For {selected.webName}, the lowest 6-gameweek player you can drop without breaking
            a 2-5-5-3 squad is {pairing.drop.webName}.
          </p>
          <p className="mt-3 font-display text-2xl tabular-nums text-primary">
            {pairing.netGain >= 0 ? "+" : ""}
            {pairing.netGain.toFixed(1)}{" "}
            <span className="text-lg text-secondary">over 6 GW</span>
          </p>
          {pairing.leavesThin ? (
            <p className="mt-2 text-sm text-warning">That drop leaves you thin at {POSITION_LABELS[pairing.drop.position]}.</p>
          ) : null}
        </div>
      ) : selected ? (
        <p className="text-sm text-secondary">No legal drop for {selected.webName} from the current 15.</p>
      ) : null}

      <FixtureTicker players={tickerPlayers} mode="pool" />
    </div>
  );
}

function SortHead({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <th className="px-2 py-2 font-medium">
      <button type="button" onClick={onClick} className={active ? "text-accent" : "text-secondary"}>
        {label}
      </button>
    </th>
  );
}

function WireCard({
  player,
  active,
  onSelect,
}: {
  player: WirePlayer;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-lg border p-4 text-left ${
        active ? "border-accent bg-accent-light" : "border-border bg-raised"
      }`}
    >
      <div className="flex items-center gap-2">
        <AvailabilityDot score={player.availabilityScore} />
        <span className="font-medium text-primary">{player.webName}</span>
        <span className="shell-label text-secondary">{POSITION_LABELS[player.position]}</span>
      </div>
      <p className="mt-2 tabular-nums text-primary">{player.projected3.toFixed(1)} pts over 3 GW</p>
    </button>
  );
}
