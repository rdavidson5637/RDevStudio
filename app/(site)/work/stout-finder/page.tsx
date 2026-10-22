import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CaseShot } from "@/components/work/CaseShot";
import { STOUT_FINDER } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Stout Finder",
  description:
    "Which pubs have Beamish, Guinness or Murphy's on, and when someone last checked. My own product, built to stay honest about how old its information is.",
  path: "/work/stout-finder",
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-studio-display text-2xl text-studio-text">{children}</h2>;
}

const RULES = [
  {
    title: "Inside 90 days",
    body: "A yes means it is on.",
  },
  {
    title: "Inside a year",
    body: "A yes means probably on.",
  },
  {
    title: "Older than that",
    body: "It says it has not been seen in a while. It does not pretend.",
  },
] as const;

export default function StoutFinderCaseStudyPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "Stout Finder" },
          ]}
          className="mb-8"
        />

        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">Stout Finder</h1>
          <p className="type-body max-w-prose text-studio-muted">
            Who has Beamish on? Someone in the pub says what is on, the report is dated, and old
            reports fade so the map stays honest.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-studio-line pt-5 text-sm text-studio-muted lg:grid-cols-4">
            <p>Role: design and development, solo</p>
            <p>Type: my own product</p>
            <p>Status: Live at stoutfinder.com</p>
            <p>Year - 2026</p>
          </div>
          <div className="pt-2">
            <Button href={STOUT_FINDER.href}>Open Stout Finder</Button>
          </div>
        </header>

        <div className="border-b border-studio-line py-12">
          <CaseShot
            src="/images/stout-finder/pub-1280.png"
            alt="A Stout Finder pub page for Ownie's in Carrickfergus: Beamish and Kilkenny on, last checked 3 days ago, with a map below"
            caption="A pub page from the live app"
            priority
          />
        </div>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>The problem</SectionHeading>
          <p className="type-body max-w-prose text-studio-text">
            Pub websites and listing apps tell you what a pub has on in general. They do not tell
            you whether the Beamish is on this week. Most information about pubs goes stale quietly,
            and nothing on the page tells you that it has.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>How it stays honest</SectionHeading>
          <p className="type-body max-w-prose text-studio-text">
            Every report has a date. The app works out how old a report is when you open the page,
            so an old yes is never shown as a fresh one.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {RULES.map((rule) => (
              <li key={rule.title} className="card p-5">
                <h3 className="font-studio-display text-2xl text-studio-text">{rule.title}</h3>
                <p className="type-body mt-2 text-studio-muted">{rule.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where the pubs come from</SectionHeading>
          <div className="max-w-prose space-y-5 type-body text-studio-text">
            <p>
              The pub list comes from OpenStreetMap, across the UK. Anyone can add a pub that is
              missing. Sign-in is anonymous, and there are limits on how fast one person can report,
              so one keen person cannot flood the map.
            </p>
            <p>
              The pubs with a recent report show up as a pint on the map. The rest stay on the map
              without one, with a prompt to say what is on.
            </p>
          </div>
          <figure className="mt-8 max-w-xs">
            <div className="overflow-hidden rounded-sm border border-studio-border-strong">
              <Image
                src="/images/stout-finder/home-390.png"
                alt="Stout Finder on a phone: Who has Beamish on, brand tabs and a dark map of Belfast with pint glasses on the pubs that have it"
                width={390}
                height={844}
                sizes="320px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-studio-faint">
              The home screen on a phone, Belfast
            </figcaption>
          </figure>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where it stands</SectionHeading>
          <p className="type-body max-w-prose text-studio-text">
            Stout Finder is live. It is my own product, so there is no client behind it and no one
            to blame but me. Try it at{" "}
            <Link
              href={STOUT_FINDER.href}
              className="underline underline-offset-4 hover:text-studio-accent"
            >
              stoutfinder.com
            </Link>
            .
          </p>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/shelterlink"
              className="text-sm text-studio-text transition-colors hover:text-studio-accent"
            >
              Next case study
            </Link>
            <Link
              href="/contact"
              className="text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent"
            >
              Want something like this? Get in touch.
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
