import Link from "next/link";
import { CaseShot } from "@/components/work/CaseShot";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Client work from RDev Studio: ShelterLink, RV's Cold Brew, and other builds. Based in Carrickfergus.",
  path: "/work",
  ogImage: "/work/opengraph-image",
});

const ROWS = [
  {
    title: "ShelterLink",
    line: "Ready for live use. Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary.",
    href: "/work/shelterlink",
  },
  {
    title: "Assisi Animal Sanctuary",
    line: "A rebuilt site and brand. Built, awaiting their sign-off.",
  },
  {
    title: "Concept builds",
    line: "Three local-business sites: trades, restaurant, salon.",
    href: "/work/concept-builds",
  },
  {
    title: "UC Caseworker Assistant",
    line: "An assistant for Universal Credit casework, built around safeguarding.",
    href: "/work/uc-caseworker-tool",
  },
  {
    title: "Stout Finder",
    line: "Which pubs have stout on, and when someone last checked. Lives at stoutfinder.com.",
    href: "https://stoutfinder.com",
    external: true,
  },
  {
    title: "Games and side projects",
    line: "Draft tools, a pub quiz, and two things still being built.",
    href: "/projects",
  },
] as const;

function WorkRow({
  title,
  line,
  href,
  external,
}: {
  title: string;
  line: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span>
        <span className="block font-studio-display text-2xl text-studio-text">{title}</span>
        <span className="type-body mt-1 block max-w-prose text-studio-muted">{line}</span>
      </span>
      {href ? (
        <span aria-hidden="true" className="text-2xl text-studio-text transition-colors group-hover:text-studio-accent">
          →
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <div className="flex items-center justify-between gap-6 py-6">{body}</div>;
  }

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex min-h-11 items-center justify-between gap-6 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
    >
      {body}
    </Link>
  );
}

export default function WorkPage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Section>
        <h1 className="display-lg text-studio-text">Work</h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Client jobs first. Games and the things still being built are on the projects page.
        </p>
        <div className="mt-8">
          <Button href="/contact">Get a quote</Button>
        </div>
      </Section>

      <section className="border-t border-studio-line pb-8" aria-label="RV's Cold Brew">
        <CaseShot
          src="/images/work/rvs-coldbrew-hero.jpg"
          alt="RV's Cold Brew landing page hero screenshot"
          caption="RV's Cold Brew, Great Northern Mall. Nearly finished."
          priority
        />
        <div className="mx-auto max-w-studio px-6 pt-4 md:px-8">
          <Link
            href="/work/rvs-cold-brew"
            className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            Read the case study
          </Link>
        </div>
      </section>

      <section className="border-t border-studio-line">
        <div className="mx-auto max-w-studio px-6 md:px-8">
          <h2 className="type-h2 pt-16 text-studio-text">The rest</h2>
          <ul className="mt-6 border-t border-studio-line">
            {ROWS.map((row) => (
              <li key={row.title} className="border-b border-studio-line">
                <WorkRow {...row} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
