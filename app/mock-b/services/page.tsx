import type { Metadata } from "next";
import Link from "next/link";
import {
  MOCK_B_SERVICE_GUIDES,
  STUDIO_FAQ_ITEMS,
  STUDIO_RHYTHM,
  STUDIO_WHATSAPP_URL,
} from "@/components/mock-b/data";
import {
  ServiceIcon,
  WaveRule,
  WavyUnderline,
  WhatsAppIcon,
} from "@/components/mock-b/CoastalDoodles";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, web apps, Google Business Profile help, and charity or small-business builds from RDev Studio in Carrickfergus, Northern Ireland.",
  robots: {
    index: false,
    follow: false,
  },
};

const SERVICE_TINT_CLASS = {
  terracotta: "bg-[var(--mb-terracotta-soft)] text-[var(--mb-terracotta-ink)]",
  seaglass: "bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)]",
  butter: "bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]",
  cream: "bg-[var(--mb-cream-deep)] text-[var(--mb-ink)]",
} as const;

export default function MockBServicesPage() {
  return (
    <div className="pb-16 sm:pb-24">
      {/* ── INTRO ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pt-14">
        <Link
          href="/mock-b"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink-soft)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to studio home
        </Link>

        <div className="mt-5 max-w-2xl">
          <p className="mb-sticker mb-sticker-tilt-right mb-sticker-wobble bg-[var(--mb-seaglass-soft)] text-[var(--mb-seaglass-ink)] border-[var(--mb-seaglass)]/35">
            Skills &amp; services
          </p>
          <h1 className="mb-display mt-3 text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-[var(--mb-ink)] sm:text-5xl">
            Plain-English{" "}
            <span className="relative inline-block whitespace-nowrap text-[var(--mb-terracotta)]">
              web work
              <WavyUnderline className="absolute -bottom-1.5 left-0 h-3 w-full text-[var(--mb-terracotta)]" />
            </span>{" "}
            for NI businesses &amp; charities.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--mb-ink-soft)] sm:text-lg">
            RDev Studio designs and builds websites, custom web apps, and clearer local listings from Carrickfergus. Every job is scoped and quoted individually after a short conversation — no one-size-fits-all templates and no guesswork.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/mock-b/contact" className="mb-btn-primary w-full sm:w-auto">
              Request a quote
              <span aria-hidden="true" className="mb-arrow-icon">&rarr;</span>
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-whatsapp w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Quick jump index */}
        <nav
          aria-label="Jump to a service"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {MOCK_B_SERVICE_GUIDES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="mb-btn-soft text-xs sm:text-sm"
            >
              <span className="tabular-nums text-[var(--mb-ink-faint)]">
                {service.number}
              </span>
              <span>{service.title}</span>
            </a>
          ))}
        </nav>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* ── FOUR SERVICE SECTIONS (EACH ENDING WITH BOTH CTAS) ───────────── */}
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
        {MOCK_B_SERVICE_GUIDES.map((service) => (
          <article
            key={service.id}
            id={service.id}
            data-mb-reveal="true"
            className="mb-card mb-card-interactive scroll-mt-28 p-5 sm:p-8"
          >
            <div className="flex flex-col gap-4 border-b border-[var(--mb-line)] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`mb-icon-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--mb-line)] ${SERVICE_TINT_CLASS[service.tint]}`}
                  >
                    <ServiceIcon kind={service.icon} />
                  </span>
                  <span className="tabular-nums text-xs font-bold text-[var(--mb-ink-faint)]">
                    {service.number}
                  </span>
                  <span className="rounded-full border border-[var(--mb-line)] bg-[var(--mb-cream)] px-3 py-1 text-xs font-semibold text-[var(--mb-ink-soft)]">
                    {service.tag}
                  </span>
                </div>

                <h2 className="mb-display mt-4 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--mb-ink-soft)]">
                  {service.lead}
                </p>
              </div>

              {service.exampleHref && service.exampleLabel ? (
                <Link
                  href={service.exampleHref}
                  className="mb-btn-soft w-fit shrink-0"
                >
                  {service.exampleLabel}
                  <span aria-hidden="true" className="mb-arrow-icon">&rarr;</span>
                </Link>
              ) : null}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
                  What we focus on
                </h3>
                <ul className="mt-3.5 space-y-2.5 text-sm leading-relaxed text-[var(--mb-ink)] sm:text-base">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--mb-terracotta)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-cream)] p-4 sm:p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
                    Good fit for
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mb-ink)]">
                    {service.goodFit}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-paper)] p-4 sm:p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--mb-ink-soft)]">
                    Worth knowing
                  </h3>
                  <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
                    {service.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Dual CTAs at the end of every service section */}
            <div className="mt-7 flex flex-col gap-3 border-t border-[var(--mb-line)] pt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`/mock-b/contact?topic=${encodeURIComponent(service.quoteTopic)}`}
                className="mb-btn-primary w-full sm:w-auto"
              >
                Ask for a quote on {service.title.toLowerCase()}
                <span aria-hidden="true" className="mb-arrow-icon">&rarr;</span>
              </Link>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-whatsapp w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      {/* ── HOW A PROJECT RUNS ───────────────────────────────────────────── */}
      <section
        aria-labelledby="services-process-heading"
        className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <div
          data-mb-reveal="true"
          className="rounded-[28px] border-[1.5px] border-[var(--mb-line)] bg-[var(--mb-cream-deep)] p-6 sm:p-8"
        >
          <p className="mb-sticker mb-sticker-tilt-left mb-sticker-wobble bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]">
            How we work
          </p>
          <h2
            id="services-process-heading"
            className="mb-display mt-3 text-3xl font-semibold text-[var(--mb-ink)]"
          >
            Four calm steps from first message to launch
          </h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_RHYTHM.map((item, index) => (
              <li
                key={item.step}
                data-mb-reveal="true"
                data-mb-delay={index > 0 ? String(index) : undefined}
                className="rounded-2xl border border-[var(--mb-line)] bg-[var(--mb-paper)] p-4"
              >
                <span className="mb-display text-lg font-semibold text-[var(--mb-terracotta)]">
                  {item.step}
                </span>
                <h3 className="mt-1.5 text-base font-bold text-[var(--mb-ink)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── COMMON QUESTIONS ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="services-faq-heading"
        className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16"
      >
        <div data-mb-reveal="true" className="max-w-2xl">
          <h2
            id="services-faq-heading"
            className="mb-display text-3xl font-semibold text-[var(--mb-ink)]"
          >
            Common questions
          </h2>
          <p className="mt-2 text-base text-[var(--mb-ink-soft)]">
            Straight answers before you even send a message.
          </p>
        </div>

        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {STUDIO_FAQ_ITEMS.map((item, index) => (
            <div
              key={item.question}
              data-mb-reveal="true"
              data-mb-delay={index % 2 === 1 ? "1" : undefined}
              className="mb-card p-5 sm:p-6"
            >
              <dt className="mb-display text-xl font-semibold text-[var(--mb-ink)]">
                {item.question}
              </dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── CLOSING DUAL CTA ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="services-close-heading"
        className="mx-auto max-w-5xl px-4 sm:px-6"
      >
        <div
          data-mb-reveal="true"
          className="rounded-[32px] border-2 border-[var(--mb-line-strong)] bg-[var(--mb-paper)] p-6 shadow-[0_5px_0_var(--mb-line)] sm:p-9"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-sticker mb-sticker-wobble bg-[var(--mb-butter)] text-[var(--mb-ink)]">
                Not sure which fits?
              </p>
              <h2
                id="services-close-heading"
                className="mb-display mt-3 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl"
              >
                Tell us what you are trying to sort out
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[var(--mb-ink-soft)]">
                Send a short note through the quote form or message RDev Studio on WhatsApp — we will point you toward the simplest option.
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
