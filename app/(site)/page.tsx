import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/components/studio/case-studies";
import { STUDIO_RHYTHM, STUDIO_WHATSAPP_URL } from "@/components/studio/content";
import { WhatsAppIcon } from "@/components/studio/icons";
import { ProjectPreview } from "@/components/studio/ProjectVisual";
import { QuoteForm } from "@/components/studio/QuoteForm";
import { CONTACT_EMAIL } from "@/lib/constants";
import { GAMES_CATALOG } from "@/lib/games-catalog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Stout Finder, ShelterLink and Rondo, built in Carrickfergus",
  description:
    "RDev Studio is Ryan Davidson in Carrickfergus. He built Stout Finder, ShelterLink for Assisi Animal Sanctuary and Rondo for grassroots football, and builds websites for NI businesses, charities and rescues. Free for registered charities.",
  path: "/",
});

const STOUT_FINDER_URL = "https://stoutfinder.com";

/** Order Ryan asked for: own product in the hero, then these, then games. */
const WORK_SLUGS = ["shelterlink", "rondo", "crosskennan", "rvs-cold-brew", "assisi"] as const;

const WORK = WORK_SLUGS.map((slug) => CASE_STUDIES.find((study) => study.slug === slug)).filter(
  (study): study is CaseStudy => study !== undefined,
);

const GAME_NAMES: Record<string, string> = {
  "champions-draft": "Champions Draft",
  "rugby-draft": "Rugby Draft",
  "pub-quiz": "Pub Quiz",
};

const HANDOVER = [
  { term: "The domain", detail: "It's yours, not mine." },
  { term: "The content", detail: "Every word and photo on the site." },
  { term: "The code", detail: "Handed over at launch along with the site." },
  {
    term: "After launch",
    detail: "An optional care plan if you want me to keep it updated. Nothing more to pay if you don't.",
  },
] as const;

