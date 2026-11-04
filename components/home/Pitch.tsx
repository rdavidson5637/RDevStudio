import Image from "next/image";
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

const pitchProducts = liveProducts.filter((product) => product.slug !== "stout-finder");

export function Pitch({ showSoon = true }: { showSoon?: boolean }) {
  return (
    <Section id="games" heading="On the pitch">
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pitchProducts.map((product, index) => (
          <Link
            key={product.slug}
            href={product.href}
            className={`${index === 0 || index === pitchProducts.length - 1 ? "md:col-span-2 " : ""}group block bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text`}
            {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {product.image ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-studio-surface-2">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <ProductCover slug={product.cover} initial={product.name} />
            )}
            <div className="p-5">
              <h3 className="font-studio-display text-2xl leading-tight text-studio-text">{product.name}</h3>
              <p className="type-body mt-2 text-studio-muted">{product.tagline}</p>
              <span className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 group-hover:text-studio-accent">
                {product.kind === "game" ? "Play" : "Open"}
                <span aria-hidden="true">&nbsp;&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {showSoon ? (
        <p className="type-body mt-8 max-w-prose text-studio-muted">{soonLine(soonProducts)}</p>
      ) : null}
    </Section>
  );
}
