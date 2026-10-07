import { ProjectRow } from "@/components/home/ProjectCard";
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
      <ul className="border-t border-studio-border">
        {apps.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>
    </StudioPage>
  );
}
