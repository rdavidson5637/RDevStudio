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

export default function MockBWorkPage() {
  const [featuredProject, ...otherProjects] = MOCK_B_PROJECTS;

  return (
    <div>
      {/* ── HEADER + JUMP BAR ────────────────────────────────────────────── */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <Link href="/mock-b" className="mb-back-link">
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          Back to studio home
        </Link>

        <div className="mt-5 max-w-2xl">
          <p className="mb-kicker">Studio showcase</p>
          <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">
            Five builds from RDev Studio
          </h1>
          <p className="mb-lede mt-4">
            Charity sites, volunteer platforms, and custom web apps designed and built in Carrickfergus. Every note below sticks strictly to confirmed project facts.
          </p>
        </div>

        <nav
          aria-label="Jump to project"
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-0 border-y border-[var(--mb-line)] py-1 sm:gap-x-5"
        >
          {MOCK_B_PROJECTS.map((project, index) => (
            <a key={project.id} href={`#${project.id}`} className="mb-jump-link">
              <span className="mb-caption tabular-nums font-semibold text-[var(--mb-tertiary)]">
                0{index + 1}
              </span>
              <span className="max-w-[12ch] truncate sm:max-w-none">{project.name}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* ── FEATURED LEAD PROJECT (01 SHELTERLINK - FULL WIDTH) ──────────── */}
      <section className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]">
        <article
          id={featuredProject.id}
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
                <span className="font-semibold text-[var(--mb-link)]">
                  {featuredProject.type}
                </span>
                <span aria-hidden="true" className="mb-meta-sep">
                  /
                </span>
                <span>{featuredProject.year}</span>
                <span aria-hidden="true" className="mb-meta-sep">
                  /
                </span>
                <span>{featuredProject.statusLabel}</span>
              </div>

              <h2 className="mb-h2 text-[var(--mb-ink)]">
                <Link
                  href={`/mock-b/work/${featuredProject.id}`}
                  className="mb-title-link"
                >
                  {featuredProject.name}
                </Link>
              </h2>
              <p className="mb-body">{featuredProject.summary}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`/mock-b/work/${featuredProject.id}`}
                className="mb-btn-primary w-full sm:w-auto"
              >
                Read case study
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href={featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-text-link"
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
              <ul className="mb-dash-list mt-3">
                {featuredProject.details.map((detail) => (
                  <li key={detail}>
                    <span aria-hidden="true" data-mb-dash>
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
              <p className="mb-stack mt-3">
                {featuredProject.stack.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 ? <span className="mb-stack-sep" aria-hidden="true">/</span> : null}
                    {tag}
                  </span>
                ))}
              </p>
              {featuredProject.secondaryHref && featuredProject.secondaryLabel ? (
                <div className="mt-4">
                  <Link
                    href={featuredProject.secondaryHref}
                    className="mb-text-link text-[var(--mb-muted)]"
                  >
                    {featuredProject.secondaryLabel}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </section>

      {/* ── PROJECTS 02-05 (FULL-BLEED RULED ROWS, NOT A CARD MOSAIC) ─────── */}
      <section className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]">
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <ol className="divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {otherProjects.map((project, idx) => {
              const number = idx + 2;
              const imageFirst = idx % 2 === 1;
              return (
                <li
                  key={project.id}
                  id={project.id}
                  data-mb-reveal="true"
                  className="scroll-mt-24 py-10 sm:py-12"
                >
                  <article className="space-y-6">
                    <div
                      className={`grid gap-8 md:items-center md:gap-10 ${
                        imageFirst
                          ? "md:grid-cols-[1.05fr_0.95fr]"
                          : "md:grid-cols-[0.95fr_1.05fr]"
                      }`}
                    >
                      <div
                        className={`min-w-0 space-y-3 ${
                          imageFirst ? "md:order-2" : ""
                        }`}
                      >
                        <div className="mb-meta">
                          <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">
                            Project 0{number}
                          </span>
                          <span aria-hidden="true" className="mb-meta-sep">
                            /
                          </span>
                          <span className="font-semibold text-[var(--mb-link)]">
                            {project.type}
                          </span>
                          <span aria-hidden="true" className="mb-meta-sep">
                            /
                          </span>
                          <span>{project.year}</span>
                          <span aria-hidden="true" className="mb-meta-sep">
                            /
                          </span>
                          <span>{project.statusLabel}</span>
                        </div>

                        <h2 className="mb-h3 text-[var(--mb-ink)]">
                          <Link
                            href={`/mock-b/work/${project.id}`}
                            className="mb-title-link"
                          >
                            {project.name}
                          </Link>
                        </h2>
                        <p className="mb-prose">{project.summary}</p>

                        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                          <Link
                            href={`/mock-b/work/${project.id}`}
                            className="mb-text-link w-fit"
                          >
                            Read case study
                            <ArrowRightIcon className="h-4 w-4 shrink-0" />
                          </Link>

                          {project.external ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mb-text-link"
                            >
                              {project.linkLabel}
                              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
                            </a>
                          ) : project.id === "assisi" ? (
                            <Link href={project.href} className="mb-text-link">
                              {project.linkLabel}
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      <div
                        className={`min-w-0 ${
                          imageFirst ? "md:order-1" : ""
                        }`}
                      >
                        <ProjectPreview project={project} size="compact" />
                      </div>
                    </div>

                    <div className="grid gap-6 border-t border-[var(--mb-line)] pt-5 md:grid-cols-[1.35fr_0.65fr] md:gap-8">
                      <div>
                        <h3 className="mb-kicker-muted">Build notes</h3>
                        <ul className="mb-dash-list mt-3">
                          {project.details.map((detail) => (
                            <li key={detail}>
                              <span aria-hidden="true" data-mb-dash>
                                -
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[var(--mb-line)] pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                        <h3 className="mb-kicker-muted">Focus &amp; stack</h3>
                        <p className="mb-stack mt-3">
                          {project.stack.map((tag, i) => (
                            <span key={tag}>
                              {i > 0 ? (
                                <span
                                  className="mb-stack-sep"
                                  aria-hidden="true"
                                >
                                  /
                                </span>
                              ) : null}
                              {tag}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── BOTTOM DUAL CTA CLOSE ────────────────────────────────────────── */}
      <section
        aria-labelledby="work-cta-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div
          data-mb-reveal="true"
          className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6"
        >
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <p className="mb-kicker-muted">Have a project in mind?</p>
            <h2 id="work-cta-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Let us build something clear and useful together
            </h2>
            <p className="mb-body mt-3">
              Send a short note through the quote form or message RDev Studio on WhatsApp for a straightforward chat.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/mock-b/contact" className="mb-btn-primary w-full sm:w-auto">
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
