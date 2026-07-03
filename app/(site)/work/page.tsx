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
  },
  {
    index: "02",
    title: "RVS Cold Brew",
    description: "Brand-led site for a Northern Irish cold brew company.",
    tag: "CLIENT · BRAND SITE",
    year: "2026",
    href: "/work/rvs-cold-brew",
  },
  {
    index: "03",
    title: "Concept builds",
    description: "Three local-business sites: trades, restaurant, salon.",
    tag: "CONCEPT · SET OF 3",
    year: "2025",
    href: "/work/concept-builds",
  },
] as const;

export default function WorkPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-8">
          <p className="shell-label mb-3 text-accent">THE SEASON SO FAR</p>
          <h1 className="programme-h1">WORK</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            Real clients, real users, and a few concept builds to show range.
          </p>
        </header>

        <div className="border-b border-border">
          {FIXTURES.map((fixture) => (
            <Link
              key={fixture.href}
              href={fixture.href}
              className="group block border-t border-border px-1 py-6 transition-colors hover:bg-accent-light"
            >
              <div className="grid gap-3 sm:grid-cols-[72px,1fr,auto,auto] sm:items-center sm:gap-5">
                <p className="shell-label text-accent">{fixture.index}</p>
                <div>
                  <h2 className="text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                    {fixture.title}
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
      </div>
    </div>
  );
}
