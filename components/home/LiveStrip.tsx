import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { liveProducts, soonProducts } from "@/lib/content/products";

const HOME_FIRST = ["stout-finder", "draft-analyser"];

const homeProducts = [
  ...HOME_FIRST.map((slug) => liveProducts.find((product) => product.slug === slug)).filter(
    (product) => product !== undefined,
  ),
  ...liveProducts.filter((product) => !HOME_FIRST.includes(product.slug)),
  ...soonProducts,
];

export function LiveStrip() {
  return (
    <Section id="live" eyebrow="LIVE NOW" heading="On the site, and open.">
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {homeProducts.map((product, index) => (
          <Reveal
            key={product.slug}
            delay={index * 60}
            className={product.featured ? "lg:col-span-2" : undefined}
          >
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-8">
        <Link
          href="/games"
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:text-amber hover:decoration-amber"
        >
          All games
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:text-amber hover:decoration-amber"
        >
          All projects
        </Link>
      </div>
    </Section>
  );
}
