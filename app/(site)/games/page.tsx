import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { games } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Games",
  description: "Free browser games built by Ryan Davidson. No ads, no sign-up.",
  path: "/games",
  ogImage: "/games/opengraph-image",
});

export default function GamesPage() {
  return (
    <Section className="bg-bg text-studio-text">
      <p className="eyebrow text-studio-muted">Games</p>
      <h1 className="display-lg mt-4 max-w-3xl text-balance text-studio-text">Play something.</h1>
      <p className="type-body mt-5 max-w-xl text-studio-muted">Free in the browser. No ads, no sign-up.</p>
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <Reveal key={game.slug} delay={index * 60} className={game.featured ? "lg:col-span-2" : undefined}>
            <ProductCard product={game} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
