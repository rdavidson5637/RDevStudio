import Image from "next/image";
import Link from "next/link";
import { Pitch } from "@/components/home/Pitch";
import { UnderTheHood } from "@/components/home/UnderTheHood";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { STOUT_FINDER } from "@/lib/constants";
import { getStoutFinderPubCount } from "@/lib/stout-finder-stats";
import { createPageMetadata } from "@/lib/metadata";
import stoutFinderPhone from "@/public/images/stout-finder/home-390.png";

export const metadata = createPageMetadata({
  title: "The Lab - Stout Finder, games, and browser tools",
  description:
    "Stout Finder, Champions Draft, Rugby Draft, Pub Quiz, Longest Word, Draft Analyser, and free small-business tools built by Ryan Davidson.",
  path: "/lab",
});

export default async function LabPage() {
  const pubCount = await getStoutFinderPubCount();

  return (
    <div className="bg-studio-bg text-studio-text">
      <Section className="border-b border-studio-line">
        <h1 className="display-lg max-w-[16ch] text-balance text-studio-text">
          The Lab
        </h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Games, tools, and live web products I build and run outside client work. Everything here is free to use in the browser.
        </p>
      </Section>

      <Section
        id="stout-finder"
        heading="Stout Finder"
        intro="Which pubs have Beamish, Guinness, Murphy's, and the rest on, and when someone last checked. It lives at stoutfinder.com."
        className="border-b border-studio-line"
      >
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="type-body max-w-prose text-studio-text">
              Someone in the pub says what is on. Every report is dated, and old reports fade when you open the page, so an old yes is never shown as a fresh one.
            </p>
            <p className="type-body mt-4 max-w-prose text-studio-muted">
              {pubCount
                ? `${pubCount.toLocaleString("en-GB")} pubs across the UK, from OpenStreetMap.`
                : "Every pub in the UK, from OpenStreetMap."}{" "}
              The ones with a recent report show up as a pint.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href={STOUT_FINDER.href}>Open Stout Finder</Button>
            </div>
          </div>

          <div className="border border-studio-border bg-studio-surface px-4 py-10 sm:px-10">
            <figure className="mx-auto w-full max-w-[18rem]">
              <a
                href={STOUT_FINDER.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-[2rem] border-2 border-studio-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              >
                <Image
                  src={stoutFinderPhone}
                  placeholder="blur"
                  alt="Stout Finder on a phone showing brand tabs and a dark map of Belfast with pint glasses on pubs"
                  sizes="288px"
                  className="h-auto w-full"
                />
              </a>
              <figcaption className="mt-3 text-center text-sm text-studio-faint">
                Live app at stoutfinder.com, Belfast.
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Pitch showSoon={false} />

      <section className="border-t border-studio-line">
        <div className="mx-auto grid max-w-studio gap-6 px-6 py-12 md:grid-cols-2 md:px-8">
          <Link
            href="/toolkit"
            className="group flex flex-col justify-between border border-studio-border bg-studio-surface p-6 transition-colors hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            <div>
              <h2 className="font-studio-display text-2xl text-studio-text">
                Business and developer toolkit
              </h2>
              <p className="type-body mt-2 text-studio-muted">
                Free website graders, SEO and accessibility checkers, QR code and invoice generators.
              </p>
            </div>
            <span className="mt-6 text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 group-hover:text-studio-accent">
              Open toolkit
            </span>
          </Link>

          <Link
            href="/interactive"
            className="group flex flex-col justify-between border border-studio-border bg-studio-surface p-6 transition-colors hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            <div>
              <h2 className="font-studio-display text-2xl text-studio-text">
                Interactive tools
              </h2>
              <p className="type-body mt-2 text-studio-muted">
                Browser tools for parties, pub nights, and group decisions: wheels, brackets, tier lists, and bingo.
              </p>
            </div>
            <span className="mt-6 text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 group-hover:text-studio-accent">
              Open interactive tools
            </span>
          </Link>
        </div>
      </section>

      <UnderTheHood />

      <Section className="border-t border-studio-line">
        <h2 className="display-lg max-w-[24ch] text-balance text-studio-text">
          Want something built for your business or rescue?
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/contact">Get a fixed quote</Button>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-base font-medium text-studio-text underline decoration-studio-border-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            See the work
          </Link>
        </div>
      </Section>
    </div>
  );
}
