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
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <Link href="/mock-b" className="mb-back-link">
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          Back to studio home
        </Link>

        <div className="mt-5 max-w-2xl">
          <p className="mb-kicker">Skills &amp; services</p>
          <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">
            Plain-English web work for NI businesses &amp; charities.
          </h1>
          <p className="mb-lede mt-5">
            RDev Studio designs and builds websites, custom web apps, and clearer local listings from Carrickfergus. Every job is scoped and quoted individually after a short conversation - no one-size-fits-all templates and no guesswork.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/mock-b/contact" className="mb-btn-primary w-full sm:w-auto">
              Request a quote
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-text-link"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
              Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Ruled horizontal jump bar */}
        <nav
          aria-label="Jump to a service"
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-0 border-y border-[var(--mb-line)] py-1 sm:gap-x-6"
        >
          {MOCK_B_SERVICE_GUIDES.map((service) => (
            <a key={service.id} href={`#${service.id}`} className="mb-jump-link">
              <span className="mb-caption tabular-nums font-semibold text-[var(--mb-tertiary)]">
                {service.number}
              </span>
              <span className="max-w-[14ch] truncate sm:max-w-none">{service.title}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* ── FOUR FULL-WIDTH RULED SERVICE SECTIONS ───────────────────────── */}
      <div className="bg-[var(--mb-surface)]">
        <div className="mb-shell max-w-6xl divide-y divide-[var(--mb-line-strong)] px-4 sm:px-6">
          {MOCK_B_SERVICE_GUIDES.map((service) => (
            <article
              key={service.id}
              id={service.id}
              data-mb-reveal="true"
              className="scroll-mt-24 py-12 sm:py-16"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-meta">
                    <span className="tabular-nums font-semibold text-[var(--mb-link)]">
                      {service.number}
                    </span>
                    <span aria-hidden="true" className="mb-meta-sep">
                      /
                    </span>
                    <span className="text-[var(--mb-tertiary)]">
                      {service.tag}
                    </span>
                  </div>

                  <h2 className="mb-h2 mt-2 text-[var(--mb-ink)]">
                    {service.title}
                  </h2>
                  <p className="mb-body mt-3">
                    {service.lead}
                  </p>
                </div>

                {service.exampleHref && service.exampleLabel ? (
                  <Link
                    href={service.exampleHref}
                    className="mb-text-link w-fit shrink-0"
                  >
                    {service.exampleLabel}
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </Link>
                ) : null}
              </div>

              <div className="mt-8 grid gap-8 border-t border-[var(--mb-line)] pt-7 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
                <div>
                  <h3 className="mb-kicker-muted">
                    What we focus on
                  </h3>
                  <ul className="mb-dash-list mt-4">
                    {service.included.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true" data-mb-dash>
                          -
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 border-t border-[var(--mb-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <h3 className="mb-kicker-muted">
                      Good fit for
                    </h3>
                    <p className="mb-prose mt-2 text-[var(--mb-ink)]">
                      {service.goodFit}
                    </p>
                  </div>

                  <div className="border-t border-[var(--mb-line)] pt-5">
                    <h3 className="mb-kicker-muted">
                      Worth knowing
                    </h3>
                    <ul className="mt-2.5 space-y-2.5">
                      {service.notes.map((note) => (
                        <li key={note} className="mb-prose">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/mock-b/contact?topic=${encodeURIComponent(service.quoteTopic)}`}
                  className="mb-text-link w-fit"
                >
                  Ask for a quote on {service.title.toLowerCase()}
                  <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
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
          className="mb-shell mb-section-pad max-w-6xl sm:px-6"
        >
          <p className="mb-kicker">How we work</p>
          <h2 id="services-process-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
            Four calm steps from first message to launch
          </h2>
          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {STUDIO_RHYTHM.map((item) => (
              <li
                key={item.step}
                className="grid gap-2 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="mb-num mb-num-lg">{item.step}</span>
                <div className="min-w-0 max-w-[var(--mb-measure)]">
                  <h3 className="mb-step-title">
                    {item.title}
                  </h3>
                  <p className="mb-prose mt-1.5">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── COMMON QUESTIONS (RULED LIST, NO BOXED CARDS) ────────────────── */}
      <section
        aria-labelledby="services-faq-heading"
        className="mb-shell mb-section-pad max-w-6xl sm:px-6"
      >
        <div data-mb-reveal="true" className="max-w-2xl">
          <h2 id="services-faq-heading" className="mb-h2 text-[var(--mb-ink)]">
            Common questions
          </h2>
          <p className="mb-body mt-2">
            Straight answers before you even send a message.
          </p>
        </div>

        <dl className="mt-8 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
          {STUDIO_FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              data-mb-reveal="true"
              className="grid gap-3 py-6 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
            >
              <dt className="text-base font-bold leading-snug text-[var(--mb-ink)] sm:text-[var(--mb-text-md)]">
                {item.question}
              </dt>
              <dd className="mb-prose">{item.answer}</dd>
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
          className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6"
        >
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <p className="mb-kicker-muted">Not sure which fits?</p>
            <h2 id="services-close-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Tell us what you are trying to sort out
            </h2>
            <p className="mb-body mt-3">
              Send a short note through the quote form or message RDev Studio on WhatsApp - we will point you toward the simplest option.
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
