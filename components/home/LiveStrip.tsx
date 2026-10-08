import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { liveProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

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
    <section id="live" className="bg-bg pb-14 text-studio-text md:pb-20">
      <Container>
        <SectionHeader tone="studio" label="Live now" heading="On the site, and open." />
        <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-5">
          {homeProjects.map((project, index) => (
            <div
              key={project.slug}
              className="w-[80%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <ProjectCard
                project={project}
                priority={prioritySlugs.has(project.slug)}
                delay={Math.min(index, 5) * 60}
              />
            </div>
          ))}
        </div>
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
