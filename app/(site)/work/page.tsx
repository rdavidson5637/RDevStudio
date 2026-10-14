import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { BrowserFrame } from "@/components/work/BrowserFrame";
import { clientBySlug, productBySlug, type ClientWork } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description: "Client work, experiments, and free browser games by Ryan Davidson.",
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

function domainOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

function ClientCard({ job }: { job: ClientWork }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <BrowserFrame
        src={job.slug === "assisi" ? undefined : job.image}
        alt={job.image && job.slug !== "assisi" ? `${job.name} website` : ""}
        domain={domainOf(job.siteUrl)}
        sizes="(max-width: 768px) 100vw, 33vw"
        mutedLabel="Preview after sign-off"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-bold text-studio-muted">{job.statusLabel}</p>
        <h3 className="mt-2 font-studio-display text-2xl text-studio-text">{job.name}</h3>
        <p className="type-body mt-2 text-studio-muted">{job.summary}</p>
        {job.href && job.href !== "/work" ? (
          <Link href={job.href} className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-studio-accent">
            Read the case study
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default function WorkPage() {
  const clients = ["shelterlink", "rvs-cold-brew", "paintball-wales", "assisi"]
    .map((slug) => clientBySlug(slug))
    .filter((job) => job !== undefined);
  const games = GAME_SLUGS.map((slug) => productBySlug(slug)).filter((product) => product !== undefined);

  return (
    <Section className="bg-bg text-studio-text">
      <h1 className="display-lg text-studio-text">Work</h1>
      <p className="type-body mt-5 max-w-xl text-studio-muted">Client jobs first. Experiments and games further down.</p>

      <h2 className="type-h2 mt-14 text-studio-text">Client work</h2>
      <p className="type-body mt-2 text-studio-muted">Jobs for real organisations.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {clients.map((job, index) => (
          <Reveal key={job.slug} delay={index * 60}>
            <ClientCard job={job} />
          </Reveal>
        ))}
      </div>

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
          <div key={game.slug} className={game.featured ? "lg:col-span-2" : undefined}>
            <ProductCard product={game} />
          </div>
        ))}
      </div>
    </Section>
  );
}
