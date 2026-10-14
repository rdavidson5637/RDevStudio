import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Ryan Davidson - designer, developer, and the person behind RDev Studio.",
  path: "/about",
});

const PROFILE_STATS = [
  { label: "Position", value: "Designer / developer" },
  { label: "Club", value: "RDev Studio" },
  { label: "Hometown", value: "Carrickfergus, Northern Ireland" },
  {
    label: "Education",
    value:
      "MSc Software Development, Queen's University Belfast (Commendation). BSc Forensic Science, LJMU.",
  },
  { label: "Day job", value: "UK Civil Service - casework" },
] as const;

const OFF_THE_PITCH = [
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
    <div className="studio-page px-4 py-16 sm:px-6 md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Reveal as="header" className="border-b border-border pb-10">
          <div className="grid gap-8 lg:grid-cols-[1fr,280px] lg:items-end">
            <div>
              <h1 className="display-lg text-studio-text">Ryan Davidson</h1>
            </div>
            <figure>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-raised">
                <Image
                  src="/images/ryan-davidson.jpg"
                  alt="Ryan Davidson in graduation gown outside Queen's University Belfast"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 font-studio-sans text-sm text-studio-muted">
                Queen&apos;s University Belfast, MSc
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <section
          className="border-b border-border py-12"
          aria-label="Profile stats"
        >
          <div className="rounded-[10px] border border-border bg-raised p-6 sm:p-8">
            <dl className="grid gap-4 sm:grid-cols-2">
              {PROFILE_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-studio-sans text-sm leading-relaxed text-studio-muted">
                    <span className="text-primary">{stat.label}</span>
                    {" - "}
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
              then into the civil service in August 2025 - handling casework and
              talking to claimants for most of the day. Real problems, real
              people, lots of process. You learn to read a file properly, spot
              what&apos;s missing, and explain yourself clearly when
              someone&apos;s on the phone needing a straight answer. RDev Studio
              is what I do on the side: sites, tools, and the odd football game.
            </p>
            <p>
              What I like building is straightforward: useful things for real
              people. A volunteer platform for an animal sanctuary. Sites for
              local businesses. Football games that strangers on the internet
              play at work when they should be doing something else. If nobody
              uses it, I&apos;m not interested.
            </p>
            <p>
              I do design and development both - from first Figma frame to
              production - which means fewer handoffs, fewer meetings about
              meetings, and one person who&apos;s accountable for the whole
              thing. The day job turned out to be good training: I&apos;m hard
              to fluster and I write things down.
            </p>
          </div>
        </section>

        <section
          className="border-b border-border py-12"
          aria-label="Off the pitch"
        >
          <h2 className="mb-4 font-studio-display text-2xl text-studio-text">Off the pitch</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {OFF_THE_PITCH.map((item) => (
              <article
                key={item.label}
                className="rounded-[10px] border border-border bg-raised px-4 py-4"
              >
                <p className="mb-2 font-studio-sans text-sm text-studio-muted">{item.label}</p>
                <p className="text-sm leading-relaxed text-primary">
                  {item.line}
                </p>
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
              <Link href="/contact" className="btn-secondary">
                CV on request
              </Link>
              <Link
                href="/contact"
                className="text-center text-sm font-semibold text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent sm:text-left"
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
