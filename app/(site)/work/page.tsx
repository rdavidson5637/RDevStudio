import Link from "next/link";
import { StudioPage } from "@/components/ui/StudioPage";
import { clientBySlug, productBySlug } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description: "Client work, experiments, and free browser games by Ryan Davidson.",
  path: "/work",
});

const SECTIONS = [
  {
    title: "Client work",
    intro: "Jobs for real organisations.",
    items: ["shelterlink", "rvs-cold-brew", "paintball-wales"].map((slug) => {
      const job = clientBySlug(slug);
      return {
        title: job?.name ?? slug,
        description: job?.summary ?? "",
        href: job?.href ?? "/work",
      };
    }),
  },
  {
    title: "Other work",
    intro: "Concept builds and a personal experiment. Not client jobs.",
    items: [
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
    ],
  },
  {
    title: "Games",
    intro: "Free in the browser.",
    items: ["champions-draft", "rugby-draft", "longest-word", "pub-quiz"].map((slug) => {
      const product = productBySlug(slug);
      return {
        title: product?.name ?? slug,
        description: product?.tagline ?? "",
        href: product?.href ?? "/",
      };
    }),
  },
] as const;

export default function WorkPage() {
  return (
    <StudioPage
      label="Work"
      title="Work"
      intro="Client jobs first. Experiments and games further down."
    >
      <div className="space-y-14">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="type-h2 text-studio-text">{section.title}</h2>
            <p className="type-body mt-2 text-studio-muted">{section.intro}</p>
            <ul className="mt-6 border-t border-studio-border">
              {section.items.map((item) => (
                <li key={item.href} className="border-b border-studio-border">
                  <Link
                    href={item.href}
                    className="group flex min-h-16 flex-col justify-center gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="type-h3 text-studio-text transition-colors duration-200 group-hover:text-amber">
                      {item.title}
                    </span>
                    <span className="type-body text-studio-muted sm:max-w-md sm:text-right">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </StudioPage>
  );
}
