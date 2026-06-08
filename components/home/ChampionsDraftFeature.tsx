import { ChampionsDraftSpotlight } from "@/components/bored/ChampionsDraftSpotlight";

export function ChampionsDraftFeature() {
  return (
    <section
      className="section-padding border-b border-border bg-base"
      aria-labelledby="champions-draft-feature"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <ChampionsDraftSpotlight variant="hero" />
      </div>
    </section>
  );
}
