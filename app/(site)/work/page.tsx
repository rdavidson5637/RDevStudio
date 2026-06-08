import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WorkCTA } from "@/components/work/WorkCTA";
import { PROJECTS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected projects by Ryan Davidson — websites, web apps, and demo builds from RDev Studio.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow">
        <PageHeader
          title="Work"
          subtitle="A university dissertation app, a free site for RVS Cold Brew, and demo sites for fictional companies — plus whatever I&apos;m building next."
        />
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              alternating
              reverse={index % 2 === 1}
            />
          ))}
        </div>
        <WorkCTA />
      </div>
    </div>
  );
}
