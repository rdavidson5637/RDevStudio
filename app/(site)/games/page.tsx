import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { games } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Games",
  description:
    "Free browser games built by Ryan Davidson of RDev Studio in Carrickfergus. Play in your browser, no ads and no sign-up.",
  path: "/games",
  ogImage: null,
});

export default function GamesPage() {
  return (
    <Section className="bg-bg text-studio-text">
      <h1 className="display-lg max-w-3xl text-balance text-studio-text">Games</h1>
      <p className="type-body mt-5 max-w-xl text-studio-muted">Free in the browser. No ads, no sign-up.</p>
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <ProductCard key={game.slug} product={game} />
        ))}
      </div>
    </Section>
  );
}
