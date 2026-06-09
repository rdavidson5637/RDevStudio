import { ChampionsDraftSpotlight } from "@/components/bored/ChampionsDraftSpotlight";
import { RugbyDraftSpotlight } from "@/components/bored/RugbyDraftSpotlight";

type FeaturedGamesProps = {
  variant?: "hero" | "section";
};

export function FeaturedGames({ variant = "hero" }: FeaturedGamesProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <ChampionsDraftSpotlight variant={variant} />
      <RugbyDraftSpotlight variant={variant} />
    </div>
  );
}

export function FeaturedGamesSection({
  variant = "hero",
  labelledBy = "featured-games",
}: {
  variant?: "hero" | "section";
  labelledBy?: string;
}) {
  return (
    <section
      className="section-padding border-b border-border bg-base"
      aria-labelledby={labelledBy}
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <FeaturedGames variant={variant} />
      </div>
    </section>
  );
}
