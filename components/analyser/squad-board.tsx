"use client";

import { useMemo, useState } from "react";
import { Dot, Minutes, PlayerLink, POS } from "@/components/analyser/bits";
import { bestXI } from "@/lib/analyser/draft/optimise";
import { squadForOptimiser } from "@/lib/analyser/data/derive";
import type { Slot } from "@/lib/analyser/data/types";

export function SquadBoard({ squad, deadlinePassed }: { squad: Slot[]; deadlinePassed: boolean }) {
  const [sheet, setSheet] = useState(true);
  const [ignore, setIgnore] = useState(false);
  const [sort, setSort] = useState<"xp" | "availability" | "name">("xp");

  const result = useMemo(() => bestXI(squadForOptimiser(squad, ignore)), [squad, ignore]);
  const saved = squad.filter((player) => player.pick <= 11);
  const savedTotal = saved.reduce((sum, player) => sum + (ignore ? player.xp1Fit : player.xp1), 0);
  const lines: [string, number][] = [
    ["Goalkeeper", 1],
    ["Defence", 2],
    ["Midfield", 3],
    ["Forward", 4],
  ];
  const sorted = [...squad].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "availability") return b.availability - a.availability;
    return (ignore ? b.xp1Fit : b.xp1) - (ignore ? a.xp1Fit : a.xp1);
  });

  return (
    <div className="stack">
      <div className="controls">
        <button type="button" aria-pressed={sheet} onClick={() => setSheet(true)}>Teamsheet</button>
        <button type="button" aria-pressed={!sheet} onClick={() => setSheet(false)}>Table</button>
        <button type="button" aria-pressed={ignore} onClick={() => setIgnore((value) => !value)}>
          Ignore availability
        </button>
      </div>

      <section>
        <h2 className="t-title">{result.formation}</h2>
        <p className="t-body measure">
          Recommended XI projects {result.projectedTotal.toFixed(1)}. Saved XI projects {savedTotal.toFixed(1)}.
          {result.gainOverCurrent < 1.5
            ? " Your lineup is already close to optimal, not worth changing."
            : ` Gain if you make the swaps: ${result.gainOverCurrent.toFixed(1)}.`}
          {deadlinePassed ? " This gameweek is already locked. Use it for the next deadline." : ""}
        </p>
        <p className="t-small soft">This tells you the side. You set it in the draft app. There is no public write API.</p>
        {result.risks.length > 0 ? (
          <ul className="warn-list">
            {result.risks.map((risk) => (
              <li key={risk} className="t-small">{risk}</li>
            ))}
          </ul>
        ) : null}
        {result.swaps.length > 0 && result.gainOverCurrent >= 1.5 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {result.swaps.map((swap) => (
              <li key={swap.in.id} className="row" style={{ gridTemplateColumns: "1fr auto" }}>
                <span>{swap.out.webName} out, {swap.in.webName} in</span>
                <span className="nums">{swap.gain > 0 ? "+" : ""}{swap.gain.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {sheet ? (
        <div className="lines">
          {lines.map(([label, position]) => (
            <section key={label} className="line">
              <h3 className="t-label soft">{label}</h3>
              {result.xi
                .filter((player) => player.position === position)
                .map((player) => {
                  const full = squad.find((slot) => slot.id === player.id)!;
                  return (
                    <div key={player.id} className="row">
                      <Dot score={full.availability} band={full.band} />
                      <span>
                        <PlayerLink player={full} />
                        <span className="t-small soft"> {full.cells[0]?.chips[0] ? `${full.cells[0].chips[0].opponent} ${full.cells[0].chips[0].side}` : "Blank"}</span>
                      </span>
                      <span className="nums">{(player.projectedPoints ?? 0).toFixed(1)}</span>
                    </div>
                  );
                })}
            </section>
          ))}
          <section className="line">
            <h3 className="t-label soft">Bench</h3>
            {result.bench.map((player) => {
              const full = squad.find((slot) => slot.id === player.id)!;
              return (
                <div key={player.id} className="row">
                  <Dot score={full.availability} band={full.band} />
                  <PlayerLink player={full} />
                  <span className="nums">{(player.projectedPoints ?? 0).toFixed(1)}</span>
                </div>
              );
            })}
          </section>
        </div>
      ) : (
        <div className="scroller">
          <table className="table">
            <thead>
              <tr>
                <th><button type="button" onClick={() => setSort("name")}>Player</button></th>
                <th>Pos</th>
                <th><button type="button" onClick={() => setSort("availability")}>Avail</button></th>
                <th>Next</th>
                <th><button type="button" onClick={() => setSort("xp")}>xP</button></th>
                <th>Form</th>
                <th>Mins</th>
                <th>DefCon</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((player) => (
                <tr key={player.id}>
                  <td className="sticky"><PlayerLink player={player} /></td>
                  <td>{POS[player.position]}</td>
                  <td className="nums">{player.availability}</td>
                  <td className="nums">{player.cells[0]?.chips[0] ? `${player.cells[0].chips[0].fdr} ${player.cells[0].chips[0].opponent}` : "Blank"}</td>
                  <td className="nums">{(ignore ? player.xp1Fit : player.xp1).toFixed(1)}</td>
                  <td className="nums">{player.form ?? "-"}</td>
                  <td><Minutes values={player.minutesLast4} /></td>
                  <td className="nums">{player.defconOf ? `${player.defconHits}/${player.defconOf}` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
