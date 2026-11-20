import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { CaseStudyShowcaseCard } from "@/components/work/CaseStudyShowcaseCard";
import {
  DRAFT_CASE_STUDIES,
  DRAFT_CONCEPT_STUDIES,
  DRAFT_CTAS,
  DRAFT_SHOWCASE_CASE_SLUGS,
} from "@/lib/content/redesign-draft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work and case studies",
  description:
    "Client and charity case studies, plus local-business concept builds by Ryan Davidson at RDev Studio.",
  path: "/work",
  ogImage: "/work/opengraph-image",
});

export default function WorkPage() {
  const showcase = DRAFT_SHOWCASE_CASE_SLUGS.map((slug) =>
    DRAFT_CASE_STUDIES.find((study) => study.slug === slug),
  ).filter((study): study is (typeof DRAFT_CASE_STUDIES)[number] => study !== undefined);

  const otherClientWork = DRAFT_CASE_STUDIES.filter(
    (study) => !DRAFT_SHOWCASE_CASE_SLUGS.includes(study.slug as (typeof DRAFT_SHOWCASE_CASE_SLUGS)[number]),
  );

  return (
    <>
      <Section className="border-b border-studio-line">
        <h1 className="display-lg max-w-[16ch] text-balance text-studio-text">
          Work and case studies
        </h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Client and charity builds, plus Rondo the coaching app, with honest status labels on where each project stands. Concept builds and prototypes sit separately below.
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
        heading="Showcase"
        intro="ShelterLink, Assisi, Crosskennan and Rondo - the charity and coaching builds with the fullest write-ups."
        className="border-b border-studio-line"
      >
        <div className="mt-10 space-y-10">
          {showcase.map((study, index) => (
            <CaseStudyShowcaseCard
              key={study.slug}
              study={study}
              index={index + 1}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Section>

      {otherClientWork.length > 0 ? (
        <Section
          heading="Other client work"
          intro="Live and nearly finished client sites outside the charity and coaching showcase."
          className="border-b border-studio-line"
        >
          <div className="mt-10 space-y-10">
            {otherClientWork.map((study, index) => (
              <CaseStudyShowcaseCard
                key={study.slug}
                study={study}
                index={showcase.length + index + 1}
                reverse={index % 2 === 0}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        heading="Concept builds and prototypes"
        intro="Speculative local-business demos and a responsible AI casework prototype. Labelled clearly so you know what is client work and what is a demo."
        className="border-b border-studio-line"
      >
        <div className="mt-10 space-y-10">
          {DRAFT_CONCEPT_STUDIES.map((study, index) => (
            <CaseStudyShowcaseCard
              key={study.slug}
              study={study}
              index={index + 1}
              reverse={index % 2 === 1}
            />
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
    </>
  );
}
