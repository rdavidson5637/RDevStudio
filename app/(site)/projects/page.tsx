import Link from "next/link";
import { Pitch } from "@/components/home/Pitch";
import { UnderTheHood } from "@/components/home/UnderTheHood";
import { Section } from "@/components/ui/Section";
import { soonProducts } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Games and side projects from RDev Studio: Champions Draft, Rugby Draft, Pub Quiz, Longest Word, Draft Analyser, Wardrobe AI, and interactive tools.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="bg-bg text-studio-text">
      <Section>
        <h1 className="display-lg max-w-3xl text-balance text-studio-text">Projects</h1>
        <p className="type-body mt-5 max-w-xl text-studio-muted">
          Not client work. Some of these are live. Two at the bottom are still being built.
        </p>
      </Section>
      <Pitch showSoon={false} />
      <section className="border-t border-studio-line">
        <div className="mx-auto max-w-studio px-6 md:px-8">
          <Link
            href="/interactive"
            className="group flex min-h-11 items-center justify-between gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            <span>
              <span className="block font-studio-display text-2xl text-studio-text">Interactive tools</span>
              <span className="type-body mt-1 block text-studio-muted">
                Browser tools for parties, pub nights, and group decisions. Free, no sign-up.
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-2xl text-studio-text transition-colors group-hover:text-studio-accent"
            >
              →
            </span>
          </Link>
        </div>
      </section>
      <UnderTheHood />
      <Section heading="Still being built">
        <ul className="mt-8 border-t border-studio-line">
          {soonProducts.map((product) => (
            <li key={product.slug} className="border-b border-studio-line py-5">
              <p className="font-studio-display text-2xl text-studio-text">{product.name}</p>
              <p className="type-body mt-2 max-w-prose text-studio-muted">{product.tagline}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
