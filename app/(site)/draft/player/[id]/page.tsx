import Link from "next/link";
import { notFound } from "next/navigation";
import { Cells, Dot, Minutes, POS } from "@/components/analyser/bits";
import { findPlayer } from "@/lib/analyser/data/load";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const found = await findPlayer(Number(id));
    if (!found) return { title: "Player" };
  return {
    title: found.player.name,
    description: `${found.player.name}, ${found.player.team}. Availability ${found.player.availability}, projected ${found.player.xp1} this decision gameweek.`,
  };
  } catch {
    return { title: "Player" };
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  let found;
  try {
    found = await findPlayer(Number(id));
  } catch {
    return <p className="t-body measure">The sheet is waiting on a sync.</p>;
  }
  if (!found) notFound();
  const { player, owner } = found;
  return (
    <article className="stack">
      <header>
        <p className="t-label soft">
          <Link href="/draft/squad">Squad</Link> / {POS[player.position]} {player.team}
        </p>
        <h1 className="t-title" style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
          <Dot score={player.availability} band={player.band} />
          {player.name}
        </h1>
        <p className="t-body measure">{player.summary}</p>
        <p className="t-small soft">
          {owner ? `Owned by ${owner}.` : "Free agent in this league."}
          {player.penaltiesOrder === 1 ? " First penalty taker." : ""}
          {player.cornersOrder === 1 ? " On corners." : ""}
          {player.fkOrder === 1 ? " On direct free kicks." : ""}
          {player.draftRank ? ` Draft rank ${player.draftRank}.` : ""}
          {player.selected != null ? ` Selected by ${player.selected}% in the main game.` : ""}
        </p>
      </header>

      <section>
        <h2 className="t-heading">Why {player.availability}</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {player.parts.map((part) => (
            <li key={part.label} className="row" style={{ gridTemplateColumns: "1fr auto" }}>
              <span>{part.label}</span>
              <span className="nums">{part.value}</span>
            </li>
          ))}
        </ul>
        {player.news ? <p className="t-small">Official note: {player.news}</p> : null}
        {player.returnInDays != null && player.returnInDays > 0 ? (
          <p className="t-small">Expected back in {player.returnInDays} days.</p>
        ) : null}
      </section>

      <section>
        <h2 className="t-heading">Projection</h2>
        <p className="t-body">
          Next decision {player.xp1.toFixed(1)}. Three gameweeks {player.xp3.toFixed(1)}. Six {player.xp6.toFixed(1)}.
          Chance of starting {Math.round(player.pStart * 100)}%, {player.confidence} confidence.
          {player.epNext != null ? ` FPL's ep_next is ${player.epNext}.` : ""}
        </p>
        {player.xpParts.length > 0 ? (
          <ul style={{ listStyle: "none", margin: "0.8rem 0 0", padding: 0 }}>
            {player.xpParts.map((part) => (
              <li key={part.label} className="row" style={{ gridTemplateColumns: "1fr auto" }}>
                <span>{part.label}</span>
                <span className="nums">{part.value > 0 ? "+" : ""}{part.value.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="t-small soft">Blank in the decision week, so that week is 0.</p>
        )}
        <div style={{ marginTop: "0.8rem" }}>
          <Cells cells={player.cells} />
        </div>
        <p className="t-small soft" style={{ marginTop: "0.8rem" }}>
          Last four finished weeks <Minutes values={player.minutesLast4} /> DefCon hits {player.defconHits} of {player.defconOf}. Form {player.form ?? "-"}. Points per game {player.pointsPerGame ?? "-"}. Season points {player.totalPoints}. Moved {player.moves} times in this league.
        </p>
      </section>

      {player.reports.length > 0 ? (
        <section>
          <h2 className="t-heading">Reported, not confirmed</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
            {player.reports.map((item) => (
              <li key={`${item.at}-${item.signal}`} className="row" style={{ gridTemplateColumns: "1fr" }}>
                <span>
                  {item.signal}. {item.quote}{" "}
                  {item.sourceUrl ? (
                    <a className="link" href={item.sourceUrl}>
                      {item.sourceName ?? "Source"}
                    </a>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {player.history.length > 0 ? (
        <section>
          <h2 className="t-heading">Status changes</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
            {player.history.map((item) => (
              <li key={`${item.at}-${item.text}`} className="row" style={{ gridTemplateColumns: "1fr auto" }}>
                <span>{item.text}</span>
                <time className="t-small soft nums" dateTime={item.at}>
                  {item.at.slice(0, 16).replace("T", " ")}
                </time>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {player.livePoints != null ? (
        <p className="t-body">
          This gameweek: {player.livePoints} points, {player.liveMinutes ?? 0} minutes
          {player.provisionalBonus ? `, plus ${player.provisionalBonus} provisional bonus` : ""}.
        </p>
      ) : null}
    </article>
  );
}
