import type { Metadata } from "next";
import Link from "next/link";
import {
  MOCK_B_SERVICE_GUIDES,
  STUDIO_FAQ_ITEMS,
  STUDIO_RHYTHM,
  STUDIO_WHATSAPP_URL,
} from "@/components/mock-b/data";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  WhatsAppIcon,
} from "@/components/mock-b/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, web apps, Google Business Profile help, and charity or small-business builds from RDev Studio in Carrickfergus, Northern Ireland.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MockBServicesPage() {
  return (
    <div>
      {/* ── INTRO ────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pt-14">
        <Link
          href="/mock-b"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-muted)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
        >
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          Back to studio home
        </Link>

        <div className="mt-5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-link)]">
            Skills &amp; services
          </p>
          <h1 className="mb-display mt-2 text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-[var(--mb-ink)] sm:text-5xl">
            Plain-English{" "}
            <span className="text-[var(--mb-link)]">web work</span> for NI businesses &amp; charities.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--mb-muted)] sm:text-lg">
            RDev Studio designs and builds websites, custom web apps, and clearer local listings from Carrickfergus. Every job is scoped and quoted individually after a short conversation — no one-size-fits-all templates and no guesswork.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/mock-b/contact" className="mb-btn-primary w-full sm:w-auto">
              Request a quote
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-btn-secondary w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
              Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Ruled horizontal jump bar */}
        <nav
          aria-label="Jump to a service"
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-1 border-y border-[var(--mb-line)] py-2"
        >
          {MOCK_B_SERVICE_GUIDES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--mb-ink)] hover:text-[var(--mb-link)]"
            >
              <span className="tabular-nums text-xs text-[var(--mb-tertiary)]">
                {service.number}
              </span>
              <span>{service.title}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* ── FOUR FULL-WIDTH RULED SERVICE SECTIONS ───────────────────────── */}
      <div className="bg-[var(--mb-surface)]">
        <div className="mx-auto max-w-5xl divide-y divide-[var(--mb-line-strong)] px-4 sm:px-6">
          {MOCK_B_SERVICE_GUIDES.map((service) => (
            <article
              key={service.id}
              id={service.id}
              data-mb-reveal="true"
              className="scroll-mt-24 py-12 sm:py-16"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                    <span className="tabular-nums text-[var(--mb-link)]">
                      {service.number}
                    </span>
                    <span aria-hidden="true" className="text-[var(--mb-line-strong)]">
                      /
                    </span>
                    <span className="uppercase tracking-wider text-[var(--mb-tertiary)]">
                      {service.tag}
                    </span>
                  </div>

                  <h2 className="mb-display mt-2 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--mb-muted)]">
                    {service.lead}
                  </p>
                </div>

                {service.exampleHref && service.exampleLabel ? (
                  <Link
                    href={service.exampleHref}
                    className="mb-btn-secondary w-fit shrink-0"
                  >
                    {service.exampleLabel}
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </Link>
                ) : null}
              </div>

              <div className="mt-8 grid gap-8 border-t border-[var(--mb-line)] pt-7 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-tertiary)]">
                    What we focus on
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--mb-ink)] sm:text-base">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="select-none text-[var(--mb-link)]"
                        >
                          &mdash;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 border-t border-[var(--mb-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-tertiary)]">
                      Good fit for
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--mb-ink)]">
                      {service.goodFit}
                    </p>
                  </div>

                  <div className="border-t border-[var(--mb-line)] pt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-tertiary)]">
                      Worth knowing
                    </h3>
                    <ul className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-[var(--mb-muted)]">
                      {service.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href={`/mock-b/contact?topic=${encodeURIComponent(service.quoteTopic)}`}
                  className="mb-btn-primary w-full sm:w-auto"
                >
                  Ask for a quote on {service.title.toLowerCase()}
                  <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
                <a
                  href={STUDIO_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-btn-secondary w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
                  Message on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── HOW A PROJECT RUNS (NUMBERED STEPS BAND) ─────────────────────── */}
      <section
        aria-labelledby="services-process-heading"
        className="mb-on-light border-y border-[var(--mb-line)] bg-[var(--mb-light)]"
      >
        <div
          data-mb-reveal="true"
          className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-link)]">
            How we work
          </p>
          <h2
            id="services-process-heading"
            className="mb-display mt-2 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl"
          >
            Four calm steps from first message to launch
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_RHYTHM.map((item) => (
              <li
                key={item.step}
                className="border-t border-[var(--mb-line-strong)] pt-4"
              >
                <span className="mb-display text-2xl font-semibold tabular-nums text-[var(--mb-link)]">
                  {item.step}
                </span>
                <h3 className="mt-2 text-base font-semibold text-[var(--mb-ink)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--mb-muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── COMMON QUESTIONS (RULED LIST, NO BOXED CARDS) ────────────────── */}
      <section
        aria-labelledby="services-faq-heading"
        className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div data-mb-reveal="true" className="max-w-2xl">
          <h2
            id="services-faq-heading"
            className="mb-display text-3xl font-semibold text-[var(--mb-ink)]"
          >
            Common questions
          </h2>
          <p className="mt-2 text-base text-[var(--mb-muted)]">
            Straight answers before you even send a message.
          </p>
        </div>

        <dl className="mt-8 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
          {STUDIO_FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              data-mb-reveal="true"
              className="grid gap-3 py-6 md:grid-cols-[0.85fr_1.15fr] md:gap-10"
            >
              <dt className="mb-display text-xl font-semibold text-[var(--mb-ink)]">
                {item.question}
              </dt>
              <dd className="text-sm leading-relaxed text-[var(--mb-muted)] sm:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── CLOSING DUAL CTA ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="services-close-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div
          data-mb-reveal="true"
          className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mb-muted)]">
              Not sure which fits?
            </p>
            <h2
              id="services-close-heading"
              className="mb-display mt-2 text-3xl font-semibold text-[var(--mb-ink)] sm:text-4xl"
            >
              Tell us what you are trying to sort out
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--mb-muted)]">
              Send a short note through the quote form or message RDev Studio on WhatsApp — we will point you toward the simplest option.
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
