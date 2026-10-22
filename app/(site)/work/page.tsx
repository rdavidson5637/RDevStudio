import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { FeaturedRow } from "@/components/work/FeaturedRow";
import { clientBySlug, conceptBySlug, productBySlug } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description: "Client work, concepts, experiments, and free browser games by Ryan Davidson.",
  path: "/work",
  ogImage: "/work/opengraph-image",
});

const OTHER = [
  {
    title: "Concept builds",
    description: "Three local-business sites: trades, restaurant, salon.",
    href: "/work/concept-builds",
  },
  {
    title: "UC Caseworker Assistant",
    description: "AI assistant for Universal Credit caseworkers, built around safeguarding.",
    href: "/work/uc-caseworker-tool",
  },
] as const;

const GAME_SLUGS = ["champions-draft", "rugby-draft", "longest-word", "pub-quiz"] as const;

export default function WorkPage() {
  const clients = ["rvs-cold-brew", "shelterlink", "assisi"]
    .map((slug) => clientBySlug(slug))
    .filter((job) => job !== undefined);
  const crosskennan = conceptBySlug("crosskennan");
  const stoutFinder = productBySlug("stout-finder");
  const games = GAME_SLUGS.map((slug) => productBySlug(slug)).filter((product) => product !== undefined);

  return (
    <Section className="bg-bg text-studio-text">
      <h1 className="display-lg text-studio-text">Work</h1>
      <p className="type-body mt-5 max-w-xl text-studio-muted">
        Client jobs first. Concepts, experiments and games further down.
      </p>

      <h2 className="type-h2 mt-14 text-studio-text">Client work</h2>
      <p className="type-body mt-2 text-studio-muted">Jobs for real organisations.</p>
      <div className="mt-8">
        {clients.map((job, index) => (
          <FeaturedRow
            key={job.slug}
            job={job}
            flip={index % 2 === 1}
            siteLinkLabel="Open the site"
            waitingLabel={job.slug === "assisi" ? "Preview after sign-off" : undefined}
          />
        ))}
      </div>

      {crosskennan ? (
        <>
          <h2 className="type-h2 mt-16 text-studio-text">Concepts</h2>
          <p className="type-body mt-2 max-w-prose text-studio-muted">
            Built on spec to show what I would do. These are not client jobs and none of them is the
            organisation&apos;s own site.
          </p>
          <div className="mt-8">
            <FeaturedRow job={crosskennan} siteLinkLabel="Open the demo" />
          </div>
        </>
      ) : null}

      {stoutFinder ? (
        <>
          <h2 className="type-h2 mt-16 text-studio-text">My own product</h2>
          <p className="type-body mt-2 text-studio-muted">Built and run by me.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ProductCard product={stoutFinder} />
          </div>
          <Link
            href="/work/stout-finder"
            className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-studio-accent"
          >
            Read how Stout Finder stays honest
          </Link>
        </>
      ) : null}

      <h2 className="type-h2 mt-16 text-studio-text">Other work</h2>
      <p className="type-body mt-2 text-studio-muted">Concept builds and a personal experiment. Not client jobs.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {OTHER.map((item) => (
          <Link key={item.href} href={item.href} className="card block p-5">
            <span className="font-studio-display text-2xl text-studio-text">{item.title}</span>
            <span className="type-body mt-2 block text-studio-muted">{item.description}</span>
          </Link>
        ))}
      </div>

      <h2 className="type-h2 mt-16 text-studio-text">Games</h2>
      <p className="type-body mt-2 text-studio-muted">Free in the browser.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <ProductCard key={game.slug} product={game} />
        ))}
      </div>
    </Section>
  );
}
