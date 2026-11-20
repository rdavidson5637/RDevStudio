import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import {
  getAdjacentProjects,
  getCaseStudyEntry,
  MOCK_B_CASE_STUDY_SLUGS,
} from "@/components/mock-b/case-studies";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
} from "@/components/mock-b/icons";
import { WorkDeviceShowcase } from "@/components/mock-b/WorkDeviceShowcase";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_B_CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudyEntry(slug);
  if (!entry) {
    return {
      title: "Case study not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${entry.project.name} - Case study`,
    description: `${entry.project.name} (${entry.project.type}): ${entry.project.summary}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

function TodoMarkerCard({
  label = "TODO for Ryan",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-todo-box p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-surface)] px-2.5 py-0.5 text-xs font-semibold text-[var(--mb-ink)]">
          {label}
        </span>
        <span className="text-xs font-medium text-[var(--mb-muted)]">
          Not stored in repo yet
        </span>
      </div>
      <div className="mt-2.5 text-sm leading-relaxed text-[var(--mb-ink)]">
        {children}
      </div>
    </div>
  );
}

export default async function MockBCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCaseStudyEntry(slug);

  if (!entry) {
    notFound();
  }

  const { project, study, index } = entry;
  const { previous, next } = getAdjacentProjects(index);
  const quoteHref = `/mock-b/contact?topic=${encodeURIComponent(study.quoteTopic)}`;

  return (
    <div>
      {/* ── BREADCRUMB + CASE HEADER ─────────────────────────────────────── */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-sm font-medium text-[var(--mb-muted)]"
        >
          <Link
            href="/mock-b"
            className="inline-flex min-h-[44px] items-center pr-2 underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
          >
            Studio home
          </Link>
          <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
            /
          </span>
          <Link
            href="/mock-b/work"
            className="inline-flex min-h-[44px] items-center px-2 underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
          >
            Work
          </Link>
          <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
            /
          </span>
          <span
            aria-current="page"
            className="inline-flex min-h-[44px] items-center px-2 font-semibold text-[var(--mb-ink)]"
          >
            {project.name}
          </span>
        </nav>

        <div className="mt-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--mb-muted)]">
            <span className="mb-kicker-muted">
              Case study {study.number} of 05
            </span>
            <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
              /
            </span>
            <span className="font-semibold text-[var(--mb-link)]">
              {project.type}
            </span>
            <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
              /
            </span>
            <span>{study.statusHeadline}</span>
          </div>

          <h1 className="mb-h1 mt-3 text-[var(--mb-ink)]">
            {project.name}
          </h1>

          <p className="mb-lede mt-4">
            {project.summary}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {project.external ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-primary w-full sm:w-auto"
              >
                {project.linkLabel}
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
              </a>
            ) : (
              <Link href={quoteHref} className="mb-btn-primary w-full sm:w-auto">
                Ask about a build like this
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            )}

            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-secondary w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
              Message on WhatsApp
            </a>

            {study.repoCaseStudyHref && study.repoCaseStudyLabel ? (
              <Link
                href={study.repoCaseStudyHref}
                className="inline-flex min-h-[44px] items-center justify-center px-2 text-sm font-medium text-[var(--mb-muted)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-ink)] sm:justify-start"
              >
                {study.repoCaseStudyLabel}
              </Link>
            ) : null}
          </div>
        </div>

        {/* Ruled facts-at-a-glance strip */}
        <dl className="mt-10 grid gap-6 border-y border-[var(--mb-line)] py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="mb-kicker-muted">
              Context
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-[var(--mb-ink)]">
              {study.clientOrContext}
            </dd>
          </div>
          <div>
            <dt className="mb-kicker-muted">
              Status
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-[var(--mb-ink)]">
              {study.statusHeadline}
            </dd>
          </div>
          <div>
            <dt className="mb-kicker-muted">
              Year / date
            </dt>
            <dd className="mt-1.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--mb-ink)]">
              <span>{study.yearDisplay}</span>
              {study.yearIsTodo ? (
                <span className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-raised)] px-2 py-0.5 text-[11px] font-semibold text-[var(--mb-muted)]">
                  TODO for Ryan
                </span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="mb-kicker-muted">
              Link
            </dt>
            <dd className="mt-1 text-sm font-semibold text-[var(--mb-ink)]">
              {project.external ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1 break-all text-[var(--mb-link)] underline decoration-[var(--mb-border-accent)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
                >
                  {project.href.replace(/^https?:\/\//, "")}
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
                </a>
              ) : project.id === "assisi" ? (
                <span className="inline-block pt-0.5">Held until sign-off</span>
              ) : (
                <span className="inline-flex items-center gap-2 pt-0.5">
                  <span>In-site</span>
                  <span className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-raised)] px-2 py-0.5 text-[11px] font-semibold text-[var(--mb-muted)]">
                    URL TODO
                  </span>
                </span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      {/* ── VISUAL SHOWCASE ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="case-visual-heading"
        className="mb-shell max-w-6xl pb-14 sm:px-6"
      >
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="case-visual-heading" className="mb-kicker-muted">
            Visual preview
          </h2>
          <p className="mb-caption max-w-xl sm:text-right">{study.visualNote}</p>
        </div>
        <WorkDeviceShowcase project={project} />
      </section>

      {/* ── MAIN CASE STUDY CONTENT + RULED SIDEBAR ──────────────────────── */}
      <div className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]">
        <div className="mb-shell mb-section-pad grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div className="space-y-12">
            {/* 1. The problem */}
            <section aria-labelledby="case-problem-heading" data-mb-reveal="true">
              <p className="mb-kicker">
                01 / Context
              </p>
              <h2
                id="case-problem-heading"
                className="mb-h3 mt-2 text-[var(--mb-ink)]"
              >
                The problem
              </h2>

              {study.problemParagraphs.length > 0 ? (
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                  {study.problemParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {study.problemTodo ? (
                <div className="mt-5">
                  <TodoMarkerCard>{study.problemTodo}</TodoMarkerCard>
                </div>
              ) : null}
            </section>

            {/* 2. What was built */}
            <section
              aria-labelledby="case-built-heading"
              data-mb-reveal="true"
              className="border-t border-[var(--mb-line)] pt-10"
            >
              <p className="mb-kicker">
                02 / Delivery
              </p>
              <h2
                id="case-built-heading"
                className="mb-h3 mt-2 text-[var(--mb-ink)]"
              >
                What was built
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                {study.builtParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {study.builtHighlights.length > 0 ? (
                <div className="mt-7">
                  <h3 className="mb-kicker-muted">
                    Confirmed highlights
                  </h3>
                  <ul className="mt-3 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] text-sm text-[var(--mb-ink)]">
                    {study.builtHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 py-3">
                        <span
                          aria-hidden="true"
                          className="select-none text-[var(--mb-link)]"
                        >
                          -
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {study.builtTodo ? (
                <div className="mt-5">
                  <TodoMarkerCard>{study.builtTodo}</TodoMarkerCard>
                </div>
              ) : null}

              {study.architectureNote ? (
                <div className="mb-on-light mt-7 rounded-r-[var(--mb-radius)] border-l-2 border-[var(--mb-accent)] bg-[var(--mb-light)] p-5">
                  <h3 className="mb-h3 text-[var(--mb-ink)]">
                    {study.architectureNote.heading}
                  </h3>
                  <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                    {study.architectureNote.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              {study.relatedProject ? (
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-[var(--mb-line)] py-4">
                  <p className="text-sm text-[var(--mb-muted)]">
                    {study.relatedProject.relation}
                  </p>
                  <Link
                    href={`/mock-b/work/${study.relatedProject.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-link)] underline decoration-[var(--mb-border-accent)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
                  >
                    Open {study.relatedProject.name}
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </Link>
                </div>
              ) : null}
            </section>

            {/* 3. Status, results & TODOs for Ryan */}
            <section
              aria-labelledby="case-todos-heading"
              data-mb-reveal="true"
              className="border-t border-[var(--mb-line)] pt-10"
            >
              <p className="mb-kicker-muted">
                03 / Facts &amp; gaps
              </p>
              <h2
                id="case-todos-heading"
                className="mb-h3 mt-2 text-[var(--mb-ink)]"
              >
                Where it stands &amp; TODOs for Ryan
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                {study.outcomeConfirmed}
              </p>

              <div className="mt-5">
                <TodoMarkerCard label="TODO for Ryan / Missing facts">
                  <p className="font-semibold text-[var(--mb-ink)]">
                    Nothing below has been invented. Fill in only what is real and approved:
                  </p>
                  <ul className="mt-3 divide-y divide-[var(--mb-line)] border-t border-[var(--mb-line)]">
                    {study.todosForRyan.map((todo) => (
                      <li key={todo.field} className="py-2.5 text-sm leading-relaxed">
                        <span className="font-semibold text-[var(--mb-ink)]">
                          {todo.field}:
                        </span>{" "}
                        <span className="text-[var(--mb-muted)]">{todo.note}</span>
                      </li>
                    ))}
                  </ul>
                </TodoMarkerCard>
              </div>
            </section>
          </div>

          {/* ── SIDEBAR (RULED STACK, STATUS, DIRECT CTA) ────────────────── */}
          <aside className="space-y-8 lg:sticky lg:top-24">
            <section
              aria-labelledby="case-stack-heading"
              data-mb-reveal="true"
              className="border-t border-[var(--mb-line-strong)] pt-5"
            >
              <h2
                id="case-stack-heading"
                className="mb-h3 text-[var(--mb-ink)]"
              >
                Stack &amp; focus
              </h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {study.stackConfirmed.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-bg)] px-2.5 py-1 text-xs font-medium text-[var(--mb-ink)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-[var(--mb-muted)]">
                {study.stackNote}
              </p>
              {study.stackTodo ? (
                <div className="mt-4">
                  <TodoMarkerCard>{study.stackTodo}</TodoMarkerCard>
                </div>
              ) : null}
            </section>

            <section
              aria-labelledby="case-status-heading"
              data-mb-reveal="true"
              className="border-t border-[var(--mb-line-strong)] pt-5"
            >
              <h2
                id="case-status-heading"
                className="mb-h3 text-[var(--mb-ink)]"
              >
                Project status
              </h2>
              <p className="mt-2.5 text-sm font-bold text-[var(--mb-link)]">
                {study.statusHeadline}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--mb-muted)]">
                {study.statusDetail}
              </p>
            </section>

            <section
              aria-labelledby="case-sidebar-cta-heading"
              data-mb-reveal="true"
              className="mb-on-light rounded-[var(--mb-radius)] border border-[var(--mb-line)] bg-[var(--mb-light)] p-5"
            >
              <h2
                id="case-sidebar-cta-heading"
                className="mb-h3 text-[var(--mb-ink)]"
              >
                Planning something similar?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mb-muted)]">
                Tell RDev Studio what you need and we will reply in plain English with clear next steps.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Link href={quoteHref} className="mb-btn-primary w-full">
                  Request a quote
                  <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
                <a
                  href={STUDIO_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-btn-secondary w-full"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
                  WhatsApp the studio
                </a>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* ── PREV / NEXT CASE STUDY NAVIGATION ────────────────────────────── */}
      <nav
        aria-label="More case studies"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]"
      >
        <div className="mb-shell max-w-6xl py-12 sm:px-6">
          <div
            data-mb-reveal="true"
            className="grid divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0"
          >
            <Link
              href={`/mock-b/work/${previous.id}`}
              className="flex min-h-[44px] flex-col justify-between py-6 transition-colors hover:text-[var(--mb-link)] sm:pr-8"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--mb-tertiary)]">
                <ArrowLeftIcon className="h-3.5 w-3.5 shrink-0" />
                Previous project
              </span>
              <span className="mb-h3 mt-2 text-[var(--mb-ink)]">
                {previous.name}
              </span>
              <span className="mt-1 text-xs font-medium text-[var(--mb-muted)]">
                {previous.type}
              </span>
            </Link>

            <Link
              href={`/mock-b/work/${next.id}`}
              className="flex min-h-[44px] flex-col justify-between py-6 transition-colors hover:text-[var(--mb-link)] sm:items-end sm:pl-8 sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--mb-tertiary)]">
                Next project
                <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" />
              </span>
              <span className="mb-h3 mt-2 text-[var(--mb-ink)]">
                {next.name}
              </span>
              <span className="mt-1 text-xs font-medium text-[var(--mb-muted)]">
                {next.type}
              </span>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link href="/mock-b/work" className="mb-btn-secondary">
              <ArrowLeftIcon className="h-4 w-4 shrink-0" />
              Back to all five projects
            </Link>
          </div>
        </div>
      </nav>

      {/* ── BOTTOM DUAL CTA CLOSE ────────────────────────────────────────── */}
      <section
        aria-labelledby="case-close-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div
          data-mb-reveal="true"
          className="mb-shell mb-section-pad flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-kicker-muted">Start a project</p>
            <h2 id="case-close-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Want a clear, phone-first build for your team?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--mb-muted)]">
              Send a short note through the quote form or message RDev Studio directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href={quoteHref} className="mb-btn-primary">
              Start a quote
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-secondary-inverse"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
