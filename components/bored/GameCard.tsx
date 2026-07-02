import Link from "next/link";
import { getBoredGameHref, type BoredGame } from "@/lib/bored-games";

type GameCardProps = {
  game: BoredGame;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={getBoredGameHref(game)}
      className="work-card-lift group flex flex-col overflow-hidden rounded-[10px] border border-border bg-raised p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-display text-xl uppercase leading-tight text-primary sm:text-2xl">
          {game.title}
        </h2>
        <span className="shrink-0 rounded-full border border-border-strong bg-base px-2.5 py-0.5 text-xs font-semibold text-primary">
          {game.tag}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary sm:text-base">
        {game.description}
      </p>
      <span className="pitch-link mt-6 inline-flex w-fit text-sm font-semibold text-accent">
        Play now →
      </span>
    </Link>
  );
}
