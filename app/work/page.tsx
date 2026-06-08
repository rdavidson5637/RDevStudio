import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WorkCTA } from "@/components/work/WorkCTA";
import { PROJECTS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Recent web design projects by RDev Studio — volunteer management apps, trades websites, restaurant sites, and salon websites across Northern Ireland.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow">
        <PageHeader
          title="My work"
          subtitle="Websites, apps, and demo projects built for local businesses across Northern Ireland."
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <WorkCTA />
      </div>
    </div>
  );
}
