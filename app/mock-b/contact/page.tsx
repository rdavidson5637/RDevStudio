import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { LocalTimeChip } from "@/components/mock-b/LocalTimeChip";
import { ArrowLeftIcon, WhatsAppIcon } from "@/components/mock-b/icons";
import { WarmQuoteForm } from "@/components/mock-b/WarmQuoteForm";

export const metadata: Metadata = {
  title: "Contact & quote",
  description:
    "Request a quote or message RDev Studio in Carrickfergus on WhatsApp for websites, web apps, Google Business Profile help, and charity builds.",
  robots: {
    index: false,
    follow: false,
  },
};

const HELPFUL_NOTES = [
  "What your business, charity, or community group does",
  "Whether you need a new website, a web app, or Google Business Profile help",
  "Any existing website link or a rough launch date you have in mind",
  "Let us know if you are a registered charity or animal rescue",
] as const;

export default function MockBContactPage() {
  return (
    <div className="pb-16 sm:pb-24">
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <Link href="/mock-b" className="mb-back-link">
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          Back to studio home
        </Link>

        <div className="mt-5">
          <LocalTimeChip />
        </div>

        <div className="mt-6 max-w-2xl">
          <h1 className="mb-h1 text-[var(--mb-ink)]">
            Tell us what you are planning.
          </h1>
          <p className="mb-lede mt-5">
            Every project at RDev Studio starts with a straightforward chat and a clear written quote. Fill in the quote form below or drop us a message on WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#quote-form" className="mb-btn-primary w-full sm:w-auto">
              Jump to quote form
              <span aria-hidden="true">&darr;</span>
            </a>
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
      </section>

      <section
        id="quote-form"
        aria-labelledby="contact-form-heading"
        className="mb-shell mb-section-pad max-w-6xl scroll-mt-24 border-t border-[var(--mb-line)] px-4 sm:px-6"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-start lg:gap-14">
          {/* Primary quote form panel */}
          <div
            data-mb-reveal="true"
            className="mb-on-surface mb-panel min-w-0"
          >
            <div className="border-b border-[var(--mb-line)] pb-5">
              <p className="mb-kicker">Quote request</p>
              <h2 id="contact-form-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Send a short note
              </h2>
              <p className="mb-prose mt-2">
                Plain English is best. We will come back by email with clear next steps and a tailored quote before any work begins.
              </p>
            </div>

            <div className="mt-6">
              <WarmQuoteForm idPrefix="mb-contact" />
            </div>
          </div>

          {/* Direct channels + helpful checklist (ruled aside) */}
          <aside
            aria-label="Direct contact options"
            className="space-y-8 lg:sticky lg:top-24 lg:pt-1"
          >
            <div
              data-mb-reveal="true"
              className="mb-on-light border-l-2 border-[var(--mb-accent)] bg-[var(--mb-light)] p-6"
            >
              <p className="mb-kicker-muted">Quickest chat</p>
              <h2 className="mb-h3 mt-2 text-[var(--mb-ink)]">
                Message on WhatsApp
              </h2>
              <p className="mb-prose mt-2.5">
                Handy if you want to send a link, ask a quick question, or talk through a rough idea without writing a long email.
              </p>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-text-link mt-4"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Message on WhatsApp
              </a>
            </div>

            <div
              data-mb-reveal="true"
              className="border-t border-[var(--mb-line-strong)] pt-6"
            >
              <h2 className="mb-h3 text-[var(--mb-ink)]">Direct studio email</h2>
              <p className="mb-caption mt-1">Carrickfergus, Northern Ireland</p>
              <p className="mb-prose mt-3">
                Prefer to write from your own inbox? Send your note straight to RDev Studio:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mb-text-link mt-2"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div
              data-mb-reveal="true"
              className="border-t border-[var(--mb-line-strong)] pt-6"
            >
              <h2 className="mb-h3 text-[var(--mb-ink)]">
                What helps us quote clearly
              </h2>
              <ul className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] text-sm leading-relaxed text-[var(--mb-ink)]">
                {HELPFUL_NOTES.map((item) => (
                  <li key={item} className="py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
