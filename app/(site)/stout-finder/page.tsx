import { StoutFinder } from "@/components/stout-finder/StoutFinder";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { createPageMetadata } from "@/lib/metadata";
import {
  getRecentConfirmations,
  getStoutFinderStats,
} from "@/lib/stout-finder/queries";
import { CONFIDENCE_LABELS, DRINKS } from "@/lib/stout-finder/types";
import { formatLastSeen } from "@/lib/stout-finder/confidence";
import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata() {
  const stats = await getStoutFinderStats();
  if (!stats.ready) {
    return createPageMetadata({
      title: "Stout Finder",
      description:
        "A map of which pubs in Antrim and Down actually have Beamish, Kilkenny, Murphy's and Guinness on. In build, not live yet.",
      path: "/stout-finder",
    });
  }

  return createPageMetadata({
    title: "Stout Finder - find Beamish, Kilkenny, Murphy's and Guinness near you",
    description:
      "Find Beamish, Kilkenny, Murphy's and Guinness in County Antrim and County Down. Every claim has a last-confirmed date and goes stale on its own.",
    path: "/stout-finder",
  });
}

export default async function StoutFinderPage() {
  const stats = await getStoutFinderStats();
  if (!stats.ready) {
    return (
      <ComingSoon
        eyebrow="Antrim and Down"
        title="STOUT FINDER"
        blurb="A map of which pubs actually have Beamish, Kilkenny, Murphy's and Guinness on, built on reports from people who were in the bar rather than on a brewery list."
        points={[
          "A map and a nearest-first list for Antrim and Down",
          "Filter by Beamish, Kilkenny, Murphy's or Guinness",
          "Every claim carries the date it was last confirmed, and goes stale on its own",
          "Two taps to confirm or deny a pub, no account needed",
          "Add a pub that is missing",
        ]}
        note="The build is done. It is waiting on the pub list being loaded, because a map full of guesses is worse than no map."
        link={{ href: "/stout-finder/add", label: "Add a pub that is missing" }}
      />
    );
  }

  const recent = await getRecentConfirmations(8);

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">ANTRIM AND DOWN</p>
          <h1 className="programme-h1">STOUT FINDER</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            A map of Beamish, Kilkenny, Murphy&apos;s and Guinness that treats last week as
            more useful than last year. Reports come from drinkers, not from
            the brewery.
          </p>
        </header>

        <div className="mt-10">
          <StoutFinder />
        </div>

        <section className="mt-16 border-t border-border pt-10">
          <p className="shell-label text-accent">HOW IT WORKS</p>
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-secondary">
            <p>Someone who was there taps yes or no for each drink.</p>
            <p>The date on that tap is the whole point. Old reports fade.</p>
            <p>Anyone can confirm a pub in two taps. No account.</p>
          </div>
          <p className="mt-6 text-sm text-secondary">
            {stats.pubCount} pubs listed. {stats.confirmedBeamish} with Beamish
            confirmed in the last 90 days.
          </p>
        </section>

        {recent.length > 0 ? (
          <section className="mt-12">
            <p className="shell-label text-accent">RECENTLY CONFIRMED</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recent.map((item) => {
                const drink = DRINKS.find((entry) => entry.id === item.drink);
                return (
                  <li
                    key={`${item.slug}-${item.drink}-${item.lastConfirmedAt}`}
                    className="rounded-[10px] border border-border bg-raised p-4"
                  >
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-sm text-secondary">
                      {drink?.label} · {CONFIDENCE_LABELS[item.confidence]}{" "}
                      {formatLastSeen(item.lastConfirmedAt)}
                    </p>
                    <Link
                      href={`/stout-finder/${item.slug}`}
                      className="mt-2 inline-block text-sm text-accent underline-offset-2 hover:underline"
                    >
                      Open
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <OsmCredit className="mt-12" />
      </div>
    </div>
  );
}
