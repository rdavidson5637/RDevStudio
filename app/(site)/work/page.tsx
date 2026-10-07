import Link from "next/link";
import { StudioPage } from "@/components/ui/StudioPage";
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
    items: [
      {
        title: "ShelterLink",
        description: "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
        href: "/work/shelterlink",
      },
      {
        title: "RV's Cold Brew",
        description: "A Belfast cold brew and matcha counter. Menu, hours, and directions.",
        href: "/work/rvs-cold-brew",
      },
      {
        title: "Paintball Wales",
        description: "Phone-first site for a Snowdonia paintball park, built to replace a cluttered banner.",
        href: "/work/paintball-wales",
      },
    ],
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
    items: [
      {
        title: "Champions Draft",
        description: "Spin iconic squads, draft your ultimate XI, and compete.",
        href: "/champions-draft",
      },
      {
        title: "Rugby Draft",
        description: "Spin nation and club squads, draft your XV, and compete.",
        href: "/rugby-draft",
      },
      {
        title: "Longest Word",
        description: "Spell the longest word you can from today's 4x4 letter grid.",
        href: "/games/longest-word",
      },
      {
        title: "Pub Quiz",
        description: "Host a quiz night or join with a code.",
        href: "/pub-quiz",
      },
    ],
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
                    <span className="type-h3 text-studio-text group-hover:text-amber">
                      {item.title}
                      <span className="ml-2 text-studio-muted transition-transform group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
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
