import Link from "next/link";
import { CASE_STUDIES } from "@/components/studio/case-studies";
import { STUDIO_WHATSAPP_URL, quoteHref } from "@/components/studio/content";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/studio/icons";
import { PackageList } from "@/components/studio/PackageList";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Free packages for registered charities and animal rescues",
  description:
    "Registered charities in Northern Ireland get the same website, social media, and content packages free. Animal rescues and community groups welcome.",
  path: "/services/charities",
});

const CHARITY_SLUGS = ["shelterlink", "assisi", "crosskennan"] as const;

export default function CharitiesServicesPage() {
  const charityWork = CHARITY_SLUGS.map((slug) =>
    CASE_STUDIES.find((study) => study.slug === slug),
  ).filter((study): study is (typeof CASE_STUDIES)[number] => study !== undefined);

  return (
    <div>
      {/* Intro */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-meta gap-x-2">
          <Link href="/services" className="mb-back-link">
            Services
          </Link>
          <span aria-hidden="true" className="mb-meta-sep">
            /
          </span>
          <span aria-current="page" className="inline-flex min-h-[44px] items-center font-semibold text-[var(--mb-ink)]">
            Rescues and charities
          </span>
        </nav>

        <div className="mt-6 max-w-2xl">
          <h1 className="mb-h1 max-w-[16ch] text-[var(--mb-ink)]">
            Free packages for registered charities
          </h1>
          <p className="mb-lede mt-5">
            Registered charities get the exact same website, social media, and content packages as paying clients at no fee. You own your domain, your content, and your code.
          </p>
          <p className="mb-body mt-4">
            Other animal rescues or community groups that are not yet registered: get in touch anyway and we will talk through what you need.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href={quoteHref("Charity or rescue")} className="mb-btn-primary w-full sm:w-auto">
              Registered charity? Ask about free packages
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-text-link"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
              Message me on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Charity work */}
      <section
        aria-labelledby="charity-work-heading"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div data-mb-reveal="true" className="max-w-2xl">
            <p className="mb-kicker">Charity work</p>
            <h2 id="charity-work-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Work built for Northern Ireland charities
            </h2>
            <p className="mb-body mt-3">
              My dog Rudi came from Assisi Animal Sanctuary, and my MSc dissertation at Queen&apos;s University Belfast started by asking what their staff actually needed. Crosskennan Lane is another sanctuary site with a preview online.
            </p>
          </div>

          <ol className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {charityWork.map((study) => (
              <li key={study.slug} data-mb-reveal="true" className="py-7">
                <div className="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">
                  <div className="min-w-0">
                    <p className="mb-meta">
                      <span className="font-semibold text-[var(--mb-link)]">{study.status}</span>
                    </p>
                    <h3 className="mb-h3 mt-2 text-[var(--mb-ink)]">
                      <Link href={`/work/${study.slug}`} className="mb-title-link">
                        {study.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="min-w-0">
                    <p className="mb-prose">{study.summary}</p>
                    <Link href={`/work/${study.slug}`} className="mb-text-link mt-3">
                      Read the case study
                      <ArrowRightIcon className="h-4 w-4 shrink-0" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Packages */}
      <section aria-labelledby="charity-packages-heading" className="border-t border-[var(--mb-line)]">
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div data-mb-reveal="true" className="max-w-2xl">
            <p className="mb-kicker">Packages</p>
            <h2 id="charity-packages-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              What a registered charity gets
            </h2>
            <p className="mb-body mt-3">
              Same scope, same care, same ownership as a standard client job. No fee.
            </p>
          </div>
          <PackageList tag="Free for registered charities" />
        </div>
      </section>

      {/* Closing */}
      <section
        aria-labelledby="charity-close-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <h2 id="charity-close-heading" className="mb-h2 text-[var(--mb-ink)]">
              Tell me about your rescue or charity
            </h2>
            <p className="mb-body mt-3">
              Mention your charity registration number (or tell me about your rescue if you are not registered) when you get in touch.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={quoteHref("Charity or rescue")} className="mb-btn-primary w-full sm:w-auto">
                Get in touch
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-text-link"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Message me on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
