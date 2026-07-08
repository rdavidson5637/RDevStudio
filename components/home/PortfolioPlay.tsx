import Link from "next/link";
import { GameCard } from "@/components/bored/GameCard";
import { getOtherBoredGames } from "@/lib/bored-games";
import { WARDROBE_AI } from "@/lib/constants";
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

        <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">
          More experiments
        </p>
        <div className="grid grid-cols-1 gap-5 md:max-w-xl">
          <Link
            href={WARDROBE_AI.href}
            className="work-card-lift group flex flex-col overflow-hidden rounded-[10px] border border-border bg-raised p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-xl uppercase leading-tight text-primary sm:text-2xl">
                {WARDROBE_AI.label}
              </h2>
              <span className="shrink-0 rounded-full border border-border-strong bg-base px-2.5 py-0.5 text-xs font-semibold text-accent">
                Live
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary sm:text-base">
              {WARDROBE_AI.description}
            </p>
            <span className="pitch-link mt-6 inline-flex w-fit text-sm font-semibold text-primary transition-colors group-hover:text-accent">
              Open →
            </span>
          </Link>
          {otherGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
