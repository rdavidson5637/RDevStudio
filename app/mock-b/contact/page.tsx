import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { LocalTimeChip } from "@/components/mock-b/LocalTimeChip";
import {
  CastleMark,
  WaveRule,
  WavyUnderline,
  WhatsAppIcon,
} from "@/components/mock-b/CoastalDoodles";
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
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pt-14">
        <Link
          href="/mock-b"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink-soft)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to studio home
        </Link>

        <div className="mt-5">
          <LocalTimeChip />
        </div>

        <div className="mt-6 max-w-2xl">
          <h1 className="mb-display text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-[var(--mb-ink)] sm:text-5xl">
            Tell us what you are{" "}
            <span className="relative inline-block whitespace-nowrap text-[var(--mb-terracotta)]">
              planning
              <WavyUnderline className="absolute -bottom-1.5 left-0 h-3 w-full text-[var(--mb-terracotta)]" />
            </span>
            .
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--mb-ink-soft)] sm:text-lg">
            Every project at RDev Studio starts with a straightforward chat and a clear written quote. Fill in the quote form below or drop us a message on WhatsApp.
          </p>

          {/* Prominent dual primary action strip on mobile and desktop */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#quote-form" className="mb-btn-primary w-full sm:w-auto">
              Jump to quote form
              <span aria-hidden="true">&darr;</span>
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
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <WaveRule />
      </div>

      <section
        id="quote-form"
        aria-labelledby="contact-form-heading"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 pt-10 sm:px-6 sm:pt-14"
      >
        <div className="grid gap-7 lg:grid-cols-[1.22fr_0.78fr] lg:items-start">
          {/* Primary quote form card */}
          <div data-mb-reveal="true" className="mb-card p-6 sm:p-8">
            <div className="border-b border-[var(--mb-line)] pb-5">
              <p className="mb-sticker mb-sticker-tilt-left mb-sticker-wobble bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]">
                Quote request
              </p>
              <h2
                id="contact-form-heading"
                className="mb-display mt-3 text-2xl font-semibold text-[var(--mb-ink)] sm:text-3xl"
              >
                Send a short note
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mb-ink-soft)] sm:text-base">
                Plain English is best. We will come back by email with clear next steps and a tailored quote before any work begins.
              </p>
            </div>

            <div className="mt-6">
              <WarmQuoteForm idPrefix="mb-contact" />
            </div>
          </div>

          {/* Direct channels + helpful checklist */}
          <aside aria-label="Direct contact options" className="space-y-5">
            <div
              data-mb-reveal="true"
              data-mb-delay="1"
              className="rounded-[28px] border-[1.5px] border-[var(--mb-seaglass)]/40 bg-[var(--mb-seaglass-soft)] p-6 shadow-[0_3px_0_rgba(30,96,88,0.16)]"
            >
              <p className="mb-sticker mb-sticker-wobble bg-[var(--mb-paper)] text-[var(--mb-seaglass-ink)] border-[var(--mb-seaglass)]/35">
                Quickest chat
              </p>
              <h2 className="mb-display mt-3 text-2xl font-semibold text-[var(--mb-ink)]">
                Message on WhatsApp
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
                Handy if you want to send a link, ask a quick question, or talk through a rough idea without writing a long email.
              </p>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-btn-whatsapp mt-5 w-full whitespace-nowrap"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Message on WhatsApp
              </a>
            </div>

            <div data-mb-reveal="true" data-mb-delay="2" className="mb-card p-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="mb-icon-badge flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--mb-line-strong)] bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]"
                  aria-hidden="true"
                >
                  <CastleMark className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="mb-display text-xl font-semibold text-[var(--mb-ink)]">
                    Direct studio email
                  </h2>
                  <p className="text-xs font-medium text-[var(--mb-ink-soft)]">
                    Carrickfergus, Northern Ireland
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--mb-ink-soft)]">
                Prefer to write from your own inbox? Send your note straight to RDev Studio:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-flex min-h-[44px] items-center text-base font-bold text-[var(--mb-terracotta-ink)] underline decoration-[var(--mb-terracotta)]/45 underline-offset-4 hover:text-[var(--mb-terracotta)]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div
              data-mb-reveal="true"
              data-mb-delay="3"
              className="rounded-[26px] border-[1.5px] border-[var(--mb-line)] bg-[var(--mb-cream-deep)] p-6"
            >
              <h2 className="mb-display text-xl font-semibold text-[var(--mb-ink)]">
                What helps us quote clearly
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[var(--mb-ink)]">
                {HELPFUL_NOTES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--mb-terracotta)]"
                    />
                    <span>{item}</span>
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
