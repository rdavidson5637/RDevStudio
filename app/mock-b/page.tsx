import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import {
  MOCK_B_PROJECTS,
  MOCK_B_SERVICES,
  STUDIO_RHYTHM,
  STUDIO_WHATSAPP_URL,
} from "@/components/mock-b/data";
import { LocalTimeChip } from "@/components/mock-b/LocalTimeChip";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
} from "@/components/mock-b/icons";
import { ProjectPreview } from "@/components/mock-b/ProjectPreview";
import { WarmQuoteForm } from "@/components/mock-b/WarmQuoteForm";

export default function MockBHomePage() {
  return (
    <div>
      {/* ── HERO (OPEN EDITORIAL LAYOUT) ─────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
        <LocalTimeChip />

        <div className="mt-8 max-w-3xl">
          <h1 className="mb-display text-[2.35rem] font-semibold leading-[1.06] tracking-tight text-[var(--mb-ink)] sm:text-5xl lg:text-[3.75rem]">
            RDev Studio designs and builds{" "}
            <span className="text-[var(--mb-link)]">websites</span> and digital products.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--mb-muted)] sm:text-lg">
            A friendly, plain-English web studio rooted in Carrickfergus, Northern Ireland. We build fast sites, useful web apps, and clearer local listings for small businesses and charities.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#quote" className="mb-btn-primary w-full sm:w-auto">
              Start a quote
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </a>

            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-secondary w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
              Message on WhatsApp
            </a>

            <Link
              href="/mock-b/work"
              className="inline-flex min-h-[44px] items-center justify-center px-3 text-sm font-semibold text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 transition-colors hover:text-[var(--mb-link)] sm:justify-start"
            >
              See all five projects
            </Link>
          </div>
        </div>

        <ul className="mt-12 grid gap-3 border-t border-[var(--mb-line)] pt-6 text-sm font-medium text-[var(--mb-muted)] sm:grid-cols-3 sm:gap-6">
          <li>Small businesses</li>
          <li className="sm:border-l sm:border-[var(--mb-line)] sm:pl-6">
            Charities &amp; rescues
          </li>
          <li className="sm:border-l sm:border-[var(--mb-line)] sm:pl-6">
            Web apps &amp; Google Business Profile
          </li>
        </ul>
      </section>

      {/* ── LATEST WORK (FULL-BLEED RULED PROJECT ROWS) ──────────────────── */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
          <div
            data-mb-reveal="true"
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-link)]">
                Latest work
              </p>
              <h2
                id="work-heading"
                className="mb-display mt-2 text-3xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-4xl"
              >
                Five builds from the studio
              </h2>
            </div>

            <Link href="/mock-b/work" className="mb-btn-secondary w-fit">
              Open full showcase
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {MOCK_B_PROJECTS.map((project, index) => (
              <li
                key={project.id}
                data-mb-reveal="true"
                className="py-10 sm:py-12"
              >
                <div
                  className={`grid gap-8 md:items-center ${
                    index === 0
                      ? "md:grid-cols-[0.95fr_1.05fr] md:gap-10"
                      : "md:grid-cols-[1.1fr_0.9fr] md:gap-10"
                  }`}
                >
                  <div className="min-w-0 space-y-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--mb-muted)]">
                      <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">
                        0{index + 1}
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

                    <div>
                      <h3 className="mb-display text-2xl font-semibold text-[var(--mb-ink)] sm:text-3xl">
                        <Link
                          href={`/mock-b/work/${project.id}`}
                          className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-[var(--mb-link)] hover:underline"
                        >
                          {project.name}
                        </Link>
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                        {project.summary}
                      </p>
                    </div>

                    <p className="text-xs font-medium text-[var(--mb-tertiary)]">
                      {project.stack.join(" · ")}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
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

                      {project.secondaryHref && project.secondaryLabel ? (
                        <Link
                          href={project.secondaryHref}
                          className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--mb-muted)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-ink)]"
                        >
                          {project.secondaryLabel}
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <ProjectPreview
                      project={project}
                      size={index === 0 ? "featured" : "compact"}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SERVICES & SKILLS (RULED EDITORIAL LIST + NUMBERED STEPS) ────── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="mb-on-light border-t border-[var(--mb-line)] bg-[var(--mb-light)]"
      >
        <div className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
          <div
            data-mb-reveal="true"
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-link)]">
                Skills &amp; services
              </p>
              <h2
                id="services-heading"
                className="mb-display mt-2 text-3xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-4xl"
              >
                Practical web work, explained in plain English
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--mb-muted)]">
                Every job is quoted clearly after a quick conversation, so you only pay for what your business or charity actually needs.
              </p>
            </div>

            <Link href="/mock-b/services" className="mb-btn-secondary w-fit shrink-0">
              Full services guide
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {MOCK_B_SERVICES.map((service, index) => (
              <article
                key={service.id}
                data-mb-reveal="true"
                className="flex flex-col justify-between border-t border-[var(--mb-line-strong)] pt-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className="tabular-nums text-[var(--mb-link)]">
                      0{index + 1}
                    </span>
                    <span className="uppercase tracking-wider text-[var(--mb-tertiary)]">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="mb-display mt-3 text-2xl font-semibold text-[var(--mb-ink)]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[var(--mb-line)] pt-4 text-sm text-[var(--mb-ink)]">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="select-none text-[var(--mb-link)]"
                        >
                          &mdash;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <a
                    href="#quote"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-link)] underline decoration-[var(--mb-border-accent)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
                  >
                    Ask for a quote on this
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* How a project runs — numbered ruled steps */}
          <div
            data-mb-reveal="true"
            className="mt-16 border-t border-[var(--mb-line-strong)] pt-12"
          >
            <h3 className="mb-display text-2xl font-semibold text-[var(--mb-ink)]">
              How a project runs
            </h3>
            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STUDIO_RHYTHM.map((item) => (
                <li
                  key={item.step}
                  className="border-t border-[var(--mb-line-strong)] pt-4"
                >
                  <span className="mb-display text-2xl font-semibold tabular-nums text-[var(--mb-link)]">
                    {item.step}
                  </span>
                  <p className="mt-2 text-base font-semibold text-[var(--mb-ink)]">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--mb-muted)]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE STUDIO (TWO-COLUMN EDITORIAL + RULED LIST) ─────────── */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-bg)]"
      >
        <div
          data-mb-reveal="true"
          className="mx-auto grid max-w-5xl scroll-mt-24 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-link)]">
              About RDev Studio
            </p>
            <h2
              id="about-heading"
              className="mb-display mt-2 text-3xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-4xl"
            >
              Local to Carrickfergus, built for real-world use
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--mb-muted)]">
              RDev Studio is an independent web design and development studio based in Carrickfergus, Northern Ireland. We work directly with small businesses, trades, community projects, and charities from first sketch to live launch.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--mb-muted)]">
              We keep things clear and maintainable: phone-first layouts, plain-English copy, honest scope, and code that you own outright once it goes live.
            </p>
          </div>

          <div className="border-t border-[var(--mb-line-strong)] pt-6 lg:border-t-0 lg:pt-0">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-tertiary)]">
              What you can expect
            </h3>
            <dl className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] text-sm">
              <div className="py-4">
                <dt className="font-semibold text-[var(--mb-ink)]">Direct studio contact</dt>
                <dd className="mt-1 text-[var(--mb-muted)]">
                  No account managers or hand-offs between departments.
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-semibold text-[var(--mb-ink)]">Built for phones first</dt>
                <dd className="mt-1 text-[var(--mb-muted)]">
                  Checked on real screens so buttons, menus, and forms feel effortless.
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-semibold text-[var(--mb-ink)]">Charities &amp; local roots</dt>
                <dd className="mt-1 text-[var(--mb-muted)]">
                  Registered charities and rescues can ask about free-of-charge support.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── START A PROJECT (NAPLES BAND + SLATE 2 FORM) ──────────── */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div
          data-mb-reveal="true"
          className="mx-auto grid max-w-5xl scroll-mt-24 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-12"
        >
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-muted)]">
                Start a project
              </p>
              <h2
                id="quote-heading"
                className="mb-display mt-2 text-3xl font-semibold leading-tight text-[var(--mb-ink)] sm:text-4xl"
              >
                Tell us what you are planning
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--mb-muted)]">
                Send a short note with the form or drop us a message on WhatsApp. We will come back with clear next steps and a tailored quote.
              </p>
            </div>

            <div className="space-y-5 border-t border-[var(--mb-line)] pt-6">
              <div>
                <p className="text-sm font-semibold text-[var(--mb-ink)]">
                  Prefer a quick chat?
                </p>
                <p className="mt-1 text-sm text-[var(--mb-muted)]">
                  WhatsApp is often the quickest way to share an idea or link.
                </p>
                <a
                  href={STUDIO_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-btn-secondary-inverse mt-4 w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  Message on WhatsApp
                </a>
              </div>

              <p className="text-sm text-[var(--mb-muted)]">
                Or email us directly at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-[44px] items-center font-semibold text-[var(--mb-ink)] underline decoration-[var(--mb-line)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div className="mb-on-surface rounded-[var(--radius-md)] border border-[var(--mb-line)] bg-[var(--mb-surface)] p-6 text-[var(--mb-ink)] sm:p-8">
            <WarmQuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
