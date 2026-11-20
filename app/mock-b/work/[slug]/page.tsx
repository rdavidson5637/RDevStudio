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
  WaveRule,
  WavyUnderline,
  WhatsAppIcon,
} from "@/components/mock-b/CoastalDoodles";
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
    title: `${entry.project.name} — Case study`,
    description: `${entry.project.name} (${entry.project.type}): ${entry.project.summary}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const ACCENT_PILL = {
  seaglass: "bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)]",
  terracotta: "bg-[var(--mb-terracotta-soft)] text-[var(--mb-terracotta-ink)]",
  butter: "bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]",
} as const;

function TodoMarkerCard({
  label = "TODO for Ryan",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-todo-box rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mb-line-strong)] bg-[var(--mb-butter)] px-2.5 py-0.5 text-xs font-bold text-[var(--mb-ink)]">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[var(--mb-terracotta)]"
          />
          {label}
        </span>
        <span className="text-xs font-semibold text-[var(--mb-ink-soft)]">
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
    <div className="pb-16 sm:pb-24">
      {/* ── BREADCRUMB + CASE HEADER ─────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pt-14">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-sm font-semibold text-[var(--mb-ink-soft)]"
        >
          <Link
            href="/mock-b"
            className="inline-flex min-h-[44px] items-center rounded-full px-2 underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
          >
            Studio home
          </Link>
          <span aria-hidden="true" className="text-[var(--mb-ink-faint)]">
            /
          </span>
          <Link
            href="/mock-b/work"
            className="inline-flex min-h-[44px] items-center rounded-full px-2 underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
          >
            Work
          </Link>
          <span aria-hidden="true" className="text-[var(--mb-ink-faint)]">
            /
          </span>
          <span
            aria-current="page"
            className="inline-flex min-h-[44px] items-center px-2 text-[var(--mb-ink)]"
          >
            {project.name}
          </span>
        </nav>

        <div className="mt-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="mb-sticker mb-sticker-tilt-left mb-sticker-wobble bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]">
              Case study {study.number} of 05
            </span>
            <span
              className={`rounded-full px-3 py-1.5 ${ACCENT_PILL[project.accent]}`}
            >
              {project.type}
            </span>
            <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-paper)] px-3 py-1.5 text-[var(--mb-ink-soft)]">
              {study.statusHeadline}
            </span>
          </div>

          <h1 className="mb-display mt-4 text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-[var(--mb-ink)] sm:text-5xl">
            <span className="relative inline-block">
              {project.name}
              <WavyUnderline className="mt-1 h-2.5 w-full max-w-[220px] text-[var(--mb-terracotta)]" />
            </span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[var(--mb-ink-soft)] sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {project.external ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-primary w-full sm:w-auto"
              >
                {project.linkLabel}
                <span aria-hidden="true">&#8599;</span>
              </a>
            ) : (
              <Link href={quoteHref} className="mb-btn-primary w-full sm:w-auto">
                Ask about a build like this
                <span aria-hidden="true" className="mb-arrow-icon">
                  &rarr;
                </span>
              </Link>
            )}

            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-whatsapp w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Message on WhatsApp
            </a>

            {study.repoCaseStudyHref && study.repoCaseStudyLabel ? (
              <Link
                href={study.repoCaseStudyHref}
                className="mb-btn-soft w-full sm:w-auto"
              >
                {study.repoCaseStudyLabel}
              </Link>
            ) : null}
          </div>
        </div>

        {/* Facts-at-a-glance strip */}
        <dl className="mt-8 grid gap-3 rounded-3xl border-[1.5px] border-[var(--mb-line)] bg-[var(--mb-paper)] p-4 shadow-[0_3px_0_var(--mb-line)] sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
          <div className="rounded-2xl bg-[var(--mb-cream)] p-3.5">
            <dt className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              Context
            </dt>
            <dd className="mt-1 text-sm font-semibold text-[var(--mb-ink)]">
              {study.clientOrContext}
            </dd>
          </div>
          <div className="rounded-2xl bg-[var(--mb-cream)] p-3.5">
            <dt className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              Status
            </dt>
            <dd className="mt-1 text-sm font-semibold text-[var(--mb-ink)]">
              {study.statusHeadline}
            </dd>
          </div>
          <div className="rounded-2xl bg-[var(--mb-cream)] p-3.5">
            <dt className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              Year / date
            </dt>
            <dd className="mt-1 flex flex-wrap items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink)]">
              <span>{study.yearDisplay}</span>
              {study.yearIsTodo ? (
                <span className="rounded-full bg-[var(--mb-butter)] px-2 py-0.5 text-[11px] font-bold text-[var(--mb-ink)]">
                  TODO for Ryan
                </span>
              ) : null}
            </dd>
          </div>
          <div className="rounded-2xl bg-[var(--mb-cream)] p-3.5">
            <dt className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              Link
            </dt>
            <dd className="mt-1 text-sm font-semibold text-[var(--mb-ink)]">
              {project.external ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center break-all text-[var(--mb-seaglass-ink)] underline decoration-[var(--mb-seaglass)]/45 underline-offset-4 hover:text-[var(--mb-seaglass)]"
                >
                  {project.href.replace(/^https?:\/\//, "")}
                  <span aria-hidden="true" className="ml-1">
                    &#8599;
                  </span>
                </a>
              ) : project.id === "assisi" ? (
                <span>Held until sign-off</span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <span>In-site</span>
                  <span className="rounded-full bg-[var(--mb-butter)] px-2 py-0.5 text-[11px] font-bold text-[var(--mb-ink)]">
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
        className="mx-auto max-w-5xl px-4 pb-12 sm:px-6"
      >
        <div className="mb-card p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2
              id="case-visual-heading"
              className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]"
            >
              Visual preview
            </h2>
            <p className="text-xs font-medium text-[var(--mb-ink-soft)]">
              {study.visualNote}
            </p>
          </div>
          <WorkDeviceShowcase project={project} />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* ── MAIN CASE STUDY CONTENT ──────────────────────────────────────── */}
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div className="space-y-8">
          {/* 1. The problem */}
          <section
            aria-labelledby="case-problem-heading"
            data-mb-reveal="true"
            className="mb-card p-5 sm:p-7"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--mb-terracotta-ink)]">
              01 · Context
            </p>
            <h2
              id="case-problem-heading"
              className="mb-display mt-1.5 text-2xl font-semibold text-[var(--mb-ink)] sm:text-3xl"
            >
              The problem
            </h2>

            {study.problemParagraphs.length > 0 ? (
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
                {study.problemParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {study.problemTodo ? (
              <div className="mt-4">
                <TodoMarkerCard>{study.problemTodo}</TodoMarkerCard>
              </div>
            ) : null}
          </section>

          {/* 2. What was built */}
          <section
            aria-labelledby="case-built-heading"
            data-mb-reveal="true"
            className="mb-card p-5 sm:p-7"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--mb-seaglass-ink)]">
              02 · Delivery
            </p>
            <h2
              id="case-built-heading"
              className="mb-display mt-1.5 text-2xl font-semibold text-[var(--mb-ink)] sm:text-3xl"
            >
              What was built
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
              {study.builtParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {study.builtHighlights.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
                  Confirmed highlights
                </h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {study.builtHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-cream)] px-3.5 py-3 text-sm leading-snug text-[var(--mb-ink)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--mb-terracotta)]"
                      />
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
              <div className="mt-6 rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-cream-deep)]/70 p-4 sm:p-5">
                <h3 className="mb-display text-xl font-semibold text-[var(--mb-ink)]">
                  {study.architectureNote.heading}
                </h3>
                <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
                  {study.architectureNote.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : null}

            {study.relatedProject ? (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-cream)] px-4 py-3.5">
                <p className="text-sm text-[var(--mb-ink-soft)]">
                  {study.relatedProject.relation}
                </p>
                <Link
                  href={`/mock-b/work/${study.relatedProject.slug}`}
                  className="mb-arrow-link inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-[var(--mb-terracotta-ink)] underline decoration-[var(--mb-terracotta)]/45 underline-offset-4 hover:text-[var(--mb-terracotta)]"
                >
                  Open {study.relatedProject.name}
                  <span aria-hidden="true" className="mb-arrow-icon">
                    &rarr;
                  </span>
                </Link>
              </div>
            ) : null}
          </section>

          {/* 3. Status, results & TODOs for Ryan */}
          <section
            aria-labelledby="case-todos-heading"
            data-mb-reveal="true"
            className="mb-card p-5 sm:p-7"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              03 · Facts &amp; gaps
            </p>
            <h2
              id="case-todos-heading"
              className="mb-display mt-1.5 text-2xl font-semibold text-[var(--mb-ink)] sm:text-3xl"
            >
              Where it stands &amp; TODOs for Ryan
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
              {study.outcomeConfirmed}
            </p>

            <div className="mt-5">
              <TodoMarkerCard label="TODO for Ryan · Missing facts">
                <p className="font-semibold text-[var(--mb-ink)]">
                  Nothing below has been invented. Fill in only what is real and approved:
                </p>
                <ul className="mt-3 space-y-2.5">
                  {study.todosForRyan.map((todo) => (
                    <li
                      key={todo.field}
                      className="rounded-xl border border-[var(--mb-line-strong)] bg-[var(--mb-paper)] px-3.5 py-2.5 text-sm leading-relaxed"
                    >
                      <span className="font-bold text-[var(--mb-ink)]">
                        {todo.field}:
                      </span>{" "}
                      <span className="text-[var(--mb-ink-soft)]">
                        {todo.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </TodoMarkerCard>
            </div>
          </section>
        </div>

        {/* ── SIDEBAR (STACK, STATUS, DIRECT CTA) ────────────────────────── */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <section
            aria-labelledby="case-stack-heading"
            data-mb-reveal="true"
            className="mb-card p-5 sm:p-6"
          >
            <h2
              id="case-stack-heading"
              className="mb-display text-xl font-semibold text-[var(--mb-ink)]"
            >
              Stack &amp; focus
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.stackConfirmed.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--mb-line-strong)] bg-[var(--mb-cream)] px-3 py-1 text-xs font-semibold text-[var(--mb-ink)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
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
            className="mb-card p-5 sm:p-6"
          >
            <h2
              id="case-status-heading"
              className="mb-display text-xl font-semibold text-[var(--mb-ink)]"
            >
              Project status
            </h2>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--mb-seaglass)]/35 bg-[var(--mb-seaglass-soft)] px-3 py-1 text-xs font-bold text-[var(--mb-seaglass-ink)]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[var(--mb-seaglass)]"
              />
              {study.statusHeadline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
              {study.statusDetail}
            </p>
          </section>

          <section
            aria-labelledby="case-sidebar-cta-heading"
            data-mb-reveal="true"
            className="rounded-3xl border-[1.5px] border-[var(--mb-line-strong)] bg-[var(--mb-cream-deep)] p-5 sm:p-6"
          >
            <h2
              id="case-sidebar-cta-heading"
              className="mb-display text-xl font-semibold text-[var(--mb-ink)]"
            >
              Planning something similar?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
              Tell RDev Studio what you need and we will reply in plain English with clear next steps.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link href={quoteHref} className="mb-btn-primary w-full">
                Request a quote
                <span aria-hidden="true" className="mb-arrow-icon">
                  &rarr;
                </span>
              </Link>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-whatsapp w-full"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                WhatsApp the studio
              </a>
            </div>
          </section>
        </aside>
      </div>

      {/* ── PREV / NEXT CASE STUDY NAVIGATION ────────────────────────────── */}
      <nav
        aria-label="More case studies"
        className="mx-auto max-w-5xl px-4 pb-10 sm:px-6"
      >
        <div
          data-mb-reveal="true"
          className="grid gap-4 border-t border-[var(--mb-line)] pt-8 sm:grid-cols-2"
        >
          <Link
            href={`/mock-b/work/${previous.id}`}
            className="mb-card mb-card-interactive flex min-h-[44px] flex-col justify-between p-5"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              &larr; Previous project
            </span>
            <span className="mb-display mt-2 text-2xl font-semibold text-[var(--mb-ink)]">
              {previous.name}
            </span>
            <span className="mt-1 text-xs font-medium text-[var(--mb-ink-soft)]">
              {previous.type}
            </span>
          </Link>

          <Link
            href={`/mock-b/work/${next.id}`}
            className="mb-card mb-card-interactive flex min-h-[44px] flex-col justify-between p-5 sm:text-right"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
              Next project &rarr;
            </span>
            <span className="mb-display mt-2 text-2xl font-semibold text-[var(--mb-ink)]">
              {next.name}
            </span>
            <span className="mt-1 text-xs font-medium text-[var(--mb-ink-soft)]">
              {next.type}
            </span>
          </Link>
        </div>

        <div className="mt-5 text-center">
          <Link href="/mock-b/work" className="mb-btn-soft">
            <span aria-hidden="true">&larr;</span>
            Back to all five projects
          </Link>
        </div>
      </nav>

      {/* ── BOTTOM DUAL CTA CLOSE ────────────────────────────────────────── */}
      <section
        aria-labelledby="case-close-heading"
        className="mx-auto max-w-5xl px-4 pt-2 sm:px-6"
      >
        <div
          data-mb-reveal="true"
          className="rounded-[32px] border-2 border-[var(--mb-line-strong)] bg-[var(--mb-paper)] p-6 shadow-[0_5px_0_var(--mb-line)] sm:p-9"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-sticker mb-sticker-wobble bg-[var(--mb-butter)] text-[var(--mb-ink)]">
                Start a project
              </p>
              <h2
                id="case-close-heading"
                className="mb-display mt-3 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl"
              >
                Want a clear, phone-first build for your team?
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[var(--mb-ink-soft)]">
                Send a short note through the quote form or message RDev Studio directly on WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link href={quoteHref} className="mb-btn-primary">
                Start a quote
                <span aria-hidden="true" className="mb-arrow-icon">
                  &rarr;
                </span>
              </Link>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
