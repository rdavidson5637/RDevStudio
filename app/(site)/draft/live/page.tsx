import Link from "next/link";
import { Dot, POS } from "@/components/analyser/bits";
import { LiveRefresh } from "@/components/analyser/live-refresh";
import { getAnalyser } from "@/lib/analyser/data/load";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft live",
  description: "Live Academy FC totals, provisional bonus and autosubs for the current gameweek.",
  path: "/draft/live",
});

export default async function Page() {
  let data;
  try {
    data = await getAnalyser();
  } catch {
    return <p className="t-body measure">The sheet is waiting on a sync.</p>;
  }
  const rows = [...data.table].sort((a, b) => b.live - a.live || b.total - a.total);
  return (
    <div className="stack">
      <LiveRefresh />
      <header>
        <p className="t-label soft">{data.current.name}</p>
        <h1 className="t-title">Live totals</h1>
        <p className="t-body measure soft">
          Points already include provisional bonus for matches that are on. Autosubs appear once a starter's fixture is finished on zero minutes. This page refreshes itself every minute.
        </p>
      </header>
      {rows.map((side) => (
        <section key={side.entryId}>
          <h2 className="t-heading">
            {side.name} <span className="nums">{side.live}</span>
            {side.entryId === data.me.entryId ? <span className="t-label"> · you</span> : null}
          </h2>
          {side.subs.length > 0 ? <p className="t-small soft">{side.subs.join(". ")}</p> : null}
          <ul style={{ listStyle: "none", margin: "0.4rem 0 0", padding: 0 }}>
            {side.squad.map((player) => (
              <li key={player.id} className="row">
                <Dot score={player.availability} band={player.band} />
                <span>
                  <Link href={`/draft/player/${player.id}`}>{player.name}</Link>
                  <span className="t-label soft"> {POS[player.position]} {player.pick <= 11 ? "XI" : "bench"}</span>
                  <span className="t-small soft"> {player.liveMinutes ?? 0} min</span>
                </span>
                <span className="nums">
                  {(player.livePoints ?? 0) + player.provisionalBonus}
                  {player.provisionalBonus > 0 ? <span className="t-label soft"> +{player.provisionalBonus}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
