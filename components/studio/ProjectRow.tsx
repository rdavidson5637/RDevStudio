import Link from "next/link";
import type { CaseStudy } from "@/components/studio/case-studies";
import { ExternalLinkIcon } from "@/components/studio/icons";
import { ProjectPreview } from "@/components/studio/ProjectVisual";

export function StackLine({ stack }: { stack: readonly string[] }) {
  return (
    <p className="mb-stack">
      {stack.map((tag, i) => (
        <span key={tag}>
          {i > 0 ? (
            <span className="mb-stack-sep" aria-hidden="true">
              /
            </span>
          ) : null}
          {tag}
        </span>
      ))}
    </p>
  );
}

export function ProjectMeta({ study, number }: { study: CaseStudy; number: string }) {
  return (
    <div className="mb-meta">
      <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">{number}</span>
      <span aria-hidden="true" className="mb-meta-sep">
        /
      </span>
      <span className="font-semibold text-[var(--mb-link)]">{study.type}</span>
      <span aria-hidden="true" className="mb-meta-sep">
        /
      </span>
      <span>{study.year}</span>
      <span aria-hidden="true" className="mb-meta-sep">
        /
      </span>
      <span>{study.status}</span>
    </div>
  );
}

/** One ruled project row: copy on one side, preview on the other, alternating on desktop. */
export function ProjectRow({
  study,
  number,
  imageFirst,
  featured = false,
  headingLevel = "h3",
}: {
  study: CaseStudy;
  number: string;
  imageFirst: boolean;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <div
      className={`grid gap-8 md:items-center md:gap-10 ${
        imageFirst ? "md:grid-cols-[1.05fr_0.95fr]" : "md:grid-cols-[0.95fr_1.05fr]"
      }`}
    >
      <div className={`min-w-0 space-y-4 ${imageFirst ? "md:order-2" : ""}`}>
        <ProjectMeta study={study} number={number} />

        <div>
          <Heading className="mb-h3 text-[var(--mb-ink)]">
            <Link href={`/work/${study.slug}`} className="mb-title-link">
              {study.name}
            </Link>
          </Heading>
          <p className="mb-prose mt-2.5">{study.summary}</p>
        </div>

        <StackLine stack={study.stack} />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-1">
          <Link href={`/work/${study.slug}`} className="mb-text-link">
            Read case study
          </Link>

          {study.link?.external ? (
            <a
              href={study.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-text-link text-[var(--mb-muted)]"
            >
              {study.link.label}
              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
          ) : null}
        </div>
      </div>

      <div className={`min-w-0 ${imageFirst ? "md:order-1" : ""}`}>
        <ProjectPreview study={study} size={featured ? "featured" : "compact"} />
      </div>
    </div>
  );
}
