import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PRICE_WEBSITE_GBP, STOUT_FINDER } from "@/lib/constants";
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
              I build sites for NI businesses too, from £{PRICE_WEBSITE_GBP}
            </a>
          </div>
        </div>
        <div className="rounded-sm bg-studio-surface px-4 py-10 sm:px-10">
          <figure className="mx-auto w-full max-w-[18rem]">
            <a
              href={STOUT_FINDER.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-[2rem] border-2 border-studio-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              <Image
                src="/images/stout-finder/home-390.png"
                alt="Stout Finder on a phone: Who has Beamish on, brand tabs and a dark map of Belfast with pint glasses on the pubs that have it"
                width={390}
                height={844}
                priority
                sizes="(max-width: 640px) 288px, 288px"
                className="h-auto w-full"
              />
            </a>
            <figcaption className="mt-3 text-center text-sm text-studio-faint">
              A screenshot of the live app, Belfast.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
