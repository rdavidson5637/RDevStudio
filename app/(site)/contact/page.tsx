import { CONTACT_EMAIL } from "@/lib/constants";
import { STUDIO_WHATSAPP_URL } from "@/components/studio/content";
import { LocalTimeChip } from "@/components/studio/LocalTimeChip";
import { WhatsAppIcon } from "@/components/studio/icons";
import { QuoteForm } from "@/components/studio/QuoteForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Projects for NI businesses and charities, plus the odd collaboration. Based in Carrickfergus.",
  path: "/contact",
});

const HELPFUL_NOTES = [
  "What your business, charity, or group does",
  "Whether you need a website, social media, content, or something else",
  "Any existing website link or a rough date you are working to",
  "Whether you are a registered charity or an animal rescue",
] as const;

export default function ContactPage() {
  return (
    <div className="pb-16 sm:pb-24">
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <LocalTimeChip />

        <div className="mt-6 max-w-2xl">
          <h1 className="mb-h1 text-[var(--mb-ink)]">Start a project.</h1>
          <p className="mb-lede mt-5">
            Need a site, help with posting, or something that does not fit a package. Form, email or WhatsApp. I&apos;ll reply myself, ask a few questions about what you need, then send a fixed quote. I usually reply within one working day.
          </p>

          <div className="mt-8">
            <a href="#quote-form" className="mb-btn-primary w-full sm:w-auto">
              Jump to the form
              <span aria-hidden="true">&darr;</span>
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
          <div className="mb-on-surface mb-panel min-w-0">
            <div className="border-b border-[var(--mb-line)] pb-5">
              <p className="mb-kicker">Quote request</p>
              <h2 id="contact-form-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Send a short note
              </h2>
              <p className="mb-prose mt-2">
                Plain English is best. I will come back by email with next steps and a fixed quote before any work begins.
              </p>
            </div>

            <div className="mt-6">
              <QuoteForm idPrefix="contact" />
            </div>
          </div>

          <aside aria-label="Direct contact options" className="space-y-8 lg:sticky lg:top-24 lg:pt-1">
            <div
              className="mb-on-light border-l-2 border-[var(--mb-accent)] bg-[var(--mb-light)] p-6"
            >
              <p className="mb-kicker-muted">Quickest chat</p>
              <h2 className="mb-h3 mt-2 text-[var(--mb-ink)]">Message on WhatsApp</h2>
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

            <div className="border-t border-[var(--mb-line-strong)] pt-6">
              <h2 className="mb-h3 text-[var(--mb-ink)]">Email me directly</h2>
              <p className="mb-caption mt-1">Carrickfergus, Northern Ireland</p>
              <p className="mb-prose mt-3">Prefer to write from your own inbox?</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mb-text-link mt-2">
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="border-t border-[var(--mb-line-strong)] pt-6">
              <h2 className="mb-h3 text-[var(--mb-ink)]">What helps me quote</h2>
              <ul className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
                {HELPFUL_NOTES.map((item) => (
                  <li key={item} className="mb-ruled-note py-3">
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
