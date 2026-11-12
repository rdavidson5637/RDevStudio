import Link from "next/link";
import { TradeDesk } from "@/components/analyser/trade-desk";
import { getAnalyser } from "@/lib/analyser/data/load";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft league",
  description: "Academy FC standings, title odds, draft value and a same-position trade check.",
  path: "/draft/league",
});

export default async function Page() {
  let data;
  try {
    data = await getAnalyser();
  } catch {
    return <p className="t-body measure">The sheet is waiting on a sync.</p>;
  }
  return (
    <div className="stack">
      <header>
        <p className="t-label soft">{data.classic ? "Classic scoring" : "Head to head"}</p>
        <h1 className="t-title">{data.leagueName}</h1>
        <p className="t-body measure soft">
          {data.classic
            ? "There is no weekly opponent. The race is the total. Title odds below assume every side plays its best legal XI from here, for the rest of the season."
            : "Head to head fixtures are in the database. The table is still the season race."}
        </p>
      </header>

      <section>
        <h2 className="t-heading">Fit cover</h2>
        <p className="t-small soft">The first number is players at 60 or above. The second is how many they own at that position.</p>
        <div className="scroller">
          <table className="table">
            <thead>
              <tr>
                <th>Team</th>
                <th>GK</th>
                <th>DEF</th>
                <th>MID</th>
                <th>FWD</th>
                <th>Reds</th>
                <th>XI</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((side) => (
                <tr key={side.entryId}>
                  <td>{side.name}</td>
                  {([1, 2, 3, 4] as const).map((position) => {
                    const line = side.squad.filter((player) => player.position === position);
                    const fit = line.filter((player) => player.availability >= 60).length;
                    return (
                      <td key={position} className="nums">
                        {fit}/{line.length}
                      </td>
                    );
                  })}
                  <td className="nums">{side.reds}</td>
                  <td className="nums">{side.projected.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="t-heading">Rivals</h2>
        <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
          {data.table.map((side) => (
            <li key={side.entryId} style={{ borderTop: "1px solid var(--color-line)", padding: "0.9rem 0" }}>
              <div className="row" style={{ border: 0, padding: 0 }}>
                <span className="nums">{side.rank ?? "-"}</span>
                <span>
                  <span className="t-heading">{side.name}</span>
                  <span className="t-small soft"> {side.manager} · waiver {side.waiver ?? "-"} · {side.reds} red · {side.thin.length ? `thin at ${side.thin.join(", ")}` : "fit cover in every line"}</span>
                </span>
                <span className="nums">{side.total}</span>
              </div>
              <p className="t-small" style={{ margin: "0.35rem 0 0" }}>
                {side.squad.slice(0, 11).map((player, index) => (
                  <span key={player.id}>
                    {index > 0 ? ", " : ""}
                    <Link href={`/draft/player/${player.id}`}>{player.name}</Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="t-heading">Title odds, {data.seasonWeeks} gameweeks left</h2>
        <div className="scroller">
          <table className="table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Title</th>
                <th>Top 4</th>
                <th>Projected</th>
                <th>Mean rank</th>
              </tr>
            </thead>
            <tbody>
              {data.season.map((row) => (
                <tr key={row.entryId}>
                  <td>{row.name}</td>
                  <td className="nums">{Math.round(row.titlePct * 100)}%</td>
                  <td className="nums">{Math.round(row.topFourPct * 100)}%</td>
                  <td className="nums">{Math.round(row.projectedTotal)}</td>
                  <td className="nums">{row.meanRank.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="t-small soft">4,000 runs. Each week is drawn around that side's current projected XI, so a waiver changes the odds the next time the data refreshes.</p>
      </section>

      <section>
        <h2 className="t-heading">A trade</h2>
        <TradeDesk pool={data.tradePool} myEntryId={data.me.entryId} />
      </section>

      <section>
        <h2 className="t-heading">Draft, against players of a similar rank</h2>
        <div className="scroller">
          <table className="table">
            <thead>
              <tr><th>Value</th><th></th><th>Busts</th><th></th></tr>
            </thead>
            <tbody>
              {data.postBest.map((row, index) => {
                const worst = data.postWorst[index];
                return (
                  <tr key={row.id}>
                    <td><Link href={`/draft/player/${row.id}`}>{row.name}</Link> <span className="t-small soft">{row.owner}</span></td>
                    <td className="nums">{row.value > 0 ? "+" : ""}{row.value}</td>
                    <td>{worst ? <Link href={`/draft/player/${worst.id}`}>{worst.name}</Link> : null}</td>
                    <td className="nums">{worst ? worst.value : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="t-small soft">Value is points minus the average of players within 25 places of draft rank. Positive means they have outscored that band.</p>
      </section>
    </div>
  );
}
