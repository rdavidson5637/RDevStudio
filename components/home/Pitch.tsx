import Link from "next/link";
import { ProductCover } from "@/components/covers";
import { Section } from "@/components/ui/Section";
import { liveProducts, soonProducts, type Product } from "@/lib/content/products";

function soonLine(products: Product[]) {
  if (products.length === 0) return null;
  if (products.length === 1) return `Still being built: ${products[0].name}.`;
  const names = products.map((product) => product.name);
  const last = names.pop();
  return `Still being built: ${names.join(", ")} and ${last}.`;
}

export function Pitch() {
  return (
    <Section id="games" heading="On the pitch">
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {liveProducts
          .filter((product) => product.slug !== "stout-finder")
          .map((product) => (
          <Link
            key={product.slug}
            href={product.href}
            className="group block bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <ProductCover slug={product.cover} initial={product.name} />
            <div className="p-5">
              <h3 className="font-studio-display text-2xl leading-tight text-studio-text">{product.name}</h3>
              <p className="type-body mt-2 text-studio-muted">{product.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
      <p className="type-body mt-8 max-w-prose text-studio-muted">{soonLine(soonProducts)}</p>
    </Section>
  );
}
