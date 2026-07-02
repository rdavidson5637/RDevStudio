import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Ryan Davidson — designer, developer, and the person behind RDev Studio.",
  path: "/about",
});

const PROFILE_STATS = [
  { label: "POSITION", value: "Designer / developer" },
  { label: "CLUB", value: "RDev Studio" },
  { label: "HOMETOWN", value: "Carrickfergus, Northern Ireland" },
  {
    label: "EDUCATION",
    value:
      "MSc Software Development, Queen's University Belfast (Commendation) · BSc Forensic Science, LJMU",
  },
  { label: "DAY JOB", value: "UK Civil Service — casework" },
] as const;

const OFF_THE_PITCH = [
  {
    label: "RUDI",
    line: "Border Collie. Chief morale officer. Adopted from Assisi — yes, the same sanctuary.",
  },
  {
    label: "FOOTBALL & RUGBY",
    line: "Arsenal and Ulster. One of these causes me significantly more stress than the other.",
  },
  {
    label: "OTHERWISE",
    line: "Music, gaming, and making short videos nobody asked for.",
  },
] as const;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan Davidson",
  jobTitle: "Designer and developer",
  url: SITE_URL,
  email: "mailto:ryan@rdevstudio.co.uk",
  sameAs: [
    "https://www.linkedin.com/in/ryan-davidson-462bb221b",
    "https://github.com/rdavidson5637",
  ],
  worksFor: {
    "@type": "Organization",
    name: "RDev Studio",
    url: SITE_URL,
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Queen's University Belfast",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Liverpool John Moores University",
    },
  ],
  homeLocation: {
    "@type": "Place",
    name: "Carrickfergus, Northern Ireland",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Carrickfergus",
      addressRegion: "Northern Ireland",
      addressCountry: "GB",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="section-padding pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <article className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <div className="grid gap-8 lg:grid-cols-[1fr,280px] lg:items-end">
            <div>
              <p className="shell-label mb-3 text-accent">SQUAD — No. 10</p>
              <h1 className="programme-h1">RYAN DAVIDSON</h1>
            </div>
            <figure>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px] border border-border bg-raised">
                <Image
                  src="/images/ryan-davidson.jpg"
                  alt="Ryan Davidson in graduation gown outside Queen's University Belfast"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="shell-label mt-3 text-secondary">
                QUEEN&apos;S UNIVERSITY BELFAST — MSc
              </figcaption>
            </figure>
          </div>
        </header>

        <section
          className="border-b border-border py-12"
          aria-label="Profile stats"
        >
          <div className="rounded-[10px] border border-border bg-raised p-6 sm:p-8">
            <dl className="grid gap-4 sm:grid-cols-2">
              {PROFILE_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-secondary">
                    <span className="text-primary">{stat.label}</span>
                    {" — "}
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-border py-12" aria-label="Bio">
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-primary sm:text-lg">
            <p>
              I didn&apos;t take the usual route in. Forensic science degree,
              then into the civil service last August — handling casework and
              talking to claimants for most of the day. Real problems, real
              people, lots of process. You learn to read a file properly, spot
              what&apos;s missing, and explain yourself clearly when
              someone&apos;s on the phone needing a straight answer. RDev Studio
              is what I do on the side: sites, tools, and the odd football
              game.
            </p>
            <p>
              What I like building is straightforward: useful things for real
              people. A volunteer platform for an animal sanctuary. Sites for
              local businesses. Football games that strangers on the internet
              play at work when they should be doing something else. If nobody
              uses it, I&apos;m not interested.
            </p>
            <p>
              I do design and development both — from first Figma frame to
              production — which means fewer handoffs, fewer meetings about
              meetings, and one person who&apos;s accountable for the whole
              thing. The day job turned out to be good training: I&apos;m hard
              to fluster and I write things down.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-12" aria-label="Off the pitch">
          <p className="shell-label mb-4 text-accent">OFF THE PITCH</p>
          <div className="grid gap-4 md:grid-cols-3">
            {OFF_THE_PITCH.map((item) => (
              <article
                key={item.label}
                className="rounded-[10px] border border-border bg-raised px-4 py-4"
              >
                <p className="shell-label mb-2 text-secondary">{item.label}</p>
                <p className="text-sm leading-relaxed text-primary">{item.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12" aria-label="Call to action">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-semibold text-primary sm:text-lg">
              Want the formal version?
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="/cv.pdf" download className="btn-secondary">
                Download the CV
              </a>
              <Link
                href="/contact"
                className="text-center text-sm font-semibold text-secondary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent sm:text-left"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
