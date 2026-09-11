import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";

export const metadata = createPageMetadata({
  title: "League",
  description: "Rival squads, matchup predictions, trade analysis and the season simulator.",
  path: "/draft/league",
});

export default function DraftLeaguePage() {
  return (
    <EmptyState title="League intelligence — coming soon">
      Rival squad scanner, matchup predictor, trade analyser and season
      simulator land here next.
    </EmptyState>
  );
}
