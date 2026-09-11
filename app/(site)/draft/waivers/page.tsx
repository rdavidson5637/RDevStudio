import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";

export const metadata = createPageMetadata({
  title: "Waiver Wire",
  description: "Every unowned player in the league, ranked by projected points over the next 3 and 6 gameweeks.",
  path: "/draft/waivers",
});

export default function WaiverWirePage() {
  return (
    <EmptyState title="Waiver wire — coming soon">
      Free agent rankings, drop pairings and trending pickups land here next.
    </EmptyState>
  );
}
