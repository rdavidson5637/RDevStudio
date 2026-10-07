import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { liveProjects } from "@/lib/projects";
import { ProjectRow } from "./ProjectCard";

const HOME_FIRST = ["stout-finder", "draft-analyser"];

const homeProjects = [
  ...HOME_FIRST.map((slug) => liveProjects.find((project) => project.slug === slug)).filter(
    (project) => project !== undefined,
  ),
  ...liveProjects.filter((project) => !HOME_FIRST.includes(project.slug)),
];

const prioritySlugs = new Set(
  homeProjects.filter((project) => project.image).slice(0, 2).map((project) => project.slug),
);

export function LiveStrip() {
  return (
    <section id="live" className="bg-bg pb-20 text-studio-text md:pb-28">
      <Container>
        <SectionHeader tone="studio" label="Live now" heading="On the site, and open." />
        <ul className="mt-10 border-t border-studio-border">
          {homeProjects.map((project) => (
            <ProjectRow
              key={project.slug}
              project={project}
              priority={prioritySlugs.has(project.slug)}
            />
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-8">
          <Link
            href="/games"
            className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:text-amber hover:decoration-amber"
          >
            All games
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:text-amber hover:decoration-amber"
          >
            All projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
