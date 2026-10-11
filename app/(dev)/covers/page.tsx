import { notFound } from "next/navigation";
import { ProductCover } from "@/components/covers";
import { products } from "@/lib/content/products";

export default function CoversPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="min-h-screen bg-studio-bg px-6 py-16 text-studio-text">
      <h1 className="font-studio-display text-4xl">Covers</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <figure key={product.slug} className="group">
            <ProductCover slug={product.cover} initial={product.name} />
            <figcaption className="mt-2 text-sm text-studio-muted">{product.name}</figcaption>
          </figure>
        ))}
        <figure className="group">
          <ProductCover slug="missing" initial="Z" />
          <figcaption className="mt-2 text-sm text-studio-muted">Fallback</figcaption>
        </figure>
      </div>
    </main>
  );
}
