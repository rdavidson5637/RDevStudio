import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { soonProjects } from "@/lib/projects";
import { ProjectRow } from "./ProjectCard";

export function Workshop() {
  return (
    <section className="bg-bg py-14 text-studio-text md:py-20">
      <Container>
        <SectionHeader tone="studio" label="Coming soon" heading="Still being built." />
        <ul className="mt-10 border-t border-studio-border">
          {soonProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
