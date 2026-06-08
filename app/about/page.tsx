import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { createPageMetadata } from "@/lib/metadata";

const FACTS = [
  {
    label: "Stack",
    value: "Next.js + Tailwind CSS",
  },
  {
    label: "Hosting",
    value: "Deployed on Vercel",
  },
  {
    label: "Turnaround",
    value: "7-day delivery",
  },
  {
    label: "Location",
    value: "Based in Carrickfergus, NI",
  },
] as const;

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Ryan Davidson — developer, designer, and the person behind RDev Studio in Carrickfergus, Northern Ireland.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-base pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgb(59_130_246/0.06)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <div className="section-padding relative">
          <div className="container-wide max-w-4xl">
            <p className="section-label mb-4 font-medium">About</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Ryan Davidson
            </h1>
            <p className="lead-text mt-6 max-w-2xl text-xl sm:text-2xl">
              I build websites, apps, and side projects from Carrickfergus —
              this portfolio is where they all live.
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding border-b border-border bg-raised">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <SectionHeader label="The studio" title="Who I am" />

            <div className="mt-8 space-y-6 text-base leading-relaxed text-secondary sm:mt-10 sm:text-lg">
              <p>
                I&apos;m Ryan Davidson, based in Carrickfergus, Northern
                Ireland. I run RDev Studio as a side hustle — lean by design,
                which means lower costs and faster turnaround for the businesses
                I work with.
              </p>
              <p>
                I build websites, manage social media, and create content for
                small businesses that want to look credible online without
                paying agency rates. Whether you need a sharp new site, a
                consistent social presence, or branded posts and copy, I handle
                it end to end.
              </p>
              <p>
                I work with modern tools — Next.js, Tailwind CSS, and Vercel —
                to deliver fast, professional results that load quickly and look
                great on every device. No bloated builds, no endless timelines.
              </p>
              <p>
                I&apos;m passionate about helping local NI businesses show up
                properly online. Good design and clear messaging shouldn&apos;t
                be reserved for companies with big budgets — and that&apos;s
                exactly what RDev Studio is built for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I use */}
      <section className="section-padding border-b border-border bg-base">
        <div className="container-wide">
          <SectionHeader
            className="section-heading-gap max-w-2xl"
            label="Toolkit"
            title="How I work"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <article
                key={fact.label}
                className="interactive-surface card-hover px-6 py-8"
              >
                <p className="label-caps text-tertiary">{fact.label}</p>
                <p className="mt-3 font-display text-lg font-bold leading-snug text-primary sm:text-xl">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-raised">
        <div className="container-narrow">
          <div className="border border-border bg-base px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Ready to start?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-secondary">
              Tell me about your business and what you need. I&apos;ll get back
              to you within 24 hours.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
