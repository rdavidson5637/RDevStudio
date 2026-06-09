import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { createPageMetadata } from "@/lib/metadata";

const TOOLKIT = [
  {
    label: "Stack",
    value: "Next.js + Tailwind CSS",
    detail: "Fast, modern, and easy to maintain",
  },
  {
    label: "Hosting",
    value: "Deployed on Vercel",
    detail: "Quick deploys, great performance",
  },
  {
    label: "Day job",
    value: "Full time in Belfast",
    detail: "Side projects happen evenings and weekends",
  },
  {
    label: "Availability",
    value: "Open to freelance",
    detail: "Websites and web apps — happy to chat",
  },
] as const;

const INTERESTS = [
  "Clean, fast-loading websites",
  "Side projects that actually ship",
  "Football games when I'm bored",
  "Building things for businesses I rate — like RVS Cold Brew",
] as const;

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Ryan Davidson — developer, designer, and the person behind RDev Studio.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-base pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgb(139_92_246/0.08)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgb(245_158_11/0.06)_0%,transparent_50%)]"
          aria-hidden="true"
        />
        <div className="section-padding relative">
          <div className="container-wide max-w-4xl">
            <p className="section-label mb-4 font-medium">About</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Ryan Davidson
            </h1>
            <p className="lead-text mt-6 max-w-2xl text-xl sm:text-2xl">
              I design and build things for the web — this portfolio is where
              they all live.
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
                I&apos;m Ryan Davidson — a developer and designer who runs RDev
                Studio as a side project. I work full time in Belfast and build
                websites, apps, and the odd football game in my spare time.
              </p>
              <p>
                My route into software was a bit unconventional. I did my
                undergrad in forensic science at Liverpool John Moores, then
                recently finished my master&apos;s in software development at
                Queen&apos;s University Belfast. ShelterLink — the volunteer
                management app on this site — started as my dissertation project,
                and I&apos;m still actively developing it.
              </p>
              <p>
                This portfolio also includes demo sites for fictional
                businesses, a free website I&apos;m building for{" "}
                <a
                  href="https://rvscoldbrew.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-amber-400 underline decoration-amber-400/30 underline-offset-4 transition-colors hover:text-amber-300"
                >
                  RVS Cold Brew
                </a>{" "}
                (mostly because I love their coffee), and side experiments like{" "}
                <Link
                  href="/champions-draft"
                  className="font-medium text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 transition-colors hover:text-emerald-300"
                >
                  Champions Draft
                </Link>
                . Not everything here is finished — and that&apos;s kind of the
                point.
              </p>
              <p>
                I work with Next.js, Tailwind CSS, and Vercel to keep builds
                fast and lightweight. I&apos;m also open to freelance work —
                websites and web apps for businesses and side projects. If
                something here caught your eye,{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-primary"
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I care about */}
      <section className="section-padding border-b border-border bg-base">
        <div className="container-wide">
          <SectionHeader
            className="section-heading-gap max-w-2xl"
            label="Approach"
            title="What I care about"
          />

          <ul className="grid gap-4 sm:grid-cols-2">
            {INTERESTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-raised/60 px-6 py-5"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="text-base text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Toolkit */}
      <section className="section-padding border-b border-border bg-raised">
        <div className="container-wide">
          <SectionHeader
            className="section-heading-gap max-w-2xl"
            label="Toolkit"
            title="How I work"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLKIT.map((item) => (
              <article
                key={item.label}
                className="interactive-surface card-hover px-6 py-8"
              >
                <p className="label-caps text-secondary">{item.label}</p>
                <p className="mt-3 font-display text-lg font-bold leading-snug text-primary sm:text-xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-secondary">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-base">
        <div className="container-narrow">
          <div className="border border-border bg-raised px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Fancy a chat?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-secondary">
              Open to freelance website and web app work. Working on something,
              want to collaborate, or just want to say hello? I usually reply
              within a day.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Get in touch
              </Link>
              <Link href="/work" className="btn-secondary">
                Browse my work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
