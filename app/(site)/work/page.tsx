import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Case studies and concept builds by Ryan Davidson, presented as fixture-style project rows.",
  path: "/work",
});

const FIXTURES = [
  {
    index: "01",
    title: "ShelterLink",
    description: "Volunteer management platform for Assisi Animal Sanctuary.",
    tag: "REAL CLIENT · CHARITY",
    year: "2025–26",
    href: "/work/shelterlink",
    status: "live" as const,
  },
  {
    index: "02",
    title: "RVS Cold Brew",
    description: "Brand-led site for a Northern Irish cold brew company.",
    tag: "CLIENT · BRAND SITE",
    year: "2026",
    href: "/work/rvs-cold-brew",
    status: "live" as const,
  },
  {
    index: "03",
    title: "Paintball Wales",
    description:
      "Mobile-first marketing site for a Snowdonia paintball park.",
    tag: "CLIENT · MARKETING SITE",
    year: "2026",
    href: "/work/paintball-wales",
    status: "live" as const,
  },
  {
    index: "04",
    title: "Concept builds",
    description: "Three local-business sites: trades, restaurant, salon.",
    tag: "CONCEPT · SET OF 3",
    year: "2025",
    href: "/work/concept-builds",
    status: "live" as const,
  },
  {
    index: "05",
    title: "UC Caseworker Assistant",
    description: "AI assistant for Universal Credit caseworkers, built around safeguarding.",
    tag: "PERSONAL · AI ASSISTANT",
    year: "2026",
    href: "/work/uc-caseworker-tool",
    status: "live" as const,
  },
] as const;

export default function WorkPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">THE SEASON SO FAR</p>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {FIXTURES.length} projects
            </span>
          </div>
          <h1 className="programme-h1 mt-3">WORK</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            Real clients, real users, and a few concept builds to show range.
          </p>
        </header>

        <div className="border-b border-border">
          {FIXTURES.map((fixture, index) => (
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
                  <h2 className="text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                    {fixture.title}
                    <span className="ml-2 inline-block opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
                      →
                    </span>
                  </h2>
                  <p className="mt-1 text-sm text-secondary">
                    {fixture.description}
                  </p>
                </div>
                <p className="shell-label text-secondary">{fixture.tag}</p>
                <p className="shell-label text-secondary">{fixture.year}</p>
              </div>
            </Link>
          ))}
        </div>

        <section className="py-12">
          <div className="rounded-xl border border-border bg-raised p-6 sm:p-8">
            <p className="shell-label mb-2 text-accent">LOOKING FOR SOMETHING?</p>
            <p className="text-base leading-relaxed text-secondary sm:text-lg">
              This is the highlight reel. If you&apos;re after something specific — a particular
              stack, a certain type of project, or proof I can actually do what I say —{" "}
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
