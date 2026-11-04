import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { DRAFT_CTAS, DRAFT_SERVICES_CARDS } from "@/lib/content/redesign-draft";

export function ServicesGrid() {
  return (
    <Section
      id="services"
      heading="Services and from-prices"
      intro="Straight prices agreed before work starts. Half up front, half at launch. You own the domain, the content, and the code."
      className="border-b border-studio-line"
    >
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DRAFT_SERVICES_CARDS.map((card) => (
          <article
            key={card.slug}
            className="flex flex-col justify-between border border-studio-border bg-studio-surface p-6"
          >
            <div>
              <h3 className="font-studio-display text-2xl text-studio-text">{card.title}</h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                {card.pricePrefix ? (
                  <span className="text-sm text-studio-muted">{card.pricePrefix}</span>
                ) : null}
                <span className="font-studio-display text-5xl leading-none text-studio-text">
                  {card.price}
                </span>
                <span className="text-sm text-studio-muted">{card.priceSuffix}</span>
              </p>
              <p className="type-body mt-4 text-studio-muted">{card.summary}</p>
            </div>
            <div className="mt-6 border-t border-studio-line pt-4">
              <Link
                href={card.href}
                className="inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              >
                See {card.title.toLowerCase()} details
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 border border-studio-border-strong bg-studio-second px-6 py-6 text-studio-on-second sm:flex-row sm:items-center md:px-8">
        <div>
          <h3 className="font-studio-display text-2xl text-studio-on-second">
            Registered charities get the same packages free
          </h3>
          <p className="mt-1 text-base text-studio-on-second-muted">
            Websites, social media, and content at no fee for registered charities. Other rescues: get in touch and we will talk it through.
          </p>
        </div>
        <Link
          href="/services/charities"
          className="inline-flex min-h-11 shrink-0 items-center font-bold text-studio-on-second underline decoration-studio-on-second underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-on-second"
        >
          {DRAFT_CTAS.charity}
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button href="/contact">{DRAFT_CTAS.primary}</Button>
        <Link
          href="/services/businesses"
          className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
        >
          For local businesses
        </Link>
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center text-base text-studio-muted underline decoration-studio-line underline-offset-4 hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
        >
          Compare all packages
        </Link>
      </div>
    </Section>
  );
}
