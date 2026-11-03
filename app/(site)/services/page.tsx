import Link from "next/link";
import { FAQ } from "@/components/services/FAQ";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  CHARITY_NOTE,
  CONTENT_CREATION_FEATURES,
  PRICE_CARE_PLAN_GBP,
  PRICING_FEATURES,
  PROCESS_STEPS,
  SERVICES,
  SOCIAL_MEDIA_FEATURES,
  WHATSAPP_URL,
} from "@/lib/constants";
import { DRAFT_CTAS, DRAFT_SERVICES_CARDS } from "@/lib/content/redesign-draft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services and from-prices",
  description:
    "Website design, care plans, social media management, and content creation for Northern Ireland small businesses and charities. Clear pricing, based in Carrickfergus.",
  path: "/services",
});

const CARE_PLAN_FEATURES = [
  "Managed hosting and domain renewal reminders",
  "Routine security and dependency updates",
  "Small text, opening-hour, or photo updates when you send them over",
  "Direct contact with me by email or WhatsApp if something needs checked",
] as const;

const SERVICE_DETAILS = [
  {
    slug: "websites",
    features: PRICING_FEATURES,
    notIncluded: [
      "An online shop or card payments - that is a separate quote",
      "Pages beyond five - extra pages are priced before I build them",
      "A photoshoot or a new logo",
      "Writing the whole site from nothing if you send no details",
      "Monthly posting (that is the social package)",
    ],
    timeline:
      "About a week for a five-page site, once I have your text, photos, and contact details. If those arrive late, the date moves.",
    revisions:
      "One round after you see the first full draft. Send a list; I make the changes. Extra rounds are quoted first.",
    ideal:
      "A shop, a trades firm, a counter, a charity, or anyone who needs a proper site without an agency quote.",
    process: [
      "Short call or email to agree the pages and the date",
      "You send text, photos, and contact details",
      "I build it, you see a draft, one round of notes",
      "Launch and a handover of how to make simple edits",
    ],
    cta: DRAFT_CTAS.primary,
  },
  {
    slug: "social",
    features: SOCIAL_MEDIA_FEATURES,
    notIncluded: [
      "Paid ads or boosting posts",
      "Filming or a photoshoot",
      "Answering comments and DMs all day",
      "Buying followers or fake engagement",
    ],
    timeline:
      "First month's calendar in the first week. Posting starts once you sign the calendar off.",
    revisions:
      "One round of notes on each month's batch - captions and graphics - before anything is scheduled.",
    ideal:
      "You know you should be posting and you do not have a free hour every week to do it.",
    process: [
      "Look at what you already post, if anything",
      "Agree the month's calendar with you",
      "Write, design, and schedule the posts",
      "A short note at the end of the month on what went out",
    ],
    cta: DRAFT_CTAS.primary,
  },
  {
    slug: "content",
    features: CONTENT_CREATION_FEATURES,
    notIncluded: [
      "Video production",
      "A photoshoot",
      "Ongoing posting and scheduling (that is the social package)",
      "A new brand identity",
    ],
    timeline:
      "A small set in a few days. A bigger batch about a week, once the brief and any photos are in.",
    revisions:
      "One round included after you see the set. Extra rounds are quoted before I start them.",
    ideal:
      "A product launch, a campaign, or a batch of posts without a monthly retainer.",
    process: [
      "Brief: what it is for, who it is for, what you already have",
      "I write and design the set",
      "One round of notes",
      "Files delivered ready to post",
    ],
    cta: DRAFT_CTAS.primary,
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Section className="border-b border-studio-line">
        <h1 className="display-lg max-w-[16ch] text-balance text-studio-text">
          Services and from-prices
        </h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Websites, care plans, social media, and content for Northern Ireland small businesses and animal rescues. Clear prices agreed in writing before work starts. One person from first note to launch.
        </p>
        <p className="type-body mt-4 max-w-prose text-studio-muted">{CHARITY_NOTE}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between border border-studio-border bg-studio-surface p-6 md:p-8">
            <div>
              <h2 className="font-studio-display text-3xl text-studio-text">
                For local businesses
              </h2>
              <p className="type-body mt-3 text-studio-muted">
                Trades, cafes, salons, and independent shops across Northern Ireland. Fixed quotes, 50% upfront and 50% at launch, and full ownership of your domain and code.
              </p>
            </div>
            <div className="mt-6 pt-2">
              <Link
                href="/services/businesses"
                className="inline-flex min-h-11 items-center text-base font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              >
                Local business packages
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-studio-border-strong bg-studio-second p-6 text-studio-on-second md:p-8">
            <div>
              <h2 className="font-studio-display text-3xl text-studio-on-second">
                For rescues and charities
              </h2>
              <p className="mt-3 text-base text-studio-on-second-muted">
                Registered charities get the same website, social media, and content packages free. Other animal rescues and community groups: get in touch and we will talk it through.
              </p>
            </div>
            <div className="mt-6 pt-2">
              <Link
                href="/services/charities"
                className="inline-flex min-h-11 items-center text-base font-bold text-studio-on-second underline decoration-studio-on-second underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-on-second"
              >
                {DRAFT_CTAS.charity}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DRAFT_SERVICES_CARDS.map((card) => (
            <div
              key={card.slug}
              className="flex flex-col justify-between border border-studio-border bg-studio-surface p-6"
            >
              <div>
                <h2 className="font-studio-display text-2xl text-studio-text">{card.title}</h2>
                <p className="mt-3 flex items-baseline gap-1.5">
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
              <a
                href={`#${card.slug}`}
                className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
              >
                Jump to {card.title.toLowerCase()}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {SERVICES.map((service) => {
        const details = SERVICE_DETAILS.find((item) => item.slug === service.slug);
        if (!details) return null;
        return (
          <Section key={service.slug} id={service.slug} className="border-b border-studio-line">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-studio-display text-3xl text-studio-text">{service.title}</h2>
              <p className="font-studio-display text-3xl text-studio-text">{service.price}</p>
            </div>
            <p className="type-body mt-3 max-w-prose text-studio-muted">{service.description}</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="font-studio-display text-2xl text-studio-text">What&apos;s included</h3>
                <ul className="mt-4 border-t border-studio-line">
                  {details.features.map((feature) => (
                    <li key={feature} className="border-b border-studio-line py-3 text-studio-muted">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-studio-display text-2xl text-studio-text">What is not</h3>
                <ul className="mt-4 border-t border-studio-line">
                  {details.notIncluded.map((item) => (
                    <li key={item} className="border-b border-studio-line py-3 text-studio-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 grid gap-8 border-t border-studio-line pt-8 lg:grid-cols-2">
              <div>
                <h3 className="font-studio-display text-2xl text-studio-text">Timeline</h3>
                <p className="type-body mt-3 text-studio-muted">{details.timeline}</p>
                <h3 className="mt-8 font-studio-display text-2xl text-studio-text">Revisions</h3>
                <p className="type-body mt-3 text-studio-muted">{details.revisions}</p>
              </div>
              <div>
                <h3 className="font-studio-display text-2xl text-studio-text">The process</h3>
                <ol className="mt-4 border-t border-studio-line">
                  {details.process.map((step, stepIndex) => (
                    <li key={step} className="border-b border-studio-line py-3 text-studio-muted">
                      {stepIndex + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <p className="type-body mt-8 max-w-prose text-studio-muted">
              <span className="font-bold text-studio-text">Ideal for:</span> {details.ideal}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
            >
              {details.cta}
            </Link>
          </Section>
        );
      })}

      <Section id="care" className="border-b border-studio-line">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-studio-display text-3xl text-studio-text">Care plan</h2>
          <p className="font-studio-display text-3xl text-studio-text">£{PRICE_CARE_PLAN_GBP}/mo</p>
        </div>
        <p className="type-body mt-3 max-w-prose text-studio-muted">
          Optional monthly cover after your site launches. You never have to take it - the site is yours either way - but it is there if you want me looking after updates and small changes.
        </p>
        <ul className="mt-6 max-w-2xl border-t border-studio-line">
          {CARE_PLAN_FEATURES.map((feature) => (
            <li key={feature} className="border-b border-studio-line py-3 text-studio-muted">
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        className="border-b border-studio-line"
        heading="How it works"
        intro="No committees. Here is what working together looks like."
      >
        <ol className="mt-8 border-t border-studio-line">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="grid gap-2 border-b border-studio-line py-5 sm:grid-cols-[4rem_1fr] sm:gap-6"
            >
              <span className="font-studio-display text-2xl text-studio-text">{step.number}</span>
              <div>
                <h3 className="font-studio-display text-2xl text-studio-text">{step.title}</h3>
                <p className="type-body mt-2 text-studio-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-b border-studio-line">
        <FAQ />
      </Section>

      <Section
        heading="Tell me what you need"
        intro="Send a note. I will come back with next steps and a fixed quote."
      >
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">{DRAFT_CTAS.primary}</Button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          >
            {DRAFT_CTAS.lowCommitment}
          </a>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-base text-studio-muted underline decoration-studio-line underline-offset-4 hover:text-studio-text"
          >
            {DRAFT_CTAS.secondary}
          </Link>
        </div>
      </Section>
    </div>
  );
}
