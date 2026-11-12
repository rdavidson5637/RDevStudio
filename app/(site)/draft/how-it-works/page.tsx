import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft method",
  description: "How the Academy FC draft analyser scores availability, projects points, and simulates the table.",
  path: "/draft/how-it-works",
});

export default function Page() {
  return (
    <article className="stack">
      <header>
        <p className="t-label soft">Method</p>
        <h1 className="t-title">What the numbers are doing</h1>
        <p className="t-body measure">
          The browser never calls the Fantasy Premier League. An hourly job writes the public draft API into Postgres. Pages read that. The live page is the exception: it refreshes the current gameweek from the draft live endpoint, at most once a minute.
        </p>
      </header>

      <section>
        <h2 className="t-heading">Availability, 0 to 100</h2>
        <p className="t-body measure">
          The official status is the base: available 100, doubt 55, injured 5, suspended or unavailable 0, not in the squad 15. If FPL publish a chance of playing, that is blended in at 45%. A news phrase such as hamstring or ruptured takes points off, and the penalty fades after three weeks. The last four finished gameweeks move the score by up to 10 if minutes are rising or falling. A reported training signal can nudge it, and is labelled reported. An injured player cannot be pushed into the green by a report.
        </p>
      </section>

      <section>
        <h2 className="t-heading">Projected points</h2>
        <p className="t-body measure">
          Chance of starting is availability times how often they have actually played. A fit player with no starts stays a cameo. Under 40 availability the chance is capped, so a red flag projects near zero. Per-90 rates from fewer than about five games are shrunk, so a three-minute cameo cannot look like a goal a week. Expected minutes feed goals, assists, appearance points, bonus, cards and goals conceded. Clean sheets use a Poisson chance of zero from the opponent's expected goals, and only goalkeepers and defenders get them. Defensive contribution uses the hit rate over the recent gameweeks against the published threshold. Scoring values come from the draft settings block, with last season's numbers only as a fallback. For players with a points-per-game record, 60% of the projection is that record adjusted for the fixture, and 40% is the bottom-up model. Double gameweeks add both fixtures. A blank is zero, and it is drawn as a blank cell rather than skipped.
        </p>
      </section>

      <section>
        <h2 className="t-heading">The league</h2>
        <p className="t-body measure">
          Academy FC is classic scoring, so there is no head-to-head fixture list. The season table is 4,000 draws of the remaining gameweeks around each side's current best XI. Title means finishing first. Top four is a points cut, not a playoff the league has published. Draft value compares a player's points with others within 25 places of their draft rank. Trades are checked same-position so the 2, 5, 5, 3 squad shape holds. Nothing on this site submits a waiver or a lineup.
        </p>
      </section>

      <section>
        <h2 className="t-heading">Reported news</h2>
        <p className="t-body measure">
          Twice a day the news job reads the BBC Premier League feed. If an API key is set, one model call proposes a signal, and the quote has to appear in the article before it is stored. Until that key is set, the job records nothing. A stored line is labelled reported, with the source link, and it never overwrites the official FPL note.
        </p>
      </section>

      <section>
        <h2 className="t-heading">Schedule</h2>
        <p className="t-small">/api/cron/sync hourly. /api/cron/live every five minutes. /api/cron/news at 07:00 and 19:00 UTC. All three need the bearer cron secret.</p>
      </section>
    </article>
  );
}
