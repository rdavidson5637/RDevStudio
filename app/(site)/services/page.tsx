import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import {
  CHARITY_NOTE,
  CONTENT_CREATION_FEATURES,
  PRICING_FEATURES,
  PROCESS_STEPS,
  SERVICES,
  SOCIAL_MEDIA_FEATURES,
} from "@/lib/constants";
import { FAQ } from "@/components/services/FAQ";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Website design, social media management, and content creation for Northern Ireland small businesses and charities. Clear pricing, no nonsense.",
  path: "/services",
});

const SERVICE_DETAILS = [
  {
    slug: "websites",
    features: PRICING_FEATURES,
    notIncluded: [
      "An online shop or card payments — that is a separate quote",
      "Pages beyond five — extra pages are priced before I build them",
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
    cta: "Start a project",
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
      "One round of notes on each month's batch — captions and graphics — before anything is scheduled.",
    ideal:
      "You know you should be posting and you do not have a free hour every week to do it.",
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
    cta: "Start a project",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">The offer</p>
          <h1 className="programme-h1">SERVICES</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            Websites, social media, and content for Northern Ireland small
            businesses and charities. Clear prices. One person from start to
            finish.
          </p>

          <aside className="mt-8 max-w-3xl rounded-[10px] border border-border bg-raised p-5 sm:p-6">
            <p className="shell-label mb-2 text-accent">Charities</p>
            <p className="text-sm leading-relaxed text-primary">
              {CHARITY_NOTE}
            </p>
          </aside>

          <nav
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Jump to service"
          >
            {SERVICES.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="rounded-md border border-border-strong bg-base px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {service.title}
              </a>
            ))}
          </nav>
        </header>

        <section className="space-y-8 py-12">
          {SERVICES.map((service) => {
            const details = SERVICE_DETAILS.find(
              (item) => item.slug === service.slug,
            );

            if (!details) {
              return null;
            }

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 rounded-[10px] border border-border-strong bg-raised"
              >
                <div className="border-b border-border p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                      <p className="shell-label text-accent">{service.number}</p>
                      <h2 className="mt-2 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-primary">{service.description}</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="font-display text-2xl uppercase text-primary sm:text-3xl">
                        {service.price}
                      </p>
                      {service.priceNote ? (
                        <p className="shell-label mt-1 text-secondary">
                          {service.priceNote}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
                  <div>
                    <h3 className="shell-label mb-4 text-accent">
                      What&apos;s included
                    </h3>
                    <ul className="space-y-2">
                      {details.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-primary"
                        >
                          <span className="mt-1 text-accent" aria-hidden="true">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="shell-label mb-4 text-accent">What is not</h3>
                    <ul className="space-y-2">
                      {details.notIncluded.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-primary"
                        >
                          <span
                            className="mt-1 text-secondary"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-6 border-t border-border p-6 sm:p-8 lg:grid-cols-2">
                  <div>
                    <h3 className="shell-label mb-3 text-accent">Timeline</h3>
                    <p className="text-sm leading-relaxed text-primary sm:text-base">
                      {details.timeline}
                    </p>
                    <h3 className="shell-label mb-3 mt-6 text-accent">
                      Revisions
                    </h3>
                    <p className="text-sm leading-relaxed text-primary sm:text-base">
                      {details.revisions}
                    </p>
                  </div>

                  <div>
                    <h3 className="shell-label mb-4 text-accent">The process</h3>
                    <ol className="space-y-2">
                      {details.process.map((step, stepIndex) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-primary"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="border-t border-border p-6 sm:p-8">
                  <p className="text-sm text-primary">
                    <span className="font-semibold text-primary">Ideal for:</span>{" "}
                    {details.ideal}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary"
                  >
                    {details.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <section className="border-t border-border py-12">
          <p className="shell-label mb-3 text-accent">Game plan</p>
          <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
            How it works
          </h2>
          <p className="mt-4 max-w-2xl text-primary">
            No committees. Here is what working together looks like.
          </p>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.number}
                className="rounded-[10px] border border-border bg-base p-5"
              >
                <p className="shell-label text-accent">{step.number}</p>
                <h3 className="mt-3 font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border py-12">
          <FAQ />
        </section>

        <section className="border-t border-border py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="shell-label mb-3 text-accent">Full time</p>
            <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Tell me what you need
            </h2>
            <p className="mt-4 text-primary">
              Send a note. I will come back with next steps.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link href="/work" className="btn-secondary">
                See the work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
