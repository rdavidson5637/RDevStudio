import Link from "next/link";
import { ProductCover } from "@/components/covers";
import type { Product } from "@/lib/content/products";

export function ProductCard({ product }: { product: Product }) {
  const soon = product.status === "soon";
  const className =
    "group flex h-full flex-col overflow-hidden rounded bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text";

  const body = (
    <>
      <div className={soon ? "opacity-50" : undefined}>
        <ProductCover slug={product.cover} initial={product.name} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-studio-display text-2xl leading-tight text-studio-text">{product.name}</h2>
        <p className="type-body mt-2 max-w-prose text-studio-muted">{product.tagline}</p>
      </div>
    </>
  );

  if (soon && !product.href) {
    return <article className={className}>{body}</article>;
  }

  return (
    <Link
      href={product.href}
      className={className}
      {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </Link>
  );
}
