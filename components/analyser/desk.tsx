import Link from "next/link";
import { Cells, Dot, PlayerLink, relativeTime } from "@/components/analyser/bits";
import { Countdown } from "@/components/analyser/countdown";
import { deadlineFlags } from "@/lib/analyser/draft/checklist";
import type { Analyser } from "@/lib/analyser/data/types";

export function Desk({ data }: { data: Analyser }) {
  const deadline = data.deadlinePassed && data.next ? data.next.deadline : data.current.deadline;
  const deadlineLabel = data.deadlinePassed && data.next ? data.next.name : data.current.name;
  const move = data.moves[0];

  return (
    <div className="stack">
      <header>
        <p className="t-label soft">
          {data.current.name}
          {data.deadlinePassed ? " · in play" : ""}
          {" · "}
          data {relativeTime(data.updatedAt)}
        </p>
        <h1 className="t-display" style={{ margin: "0.4rem 0 0.8rem" }}>
          {data.headline}
        </h1>
        <p className="t-body measure soft">{data.standfirst}</p>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn" href={data.primary.href}>
            {data.primary.label}
          </Link>
        </p>
      </header>

      <Deadline data={data} deadline={deadline} deadlineLabel={deadlineLabel} />

      <section>
        <h2 className="t-title">The table</h2>
        <p className="t-small soft">The right-hand number is this gameweek, including provisional bonus and autosubs once a starter's match is over on 0 minutes. The quieter number is the season total.</p>
        <div className="row" style={{ borderTop: "none", gridTemplateColumns: "2.5rem 1fr auto auto" }}>
          <span />
          <span className="t-label soft">Team</span>
          <span className="t-label soft">Total</span>
          <span className="t-label soft">GW</span>
        </div>
        <ol style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
          {data.table.map((side) => (
            <li key={side.entryId} className="row" style={{ gridTemplateColumns: "2.5rem 1fr auto auto" }}>
              <span className="nums t-heading">{side.rank ?? "-"}</span>
              <span>
                <span className="t-heading">{side.name}</span>
                <span className="t-small soft"> {side.manager}</span>
                {side.entryId === data.me.entryId ? <span className="t-label"> · you</span> : null}
              </span>
              <span className="nums t-small soft">{side.total}</span>
              <span className="nums t-heading">{side.live}</span>
            </li>
          ))}
        </ol>
      </section>

      {data.flagged.length > 0 ? (
        <section>
          <h2 className="t-title">Flags in your 15</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
            {data.flagged.map((player) => (
              <li key={player.id} className="row">
                <Dot score={player.availability} band={player.band} />
                <span>
                  <PlayerLink player={player} />
                  <span className="t-small soft"> {player.summary}</span>
                </span>
                <span className="nums">{player.availability}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {move ? (
        <section>
          <h2 className="t-title">Best waiver, next six</h2>
          <p className="t-body measure">
            <Link className="link" href={`/draft/player/${move.add.id}`}>{move.add.name}</Link>
            {" "}for{" "}
            <Link className="link" href={`/draft/player/${move.drop.id}`}>{move.drop.name}</Link>
            {". "}
            Net {move.net > 0 ? "+" : ""}
            {move.net} projected points over six gameweeks.
            {move.coverRisk ? " Dropping them leaves no fit cover at the position." : ""}
          </p>
          <div style={{ marginTop: "0.8rem" }}>
            <Cells cells={move.add.cells} />
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="t-title">Your six</h2>
        <div className="scroller" style={{ marginTop: "1rem" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Player</th>
                {data.horizon.map((event) => (
                  <th key={event}>GW{event}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.me.squad.map((player) => (
                <tr key={player.id}>
                  <td className="sticky"><PlayerLink player={player} /></td>
                  {player.cells.map((cell) => (
                    <td key={cell.event}>
                      {cell.chips.length === 0 ? <span className="blank">Blank</span> : cell.chips.map((chip) => <span key={chip.opponent} style={{ display: "block", marginBottom: "0.2rem" }}><FdrInline chip={chip} /></span>)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {data.reported.length > 0 ? (
        <section>
          <h2 className="t-title">Reported, not confirmed</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
            {data.reported.map((item) => (
              <li key={`${item.id}-${item.at}`} className="row" style={{ gridTemplateColumns: "1fr" }}>
                <span>
                  <Link href={`/draft/player/${item.id}`}>{item.name}</Link>
                  <span className="t-small soft"> {item.signal}. {item.quote}</span>
                  {item.sourceUrl ? (
                    <>
                      {" "}
                      <a className="link" href={item.sourceUrl}>
                        {item.sourceName ?? "Source"}
                      </a>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.timeline.length > 0 ? (
        <section>
          <h2 className="t-title">What changed</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
            {data.timeline.map((event, index) => (
              <li key={`${event.id}-${event.at}-${index}`} className="row" style={{ gridTemplateColumns: "1fr auto" }}>
                <span>
                  <Link href={`/draft/player/${event.id}`}>{event.name}</Link>
                  <span className="t-small soft"> {event.text}</span>
                </span>
                <time className="t-small soft nums" dateTime={event.at}>
                  {relativeTime(event.at)}
                </time>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Deadline({ data, deadline, deadlineLabel }: { data: Analyser; deadline: string; deadlineLabel: string }) {
  const flags = deadlineFlags({
    savedXi: data.me.squad
      .filter((player) => player.pick <= 11)
      .map((player) => ({
        name: player.name,
        availability: player.availability,
        blank: (player.cells.find((cell) => cell.event === data.decisionEventId)?.chips.length ?? 0) === 0,
      })),
    thin: data.me.thin,
  });
  return (
    <section>
      <h2 className="t-title">Before the deadline</h2>
      <p className="t-small">
        <span className="t-label soft">{deadlineLabel} deadline </span>
        <Countdown
          deadline={deadline}
          initial={new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London",
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(deadline))}
        />
      </p>
      <p className="t-small soft">
        {data.deadlinePassed
          ? "This gameweek is locked. The list checks the saved XI against the next deadline."
          : "The saved XI, checked for flags and blanks."}{" "}
        Nothing here is sent as an email. Set the side in the draft app.
      </p>
      {flags.length === 0 ? (
        <p className="t-body">The saved XI is fit, and every starter has a fixture.</p>
      ) : (
        <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0 }}>
          {flags.map((flag) => (
            <li key={flag.text} className="row" style={{ gridTemplateColumns: "1fr" }}>
              <span className={flag.tone === "warn" ? "soft" : undefined}>{flag.text}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FdrInline({ chip }: { chip: import("@/lib/analyser/data/types").Chip }) {
  return (
    <span className="fdr nums" data-d={chip.fdr}>
      {chip.fdr} {chip.opponent} {chip.side}
    </span>
  );
}