function WorkRow({ study, flip }: { study: CaseStudy; flip: boolean }) {
  const live = study.link?.external ? study.link : undefined;

  return (
    <article className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
      <div className={`min-w-0 md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <ProjectPreview study={study} size="compact" />
      </div>

      <div className={`min-w-0 md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <h3 className="mb-h3 text-[var(--mb-ink)]">
          <Link href={`/work/${study.slug}`} className="mb-title-link">
            {study.name}
          </Link>
        </h3>
        <p className="mb-caption mt-1 text-[var(--mb-tertiary)]">
          {study.context}. {study.status}.
        </p>
        <p className="mb-prose mt-4">{study.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          {live ? (
            <a href={live.href} target="_blank" rel="noopener noreferrer" className="mb-text-link">
              {live.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <Link
            href={`/work/${study.slug}`}
            className="mb-text-link text-[var(--mb-muted)]"
            aria-label={`How I built ${study.name}`}
          >
            How I built it
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero: the named work, then Stout Finder as the one big thing on the page */}
      <section
        aria-labelledby="hero-heading"
        className="mb-shell mb-page-intro grid max-w-6xl gap-10 sm:px-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10"
      >
        <div className="lg:col-span-7 lg:row-start-1">
          <h1 id="hero-heading" className="mb-hero-title max-w-[16ch] text-[var(--mb-ink)]">
            Stout Finder, ShelterLink and Rondo were all built in Carrickfergus.
          </h1>
          <p className="mb-lede mt-6 max-w-[var(--mb-measure)]">
            I&apos;m Ryan Davidson. I design and build websites and web apps for Northern Ireland
            businesses, charities and rescues. Registered charities get theirs free.
          </p>
        </div>

        <a
          href={STOUT_FINDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-hero-shot block w-full max-w-[420px] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:justify-self-end"
          aria-label="Open stoutfinder.com in a new tab"
        >
          <Image
            src="/images/stout-finder/home-390.png"
            alt="Stout Finder home page on a phone: who has Beamish on, with a stout picker and a map of pubs around Belfast."
            width={390}
            height={844}
            sizes="(max-width: 1024px) 420px, 420px"
            priority
            className="block h-auto w-full"
          />
        </a>

        <div className="lg:col-span-7 lg:row-start-2 lg:self-end">
          <p className="mb-h3 text-[var(--mb-ink)]">Stout Finder</p>
          <p className="mb-prose mt-2 max-w-[var(--mb-measure)]">
            My own site. It shows which stouts are on in which pub, from pints people log
            themselves.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={STOUT_FINDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-secondary w-full sm:w-auto"
            >
              Open Stout Finder
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="#quote" className="mb-btn-primary w-full sm:w-auto">
              Ask me for a quote
            </a>
          </div>
        </div>
      </section>

      {/* 2. Client work: alternating rows, real screens where approved */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="mb-section-pad scroll-mt-24 border-t border-[var(--mb-line)]"
      >
        <div className="mb-shell max-w-6xl sm:px-6">
          <h2 id="work-heading" className="mb-h2 max-w-[22ch] text-[var(--mb-ink)]">
            Built for Assisi, Crosskennan Lane and Grove United 3rds
          </h2>
          <p className="mb-body mt-4 max-w-[var(--mb-measure)]">
            Sanctuaries, a football team and a cold brew counter in the Great Northern Mall. Each one
            links to the real thing where it&apos;s public.
          </p>

          <ol className="mt-12 space-y-16 sm:space-y-20">
            {WORK.map((study, index) => (
              <li key={study.slug}>
                <WorkRow study={study} flip={index % 2 === 1} />
              </li>
            ))}

            {/* TODO(ryan): MGSL hub screenshots and a line on what the hub does */}
            <li>
              <article className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
                <div className="min-w-0 md:col-span-7">
                  <div className="mb-todo-box flex aspect-[16/10] items-center justify-center p-6 text-center">
                    PHOTO NEEDED: MGSL hub, a screen from inside after logging in
                  </div>
                </div>
                <div className="min-w-0 md:col-span-5">
                  <h3 className="mb-h3 text-[var(--mb-ink)]">MGSL hub</h3>
                  <p className="mb-caption mt-1 text-[var(--mb-tertiary)]">
                    MGSL, the music and video brand I run with friends. Password protected.
                  </p>
                  <p className="mb-prose mt-4">TODO: one line from Ryan on what the hub does.</p>
                </div>
              </article>
            </li>
          </ol>

          <Link href="/work" className="mb-text-link mt-14">
            Every project, including concept builds for trades and a salon
          </Link>
        </div>
      </section>

      {/* 3. Games: a plain ruled list, small real screenshots */}
      <section
        id="games"
        aria-labelledby="games-heading"
        className="mb-page-intro scroll-mt-24 border-t border-[var(--mb-line)]"
      >
        <div className="mb-shell grid max-w-6xl gap-10 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="games-heading" className="mb-h2 text-[var(--mb-ink)]">
              Games I made that run in your browser
            </h2>
            <p className="mb-body mt-4">
              Free to play, no sign-up. The Lab has the rest, including Longest Word and the Draft
              Analyser.
            </p>
            <Link href="/lab" className="mb-text-link mt-5">
              Everything in the Lab
            </Link>
          </div>

          <ul className="divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] lg:col-span-8">
            {GAMES_CATALOG.map((game) => {
              const name = GAME_NAMES[game.id] ?? game.title;
              return (
                <li key={game.id} className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-5 py-5 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:gap-6">
                  <Image
                    src={game.screenshotSrc}
                    alt={`${name} screenshot`}
                    width={1024}
                    height={576}
                    sizes="160px"
                    className="aspect-[16/9] w-full border border-[var(--mb-line)] object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="mb-step-title text-[var(--mb-ink)]">{name}</h3>
                    <p className="mb-prose mt-1">{game.description}</p>
                  </div>
                  <Link
                    href={game.href}
                    className="mb-text-link col-span-2 sm:col-span-1 sm:justify-self-end"
                  >
                    Play {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. How a job runs (a real sequence) and what you own at the end */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="mb-section-pad scroll-mt-24 border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div className="mb-shell grid max-w-6xl gap-12 sm:px-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="process-heading" className="mb-h2 max-w-[20ch] text-[var(--mb-ink)]">
              A fixed quote in writing, half up front, half at launch
            </h2>
            <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              {STUDIO_RHYTHM.map((item) => (
                <li
                  key={item.step}
                  className="grid gap-2 py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                >
                  <span className="mb-num">{Number(item.step)}</span>
                  <div className="min-w-0 max-w-[var(--mb-measure)]">
                    <p className="mb-step-title">{item.title}</p>
                    <p className="mb-prose mt-1.5">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <h3 className="mb-h3 text-[var(--mb-ink)]">What you own at launch</h3>
            <dl className="mt-6 space-y-5">
              {HANDOVER.map((item) => (
                <div key={item.term}>
                  <dt className="mb-step-title">{item.term}</dt>
                  <dd className="mb-prose mt-1">{item.detail}</dd>
                </div>
              ))}
            </dl>
            <Link href="/services" className="mb-text-link mt-8">
              What I build: websites, social and content
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Ryan and Rudi, then the quote form. Slate: the Naples footer is the page's one light block. */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="mb-section-pad scroll-mt-24 border-t border-[var(--mb-line)] text-[var(--mb-ink)]"
      >
        <div className="mb-shell max-w-6xl sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="grid grid-cols-2 gap-4 lg:col-span-5">
              <figure>
                <Image
                  src="/images/ryan-davidson.jpg"
                  alt="Ryan Davidson in his graduation gown outside the Lanyon Building at Queen's University Belfast."
                  width={752}
                  height={1024}
                  sizes="(max-width: 1024px) 50vw, 240px"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="mb-caption mt-2">
                  Me at Queen&apos;s, MSc in Software Development with Commendation.
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/images/rudi/rudi-scarf.jpg"
                  alt="Rudi, a black and tan dog, wearing an Arsenal scarf at home."
                  width={472}
                  height={631}
                  sizes="(max-width: 1024px) 50vw, 240px"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="mb-caption mt-2">Rudi, in his Arsenal scarf.</figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <h2 id="quote-heading" className="mb-h2 text-[var(--mb-ink)]">
                Ryan and Rudi, Carrickfergus
              </h2>
              <p className="mb-body mt-5 max-w-[var(--mb-measure)]">
                RDev Studio is me. I build for Northern Ireland small businesses, trades, community
                projects and charities, and I check every site on a real phone before it goes live.
                You talk to me the whole way through, by WhatsApp, email or a call.
              </p>
              <p className="mb-body mt-4 max-w-[var(--mb-measure)]">
                Registered charities get their site free. Other rescues and community groups, get in
                touch and we&apos;ll work something out.
              </p>
              <Link href="/about" className="mb-text-link mt-5">
                More about me
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-[var(--mb-line)] pt-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h3 className="mb-h3 text-[var(--mb-ink)]">Tell me what you need</h3>
              <p className="mb-body mt-4">
                Send a short note and I&apos;ll come back with next steps and a fixed quote. WhatsApp
                is quickest if you want to send a link or a photo.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={STUDIO_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-text-link"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  Message me on WhatsApp
                </a>
                <p className="mb-prose">
                  Or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="mb-inline-link">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            <div className="mb-on-surface mb-panel text-[var(--mb-ink)] lg:col-span-7">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
