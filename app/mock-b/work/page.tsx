import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_B_PROJECTS, STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { WaveRule, WhatsAppIcon } from "@/components/mock-b/CoastalDoodles";
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

const ACCENT_PILL = {
  seaglass: "bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)]",
  terracotta: "bg-[var(--mb-terracotta-soft)] text-[var(--mb-terracotta-ink)]",
  butter: "bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]",
} as const;

export default function MockBWorkPage() {
  return (
    <div className="pb-16 sm:pb-24">
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pt-14">
        <Link
          href="/mock-b"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink-soft)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to studio home
        </Link>

        <div className="mt-5 max-w-2xl">
          <p className="mb-sticker mb-sticker-tilt-left mb-sticker-wobble bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]">
            Studio showcase
          </p>
          <h1 className="mb-display mt-3 text-4xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-5xl">
            Five builds from RDev Studio
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--mb-ink-soft)] sm:text-lg">
            Charity sites, volunteer platforms, and custom web apps designed and built in Carrickfergus. Every note below sticks strictly to confirmed project facts.
          </p>
        </div>

        {/* Quick jump index */}
        <nav
          aria-label="Jump to project"
          className="mt-7 flex flex-wrap items-center gap-2"
        >
          {MOCK_B_PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={`#${project.id}`}
              className="mb-btn-soft text-xs sm:text-sm"
            >
              <span className="tabular-nums text-[var(--mb-ink-faint)]">
                0{index + 1}
              </span>
              <span>{project.name}</span>
            </a>
          ))}
        </nav>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* Expanded project panels */}
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        {MOCK_B_PROJECTS.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            data-mb-reveal="true"
            className="mb-card mb-card-interactive scroll-mt-28 p-5 sm:p-8"
          >
            <div className="flex flex-col gap-4 border-b border-[var(--mb-line)] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="tabular-nums text-[var(--mb-ink-faint)]">
                    Project 0{index + 1}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 ${ACCENT_PILL[project.accent]}`}
                  >
                    {project.type}
                  </span>
                  <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-cream)] px-2.5 py-1 text-[var(--mb-ink-soft)]">
                    {project.year}
                  </span>
                  <span className="text-[var(--mb-ink-soft)]">
                    {project.statusLabel}
                  </span>
                </div>

                <h2 className="mb-display text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl">
                  <Link
                    href={`/mock-b/work/${project.id}`}
                    className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-[var(--mb-terracotta)] hover:underline"
                  >
                    {project.name}
                  </Link>
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-[var(--mb-ink-soft)]">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:shrink-0 sm:pt-1">
                <Link
                  href={`/mock-b/work/${project.id}`}
                  className="mb-btn-primary"
                >
                  Read case study
                  <span aria-hidden="true" className="mb-arrow-icon">&rarr;</span>
                </Link>

                {project.external ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-btn-soft"
                  >
                    {project.linkLabel}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                ) : project.id === "assisi" ? (
                  <Link href={project.href} className="mb-btn-soft">
                    {project.linkLabel}
                  </Link>
                ) : null}

                {project.secondaryHref && project.secondaryLabel ? (
                  <Link href={project.secondaryHref} className="mb-btn-soft">
                    {project.secondaryLabel}
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="mb-preview-lift mt-6">
              <WorkDeviceShowcase project={project} />
            </div>

            <div className="mt-6 grid gap-6 border-t border-[var(--mb-line)] pt-6 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
                  Build notes
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[var(--mb-ink)] sm:text-base">
                  {project.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--mb-terracotta)]"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-cream)] p-4 sm:p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
                  Focus &amp; stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--mb-line-strong)] bg-[var(--mb-paper)] px-3 py-1 text-xs font-semibold text-[var(--mb-ink)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom dual CTA close */}
      <section
        aria-labelledby="work-cta-heading"
        className="mx-auto max-w-5xl px-4 pt-4 sm:px-6"
      >
        <div
          data-mb-reveal="true"
          className="rounded-[32px] border-2 border-[var(--mb-line-strong)] bg-[var(--mb-cream-deep)] p-6 shadow-[0_5px_0_var(--mb-line)] sm:p-9"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-sticker mb-sticker-wobble bg-[var(--mb-butter)] text-[var(--mb-ink)]">
                Have a project in mind?
              </p>
              <h2
                id="work-cta-heading"
                className="mb-display mt-3 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl"
              >
                Let us build something clear and useful together
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[var(--mb-ink-soft)]">
                Send a short note through the quote form or message RDev Studio on WhatsApp for a straightforward chat.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link href="/mock-b/contact" className="mb-btn-primary">
                Start a quote
                <span aria-hidden="true" className="mb-arrow-icon">&rarr;</span>
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
