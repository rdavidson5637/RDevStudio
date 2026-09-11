import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { EmptyState } from "@/components/draft/EmptyState";
import { SectionHeading } from "@/components/draft/SectionHeading";
import { hasSyncedOnce } from "@/lib/draft/queries";

export const metadata = createPageMetadata({
  title: "Draft Analyser",
  description:
    "A live Fantasy Premier League Draft analyser: squad board, availability radar, waiver wire and league intelligence, built on public FPL data.",
  path: "/draft",
});

export default async function DraftOverviewPage() {
  const synced = await hasSyncedOnce();

  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
        A public, read-only draft league analyser — live gameweek tracking, an
        availability model, and projected points, all built from data the FPL
        Draft API already publishes. No login, no scraping.
      </p>

      {!synced ? (
        <EmptyState />
      ) : (
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
        </div>
      )}
    </div>
  );
}
