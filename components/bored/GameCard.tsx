import Link from "next/link";
import { getBoredGameHref, type BoredGame } from "@/lib/bored-games";

type GameCardProps = {
  game: BoredGame;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={getBoredGameHref(game)}
      className="group interactive-surface flex flex-col p-6 transition-colors sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="heading-display text-xl text-primary sm:text-2xl">{game.title}</h2>
        <span className="shrink-0 rounded-full border border-border-strong bg-base px-2.5 py-0.5 text-xs font-semibold text-primary">
          {game.tag}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary sm:text-base">
        {game.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors group-hover:text-primary">
        Play now
        <span
          className="inline-block transition-transform duration-normal ease-out group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </span>
    </Link>
  );
}
