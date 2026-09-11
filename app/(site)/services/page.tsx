import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import {
  SERVICES,
  PRICING_FEATURES,
  SOCIAL_MEDIA_FEATURES,
  CONTENT_CREATION_FEATURES,
  FAQ_ITEMS,
} from "@/lib/constants";
import { FAQStructuredData } from "@/components/FAQStructuredData";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Website design, social media management, and content creation for Northern Ireland small businesses. Clear pricing, fast turnaround, no nonsense.",
  path: "/services",
});

const SERVICE_DETAILS = [
  {
    id: "websites",
    icon: "🌐",
    features: PRICING_FEATURES,
    ideal: "Local businesses, freelancers, and startups who need a professional web presence without the agency price tag.",
    process: [
      "Quick discovery call to understand your business",
      "Design mockup for approval",
      "Build and test across devices",
      "Launch and handover",
    ],
    cta: "Get a website quote",
  },
  {
    id: "social",
    icon: "📱",
    features: SOCIAL_MEDIA_FEATURES,
    ideal: "Businesses who know they should be posting but don't have the time or know-how to do it consistently.",
    process: [
      "Audit your current presence",
      "Create a content calendar",
      "Schedule and post on your behalf",
      "Monthly check-in and performance review",
    ],
    cta: "Discuss social media",
  },
  {
    id: "content",
    icon: "✏️",
    features: CONTENT_CREATION_FEATURES,
    ideal: "Brands who need one-off campaigns, product launches, or a batch of content without a monthly commitment.",
    process: [
      "Brief and brand review",
      "Content creation",
      "Revisions (1 round included)",
      "Delivery in your preferred format",
    ],
    cta: "Start a content project",
  },
] as const;

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "A quick call or email to understand what you need, who you're trying to reach, and what success looks like.",
  },
  {
    number: "02",
    title: "Proposal",
    description: "A clear quote with scope, timeline, and price. No surprises, no hidden fees.",
  },
  {
    number: "03",
    title: "Build",
    description: "I get to work. You'll see progress along the way and can give feedback before anything goes live.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Your site or content goes live. I handle the technical setup and make sure everything works.",
  },
] as const;

function ServiceCard({
  service,
  details,
  index,
}: {
  service: (typeof SERVICES)[number];
  details: (typeof SERVICE_DETAILS)[number];
  index: number;
}) {
  return (
    <article
      id={details.id}
      className="scroll-mt-24 rounded-xl border border-border-strong bg-raised"
    >
      <div className="border-b border-border p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-3xl" aria-hidden="true">
              {details.icon}
            </span>
            <p className="shell-label mt-4 text-accent">{service.number}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
              {service.title}
            </h2>
            <p className="mt-3 text-secondary">{service.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
              {service.price}
            </p>
            {service.priceNote && (
              <p className="shell-label mt-1 text-secondary">{service.priceNote}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h3 className="shell-label mb-4 text-accent">WHAT&apos;S INCLUDED</h3>
          <ul className="space-y-2">
            {details.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-primary">
                <span className="mt-1 text-accent" aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="shell-label mb-4 text-accent">THE PROCESS</h3>
          <ol className="space-y-2">
            {details.process.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-secondary">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-border p-6 sm:p-8">
        <p className="text-sm text-secondary">
          <span className="font-semibold text-primary">Ideal for:</span> {details.ideal}
        </p>
        <Link
          href={`/contact?service=${encodeURIComponent(service.title)}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary"
        >
          {details.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function FAQSection() {
  return (
    <section className="border-t border-border py-12">
      <FAQStructuredData items={FAQ_ITEMS} />
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-primary sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-3xl space-y-4">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-border bg-raised"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-primary transition-colors hover:text-accent sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-secondary sm:px-6 sm:pb-6">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">WHAT I OFFER</p>
          <h1 className="programme-h1">SERVICES</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Websites, social media, and content for Northern Ireland small businesses.
            Clear pricing, fast turnaround, one person handling everything from start to finish.
          </p>

          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Jump to service">
            {SERVICES.map((service, index) => (
              <a
                key={service.title}
                href={`#${SERVICE_DETAILS[index].id}`}
                className="rounded-full border border-border-strong bg-base px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {service.title.split(" ")[0]}
              </a>
            ))}
          </nav>
        </header>

        {/* Services Grid */}
        <section className="space-y-8 py-12">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              details={SERVICE_DETAILS[index]}
              index={index}
            />
          ))}
        </section>

        {/* How It Works */}
        <section className="border-t border-border py-12">
          <p className="shell-label mb-3 text-accent">HOW IT WORKS</p>
          <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
            From first message to launch
          </h2>
          <p className="mt-4 max-w-2xl text-secondary">
            No lengthy proposals, no committees, no waiting around. Here&apos;s what working together looks like.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-lg border border-border bg-raised p-5"
              >
                <p className="font-display text-3xl font-bold text-accent/20">
                  {step.number}
                </p>
                <h3 className="mt-2 font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <section className="border-t border-border py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="shell-label mb-3 text-accent">READY TO START?</p>
            <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
              Let&apos;s talk about your project
            </h2>
            <p className="mt-4 text-secondary">
              Tell me what you need and I&apos;ll get back to you within 24 hours with next steps.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Get in touch
              </Link>
              <Link href="/work" className="btn-secondary">
                See my work first
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
