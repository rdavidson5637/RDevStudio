import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";
import { LeagueBoard } from "@/components/draft/LeagueBoard";
import { getCurrentEvent } from "@/lib/draft/queries";
import { getLeagueBoard } from "@/lib/draft/league";

export const metadata = createPageMetadata({
  title: "League",
  description: "Rival squads, matchup predictions, trade analysis and the season simulator.",
  path: "/draft/league",
});

export default async function DraftLeaguePage() {
  const event = await getCurrentEvent();
  if (!event) return <EmptyState />;

  let leagueId: number;
  let entryId: number;
  try {
    const config = await import("@/lib/fpl/config");
    leagueId = config.FPL_DRAFT_LEAGUE_ID;
    entryId = config.FPL_DRAFT_ENTRY_ID;
  } catch {
    return <EmptyState title="FPL league env vars not set" />;
  }

  const board = await getLeagueBoard(event.id, leagueId, entryId);
  if (board.teams.length === 0) {
    return (
      <EmptyState title="League not synced">
        Rival squads appear after the daily sync has stored picks for every entry.
      </EmptyState>
    );
  }

  return <LeagueBoard board={board} />;
}
