import { ProjectCard } from "@/components/home/ProjectCard";
import { StudioPage } from "@/components/ui/StudioPage";
import { createPageMetadata } from "@/lib/metadata";
import { apps } from "@/lib/projects";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Personal builds from RDev Studio. Wardrobe AI, Draft Analyser, Gig Radar, Stout Finder, and Guitar Lab.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <StudioPage
      label="Projects"
      title="Things I build for myself."
      intro="Not client work, and not the games. Some are live. The rest are still being built."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {apps.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </StudioPage>
  );
}
