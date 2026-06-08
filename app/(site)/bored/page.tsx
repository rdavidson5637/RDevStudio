import { ChampionsDraftSpotlight } from "@/components/bored/ChampionsDraftSpotlight";
import { GameCard } from "@/components/bored/GameCard";
import { getOtherBoredGames } from "@/lib/bored-games";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "I'm Bored",
  description:
    "Play Champions Draft — spin squads, draft your XI, and compete in league, Champions League, and World Cup modes. Plus more quick games from RDev Studio.",
  path: "/bored",
});

export default function BoredPage() {
  const otherGames = getOtherBoredGames();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-base pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgb(16_185_129/0.08)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <div className="section-padding relative pb-12 sm:pb-16">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-4 font-medium">Play</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              I&apos;m Bored
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">
              Free games built by RDev Studio — no accounts, no downloads. Start
              with Champions Draft, my football squad builder.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border bg-base">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <ChampionsDraftSpotlight variant="hero" />
        </div>
      </section>

      {otherGames.length > 0 && (
        <section className="section-padding bg-base">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-sm font-medium uppercase tracking-widest text-secondary">
              More to play
            </p>
            <div className="grid grid-cols-1 gap-5 md:max-w-xl">
              {otherGames.map((game) => (
                <GameCard key={game.slug} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
