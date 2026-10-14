import Link from "next/link";
import { ProductCover } from "@/components/covers";
import { StatusDot } from "@/components/motion/StatusDot";
import type { Product } from "@/lib/content/products";

// compact: on phones, show just the cover, name and status so a list of cards
// can sit two to a row. From sm up it is the normal card.
export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const soon = product.status === "soon";
  const className =
    "card group flex h-full flex-col overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber";

  const body = (
    <>
      <div className={soon ? "opacity-50" : undefined}>
        <ProductCover slug={product.cover} initial={product.name} />
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-3 sm:p-5" : "p-5"}`}>
        <div className={`flex items-start justify-between ${compact ? "gap-2 sm:gap-3" : "gap-3"}`}>
          <h2 className={`font-studio-display leading-tight text-studio-text ${compact ? "text-lg sm:text-2xl" : "text-2xl"}`}>{product.name}</h2>
          <span className={`arrow-nudge mt-1 text-studio-muted ${compact ? "hidden sm:inline-flex" : "inline-flex"}`} aria-hidden="true">
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
        <p className={`type-body mt-2 max-w-prose text-studio-muted ${compact ? "hidden sm:block" : ""}`}>{product.tagline}</p>
        {product.stack.length > 0 ? (
          <ul className={`mt-4 flex-wrap gap-2 ${compact ? "hidden sm:flex" : "flex"}`}>
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
        <div className={`mt-auto ${compact ? "pt-2 sm:pt-4" : "pt-4"}`}>
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
