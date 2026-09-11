import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";
import { LiveBoard } from "@/components/draft/LiveBoard";
import { getCurrentEvent } from "@/lib/draft/queries";
import { getLiveBoard } from "@/lib/draft/live";

export const metadata = createPageMetadata({
  title: "Live Gameweek",
  description: "Live points per player, provisional bonus and live H2H scorelines as the gameweek plays out.",
  path: "/draft/live",
});

export default async function DraftLivePage() {
  const event = await getCurrentEvent();
  if (!event) return <EmptyState />;

  let entryId: number;
  try {
    entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
  } catch {
    return <EmptyState title="FPL_DRAFT_ENTRY_ID not set" />;
  }

  try {
    const board = await getLiveBoard(event.id, entryId);
    return <LiveBoard board={board} myEntryId={entryId} eventId={event.id} />;
  } catch {
    return (
      <EmptyState title="Live feed unavailable">
        The draft live endpoint did not respond. Try again once the gameweek is in play.
      </EmptyState>
    );
  }
}
