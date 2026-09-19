import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Case studies and concept builds by Ryan Davidson, presented as fixture-style project rows.",
  path: "/work",
});

type Fixture = {
  index: string;
  title: string;
  description: string;
  tag: string;
  year: string;
  href: string;
};

const CLIENT_WORK: Fixture[] = [
  {
    index: "01",
    title: "ShelterLink",
    description:
      "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
    tag: "REAL CLIENT · CHARITY",
    year: "2025-26",
    href: "/work/shelterlink",
  },
  {
    index: "02",
    title: "RV's Cold Brew",
    description:
      "Live site for a Belfast cold brew and matcha counter. Menu, hours, and directions.",
    tag: "CLIENT · BRAND SITE",
    year: "2026",
    href: "/work/rvs-cold-brew",
  },
  {
    index: "03",
    title: "Paintball Wales",
    description:
      "Phone-first site for a Snowdonia paintball park, built to replace a cluttered banner.",
    tag: "CLIENT · MARKETING SITE",
    year: "2026",
    href: "/work/paintball-wales",
  },
];

const OTHER_WORK: Fixture[] = [
  {
    index: "04",
    title: "Concept builds",
    description: "Three local-business sites: trades, restaurant, salon.",
    tag: "CONCEPT · SET OF 3",
    year: "2025",
    href: "/work/concept-builds",
  },
  {
    index: "05",
    title: "UC Caseworker Assistant",
    description: "AI assistant for Universal Credit caseworkers, built around safeguarding.",
    tag: "PERSONAL · AI ASSISTANT",
    year: "2026",
    href: "/work/uc-caseworker-tool",
  },
];

function FixtureList({ fixtures }: { fixtures: Fixture[] }) {
  return (
    <div className="border-b border-border">
      {fixtures.map((fixture, index) => (
        <Link
          key={fixture.href}
          href={fixture.href}
          className="group relative block border-t border-border px-1 py-6 transition-all hover:bg-accent-light hover:pl-3"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-200 group-hover:scale-y-100" />
          <div className="grid gap-3 sm:grid-cols-[72px,1fr,auto,auto] sm:items-center sm:gap-5">
            <p className="shell-label text-accent transition-transform duration-200 group-hover:translate-x-1">
              {fixture.index}
            </p>
            <div>
              <h3 className="text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                {fixture.title}
                <span className="ml-2 inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
                  →
                </span>
              </h3>
              <p className="mt-1 text-sm text-primary">
                {fixture.description}
              </p>
            </div>
            <p className="shell-label text-secondary">{fixture.tag}</p>
            <p className="shell-label text-secondary">{fixture.year}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const projectCount = CLIENT_WORK.length + OTHER_WORK.length;

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">THE SEASON SO FAR</p>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {projectCount} projects
            </span>
          </div>
          <h1 className="programme-h1 mt-3">WORK</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary sm:text-lg">
            Client jobs first. Experiments and concept builds further down.
          </p>
        </header>

        <section className="pt-10" aria-labelledby="client-work-heading">
          <h2 id="client-work-heading" className="shell-label mb-4 text-accent">
            CLIENT WORK
          </h2>
          <FixtureList fixtures={CLIENT_WORK} />
        </section>

        <section className="pt-12" aria-labelledby="other-work-heading">
          <h2 id="other-work-heading" className="shell-label mb-4 text-accent">
            OTHER / EXPERIMENTS
          </h2>
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-primary">
            Concept builds and personal experiments. Not client jobs.
          </p>
          <FixtureList fixtures={OTHER_WORK} />
        </section>

        <section className="py-12">
          <div className="rounded-xl border border-border bg-raised p-6 sm:p-8">
            <p className="shell-label mb-2 text-accent">LOOKING FOR SOMETHING?</p>
            <p className="text-base leading-relaxed text-primary sm:text-lg">
              This is the highlight reel. If you&apos;re after something specific - a particular
              stack, a certain type of project, or proof I can actually do what I say -{" "}
              <Link href="/contact" className="text-accent hover:underline">
                just ask
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
