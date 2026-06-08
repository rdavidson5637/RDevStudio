import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import { ProjectCard } from "@/components/work/ProjectCard";

export function SelectedWork() {
  return (
    <section id="work" className="section-padding border-t border-border bg-base">
      <div className="container-wide">
        <div className="section-heading-gap flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
              My work
            </h2>
            <p className="mt-2 max-w-lg text-base text-secondary">
              Real projects and demo sites — websites, apps, and brand work built
              for Northern Ireland businesses and beyond.
            </p>
          </div>
          <Link
            href="/work"
            className="shrink-0 text-sm font-medium text-accent transition-colors hover:text-primary"
          >
            View all projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
