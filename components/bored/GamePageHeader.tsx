import Link from "next/link";
import type { BoredGame } from "@/lib/bored-games";

type GamePageHeaderProps = {
  game: BoredGame;
};

export function GamePageHeader({ game }: GamePageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-base pt-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgb(245_158_11/0.06)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="section-padding relative pb-10 sm:pb-12">
        <div className="container-wide mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/games"
            className="text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            ← I&apos;m Bored
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {game.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            {game.description}
          </p>
        </div>
      </div>
    </section>
  );
}
