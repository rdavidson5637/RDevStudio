import Link from "next/link";
import { Scoreboard } from "@/components/pricing/Scoreboard";
import { FAQ } from "@/components/services/FAQ";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  CHARITY_NOTE,
  CONTENT_CREATION_FEATURES,
  PRICING_FEATURES,
  PROCESS_STEPS,
  SERVICES,
  SOCIAL_MEDIA_FEATURES,
} from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites, social and content",
  description:
    "Website design, social media management, and content creation for Northern Ireland small businesses and charities. Clear pricing, no nonsense.",
  path: "/services",
});

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
      "A shop, a trades firm, a charity, or anyone who needs a proper site without an agency quote.",
    process: [
      "Short call or email to agree the pages and the date",
      "You send text, photos, and contact details",
      "I build it, you see a draft, one round of notes",
      "Launch and a handover of how to make simple edits",
    ],
    cta: "Get a quote",
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
    timeline: "First month's calendar in the first week. Posting starts once you sign the calendar off.",
    revisions: "One round of notes on each month's batch - captions and graphics - before anything is scheduled.",
    ideal: "You know you should be posting and you do not have a free hour every week to do it.",
    process: [
      "Look at what you already post, if anything",
      "Agree the month's calendar with you",
      "Write, design, and schedule the posts",
      "A short note at the end of the month on what went out",
    ],
    cta: "Get in touch",
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
    timeline: "A small set in a few days. A bigger batch about a week, once the brief and any photos are in.",
    revisions: "One round included after you see the set. Extra rounds are quoted before I start them.",
    ideal: "A product launch, a campaign, or a batch of posts without a monthly retainer.",
    process: [
      "Brief: what it is for, who it is for, what you already have",
      "I write and design the set",
      "One round of notes",
      "Files delivered ready to post",
    ],
    cta: "Get a quote",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Section>
        <h1 className="display-lg max-w-[16ch] text-balance text-studio-text">Websites, social and content</h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Websites, social media, and content for Northern Ireland small businesses and charities. Clear prices. One person from start to finish.
        </p>
        <p className="type-body mt-4 max-w-prose text-studio-muted">{CHARITY_NOTE}</p>
        <div className="mt-8">
          <Button href="/contact">Get a quote</Button>
        </div>
        <nav className="mt-6 flex flex-wrap gap-x-6" aria-label="Jump to service">
          {SERVICES.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
            >
              {service.title}
            </a>
          ))}
        </nav>
        <div className="mt-10 max-w-xl">
          <Scoreboard />
        </div>
      </Section>

      {SERVICES.map((service) => {
        const details = SERVICE_DETAILS.find((item) => item.slug === service.slug);
        if (!details) return null;
        return (
          <Section key={service.slug} id={service.slug} className="border-t border-studio-line">
            <h2 className="font-studio-display text-3xl text-studio-text">{service.title}</h2>
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
              className="mt-4 inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
            >
              {details.cta}
            </Link>
          </Section>
        );
      })}

      <Section className="border-t border-studio-line" heading="How it works" intro="No committees. Here is what working together looks like.">
        <ol className="mt-8 border-t border-studio-line">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className="grid gap-2 border-b border-studio-line py-5 sm:grid-cols-[4rem_1fr] sm:gap-6">
              <span className="font-studio-display text-2xl text-studio-text">{step.number}</span>
              <div>
                <h3 className="font-studio-display text-2xl text-studio-text">{step.title}</h3>
                <p className="type-body mt-2 text-studio-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-studio-line">
        <FAQ />
      </Section>

      <Section className="border-t border-studio-line" heading="Tell me what you need" intro="Send a note. I will come back with next steps.">
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">Get a quote</Button>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          >
            See the work
          </Link>
        </div>
      </Section>
    </div>
  );
}
