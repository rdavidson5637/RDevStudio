import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { DRAFT_CTAS } from "@/lib/content/redesign-draft";
import ryanPhoto from "@/public/images/ryan-davidson.jpg";
import rudiPhoto from "@/public/images/rudi/rudi-scarf.jpg";

export function AboutLabTeaser() {
  return (
    <Section className="border-t border-studio-line">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <h2 className="display-lg text-balance text-studio-text">
            One person in Carrickfergus. You deal with me.
          </h2>
          <p className="type-body mt-5 max-w-prose text-studio-muted">
            I&apos;m Ryan Davidson. I finished my MSc in Software Development at Queen&apos;s University Belfast with Commendation, and by day I handle casework in the UK Civil Service. I design and build every site here myself, from the first call to the live domain.
          </p>
          <p className="type-body mt-4 max-w-prose text-studio-muted">
            No account managers, no hand-offs, and no mystery retainers. You get my email and WhatsApp, a fixed quote in writing, and a site that works properly on a phone.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center text-base font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              More about me
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden border border-studio-line bg-studio-surface">
                <Image
                  src={ryanPhoto}
                  placeholder="blur"
                  loading="eager"
                  alt="Ryan Davidson in graduation gown outside Queen's University Belfast"
                  fill
                  sizes="(max-width: 640px) 45vw, 240px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-2 text-xs text-studio-faint">
                Ryan. MSc Software Development, Queen&apos;s.
              </figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden border border-studio-line bg-studio-surface">
                <Image
                  src={rudiPhoto}
                  placeholder="blur"
                  loading="eager"
                  alt="Rudi, a Border Collie, wearing an Arsenal scarf"
                  fill
                  sizes="(max-width: 640px) 45vw, 240px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-2 text-xs text-studio-faint">
                Rudi, adopted from Assisi Animal Sanctuary.
              </figcaption>
            </figure>
          </div>
        </div>

        <aside
          aria-label="The Lab teaser"
          className="border border-studio-border bg-studio-surface p-6 md:p-8"
        >
          <p className="text-sm font-bold text-studio-muted">The Lab</p>
          <h3 className="mt-2 font-studio-display text-3xl text-studio-text">
            Games, Stout Finder, and browser tools
          </h3>
          <p className="type-body mt-3 text-studio-muted">
            Alongside client websites, I build and run Stout Finder (a live UK stout map at stoutfinder.com), football and rugby draft games, a multiplayer pub quiz, and free small-business tools.
          </p>
          <div className="mt-6 border-t border-studio-line pt-4">
            <Link
              href="/lab"
              className="inline-flex min-h-11 items-center text-base font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              {DRAFT_CTAS.lab}
            </Link>
          </div>
        </aside>
      </div>
    </Section>
  );
}
