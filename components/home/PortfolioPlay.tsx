import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

const LIVE_BUILDS = [
  {
    kicker: "Free game",
    title: "Pub Quiz",
    line: "Host a quiz night on the TV, everyone joins on their phone. Buzzer rounds, picture and music rounds, teams.",
    play: { label: "Host a quiz", href: "/pub-quiz" },
    build: "/build/pub-quiz",
  },
  {
    kicker: "Free game",
    title: "Champions Draft",
    line: "Spin famous squads, draft an XI, and take it through a league, the Champions League, or a World Cup.",
    play: { label: "Play", href: "/champions-draft" },
    build: "/build/champions-draft",
  },
  {
    kicker: "Live tool",
    title: "Draft Analyser",
    line: "Fantasy Premier League Draft analyser: availability, projected points, waivers and a live gameweek board.",
    play: { label: "Open it", href: "/draft" },
    build: "/build/draft-analyser",
  },
] as const;

/**
 * Three live things people actually use, each with a link to how it's built.
 * The full lists live on /games and /projects.
 */
export function PortfolioPlay() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="section-heading-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            className="max-w-2xl"
            label="Extra time"
            title="Things I build for fun"
          />
          <div className="flex shrink-0 gap-5">
            <Link
              href="/games"
              className="text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              All games →
            </Link>
            <Link
              href="/projects"
              className="text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              All projects →
            </Link>
          </div>
        </div>

        <p className="lead-text -mt-6 mb-10 max-w-2xl sm:-mt-4">
          Live, free, and played by people who are not my mum. Same hands as
          the client sites.
        </p>

        <ul className="grid gap-5 md:grid-cols-3">
          {LIVE_BUILDS.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-[10px] border border-border bg-raised p-5 sm:p-6"
            >
              <p className="shell-label text-accent">{item.kicker}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-primary">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-primary">
                {item.line}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href={item.play.href} className="link-editorial text-sm">
                  {item.play.label} →
                </Link>
                <Link
                  href={item.build}
                  className="shell-label text-secondary transition-colors hover:text-accent"
                >
                  How it&apos;s built
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
