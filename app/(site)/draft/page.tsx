import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";
import { SectionHeading } from "@/components/draft/SectionHeading";
import { FixtureTicker } from "@/components/draft/FixtureTicker";
import { StatusTimeline } from "@/components/draft/StatusTimeline";
import { hasSyncedOnce, getCurrentEvent } from "@/lib/draft/queries";
import { getSquad } from "@/lib/draft/squad";
import { getTeamsAndFixtures } from "@/lib/draft/fixtures";
import { buildTickerRow } from "@/lib/draft/ticker";
import { getStatusTimeline } from "@/lib/draft/timeline";
import { getRecentNews } from "@/lib/draft/news/queries";
import { ReportedNews } from "@/components/draft/ReportedNews";

export const metadata = createPageMetadata({
  title: "Draft Analyser",
  description:
    "A live Fantasy Premier League Draft analyser: squad board, availability radar, waiver wire and league intelligence, built on public FPL data.",
  path: "/draft",
});

export default async function DraftOverviewPage() {
  const synced = await hasSyncedOnce();
  if (!synced) return <EmptyState />;

  const event = await getCurrentEvent();
  let ticker = null;
  if (event) {
    try {
      const entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
      const [squad, { byTeam }] = await Promise.all([
        getSquad(entryId, event.id),
        getTeamsAndFixtures(event.id, 6),
      ]);
      ticker = squad.map((p) => ({
        id: p.id,
        name: p.webName,
        teamId: p.teamId,
        teamShortName: p.teamShortName,
        position: p.position,
        cells: buildTickerRow(byTeam.get(p.teamId) ?? [], event.id, 6),
      }));
    } catch {
      ticker = null;
    }
  }

  const [timeline, news] = await Promise.all([getStatusTimeline(12), getRecentNews(8)]);

  return (
    <div className="space-y-10">
      <p className="max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
        A public, read-only draft league analyser - live gameweek tracking, an
        availability model, and projected points, all built from data the FPL
        Draft API already publishes. No login, no scraping.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/draft/squad"
          className="rounded-lg border border-border bg-raised p-5 transition-colors hover:border-accent"
        >
          <SectionHeading kicker="Your team">Squad board</SectionHeading>
          <p className="text-sm text-secondary">
            Your 15, availability, next fixture and projected points.
          </p>
        </Link>
        <Link
          href="/draft/waivers"
          className="rounded-lg border border-border bg-raised p-5 transition-colors hover:border-accent"
        >
          <SectionHeading kicker="The pool">Waiver wire</SectionHeading>
          <p className="text-sm text-secondary">
            Every free agent in the league, ranked by projected points.
          </p>
        </Link>
        <Link
          href="/draft/league"
          className="rounded-lg border border-border bg-raised p-5 transition-colors hover:border-accent"
        >
          <SectionHeading kicker="The table">League intel</SectionHeading>
          <p className="text-sm text-secondary">
            Rival squads, trades, a season sim and the draft post-mortem.
          </p>
        </Link>
        <Link
          href="/draft/live"
          className="rounded-lg border border-border bg-raised p-5 transition-colors hover:border-accent"
        >
          <SectionHeading kicker="In play">Live gameweek</SectionHeading>
          <p className="text-sm text-secondary">
            Live points, BPS and a provisional bonus call.
          </p>
        </Link>
      </div>

      {ticker && ticker.length > 0 ? (
        <section>
          <SectionHeading kicker="Fixtures">Ticker</SectionHeading>
          <div className="mt-4">
            <FixtureTicker players={ticker} mode="squad" />
          </div>
        </section>
      ) : null}

      {news.length > 0 ? <ReportedNews items={news} /> : null}

      <section>
        <SectionHeading kicker="Movement">Status timeline</SectionHeading>
        <div className="mt-4">
          <StatusTimeline events={timeline} />
        </div>
      </section>
    </div>
  );
}
