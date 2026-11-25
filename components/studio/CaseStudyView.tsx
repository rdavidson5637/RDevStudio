import Image from "next/image";
import Link from "next/link";
import {
  getAdjacentCaseStudies,
  getCaseStudy,
  type CaseSection,
} from "@/components/studio/case-studies";
import { quoteHref, STUDIO_WHATSAPP_URL } from "@/components/studio/content";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
} from "@/components/studio/icons";
import { CaseShowcase } from "@/components/studio/ProjectVisual";

function pad(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

function SectionBody({ section }: { section: CaseSection }) {
  return (
    <>
      {section.paragraphs && section.paragraphs.length > 0 ? (
        <div className="mt-4 space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-prose">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {section.subsections && section.subsections.length > 0 ? (
        <div className="mt-6 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
          {section.subsections.map((sub) => (
            <div key={sub.heading} className="py-5">
              <h3 className="mb-step-title">{sub.heading}</h3>
              <div className="mt-2 space-y-3">
                {sub.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-prose">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {section.list && section.list.length > 0 ? (
        <div className="mt-7">
          {section.listHeading ? (
            <h3 className="mb-kicker-muted">{section.listHeading}</h3>
          ) : null}
          <ul className="mb-dash-list mt-3 border-y border-[var(--mb-line)] py-4">
            {section.list.map((item) => (
              <li key={item}>
                <span aria-hidden="true" data-mb-dash>
                  -
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {section.shots && section.shots.length > 0 ? (
        <div className="mt-7 space-y-5">
          {section.shots.map((shot) => (
            <figure key={shot.src} className="mb-frame">
              <div className="max-h-[560px] w-full overflow-hidden bg-[var(--mb-bg)]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="mb-caption">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      {section.link ? (
        <div className="mt-5">
          {section.link.external ? (
            <a
              href={section.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-text-link"
            >
              {section.link.label}
              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
          ) : (
            <Link href={section.link.href} className="mb-text-link">
              {section.link.label}
            </Link>
          )}
        </div>
      ) : null}
    </>
  );
}

export function CaseStudyView({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const { previous, next, position, count } = getAdjacentCaseStudies(slug);
  const quote = quoteHref(study.quoteTopic);
  const conceptBuildShots = study.slug === "concept-builds" ? study.shots ?? [] : [];

  return (
    <div>
      {/* Breadcrumb and case header */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-meta gap-x-2">
          <Link href="/" className="mb-back-link">
            Home
          </Link>
          <span aria-hidden="true" className="mb-meta-sep">
            /
          </span>
          <Link href="/work" className="mb-back-link">
            Work
          </Link>
          <span aria-hidden="true" className="mb-meta-sep">
            /
          </span>
          <span
            aria-current="page"
            className="inline-flex min-h-[44px] items-center font-semibold text-[var(--mb-ink)]"
          >
            {study.name}
          </span>
        </nav>

        <div className="mt-4 max-w-3xl">
          <div className="mb-meta">
            <span className="mb-kicker-muted">
              Case study {pad(position)} of {pad(count)}
            </span>
            <span aria-hidden="true" className="mb-meta-sep">
              /
            </span>
            <span className="font-semibold text-[var(--mb-link)]">{study.type}</span>
          </div>

          <h1 className="mb-h1 mt-3 text-[var(--mb-ink)]">{study.name}</h1>

          <p className="mb-lede mt-4">{study.summary}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {study.link?.external ? (
              <a
                href={study.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-primary w-full sm:w-auto"
              >
                {study.link.label}
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
              </a>
            ) : (
              <Link href={quote} className="mb-btn-primary w-full sm:w-auto">
                Ask about a build like this
              </Link>
            )}
          </div>
        </div>

        {/* Facts at a glance */}
        <dl className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
          {[
            { label: "Context", value: study.context },
            { label: "Role", value: study.role },
            { label: "Status", value: study.status },
            { label: "Year", value: study.year },
          ].map((fact) => (
            <div
              key={fact.label}
              className="grid gap-1 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
            >
              <dt className="mb-kicker-muted">{fact.label}</dt>
              <dd className="mb-fact-value">{fact.value}</dd>
            </div>
          ))}
          {study.link?.external ? (
            <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
              <dt className="mb-kicker-muted">Link</dt>
              <dd className="mb-fact-value">
                <a
                  href={study.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-text-link max-w-full break-all"
                >
                  {study.link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      {/* Visual band */}
      {conceptBuildShots.length === 0 ? (
        <section
          aria-labelledby="case-visual-heading"
          className="border-y border-[var(--mb-line)] bg-[var(--mb-surface)]"
        >
          <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
            <div className="mb-5 grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-baseline sm:gap-6">
              <h2 id="case-visual-heading" className="mb-kicker-muted">
                {study.shots && study.shots.length > 0 ? "Screens" : "At a glance"}
              </h2>
              <p className="mb-caption max-w-xl sm:justify-self-end sm:text-right">
                {study.visualNote}
              </p>
            </div>
            <CaseShowcase study={study} priority />
          </div>
        </section>
      ) : null}

      {/* Main content and sidebar */}
      <div className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]">
        <div className="mb-shell mb-section-pad grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div className="space-y-12">
            {study.sections.map((section, index) => {
              const headingId = `case-section-${index + 1}`;
              const buildShot =
                conceptBuildShots.length > 0 && index > 0
                  ? conceptBuildShots[index - 1]
                  : undefined;
              return (
                <section
                  key={section.heading}
                  aria-labelledby={headingId}
                  className={index > 0 ? "border-t border-[var(--mb-line)] pt-10" : undefined}
                >
                  <p className="mb-kicker">
                    {pad(index + 1)} / {section.kicker}
                  </p>
                  <h2 id={headingId} className="mb-h3 mt-2 text-[var(--mb-ink)]">
                    {section.heading}
                  </h2>
                  {buildShot ? (
                    <figure className="mb-frame mt-5">
                      <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--mb-bg)]">
                        <Image
                          src={buildShot.src}
                          alt={buildShot.alt}
                          width={buildShot.width}
                          height={buildShot.height}
                          sizes="(max-width: 1024px) 100vw, 680px"
                          priority={index === 1}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <figcaption className="mb-caption">{buildShot.caption}</figcaption>
                    </figure>
                  ) : null}
                  <SectionBody section={section} />
                </section>
              );
            })}

            {study.related ? (
              <div className="flex flex-wrap items-center justify-between gap-3 border-y border-[var(--mb-line)] py-4">
                <p className="mb-prose">{study.related.relation}</p>
                <Link href={`/work/${study.related.slug}`} className="mb-text-link">
                  Open {study.related.name}
                </Link>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24">
            <section
              aria-labelledby="case-stack-heading"
              className="border-t border-[var(--mb-line-strong)] pt-5"
            >
              <h2 id="case-stack-heading" className="mb-h3 text-[var(--mb-ink)]">
                Stack and focus
              </h2>
              <p className="mb-stack mt-3 text-[var(--mb-muted)]">
                {study.stack.map((tag, i) => (
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
            </section>

            <section
              aria-labelledby="case-status-heading"
              className="border-t border-[var(--mb-line-strong)] pt-5"
            >
              <h2 id="case-status-heading" className="mb-h3 text-[var(--mb-ink)]">
                Where it stands
              </h2>
              <p className="mb-status-line mt-2.5">{study.status}</p>
              <p className="mb-prose mt-2.5">{study.statusDetail}</p>
            </section>

            <section
              aria-labelledby="case-sidebar-cta-heading"
              className="mb-on-light border-l-2 border-[var(--mb-accent)] bg-[var(--mb-light)] p-5"
            >
              <h2 id="case-sidebar-cta-heading" className="mb-h3 text-[var(--mb-ink)]">
                Planning something similar?
              </h2>
              <p className="mb-prose mt-2">
                Tell me what you need and I will reply in plain English with next steps.
              </p>
              <div className="mt-4">
                <Link href={quote} className="mb-text-link w-fit">
                  Request a quote
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Previous and next */}
      <nav
        aria-label="More case studies"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]"
      >
        <div className="mb-shell max-w-6xl py-12 sm:px-6">
          <div
            className="grid divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0"
          >
            <Link
              href={`/work/${previous.slug}`}
              className="group flex min-h-[44px] flex-col justify-between py-6 sm:pr-8"
            >
              <span className="mb-kicker-muted inline-flex items-center gap-1.5">
                <ArrowLeftIcon className="h-3.5 w-3.5 shrink-0" />
                Previous project
              </span>
              <span className="mb-h3 mt-2 text-[var(--mb-ink)] transition-colors group-hover:text-[var(--mb-link)]">
                {previous.name}
              </span>
              <span className="mb-caption mt-1 font-medium">{previous.type}</span>
            </Link>

            <Link
              href={`/work/${next.slug}`}
              className="group flex min-h-[44px] flex-col justify-between py-6 sm:items-end sm:pl-8 sm:text-right"
            >
              <span className="mb-kicker-muted inline-flex items-center gap-1.5">
                Next project
              </span>
              <span className="mb-h3 mt-2 text-[var(--mb-ink)] transition-colors group-hover:text-[var(--mb-link)]">
                {next.name}
              </span>
              <span className="mb-caption mt-1 font-medium">{next.type}</span>
            </Link>
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/work" className="mb-back-link">
              <ArrowLeftIcon className="h-4 w-4 shrink-0" />
              Back to all work
            </Link>
          </div>
        </div>
      </nav>

      {/* Closing band */}
      <section
        aria-labelledby="case-close-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <p className="mb-kicker-muted">Start a project</p>
            <h2 id="case-close-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              {study.closing?.heading ?? "Need something built properly?"}
            </h2>
            <p className="mb-body mt-3">
              {study.closing?.body ??
                "Send a short note through the quote form or message me on WhatsApp. You deal with me from first note to launch."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={quote} className="mb-btn-primary w-full sm:w-auto">
                {study.closing?.cta ?? "Start a quote"}
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
