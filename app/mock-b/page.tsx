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
  CarrickCoastIllustration,
  ServiceIcon,
  WaveRule,
  WavyUnderline,
  WhatsAppIcon,
} from "@/components/mock-b/CoastalDoodles";
import { ProjectPreview } from "@/components/mock-b/ProjectPreview";
import { WarmQuoteForm } from "@/components/mock-b/WarmQuoteForm";

const SERVICE_TINT_CLASS = {
  terracotta: "bg-[var(--mb-terracotta-soft)] text-[var(--mb-terracotta-ink)]",
  seaglass: "bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)]",
  butter: "bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]",
  cream: "bg-[var(--mb-cream-deep)] text-[var(--mb-ink)]",
} as const;

const PROJECT_ACCENT_CLASS = {
  seaglass: "bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)]",
  terracotta: "bg-[var(--mb-terracotta-soft)] text-[var(--mb-terracotta-ink)]",
  butter: "bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]",
} as const;

export default function MockBHomePage() {
  return (
    <div className="pb-16 sm:pb-24">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
        <LocalTimeChip />

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-10">
          <div>
            <h1 className="mb-display text-[2.4rem] font-semibold leading-[1.06] tracking-tight text-[var(--mb-ink)] sm:text-5xl lg:text-[3.55rem]">
              RDev Studio designs and builds{" "}
              <span className="relative inline-block whitespace-nowrap text-[var(--mb-terracotta)]">
                websites
                <WavyUnderline className="absolute -bottom-1.5 left-0 h-3 w-full text-[var(--mb-terracotta)]" />
              </span>{" "}
              and digital products.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--mb-ink-soft)] sm:text-lg">
              A friendly, plain-English web studio rooted in Carrickfergus, Northern Ireland. We build fast sites, useful web apps, and clearer local listings for small businesses and charities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="mb-btn-primary w-full sm:w-auto">
                Start a quote
                <span aria-hidden="true">&rarr;</span>
              </a>

              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-whatsapp w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </a>

              <Link
                href="/mock-b/work"
                className="inline-flex min-h-[44px] items-center justify-center px-3 text-sm font-semibold text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 transition-colors hover:text-[var(--mb-terracotta)] sm:justify-start"
              >
                See all five projects
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--mb-ink-soft)]">
              <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-paper)] px-3 py-1.5">
                Small businesses
              </span>
              <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-paper)] px-3 py-1.5">
                Charities &amp; rescues
              </span>
              <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-paper)] px-3 py-1.5">
                Web apps &amp; Google Business Profile
              </span>
            </div>
          </div>

          <div className="lg:pt-2">
            <CarrickCoastIllustration />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* ── LATEST WORK (5 REAL PROJECTS) ────────────────────────────────── */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-sticker mb-sticker-tilt-left bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]">
              Latest work
            </p>
            <h2
              id="work-heading"
              className="mb-display mt-3 text-3xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-4xl"
            >
              Five builds from the studio
            </h2>
          </div>

          <Link
            href="/mock-b/work"
            className="mb-btn-soft w-fit"
          >
            Open full showcase
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Melon-inspired clean editorial project index + warm preview cards */}
        <ol className="mt-8 space-y-5">
          {MOCK_B_PROJECTS.map((project, index) => (
            <li
              key={project.id}
              className="mb-card mb-card-interactive overflow-hidden p-5 sm:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                    <span className="tabular-nums text-[var(--mb-ink-faint)]">
                      0{index + 1}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 ${PROJECT_ACCENT_CLASS[project.accent]}`}
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

                  <div>
                    <h3 className="mb-display text-2xl font-semibold text-[var(--mb-ink)] sm:text-[1.75rem]">
                      {project.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-cream)] px-2.5 py-1 text-xs font-medium text-[var(--mb-ink-soft)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
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
                    ) : (
                      <Link href={project.href} className="mb-btn-soft">
                        {project.linkLabel}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    )}

                    <Link
                      href={`/mock-b/work#${project.id}`}
                      className="inline-flex min-h-[44px] items-center px-2 text-sm font-semibold text-[var(--mb-terracotta-ink)] underline decoration-[var(--mb-terracotta)]/40 underline-offset-4 hover:text-[var(--mb-terracotta)]"
                    >
                      Project notes
                    </Link>

                    {project.secondaryHref && project.secondaryLabel ? (
                      <Link
                        href={project.secondaryHref}
                        className="inline-flex min-h-[44px] items-center px-2 text-sm font-semibold text-[var(--mb-ink-soft)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-ink)]"
                      >
                        {project.secondaryLabel}
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div>
                  <ProjectPreview project={project} size="compact" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* ── SERVICES & SKILLS ────────────────────────────────────────────── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-sticker mb-sticker-tilt-right bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)] border-[var(--mb-seaglass)]/35">
              Skills &amp; services
            </p>
            <h2
              id="services-heading"
              className="mb-display mt-3 text-3xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-4xl"
            >
              Practical web work, explained in plain English
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--mb-ink-soft)]">
              Every job is quoted clearly after a quick conversation, so you only pay for what your business or charity actually needs.
            </p>
          </div>

          <Link href="/mock-b/services" className="mb-btn-soft w-fit shrink-0">
            Full services guide
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {MOCK_B_SERVICES.map((service) => (
            <article
              key={service.id}
              className="mb-card flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--mb-line)] ${SERVICE_TINT_CLASS[service.tint]}`}
                  >
                    <ServiceIcon kind={service.icon} />
                  </span>
                  <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-cream)] px-3 py-1 text-xs font-semibold text-[var(--mb-ink-soft)]">
                    {service.tag}
                  </span>
                </div>

                <h3 className="mb-display mt-5 text-2xl font-semibold text-[var(--mb-ink)]">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-[var(--mb-line)] pt-4 text-sm text-[var(--mb-ink)]">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--mb-terracotta)]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href="#quote"
                  className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--mb-terracotta-ink)] underline decoration-[var(--mb-terracotta)]/45 underline-offset-4 hover:text-[var(--mb-terracotta)]"
                >
                  Ask for a quote on this
                  <span aria-hidden="true">&nbsp;&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* How we work strip */}
        <div className="mt-10 rounded-[28px] border-[1.5px] border-[var(--mb-line)] bg-[var(--mb-cream-deep)] p-6 sm:p-8">
          <h3 className="mb-display text-2xl font-semibold text-[var(--mb-ink)]">
            How a project runs
          </h3>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_RHYTHM.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-paper)] p-4"
              >
                <span className="mb-display text-lg font-semibold text-[var(--mb-terracotta)]">
                  {item.step}
                </span>
                <p className="mt-1.5 text-base font-bold text-[var(--mb-ink)]">
                  {item.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* ── ABOUT THE STUDIO (STUDIO VOICE ONLY, NO PERSONAL BIO) ────────── */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="mb-card grid gap-8 bg-[var(--mb-paper)] p-6 sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-sticker mb-sticker-tilt-left bg-[var(--mb-terracotta-soft)] text-[var(--mb-terracotta-ink)] border-[var(--mb-terracotta)]/30">
              About RDev Studio
            </p>
            <h2
              id="about-heading"
              className="mb-display mt-4 text-3xl font-semibold tracking-tight text-[var(--mb-ink)] sm:text-4xl"
            >
              Local to Carrickfergus, built for real-world use
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--mb-ink-soft)]">
              RDev Studio is an independent web design and development studio based in Carrickfergus, Northern Ireland. We work directly with small businesses, trades, community projects, and charities from first sketch to live launch.
            </p>
            <p className="mt-3.5 text-base leading-relaxed text-[var(--mb-ink-soft)]">
              We keep things clear and maintainable: phone-first layouts, plain-English copy, honest scope, and code that you own outright once it goes live.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--mb-line)] bg-[var(--mb-cream)] p-5 sm:p-6">
            <h3 className="mb-display text-xl font-semibold text-[var(--mb-ink)]">
              What you can expect
            </h3>
            <dl className="mt-4 space-y-3.5 text-sm">
              <div className="border-b border-[var(--mb-line)] pb-3">
                <dt className="font-bold text-[var(--mb-ink)]">Direct studio contact</dt>
                <dd className="mt-0.5 text-[var(--mb-ink-soft)]">
                  No account managers or hand-offs between departments.
                </dd>
              </div>
              <div className="border-b border-[var(--mb-line)] pb-3">
                <dt className="font-bold text-[var(--mb-ink)]">Built for phones first</dt>
                <dd className="mt-0.5 text-[var(--mb-ink-soft)]">
                  Checked on real screens so buttons, menus, and forms feel effortless.
                </dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--mb-ink)]">Charities &amp; local roots</dt>
                <dd className="mt-0.5 text-[var(--mb-ink-soft)]">
                  Registered charities and rescues can ask about free-of-charge support.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── START A PROJECT (QUOTE FORM + WHATSAPP CLOSE) ────────────────── */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-6 sm:px-6 sm:pt-10"
      >
        <div className="overflow-hidden rounded-[32px] border-2 border-[var(--mb-line-strong)] bg-[var(--mb-paper)] shadow-[0_6px_0_var(--mb-line)]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            {/* Warm coastal contact column */}
            <div className="flex flex-col justify-between bg-[var(--mb-cream-deep)] p-6 sm:p-8 lg:border-r lg:border-[var(--mb-line)]">
              <div>
                <p className="mb-sticker bg-[var(--mb-butter)] text-[var(--mb-ink)]">
                  Start a project
                </p>
                <h2
                  id="quote-heading"
                  className="mb-display mt-4 text-3xl font-semibold leading-tight text-[var(--mb-ink)] sm:text-4xl"
                >
                  Tell us what you are planning
                </h2>
                <p className="mt-3.5 text-base leading-relaxed text-[var(--mb-ink-soft)]">
                  Send a short note with the form or drop us a message on WhatsApp. We will come back with clear next steps and a tailored quote.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-[var(--mb-seaglass)]/35 bg-[var(--mb-seaglass-soft)] p-4">
                  <p className="text-sm font-bold text-[var(--mb-seaglass-ink)]">
                    Prefer a quick chat?
                  </p>
                  <p className="mt-1 text-sm text-[var(--mb-ink-soft)]">
                    WhatsApp is often the quickest way to share an idea or link.
                  </p>
                  <a
                    href={STUDIO_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-btn-whatsapp mt-4 w-full whitespace-nowrap text-sm sm:text-[0.9375rem]"
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />
                    Message on WhatsApp
                  </a>
                </div>

                <p className="text-sm text-[var(--mb-ink-soft)]">
                  Or email us directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-[44px] items-center font-semibold text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* Quote form column */}
            <div className="p-6 sm:p-8">
              <WarmQuoteForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
