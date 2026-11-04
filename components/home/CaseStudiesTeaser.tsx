import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { DRAFT_CASE_STUDIES, DRAFT_CTAS } from "@/lib/content/redesign-draft";

export function CaseStudiesTeaser() {
  return (
    <Section
      id="work"
      heading="Case studies"
      intro="Real work for a Belfast coffee counter and an animal sanctuary, with honest status on where each build stands."
      className="border-b border-studio-line"
    >
      <div className="mt-12 space-y-10">
        {DRAFT_CASE_STUDIES.map((study) => (
          <article
            key={study.slug}
            className="grid gap-8 border border-studio-border bg-studio-surface p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          >
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
                <Link
                  href={study.href}
                  className="inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
                >
                  Read the case study
                </Link>
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
