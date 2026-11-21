import Link from "next/link";
import { CASE_STUDIES, HOME_CASE_SLUGS } from "@/components/studio/case-studies";
import {
  STUDIO_RHYTHM,
  STUDIO_SERVICES,
  STUDIO_WHATSAPP_URL,
  quoteHref,
} from "@/components/studio/content";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/studio/icons";
import { LocalTimeChip } from "@/components/studio/LocalTimeChip";
import { ProjectRow } from "@/components/studio/ProjectRow";
import { QuoteForm } from "@/components/studio/QuoteForm";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI businesses and rescues, built in Carrickfergus",
  description:
    "RDev Studio designs and builds websites for Northern Ireland small businesses and animal rescues. Fixed quotes, free packages for registered charities, based in Carrickfergus.",
  path: "/",
});

const HOME_PROJECTS = HOME_CASE_SLUGS.map((slug) =>
  CASE_STUDIES.find((study) => study.slug === slug),
).filter((study): study is (typeof CASE_STUDIES)[number] => study !== undefined);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <LocalTimeChip />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-end lg:gap-14">
          <div>
            <h1 className="mb-h1 max-w-[20ch] text-[var(--mb-ink)]">
              RDev Studio designs and builds websites and digital products.
            </h1>

            <p className="mb-lede mt-6">
              One person in Carrickfergus, Northern Ireland, building websites, social and content for small businesses and charities. You deal with me from first note to launch.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quote" className="mb-btn-primary w-full sm:w-auto">
                Start a quote
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </a>

              <Link href="/work" className="mb-text-link px-1">
                See the work
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>

          <div className="border-t border-[var(--mb-line-strong)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="mb-kicker-muted">Who this is for</p>
            <ul className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              <li className="mb-fact-value py-3">Small businesses</li>
              <li className="mb-fact-value py-3">Charities and rescues</li>
              <li className="mb-fact-value py-3">Trades, cafes and salons</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="border-t border-[var(--mb-line)]"
      >
        <div className="mb-shell mb-page-intro max-w-6xl scroll-mt-24 pb-0 sm:px-6 sm:pb-0">
          <div
            data-mb-reveal="true"
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-kicker">Recent work</p>
              <h2 id="work-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Client, charity and coaching builds
              </h2>
            </div>

            <Link href="/work" className="mb-text-link w-fit shrink-0">
              All work, including concept builds
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>

        <ol className="mt-8 border-t border-[var(--mb-line)] sm:mt-10">
          {HOME_PROJECTS.map((study, index) => (
            <li
              key={study.slug}
              data-mb-reveal="true"
              className={
                index === 0
                  ? "border-b border-[var(--mb-line)] bg-[var(--mb-surface)]"
                  : "border-b border-[var(--mb-line)]"
              }
            >
              <div className="mb-shell max-w-6xl py-10 sm:px-6 sm:py-12">
                <ProjectRow
                  study={study}
                  number={`0${index + 1}`}
                  imageFirst={index % 2 === 1}
                  featured={index === 0}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Services and process */}
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
              <p className="mb-kicker">Services</p>
              <h2 id="services-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
                Websites, social and content, explained plainly
              </h2>
              <p className="mb-body mt-3">
                Every job gets a fixed quote in writing after a quick chat, so you know where you stand before anything starts.
              </p>
            </div>

            <Link href="/services" className="mb-text-link w-fit shrink-0">
              Full services guide
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {STUDIO_SERVICES.map((service, index) => (
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
                    <h3 className="mb-h3 mt-2 text-[var(--mb-ink)]">{service.title}</h3>
                    <p className="mb-prose mt-2">{service.summary}</p>
                    <Link href={quoteHref(service.quoteTopic)} className="mb-text-link mt-4">
                      Ask for a quote on this
                      <ArrowRightIcon className="h-4 w-4 shrink-0" />
                    </Link>
                  </div>

                  <ul className="mb-dash-list border-t border-[var(--mb-line)] pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
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

          <div data-mb-reveal="true" className="mt-16 border-t border-[var(--mb-line-strong)] pt-12">
            <h3 className="mb-h3 text-[var(--mb-ink)]">How a project runs</h3>
            <ol className="mt-8 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              {STUDIO_RHYTHM.map((item) => (
                <li
                  key={item.step}
                  className="grid gap-2 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                >
                  <span className="mb-num mb-num-lg">{item.step}</span>
                  <div className="min-w-0 max-w-[var(--mb-measure)]">
                    <p className="mb-step-title">{item.title}</p>
                    <p className="mb-prose mt-1.5">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* About */}
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
            <p className="mb-kicker">About</p>
            <h2 id="about-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Local to Carrickfergus, built for real-world use
            </h2>
            <p className="mb-body mt-5">
              I&apos;m Ryan Davidson. RDev Studio is me: one person designing and building for Northern Ireland small businesses, trades, community projects and charities, from first note to launch.
            </p>
            <p className="mb-body mt-4">
              I keep things clear and maintainable: phone-first layouts, plain-English copy, honest scope, and code you own outright once it goes live.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
              <Link href="/about" className="mb-text-link">
                More about me
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              <Link href="/lab" className="mb-text-link text-[var(--mb-muted)]">
                Games and free tools in the Lab
              </Link>
            </div>
          </div>

          <div className="border-t border-[var(--mb-line-strong)] pt-6 lg:border-t-0 lg:pt-0">
            <h3 className="mb-kicker-muted">What you can expect</h3>
            <dl className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              <div className="py-4">
                <dt className="mb-label">Direct contact</dt>
                <dd className="mb-prose mt-1">You deal with me, not an account manager.</dd>
              </div>
              <div className="py-4">
                <dt className="mb-label">Built for phones first</dt>
                <dd className="mb-prose mt-1">Checked on a real handset before launch.</dd>
              </div>
              <div className="py-4">
                <dt className="mb-label">Charities and rescues</dt>
                <dd className="mb-prose mt-1">
                  Registered charities get their site free. Other rescues: get in touch.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Quote */}
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
                Tell me what you are planning
              </h2>
              <p className="mb-body mt-4">
                Send a short note with the form or message me on WhatsApp. I will come back with next steps and a fixed quote.
              </p>
            </div>

            <div className="space-y-5 border-t border-[var(--mb-line)] pt-6">
              <div>
                <p className="mb-label">Prefer a quick chat?</p>
                <p className="mb-prose mt-1">
                  WhatsApp is often the quickest way to share an idea or a link.
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
                Or email me at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="mb-inline-link">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div className="mb-on-surface mb-panel text-[var(--mb-ink)]">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
