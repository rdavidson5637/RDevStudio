import Image from "next/image";
import ryanPhoto from "@/public/images/ryan-davidson.jpg";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/studio/icons";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Ryan Davidson, designer and developer behind RDev Studio. Based in Carrickfergus. Sites for NI businesses and charities, plus a few games.",
  path: "/about",
});

const PROFILE_STATS = [
  { label: "Position", value: "Designer / developer" },
  { label: "Studio", value: "RDev Studio" },
  { label: "Hometown", value: "Carrickfergus, Northern Ireland" },
  {
    label: "Education",
    value:
      "MSc Software Development, Queen's University Belfast (Commendation). BSc Forensic Science, LJMU.",
  },
  { label: "Day job", value: "UK Civil Service - casework" },
] as const;

const AWAY_FROM_THE_DESK = [
  {
    label: "Rudi",
    line: "Border Collie. Chief morale officer. Adopted from Assisi - yes, the same sanctuary.",
  },
  {
    label: "Football and rugby",
    line: "Arsenal and Ulster. One of these causes me significantly more stress than the other.",
  },
  {
    label: "Otherwise",
    line: "Music, gaming, and making short videos nobody asked for.",
  },
] as const;

export default function AboutPage() {
  return (
    <div>
      <section className="mb-shell mb-page-intro max-w-6xl sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-14">
          <div>
            <p className="mb-kicker">About</p>
            <h1 className="mb-h1 mt-2 text-[var(--mb-ink)]">Ryan Davidson</h1>
            <p className="mb-lede mt-5">
              One-person studio in Carrickfergus. When you hire RDev Studio, you deal with me from the first message to the live site.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="mb-btn-primary w-full sm:w-auto">
                Get a fixed quote
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
          <figure className="mb-frame">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--mb-surface)]">
              <Image
                src={ryanPhoto}
                placeholder="blur"
                alt="Ryan Davidson in graduation gown outside Queen's University Belfast"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mb-caption">Queen&apos;s University Belfast, MSc</figcaption>
          </figure>
        </div>

        <dl className="mt-12 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]" aria-label="Profile">
          {PROFILE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
            >
              <dt className="mb-kicker-muted">{stat.label}</dt>
              <dd className="mb-fact-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-label="Bio"
        className="border-t border-[var(--mb-line)] bg-[var(--mb-surface)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <div className="max-w-[var(--mb-measure)] space-y-5">
            <p className="mb-body">
              I didn&apos;t take the usual route in. Forensic science degree, then into the civil
              service in August 2025, handling casework and talking to claimants for most of the
              day. Real problems, real people, lots of process. You learn to read a file properly,
              spot what&apos;s missing, and explain yourself clearly when someone&apos;s on the phone
              needing a straight answer. RDev Studio is what I do on the side: sites, tools, and the
              odd football game.
            </p>
            <p className="mb-body">
              What I like building is straightforward: useful things for real people. A volunteer
              platform for an animal sanctuary. Charity sites for Assisi and Crosskennan. A
              coaching app for grassroots football. Sites for local businesses. Games that
              strangers on the internet play at work when they should be doing something else. If
              nobody uses it, I&apos;m not interested.
            </p>
            <p className="mb-body">
              I do design and development both, from the first frame to the live site. One person is
              accountable for the whole thing. The day job turned out to be good training: I&apos;m
              hard to fluster and I write things down.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="away-heading" className="border-t border-[var(--mb-line)]">
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl sm:px-6">
          <h2 id="away-heading" className="mb-h2 text-[var(--mb-ink)]">
            Away from the desk
          </h2>
          <dl className="mt-8 divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)]">
            {AWAY_FROM_THE_DESK.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <dt className="mb-step-title">{item.label}</dt>
                <dd className="mb-prose">{item.line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="about-close-heading"
        className="mb-on-light bg-[var(--mb-light)] text-[var(--mb-ink)]"
      >
        <div data-mb-reveal="true" className="mb-shell mb-section-pad max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl border-t border-[var(--mb-line-strong)] pt-8">
            <h2 id="about-close-heading" className="mb-h2 text-[var(--mb-ink)]">
              Want something built?
            </h2>
            <p className="mb-body mt-3">CV on request.</p>
            <div className="mt-6">
              <Link href="/contact" className="mb-btn-primary w-full sm:w-auto">
                Get a fixed quote
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
