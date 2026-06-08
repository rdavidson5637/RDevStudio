import { GameCard } from "@/components/bored/GameCard";
import { BORED_GAMES } from "@/lib/bored-games";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "I'm Bored",
  description:
    "Quick daily games built by RDev Studio. No accounts, no scores — just something to do when you've got five minutes.",
  path: "/bored",
});

export default function BoredPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-base pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgb(245_158_11/0.06)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <div className="section-padding relative pb-12 sm:pb-16">
          <div className="container-wide mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-4 font-medium">Play</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              I&apos;m Bored
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">
              A growing collection of quick daily games. No accounts, no
              scores, just something to do.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-base">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {BORED_GAMES.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
