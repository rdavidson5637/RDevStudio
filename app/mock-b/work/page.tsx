import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_B_PROJECTS, STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
} from "@/components/mock-b/icons";
import { ProjectPreview } from "@/components/mock-b/ProjectPreview";
import { WorkDeviceShowcase } from "@/components/mock-b/WorkDeviceShowcase";

export const metadata: Metadata = {
  title: "Work showcase",
  description:
    "Five projects from RDev Studio: ShelterLink, Assisi Animal Sanctuary, Crosskennan, Rondo, and MGSL Hub.",
  robots: {
    index: false,
    follow: false,
  },
};

const GRID_SPAN_BY_INDEX = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

export default function MockBWorkPage() {
  const [featuredProject, ...otherProjects] = MOCK_B_PROJECTS;

  return (
    <div>
      {/* ── HEADER + JUMP BAR ────────────────────────────────────────────── */}
      <section className="mb-shell max-w-6xl pb-10 pt-8 sm:px-6 sm:pt-14">
        <Link
          href="/mock-b"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-muted)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
        >
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          Back to studio home
        </Link>

        <div className="mt-5 max-w-2xl">
          <p className="mb-kicker">
            Studio showcase
          </p>
          <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">
            Five builds from RDev Studio
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--mb-muted)] sm:text-lg">
            Charity sites, volunteer platforms, and custom web apps designed and built in Carrickfergus. Every note below sticks strictly to confirmed project facts.
          </p>
        </div>

        <nav
          aria-label="Jump to project"
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 border-y border-[var(--mb-line)] py-2"
        >
          {MOCK_B_PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={`#${project.id}`}
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--mb-ink)] hover:text-[var(--mb-link)]"
            >
              <span className="tabular-nums text-xs text-[var(--mb-tertiary)]">
                0{index + 1}
              </span>
              <span>{project.name}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* ── FEATURED LEAD PROJECT (01 SHELTERLINK - FULL WIDTH) ──────────── */}
      <section className="mb-shell max-w-6xl pb-16 pt-4 sm:px-6">
        <article
          id={featuredProject.id}
          data-mb-reveal="true"
          className="scroll-mt-24 space-y-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--mb-muted)]">
                <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">
                  Project 01
                </span>
                <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
                  /
                </span>
                <span className="font-semibold text-[var(--mb-link)]">
                  {featuredProject.type}
                </span>
                <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
                  /
                </span>
                <span>{featuredProject.year}</span>
                <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
                  /
                </span>
                <span>{featuredProject.statusLabel}</span>
              </div>

              <h2 className="mb-display text-3xl text-[var(--mb-ink)] sm:text-4xl">
                <Link
                  href={`/mock-b/work/${featuredProject.id}`}
                  className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-[var(--mb-link)] hover:underline"
                >
                  {featuredProject.name}
                </Link>
              </h2>
              <p className="text-base leading-relaxed text-[var(--mb-muted)]">
                {featuredProject.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:shrink-0">
              <Link
                href={`/mock-b/work/${featuredProject.id}`}
                className="mb-btn-primary"
              >
                Read case study
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href={featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-secondary"
              >
                {featuredProject.linkLabel}
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          <WorkDeviceShowcase project={featuredProject} />

          <div className="grid gap-8 border-t border-[var(--mb-line)] pt-6 md:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h3 className="mb-kicker-muted">
                Build notes
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[var(--mb-ink)] sm:text-base">
                {featuredProject.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="select-none text-[var(--mb-link)]"
                    >
                      -
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[var(--mb-line)] pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <h3 className="mb-kicker-muted">
                Focus &amp; stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {featuredProject.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line-strong)] bg-[var(--mb-surface)] px-2.5 py-1 text-xs font-medium text-[var(--mb-ink)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {featuredProject.secondaryHref && featuredProject.secondaryLabel ? (
                <div className="mt-4">
                  <Link
                    href={featuredProject.secondaryHref}
                    className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--mb-muted)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-ink)]"
                  >
                    {featuredProject.secondaryLabel}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </section>

      {/* ── MIXED-SIZE EDITORIAL GRID (PROJECTS 02-05) ───────────────────── */}
      <section className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]">
        <div className="mb-shell max-w-6xl py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-12">
            {otherProjects.map((project, idx) => {
              const number = idx + 2;
              const isWide = GRID_SPAN_BY_INDEX[idx] === "lg:col-span-7";
              return (
                <article
                  key={project.id}
                  id={project.id}
                  data-mb-reveal="true"
                  className={`flex scroll-mt-24 flex-col justify-between border-t border-[var(--mb-line-strong)] pt-6 ${GRID_SPAN_BY_INDEX[idx]}`}
                >
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[var(--mb-muted)]">
                        <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">
                          Project 0{number}
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
                        <span>{project.year}</span>
                        <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
                          /
                        </span>
                        <span>{project.statusLabel}</span>
                      </div>

                      <h2 className="mb-display text-2xl text-[var(--mb-ink)] sm:text-3xl">
                        <Link
                          href={`/mock-b/work/${project.id}`}
                          className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-[var(--mb-link)] hover:underline"
                        >
                          {project.name}
                        </Link>
                      </h2>
                      <p className="text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                        {project.summary}
                      </p>
                    </div>

                    <div>
                      {isWide ? (
                        <WorkDeviceShowcase project={project} />
                      ) : (
                        <ProjectPreview project={project} size="compact" />
                      )}
                    </div>

                    <div className="space-y-3 border-t border-[var(--mb-line)] pt-4">
                      <h3 className="mb-kicker-muted">
                        Build notes
                      </h3>
                      <ul className="space-y-2 text-sm leading-relaxed text-[var(--mb-ink)]">
                        {project.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="select-none text-[var(--mb-link)]"
                            >
                              -
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-[var(--mb-line)] pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[var(--mb-radius-sm)] border border-[var(--mb-line)] bg-[var(--mb-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--mb-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/mock-b/work/${project.id}`}
                        className="mb-btn-secondary"
                      >
                        Read case study
                        <ArrowRightIcon className="h-4 w-4 shrink-0" />
                      </Link>

                      {project.external ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-link)] underline decoration-[var(--mb-border-accent)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
                        >
                          {project.linkLabel}
                          <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      ) : project.id === "assisi" ? (
                        <Link
                          href={project.href}
                          className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--mb-link)] underline decoration-[var(--mb-border-accent)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
                        >
                          {project.linkLabel}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM DUAL CTA CLOSE ────────────────────────────────────────── */}
      <section
        aria-labelledby="work-cta-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div
          data-mb-reveal="true"
          className="mb-shell flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-kicker-muted">
              Have a project in mind?
            </p>
            <h2
              id="work-cta-heading"
              className="mb-display mt-2 text-3xl text-[var(--mb-ink)] sm:text-4xl"
            >
              Let us build something clear and useful together
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--mb-muted)]">
              Send a short note through the quote form or message RDev Studio on WhatsApp for a straightforward chat.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href="/mock-b/contact" className="mb-btn-primary">
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
