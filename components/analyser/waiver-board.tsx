"use client";

import { useMemo, useState } from "react";
import { Cells, Dot, Minutes, PlayerLink, POS } from "@/components/analyser/bits";
import type { Player, Slot } from "@/lib/analyser/data/types";

type SortKey = "xp3" | "xp1" | "xp6" | "availability" | "name";

export function WaiverBoard({
  players,
  squad,
  horizon,
}: {
  players: Player[];
  squad: Slot[];
  horizon: number[];
}) {
  const [position, setPosition] = useState<number | 0>(0);
  const [minAvail, setMinAvail] = useState(0);
  const [hideBlank, setHideBlank] = useState(false);
  const [sort, setSort] = useState<SortKey>("xp3");
  const [selected, setSelected] = useState<number | null>(players[0]?.id ?? null);

  const rows = useMemo(() => {
    return players
      .filter((player) => (position === 0 ? true : player.position === position))
      .filter((player) => player.availability >= minAvail)
      .filter((player) => (hideBlank ? (player.cells[0]?.chips.length ?? 0) > 0 : true))
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        return b[sort] - a[sort];
      });
  }, [players, position, minAvail, hideBlank, sort]);

  const pick = rows.find((player) => player.id === selected) ?? rows[0] ?? null;
  const drop = pick
    ? [...squad.filter((player) => player.position === pick.position)].sort((a, b) => a.xp6 - b.xp6)[0]
    : null;
  const others = drop ? squad.filter((player) => player.position === drop.position && player.id !== drop.id) : [];
  const coverRisk = others.length > 0 && others.every((player) => player.availability < 60);

  return (
    <div className="stack">
      <div className="controls">
        {[0, 1, 2, 3, 4].map((value) => (
          <button key={value} type="button" aria-pressed={position === value} onClick={() => setPosition(value)}>
            {value === 0 ? "All" : POS[value]}
          </button>
        ))}
        <button type="button" aria-pressed={minAvail === 75} onClick={() => setMinAvail(minAvail === 75 ? 0 : 75)}>
          Fit only
        </button>
        <button type="button" aria-pressed={hideBlank} onClick={() => setHideBlank((value) => !value)}>
          Hide blanks
        </button>
      </div>

      {pick && drop ? (
        <p className="t-body measure">
          Drop {drop.name} for {pick.name}: {pick.xp6 - drop.xp6 > 0 ? "+" : ""}
          {(pick.xp6 - drop.xp6).toFixed(1)} over six gameweeks.
          {coverRisk ? " That drop leaves no fit cover." : ""}
        </p>
      ) : null}

      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {rows.slice(0, 3).map((player, index) => (
          <li key={player.id} className="row">
            <span className="nums">{index + 1}</span>
            <span>
              <PlayerLink player={player} />
              <span className="t-small soft"> {player.xp3.toFixed(1)} over three</span>
            </span>
            <Dot score={player.availability} band={player.band} />
          </li>
        ))}
      </ol>

      <div className="scroller">
        <table className="table">
          <thead>
            <tr>
              <th><button type="button" onClick={() => setSort("name")}>Player</button></th>
              <th>Avail</th>
              <th><button type="button" onClick={() => setSort("xp1")}>1</button></th>
              <th><button type="button" onClick={() => setSort("xp3")}>3</button></th>
              <th><button type="button" onClick={() => setSort("xp6")}>6</button></th>
              <th>Fixtures</th>
              <th>Mins</th>
              <th>DefCon</th>
              <th>Moves</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((player) => (
              <tr key={player.id} onClick={() => setSelected(player.id)} style={{ cursor: "pointer", background: player.id === pick?.id ? "var(--color-surface)" : undefined }}>
                <td className="sticky"><PlayerLink player={player} /></td>
                <td className="nums">{player.availability}</td>
                <td className="nums">{player.xp1.toFixed(1)}</td>
                <td className="nums">{player.xp3.toFixed(1)}</td>
                <td className="nums">{player.xp6.toFixed(1)}</td>
                <td><Cells cells={player.cells} /></td>
                <td><Minutes values={player.minutesLast4} /></td>
                <td className="nums">{player.defconOf ? `${player.defconHits}/${player.defconOf}` : "-"}</td>
                <td className="nums">{player.moves}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-small soft">Gameweeks {horizon.join(", ")}. Available means unowned in this league.</p>
    </div>
  );
}
