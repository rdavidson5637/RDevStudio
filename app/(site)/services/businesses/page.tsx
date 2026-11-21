import Link from "next/link";
import {
  LOCAL_NICHES,
  STUDIO_RHYTHM,
  STUDIO_WHATSAPP_URL,
  quoteHref,
} from "@/components/studio/content";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/studio/icons";
import { PackageList } from "@/components/studio/PackageList";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites for NI plumbers, HVAC, dentists and salons",
  description:
    "Fixed-quote websites for Northern Ireland plumbers, HVAC firms, dentists, salons and other local services. Optional care plan, social and content packages. Based in Carrickfergus.",
  path: "/services/businesses",
});

const TERMS = [
  {
    title: "50% upfront, 50% at launch.",
    body: "You get a written scope and a fixed quote before paying a penny.",
  },
  {
    title: "You own the lot.",
    body: "Domain name, text, photos, and code belong to your business outright.",
  },
  {
    title: "No compulsory monthly fee.",
    body: "Small sites sit on Vercel's free tier. The care plan is completely optional.",
  },
  {
    title: "One person accountable.",
    body: "I design it, build it, and check it on a real phone before launch.",
  },
] as const;

export default function LocalBusinessesServicesPage() {
  return (
    <div>
      {/* Intro and terms */}
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-meta gap-x-2">
          <Link href="/services" className="mb-back-link">
            Services
          </Link>
          <span aria-hidden="true" className="mb-meta-sep">
            /
          </span>
          <span aria-current="page" className="inline-flex min-h-[44px] items-center font-semibold text-[var(--mb-ink)]">
            Local businesses
          </span>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
          <div>
            <h1 className="mb-h1 max-w-[18ch] text-[var(--mb-ink)]">
              Websites for plumbers, HVAC, dentists and salons
            </h1>
            <p className="mb-lede mt-5">
              Local-service businesses in Northern Ireland that need a phone-first site: who you are, what you do, where you cover, and how to get in touch. A fixed quote agreed before work starts. Direct contact with me in Carrickfergus.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href={quoteHref("New website")} className="mb-btn-primary w-full sm:w-auto">
                Get a fixed quote
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

          <div className="border-t border-[var(--mb-line-strong)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="mb-kicker-muted">Plain terms, no lock-in</h2>
            <dl className="mt-4 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
              {TERMS.map((term) => (
                <div key={term.title} className="py-4">
                  <dt className="mb-label">{term.title}</dt>
                  <dd className="mb-prose mt-1">{term.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Niches */}
      <section
        aria-labelledby="niches-heading"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div data-mb-reveal="true" className="max-w-2xl">
            <p className="mb-kicker">Who this is for</p>
            <h2 id="niches-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Four niches I build for often
            </h2>
            <p className="mb-body mt-3">
              The same packages apply to other local services too. No invented client results on this page - only what the site needs to do.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {LOCAL_NICHES.map((niche) => (
              <li key={niche.slug} data-mb-reveal="true">
                <Link
                  href={quoteHref("New website")}
                  className="group flex min-h-[44px] items-baseline justify-between gap-6 py-5"
                >
                  <span className="min-w-0">
                    <span className="mb-h3 block text-[var(--mb-ink)] transition-colors group-hover:text-[var(--mb-link)]">
                      {niche.title}
                    </span>
                    <span className="mb-prose mt-1 block">{niche.line}</span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-[var(--mb-tertiary)] transition-colors group-hover:text-[var(--mb-link)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Packages */}
      <section aria-labelledby="packages-heading" className="border-t border-[var(--mb-line)]">
        <div className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div data-mb-reveal="true" className="max-w-2xl">
            <p className="mb-kicker">Packages</p>
            <h2 id="packages-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
              Packages for small businesses
            </h2>
            <p className="mb-body mt-3">
              Pick one or combine them. Everything is quoted in writing first.
            </p>
          </div>
          <PackageList />
        </div>
      </section>

      {/* Process */}
      <section
        aria-labelledby="build-heading"
        className="mb-on-light border-y border-[var(--mb-line)] bg-[var(--mb-light)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <p className="mb-kicker">How a build runs</p>
          <h2 id="build-heading" className="mb-h2 mt-2 text-[var(--mb-ink)]">
            About a week, once your text and photos are in
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

      {/* Examples */}
      <section aria-labelledby="examples-heading">
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <h2 id="examples-heading" className="mb-h2 text-[var(--mb-ink)]">
              See examples of local business sites
            </h2>
            <p className="mb-body mt-3">
              Live client work: RV&apos;s Cold Brew in Belfast. Concept demos only (not client results): Carrick Plumbing Co, The Anchor Restaurant, and Harbour Hair Studio.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link href={quoteHref("New website")} className="mb-btn-primary w-full sm:w-auto">
                Get a fixed quote
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
              <Link href="/work/rvs-cold-brew" className="mb-text-link">
                RV&apos;s Cold Brew case study
              </Link>
              <Link href="/work/concept-builds" className="mb-text-link text-[var(--mb-muted)]">
                Local business concept builds
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
