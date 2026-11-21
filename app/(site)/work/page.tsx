import Link from "next/link";
import { CASE_STUDIES } from "@/components/studio/case-studies";
import { STUDIO_WHATSAPP_URL } from "@/components/studio/content";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
} from "@/components/studio/icons";
import { ProjectRow, StackLine } from "@/components/studio/ProjectRow";
import { CaseShowcase } from "@/components/studio/ProjectVisual";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work and case studies",
  description:
    "Client and charity case studies, plus local-business concept builds by Ryan Davidson at RDev Studio.",
  path: "/work",
  ogImage: "/work/opengraph-image",
});

function pad(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

export default function WorkPage() {
  const clientWork = CASE_STUDIES.filter((study) => study.group !== "concept");
  const conceptWork = CASE_STUDIES.filter((study) => study.group === "concept");
  const [featured, ...otherClientWork] = clientWork;

  return (
    <div>
      {/* Header and jump bar */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-kicker">Work</p>
          <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">Work and case studies</h1>
          <p className="mb-lede mt-4">
            Client and charity builds, plus Rondo the coaching app, with honest status labels on where each project stands. Concept builds and prototypes sit separately below.
          </p>
        </div>

        <nav
          aria-label="Jump to project"
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-0 border-y border-[var(--mb-line)] py-1 sm:gap-x-5"
        >
          {CASE_STUDIES.map((study, index) => (
            <a key={study.slug} href={`#${study.slug}`} className="mb-jump-link">
              <span className="mb-caption tabular-nums font-semibold text-[var(--mb-tertiary)]">
                {pad(index + 1)}
              </span>
              <span className="max-w-[14ch] truncate sm:max-w-none">{study.name}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* Featured project */}
      <section className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]">
        <article
          id={featured.slug}
          data-mb-reveal="true"
          className="mb-shell mb-section-pad max-w-6xl scroll-mt-24 space-y-8 sm:px-6"
        >
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="mb-meta">
                <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">
                  Project 01
                </span>
                <span aria-hidden="true" className="mb-meta-sep">
                  /
                </span>
                <span className="font-semibold text-[var(--mb-link)]">{featured.type}</span>
                <span aria-hidden="true" className="mb-meta-sep">
                  /
                </span>
                <span>{featured.year}</span>
                <span aria-hidden="true" className="mb-meta-sep">
                  /
                </span>
                <span>{featured.status}</span>
              </div>

              <h2 className="mb-h2 text-[var(--mb-ink)]">
                <Link href={`/work/${featured.slug}`} className="mb-title-link">
                  {featured.name}
                </Link>
              </h2>
              <p className="mb-body">{featured.summary}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href={`/work/${featured.slug}`} className="mb-btn-primary w-full sm:w-auto">
                Read case study
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              {featured.link?.external ? (
                <a
                  href={featured.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-text-link"
                >
                  {featured.link.label}
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
                </a>
              ) : null}
            </div>
          </div>

          <CaseShowcase study={featured} priority />

          <div className="grid gap-8 border-t border-[var(--mb-line)] pt-6 md:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h3 className="mb-kicker-muted">Where it stands</h3>
              <p className="mb-prose mt-3">{featured.statusDetail}</p>
            </div>
            <div className="border-t border-[var(--mb-line)] pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <h3 className="mb-kicker-muted">Stack and focus</h3>
              <div className="mt-3">
                <StackLine stack={featured.stack} />
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Other client and charity work */}
      <section className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]">
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <ol className="divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {otherClientWork.map((study, idx) => (
              <li
                key={study.slug}
                id={study.slug}
                data-mb-reveal="true"
                className="scroll-mt-24 py-10 sm:py-12"
              >
                <article>
                  <ProjectRow
                    study={study}
                    number={`Project ${pad(idx + 2)}`}
                    imageFirst={idx % 2 === 1}
                    headingLevel="h2"
                  />
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Concept builds and prototypes */}
      <section
        aria-labelledby="concept-heading"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div data-mb-reveal="true" className="max-w-2xl">
            <p className="mb-kicker">Not client work</p>
            <h2 id="concept-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Concept builds and prototypes
            </h2>
            <p className="mb-body mt-3">
              Speculative local-business demos and a responsible AI casework prototype. Labelled clearly so you know what is client work and what is a demo.
            </p>
          </div>

          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {conceptWork.map((study, idx) => (
              <li
                key={study.slug}
                id={study.slug}
                data-mb-reveal="true"
                className="scroll-mt-24 py-10 sm:py-12"
              >
                <article>
                  <ProjectRow
                    study={study}
                    number={`Project ${pad(clientWork.length + idx + 1)}`}
                    imageFirst={idx % 2 === 1}
                  />
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Lab pointer */}
      <section className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]">
        <div
          data-mb-reveal="true"
          className="mb-shell mb-section-pad max-w-6xl sm:px-6"
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
            <div className="max-w-2xl">
              <h2 className="mb-h3 text-[var(--mb-ink)]">Looking for the games and Stout Finder?</h2>
              <p className="mb-prose mt-2">
                Stout Finder, Champions Draft, Rugby Draft, Pub Quiz, and the free small-business tools live in the Lab.
              </p>
            </div>
            <Link href="/lab" className="mb-text-link w-fit">
              Play something I built
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section
        aria-labelledby="work-cta-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <p className="mb-kicker-muted">Have a project in mind?</p>
            <h2 id="work-cta-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Tell me what you need
            </h2>
            <p className="mb-body mt-3">
              Send a short note through the quote form or message me on WhatsApp. I will come back with next steps and a fixed quote.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="mb-btn-primary w-full sm:w-auto">
                Start a quote
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-text-link"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
