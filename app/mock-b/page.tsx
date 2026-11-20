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
      {/* Hero: brand-led type composition, one primary CTA */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <LocalTimeChip />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-end lg:gap-14">
          <div>
            <h1 className="mb-h1 max-w-[20ch] text-[var(--mb-ink)]">
              RDev Studio designs and builds websites and digital products.
            </h1>

            <p className="mb-lede mt-6">
              A friendly, plain-English web studio rooted in Carrickfergus, Northern Ireland. We build fast sites, useful web apps, and clearer local listings for small businesses and charities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="mb-btn-primary w-full sm:w-auto">
                Start a quote
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </a>

              <Link href="/mock-b/work" className="mb-text-link px-1">
                See all five projects
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>

          <div className="border-t border-[var(--mb-line-strong)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="mb-kicker-muted">Who this is for</p>
            <ul className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] text-sm font-bold text-[var(--mb-ink)]">
              <li className="py-3">Small businesses</li>
              <li className="py-3">Charities &amp; rescues</li>
              <li className="py-3">Web apps &amp; Google Business Profile</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── LATEST WORK (FULL-BLEED RULED PROJECT ROWS) ──────────────────── */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div className="mb-shell mb-section-pad max-w-6xl scroll-mt-24 sm:px-6">
          <div
            data-mb-reveal="true"
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-kicker">Latest work</p>
              <h2 id="work-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Five builds from the studio
              </h2>
            </div>

            <Link href="/mock-b/work" className="mb-text-link w-fit shrink-0">
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
                    <div className="mb-meta">
                      <span className="tabular-nums font-semibold text-[var(--mb-tertiary)]">
                        0{index + 1}
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

                    <div>
                      <h3 className="mb-h3 text-[var(--mb-ink)]">
                        <Link
                          href={`/mock-b/work/${project.id}`}
                          className="mb-title-link"
                        >
                          {project.name}
                        </Link>
                      </h3>
                      <p className="mb-prose mt-2.5">
                        {project.summary}
                      </p>
                    </div>

                    <p className="mb-stack">
                      {project.stack.map((tag, i) => (
                        <span key={tag}>
                          {i > 0 ? <span className="mb-stack-sep" aria-hidden="true">/</span> : null}
                          {tag}
                        </span>
                      ))}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <Link
                        href={`/mock-b/work/${project.id}`}
                        className="mb-text-link"
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
                        <Link
                          href={project.href}
                          className="mb-text-link"
                        >
                          {project.linkLabel}
                        </Link>
                      ) : null}

                      {project.secondaryHref && project.secondaryLabel ? (
                        <Link
                          href={project.secondaryHref}
                          className="mb-text-link text-[var(--mb-muted)]"
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
        <div className="mb-shell mb-section-pad max-w-6xl scroll-mt-24 sm:px-6">
          <div
            data-mb-reveal="true"
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-2xl">
              <p className="mb-kicker">Skills &amp; services</p>
              <h2 id="services-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Practical web work, explained in plain English
              </h2>
              <p className="mb-body mt-3">
                Every job is quoted clearly after a quick conversation, so you only pay for what your business or charity actually needs.
              </p>
            </div>

            <Link href="/mock-b/services" className="mb-text-link w-fit shrink-0">
              Full services guide
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {MOCK_B_SERVICES.map((service, index) => (
              <li key={service.id} data-mb-reveal="true" className="py-6 sm:py-7">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start md:gap-10">
                  <div className="min-w-0">
                    <div className="mb-meta">
                      <span className="tabular-nums font-semibold text-[var(--mb-link)]">
                        0{index + 1}
                      </span>
                      <span aria-hidden="true" className="mb-meta-sep">
                        /
                      </span>
                      <span className="text-[var(--mb-tertiary)]">{service.tag}</span>
                    </div>
                    <h3 className="mb-h3 mt-2 text-[var(--mb-ink)]">
                      {service.title}
                    </h3>
                    <p className="mb-prose mt-2">
                      {service.summary}
                    </p>
                    <a
                      href="#quote"
                      className="mb-text-link mt-4"
                    >
                      Ask for a quote on this
                      <ArrowRightIcon className="h-4 w-4 shrink-0" />
                    </a>
                  </div>

                  <ul className="mb-dash-list border-t border-[var(--mb-line)] pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span aria-hidden="true" data-mb-dash>
                          -
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          {/* How a project runs - numbered ruled steps (editorial rows, not equal cards) */}
          <div
            data-mb-reveal="true"
            className="mt-16 border-t border-[var(--mb-line-strong)] pt-12"
          >
            <h3 className="mb-h3 text-[var(--mb-ink)]">How a project runs</h3>
            <ol className="mt-8 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              {STUDIO_RHYTHM.map((item) => (
                <li
                  key={item.step}
                  className="grid gap-2 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                >
                  <span className="mb-num text-xl">{item.step}</span>
                  <div className="min-w-0 max-w-[var(--mb-measure)]">
                    <p className="text-base font-semibold text-[var(--mb-ink)]">
                      {item.title}
                    </p>
                    <p className="mb-prose mt-1.5">
                      {item.body}
                    </p>
                  </div>
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
          className="mb-shell mb-section-pad grid max-w-6xl scroll-mt-24 gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14"
        >
          <div>
            <p className="mb-kicker">About RDev Studio</p>
            <h2 id="about-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Local to Carrickfergus, built for real-world use
            </h2>
            <p className="mb-body mt-5">
              RDev Studio is an independent web design and development studio based in Carrickfergus, Northern Ireland. We work directly with small businesses, trades, community projects, and charities from first sketch to live launch.
            </p>
            <p className="mb-body mt-4">
              We keep things clear and maintainable: phone-first layouts, plain-English copy, honest scope, and code that you own outright once it goes live.
            </p>
          </div>

          <div className="border-t border-[var(--mb-line-strong)] pt-6 lg:border-t-0 lg:pt-0">
            <h3 className="mb-kicker-muted">
              What you can expect
            </h3>
            <dl className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              <div className="py-4">
                <dt className="text-sm font-semibold text-[var(--mb-ink)]">Direct studio contact</dt>
                <dd className="mb-prose mt-1">
                  No account managers or hand-offs between departments.
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-semibold text-[var(--mb-ink)]">Built for phones first</dt>
                <dd className="mb-prose mt-1">
                  Checked on real screens so buttons, menus, and forms feel effortless.
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-semibold text-[var(--mb-ink)]">Charities &amp; local roots</dt>
                <dd className="mb-prose mt-1">
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
          className="mb-shell mb-section-pad grid max-w-6xl scroll-mt-24 gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-12"
        >
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <p className="mb-kicker-muted">Start a project</p>
              <h2 id="quote-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Tell us what you are planning
              </h2>
              <p className="mb-body mt-4">
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
                  className="mb-text-link mt-3"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  Message on WhatsApp
                </a>
              </div>

              <p className="mb-prose">
                Or email us directly at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mb-inline-link"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div className="mb-on-surface mb-panel text-[var(--mb-ink)]">
            <WarmQuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
