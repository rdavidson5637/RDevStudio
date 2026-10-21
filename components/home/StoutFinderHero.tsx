import { Button } from "@/components/ui/Button";
import { StoutFinderMock } from "@/components/home/StoutFinderMock";
import { STOUT_FINDER } from "@/lib/constants";
import { getStoutFinderPubCount } from "@/lib/stout-finder-stats";

export async function StoutFinderHero() {
  const count = await getStoutFinderPubCount();

  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-studio items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="font-studio-sans text-lg text-studio-muted">I built Stout Finder</p>
          <h1 className="display-xl mt-3 max-w-[12ch] text-balance text-studio-text">Who has Beamish on?</h1>
          <p className="type-body mt-6 max-w-prose text-studio-text">
            Someone in the pub says what&apos;s on. Every report is dated, and old reports fade, so the map stays honest.
          </p>
          <p className="type-body mt-4 max-w-prose text-studio-muted">
            {count
              ? `${count.toLocaleString("en-GB")} pubs across the UK, from OpenStreetMap.`
              : "Every pub in the UK, from OpenStreetMap."}{" "}
            The ones with a recent report show up as a pint.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={STOUT_FINDER.href}>Open Stout Finder</Button>
            <a
              href="#offer"
              className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:text-studio-accent hover:decoration-studio-accent"
            >
              I build sites for NI businesses too
            </a>
          </div>
        </div>
        <div className="rounded-sm bg-studio-surface px-4 py-10 sm:px-10">
          <StoutFinderMock />
        </div>
      </div>
    </section>
  );
}
