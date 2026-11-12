import Link from "next/link";
import { POS } from "@/components/analyser/bits";
import { getAnalyser } from "@/lib/analyser/data/load";
import type { Player } from "@/lib/analyser/data/types";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft DefCon",
  description: "Defensive contribution hit rates, penalty takers and set-piece takers in Academy FC.",
  path: "/draft/defcon",
});

type Row = Player & { owner: string };

export default async function Page() {
  let data;
  try {
    data = await getAnalyser();
  } catch {
    return <p className="t-body measure">The sheet is waiting on a sync.</p>;
  }
  const everyone: Row[] = [
    ...data.table.flatMap((side) => side.squad.map((player) => ({ ...player, owner: side.name }))),
    ...data.freeAgents.map((player) => ({ ...player, owner: "Free agent" })),
  ];
  const rated = everyone
    .filter((player) => player.position !== 1 && player.defconOf >= 3)
    .sort((a, b) => b.defconHits / b.defconOf - a.defconHits / a.defconOf || b.xp6 - a.xp6);
  const free = rated.filter((player) => player.owner === "Free agent").slice(0, 12);
  const mine = data.me.squad
    .filter((player) => player.position !== 1)
    .map((player) => ({ ...player, owner: "Your squad" }))
    .sort((a, b) => b.defconHits / Math.max(b.defconOf, 1) - a.defconHits / Math.max(a.defconOf, 1));
  const pens = everyone.filter((player) => player.penaltiesOrder === 1).sort((a, b) => b.xp6 - a.xp6);
  const pieces = everyone
    .filter((player) => player.fkOrder === 1 || player.cornersOrder === 1)
    .sort((a, b) => b.xp6 - a.xp6);

  return (
    <div className="stack">
      <header>
        <p className="t-label soft">Two points when they clear the action threshold</p>
        <h1 className="t-title">DefCon and set pieces</h1>
        <p className="t-body measure soft">
          Hit rate is recent gameweeks only, and only where we have a live row. A player needs three of those weeks before they appear in the free-agent list. Set-piece order is the official list, not a guess.
        </p>
      </header>

      <section>
        <h2 className="t-heading">Your 15</h2>
        <RateTable rows={mine} />
      </section>

      <section>
        <h2 className="t-heading">Free agents, three weeks or more</h2>
        {free.length === 0 ? (
          <p className="t-body">No free agent has three recorded weeks yet.</p>
        ) : (
          <RateTable rows={free} />
        )}
      </section>

      <section>
        <h2 className="t-heading">First penalty taker</h2>
        <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
          {pens.map((player) => (
            <li key={player.id} className="row">
              <span className="t-label soft">{player.team}</span>
              <span>
                <Link href={`/draft/player/${player.id}`}>{player.name}</Link>
                <span className="t-small soft"> {player.owner}</span>
              </span>
              <span className="nums">{player.xp6.toFixed(1)}</span>
            </li>
          ))}
        </ul>
      </section>

      {pieces.length > 0 ? (
        <section>
          <h2 className="t-heading">Corners and direct free kicks</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
            {pieces.map((player) => (
              <li key={player.id} className="row" style={{ gridTemplateColumns: "4.5rem 1fr auto" }}>
                <span className="t-label soft">{POS[player.position]}</span>
                <span>
                  <Link href={`/draft/player/${player.id}`}>{player.name}</Link>
                  <span className="t-small soft">
                    {" "}
                    {player.cornersOrder === 1 ? "corners" : ""}
                    {player.cornersOrder === 1 && player.fkOrder === 1 ? ", " : ""}
                    {player.fkOrder === 1 ? "direct free kicks" : ""}
                    {" · "}
                    {player.owner}
                  </span>
                </span>
                <span className="nums">{player.availability}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function RateTable({ rows }: { rows: { id: number; name: string; team: string; position: Player["position"]; defconHits: number; defconOf: number; owner: string; xp6: number }[] }) {
  return (
    <div className="scroller">
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Hits</th>
            <th>Six weeks</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((player) => (
            <tr key={player.id}>
              <td className="sticky">
                <Link href={`/draft/player/${player.id}`}>{player.name}</Link>
                <span className="t-label soft"> {player.team} {POS[player.position]}</span>
              </td>
              <td className="nums">{player.defconOf ? `${player.defconHits}/${player.defconOf}` : "-"}</td>
              <td className="nums">{player.xp6.toFixed(1)}</td>
              <td>{player.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
