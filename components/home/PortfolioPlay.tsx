import Link from "next/link";
import { GameCard } from "@/components/bored/GameCard";
import { getOtherBoredGames } from "@/lib/bored-games";
import { STUDIO_PROJECTS } from "@/lib/constants";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperimentSpotlight } from "@/components/ui/ExperimentSpotlight";

export function PortfolioPlay() {
  const otherGames = getOtherBoredGames();

  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="section-heading-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            className="max-w-2xl"
            label="Play"
            title="Games & projects"
          />
          <Link
            href="/games"
            className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            All games →
          </Link>
        </div>

        <div className="mb-10">
          <FeaturedGames variant="section" />
        </div>

        <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">
          More games
        </p>
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {otherGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Projects
          </p>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {STUDIO_PROJECTS.map((project) => (
            <ExperimentSpotlight
              key={project.href}
              experiment={project}
              animated={false}
              kicker="Project"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
