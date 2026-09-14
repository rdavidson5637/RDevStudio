import Link from "next/link";
import { HOME_PROJECT_IDS, PROJECTS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/work/ProjectCard";

const featuredProjects = HOME_PROJECT_IDS.flatMap((id) => {
  const project = PROJECTS.find((item) => item.id === id);
  return project ? [project] : [];
});

export function SelectedWork() {
  return (
    <section
      id="work"
      className="section-padding border-t border-border bg-base"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="section-heading-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            className="max-w-2xl"
            label="Fixtures"
            title="Selected work"
          />
          <Link
            href="/work"
            className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            See the work →
          </Link>
        </div>

        <p className="lead-text -mt-6 mb-10 max-w-2xl sm:-mt-4">
          Real clients only. Assisi, RV&apos;s Cold Brew, and Paintball Wales.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
