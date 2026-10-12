import Link from "next/link";
import { ProductCover } from "@/components/covers";
import { StatusDot } from "@/components/motion/StatusDot";
import type { Product } from "@/lib/content/products";

export function ProductCard({ product }: { product: Product }) {
  const soon = product.status === "soon";
  const className =
    "card group flex h-full flex-col overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber";

  const body = (
    <>
      <div className={soon ? "opacity-50" : undefined}>
        <ProductCover slug={product.cover} initial={product.name} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-studio-display text-2xl leading-tight text-studio-text">{product.name}</h2>
          <span className="arrow-nudge mt-1 inline-flex text-studio-muted" aria-hidden="true">
            {product.external ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </div>
        <p className="type-body mt-2 max-w-prose text-studio-muted">{product.tagline}</p>
        {product.stack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.stack.slice(0, 3).map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-studio-line px-2.5 py-1 font-studio-mono text-xs text-studio-muted"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto pt-4">
          <StatusDot status={product.status} />
        </div>
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
