import Image from "next/image";
import { Button } from "@/components/ui/Button";
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
    <div className="bg-studio-bg px-6 py-16 font-studio-sans text-studio-text md:px-8 md:py-24 lg:py-32">
      <article className="mx-auto max-w-studio">
        <header className="border-b border-studio-line pb-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <h1 className="display-lg text-studio-text">Ryan Davidson</h1>
              <div className="mt-8">
                <Button href="/contact">Get in touch</Button>
              </div>
            </div>
            <figure>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-studio-surface">
                <Image
                  src="/images/ryan-davidson.jpg"
                  alt="Ryan Davidson in graduation gown outside Queen's University Belfast"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-sm text-studio-faint">
                Queen&apos;s University Belfast, MSc
              </figcaption>
            </figure>
          </div>
        </header>

        <section className="border-b border-studio-line py-12" aria-label="Profile">
          <dl className="border-t border-studio-line">
            {PROFILE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="grid gap-1 border-b border-studio-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="text-sm font-bold text-studio-text">{stat.label}</dt>
                <dd className="type-body text-studio-muted">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-b border-studio-line py-12" aria-label="Bio">
          <div className="max-w-prose space-y-5">
            <p className="type-body text-studio-muted">
              I didn&apos;t take the usual route in. Forensic science degree, then into the civil
              service in August 2025, handling casework and talking to claimants for most of the
              day. Real problems, real people, lots of process. You learn to read a file properly,
              spot what&apos;s missing, and explain yourself clearly when someone&apos;s on the phone
              needing a straight answer. RDev Studio is what I do on the side: sites, tools, and the
              odd football game.
            </p>
            <p className="type-body text-studio-muted">
              What I like building is straightforward: useful things for real people. A volunteer
              platform for an animal sanctuary. Sites for local businesses. Football games that
              strangers on the internet play at work when they should be doing something else. If
              nobody uses it, I&apos;m not interested.
            </p>
            <p className="type-body text-studio-muted">
              I do design and development both, from the first frame to the live site. One person is
              accountable for the whole thing. The day job turned out to be good training: I&apos;m
              hard to fluster and I write things down.
            </p>
          </div>
        </section>

        <section className="border-b border-studio-line py-12" aria-label="Away from the desk">
          <h2 className="type-h2 text-studio-text">Away from the desk</h2>
          <div className="mt-4 border-t border-studio-line">
            {AWAY_FROM_THE_DESK.map((item) => (
              <article key={item.label} className="border-b border-studio-line py-4">
                <h3 className="font-studio-display text-2xl text-studio-text">{item.label}</h3>
                <p className="type-body mt-2 max-w-prose text-studio-muted">{item.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12" aria-label="Get in touch">
          <p className="type-body max-w-prose text-studio-muted">CV on request.</p>
          <div className="mt-6">
            <Button href="/contact">Get in touch</Button>
          </div>
        </section>
      </article>
    </div>
  );
}
