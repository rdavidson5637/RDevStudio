import Link from "next/link";
import {
  SERVICE_GUIDES,
  STUDIO_FAQ_ITEMS,
  STUDIO_RHYTHM,
  STUDIO_WHATSAPP_URL,
  quoteHref,
} from "@/components/studio/content";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/studio/icons";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Website design, care plans, social media management, and content creation for Northern Ireland small businesses and charities. Fixed quotes, based in Carrickfergus.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div>
      {/* Intro */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-kicker">Services</p>
          <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">
            Plain-English web work for NI businesses and charities.
          </h1>
          <p className="mb-lede mt-5">
            Websites, care plans, social media, and content for Northern Ireland small businesses and animal rescues. A fixed quote agreed in writing before work starts. One person from first note to launch.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/contact" className="mb-btn-primary w-full sm:w-auto">
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

        <div className="mt-10 grid gap-0 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="py-5 md:pr-8">
            <h2 className="mb-step-title">For local businesses</h2>
            <p className="mb-prose mt-1.5">
              Plumbers, HVAC, dentists, salons, cafes and independent shops. 50% upfront and 50% at launch, and full ownership of your domain and code.
            </p>
            <Link href="/services/businesses" className="mb-text-link mt-3">
              Local business packages
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>
          <div className="py-5 md:pl-8">
            <h2 className="mb-step-title">For rescues and charities</h2>
            <p className="mb-prose mt-1.5">
              Registered charities get the same website, social media, and content packages free. Other rescues and community groups: get in touch and we will talk it through.
            </p>
            <Link href="/services/charities" className="mb-text-link mt-3">
              How charity sites work
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>

        <nav
          aria-label="Jump to a service"
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-0 border-y border-[var(--mb-line)] py-1 sm:gap-x-6"
        >
          {SERVICE_GUIDES.map((service) => (
            <a key={service.id} href={`#${service.id}`} className="mb-jump-link">
              <span className="mb-caption tabular-nums font-semibold text-[var(--mb-tertiary)]">
                {service.number}
              </span>
              <span className="max-w-[16ch] truncate sm:max-w-none">{service.title}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* Service guides */}
      <div className="bg-[var(--mb-surface)]">
        <div className="mb-shell max-w-6xl divide-y divide-[var(--mb-line-strong)] px-4 sm:px-6">
          {SERVICE_GUIDES.map((service) => (
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
                    <span className="text-[var(--mb-tertiary)]">{service.tag}</span>
                  </div>

                  <h2 className="mb-h2 mt-2 text-[var(--mb-ink)]">{service.title}</h2>
                  <p className="mb-body mt-3">{service.lead}</p>
                </div>

                {service.exampleHref && service.exampleLabel ? (
                  <Link href={service.exampleHref} className="mb-text-link w-fit shrink-0">
                    {service.exampleLabel}
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </Link>
                ) : null}
              </div>

              <div className="mt-8 grid gap-8 border-t border-[var(--mb-line)] pt-7 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-kicker-muted">What is included</h3>
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

                  {service.notIncluded && service.notIncluded.length > 0 ? (
                    <div className="border-t border-[var(--mb-line)] pt-6">
                      <h3 className="mb-kicker-muted">What is not</h3>
                      <ul className="mb-dash-list mt-4">
                        {service.notIncluded.map((item) => (
                          <li key={item}>
                            <span aria-hidden="true" data-mb-dash>
                              -
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-6 border-t border-[var(--mb-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <h3 className="mb-kicker-muted">Good fit for</h3>
                    <p className="mb-prose mt-2 text-[var(--mb-ink)]">{service.goodFit}</p>
                  </div>

                  <div className="border-t border-[var(--mb-line)] pt-5">
                    <h3 className="mb-kicker-muted">Worth knowing</h3>
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
                <Link href={quoteHref(service.quoteTopic)} className="mb-text-link w-fit">
                  Ask for a quote on {service.title.toLowerCase()}
                  <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* How a project runs */}
      <section
        aria-labelledby="services-process-heading"
        className="mb-on-light border-y border-[var(--mb-line)] bg-[var(--mb-light)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <p className="mb-kicker">How it works</p>
          <h2 id="services-process-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
            Four steps from first message to launch
          </h2>
          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {STUDIO_RHYTHM.map((item) => (
              <li
                key={item.step}
                className="grid gap-2 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="mb-num mb-num-lg">{item.step}</span>
                <div className="min-w-0 max-w-[var(--mb-measure)]">
                  <h3 className="mb-step-title">{item.title}</h3>
                  <p className="mb-prose mt-1.5">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="services-faq-heading"
        className="mb-shell mb-section-pad max-w-6xl sm:px-6"
      >
        <div data-mb-reveal="true" className="max-w-2xl">
          <h2 id="services-faq-heading" className="mb-h2 text-[var(--mb-ink)]">
            Common questions
          </h2>
          <p className="mb-body mt-2">Straight answers before you send a message.</p>
        </div>

        <dl className="mt-8 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
          {STUDIO_FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              data-mb-reveal="true"
              className="grid gap-3 py-6 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
            >
              <dt className="mb-faq-q">{item.question}</dt>
              <dd className="mb-prose">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Closing */}
      <section
        aria-labelledby="services-close-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <p className="mb-kicker-muted">Not sure which fits?</p>
            <h2 id="services-close-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Tell me what you are trying to sort out
            </h2>
            <p className="mb-body mt-3">
              Send a short note through the quote form or message me on WhatsApp. I will point you at the simplest option and come back with a fixed quote.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="mb-btn-primary w-full sm:w-auto">
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
