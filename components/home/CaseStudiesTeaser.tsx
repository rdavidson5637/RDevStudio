import Link from "next/link";
import { CaseStudyShowcaseCard } from "@/components/work/CaseStudyShowcaseCard";
import { Section } from "@/components/ui/Section";
import {
  DRAFT_CASE_STUDIES,
  DRAFT_CTAS,
  DRAFT_FEATURED_CASE_SLUGS,
} from "@/lib/content/redesign-draft";

export function CaseStudiesTeaser() {
  const featured = DRAFT_FEATURED_CASE_SLUGS.map((slug) =>
    DRAFT_CASE_STUDIES.find((study) => study.slug === slug),
  ).filter((study): study is (typeof DRAFT_CASE_STUDIES)[number] => study !== undefined);

  return (
    <Section
      id="work"
      heading="Case studies"
      intro="Charity builds and a football coaching pilot, with honest status on where each one stands."
      className="border-b border-studio-line"
    >
      <div className="mt-12 space-y-10">
        {featured.map((study, index) => (
          <CaseStudyShowcaseCard
            key={study.slug}
            study={study}
            index={index + 1}
            reverse={index % 2 === 1}
            animate
          />
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center text-base font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
        >
          {DRAFT_CTAS.secondary} (including concept builds)
        </Link>
      </div>
    </Section>
  );
}
