import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  DRAFT_CASE_STUDIES,
  DRAFT_CONCEPT_STUDIES,
  DRAFT_CTAS,
} from "@/lib/content/redesign-draft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work and case studies",
  description:
    "Client and charity case studies, plus local-business concept builds by Ryan Davidson at RDev Studio.",
  path: "/work",
  ogImage: "/work/opengraph-image",
});

type StudyItem = (typeof DRAFT_CASE_STUDIES)[number] | (typeof DRAFT_CONCEPT_STUDIES)[number];

function CaseStudyCard({ study }: { study: StudyItem }) {
  return (
    <article className="grid gap-8 border border-studio-border bg-studio-surface p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      {"image" in study && study.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-studio-line bg-studio-bg">
          <Image
            src={study.image}
            alt={study.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full flex-col justify-between border border-studio-line bg-studio-bg p-6">
          <p className="text-sm text-studio-faint">{study.category}</p>
          <p className="font-studio-display text-3xl text-studio-text">{study.name}</p>
          <p className="text-sm font-bold text-studio-muted">Preview after sign-off</p>
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-studio-line pb-3 text-sm">
          <span className="text-studio-muted">{study.category}</span>
          <span className="font-bold text-studio-text">{study.status}</span>
        </div>

        <h3 className="mt-4 font-studio-display text-3xl text-studio-text">{study.name}</h3>

        <dl className="mt-5 space-y-4 text-sm sm:text-base">
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="font-bold text-studio-text">Challenge</dt>
            <dd className="text-studio-muted">{study.challenge}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="font-bold text-studio-text">Solution</dt>
            <dd className="text-studio-muted">{study.solution}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="font-bold text-studio-text">Status</dt>
            <dd className="text-studio-muted">{study.result}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-studio-line pt-4">
          {study.href !== "/work" ? (
            <Link
              href={study.href}
              className="inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              Read the case study
            </Link>
          ) : (
            <span className="text-sm text-studio-faint">
              Public preview available once signed off by the sanctuary
            </span>
          )}
          {"siteUrl" in study && study.siteUrl ? (
            <a
              href={study.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-studio-muted underline decoration-studio-line underline-offset-4 transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              Open live preview
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function WorkPage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Section className="border-b border-studio-line">
        <h1 className="display-lg max-w-[16ch] text-balance text-studio-text">
          Work and case studies
        </h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Client and charity builds come first, with honest status labels on where each project stands. Concept builds and prototypes sit separately below.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">{DRAFT_CTAS.primary}</Button>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            See services and from-prices
          </Link>
        </div>
      </Section>

      <Section
        heading="Client and charity work"
        intro="Real organisations in Belfast and Northern Ireland."
        className="border-b border-studio-line"
      >
        <div className="mt-10 space-y-10">
          {DRAFT_CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <Section
        heading="Concept builds and prototypes"
        intro="Speculative local-business demos and a responsible AI casework prototype. Labelled clearly so you know what is client work and what is a demo."
        className="border-b border-studio-line"
      >
        <div className="mt-10 space-y-10">
          {DRAFT_CONCEPT_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <Section
        heading="Looking for the games and Stout Finder?"
        intro="Stout Finder, Champions Draft, Rugby Draft, Pub Quiz, and the free small-business tools now live in the Lab."
      >
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Link
            href="/lab"
            className="inline-flex min-h-11 items-center text-base font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            {DRAFT_CTAS.lab}
          </Link>
        </div>
      </Section>
    </div>
  );
}
