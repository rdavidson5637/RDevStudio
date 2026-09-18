import { StoutFinder } from "@/components/stout-finder/StoutFinder";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";
import {
  getRecentConfirmations,
  getStoutFinderStats,
} from "@/lib/stout-finder/queries";
import { CONFIDENCE_LABELS, DRINKS } from "@/lib/stout-finder/types";
import { formatLastSeen } from "@/lib/stout-finder/confidence";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Stout Finder - find Beamish, Murphy's and Guinness near you",
  description:
    "Find Beamish, Murphy's and Guinness in County Antrim and County Down. Every claim has a last-confirmed date and goes stale on its own.",
  path: "/stout-finder",
});

export const revalidate = 3600;

export default async function StoutFinderPage() {
  const [stats, recent] = await Promise.all([
    getStoutFinderStats(),
    getRecentConfirmations(8),
  ]);

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">ANTRIM AND DOWN</p>
          <h1 className="programme-h1">STOUT FINDER</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            A map of Beamish, Murphy's and Guinness that treats last week as
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
            <p>Someone who was there taps yes or no for each stout.</p>
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
