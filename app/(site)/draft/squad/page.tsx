import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";
import { StatTile } from "@/components/draft/StatTile";
import { SquadBoardClient } from "@/components/draft/SquadBoardClient";
import { getCurrentEvent } from "@/lib/draft/queries";
import { getSquad } from "@/lib/draft/squad";

export const metadata = createPageMetadata({
  title: "Squad Board",
  description: "Your 15 - availability, next fixture and projected points, as a pitch view or a sortable table.",
  path: "/draft/squad",
});

export default async function SquadBoardPage() {
  const event = await getCurrentEvent();
  if (!event) return <EmptyState />;

  let entryId: number;
  try {
    const config = await import("@/lib/fpl/config");
    entryId = config.FPL_DRAFT_ENTRY_ID;
  } catch {
    return <EmptyState title="FPL_DRAFT_ENTRY_ID not set" />;
  }

  const squad = await getSquad(entryId, event.id);
  if (squad.length === 0) return <EmptyState />;

  const xi = squad.filter((p) => p.pickPosition <= 11);
  const bench = squad.filter((p) => p.pickPosition > 11);

  const projectedTotal = xi.reduce((sum, p) => sum + (p.projectedPoints ?? 0), 0);
  const flaggedCount = xi.filter((p) => p.availabilityScore < 75).length;
  const fdrValues = xi.map((p) => p.nextFixture?.difficulty).filter((d): d is number => d != null);
  const avgFdr = fdrValues.length > 0 ? fdrValues.reduce((a, b) => a + b, 0) / fdrValues.length : null;
  const benchStrength = bench.reduce((sum, p) => sum + (p.projectedPoints ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Projected XI" value={projectedTotal.toFixed(1)} />
        <StatTile label="Flagged in XI" value={flaggedCount} />
        <StatTile label="Avg next FDR" value={avgFdr != null ? avgFdr.toFixed(1) : "—"} />
        <StatTile label="Bench strength" value={benchStrength.toFixed(1)} />
      </div>

      <SquadBoardClient squad={squad} />
    </div>
  );
}
