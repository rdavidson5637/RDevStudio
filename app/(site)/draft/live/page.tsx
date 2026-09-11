import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";

export const metadata = createPageMetadata({
  title: "Live Gameweek",
  description: "Live points per player, provisional bonus and live H2H scorelines as the gameweek plays out.",
  path: "/draft/live",
});

export default function DraftLivePage() {
  return (
    <EmptyState title="Live gameweek tracker — coming soon">
      Live points, provisional bonus and a live win probability land here once the in-play cron is built.
    </EmptyState>
  );
}
