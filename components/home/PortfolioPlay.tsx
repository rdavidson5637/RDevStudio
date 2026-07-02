import Link from "next/link";
import { GameCard } from "@/components/bored/GameCard";
import { getOtherBoredGames } from "@/lib/bored-games";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PortfolioPlay() {
  const otherGames = getOtherBoredGames();

  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="section-heading-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            className="max-w-2xl"
            label="Play"
            title="Games & experiments"
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

        {otherGames.length > 0 && (
          <>
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">
              More to play
            </p>
            <div className="grid grid-cols-1 gap-5 md:max-w-xl">
              {otherGames.map((game) => (
                <GameCard key={game.slug} game={game} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
