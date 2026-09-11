import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";
import { SectionHeading } from "@/components/draft/SectionHeading";
import { WaiverBoard } from "@/components/draft/WaiverBoard";
import { getCurrentEvent } from "@/lib/draft/queries";
import { getWaiverBoard } from "@/lib/draft/waivers";

export const metadata = createPageMetadata({
  title: "Waiver Wire",
  description: "Every unowned player in the league, ranked by projected points over the next 3 and 6 gameweeks.",
  path: "/draft/waivers",
});

export default async function WaiverWirePage() {
  const event = await getCurrentEvent();
  if (!event) return <EmptyState />;

  let entryId: number;
  try {
    entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
  } catch {
    return <EmptyState title="FPL_DRAFT_ENTRY_ID not set" />;
  }

  const board = await getWaiverBoard(event.id, entryId);
  if (board.players.length === 0) {
    return (
      <EmptyState title="No free agents yet">
        Ownership has to sync before the wire fills in. Check back after the daily job.
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <SectionHeading kicker="The pool">Waiver wire</SectionHeading>
        <p className="mt-3 max-w-2xl text-sm text-secondary">
          Available here means unowned in this league, not in the global FPL pool. Projections
          come from the model on{" "}
          <a href="/draft/how-it-works" className="text-primary underline decoration-border-strong underline-offset-4 hover:text-accent">
            How it&apos;s built
          </a>
          .
        </p>
      </div>
      <WaiverBoard board={board} />
    </div>
  );
}
