import Link from "next/link";
import { GameCard } from "@/components/bored/GameCard";
import { BORED_GAMES } from "@/lib/bored-games";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PortfolioPlay() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="section-heading-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            className="max-w-2xl"
            label="Play"
            title="I'm Bored"
          />
          <Link
            href="/bored"
            className="shrink-0 text-sm font-medium text-accent transition-colors hover:text-primary"
          >
            All games →
          </Link>
        </div>

        <p className="lead-text -mt-6 mb-10 max-w-2xl sm:-mt-4">
          Quick games and experiments — no accounts, no pressure, just something
          to poke at when you have five minutes.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {BORED_GAMES.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
