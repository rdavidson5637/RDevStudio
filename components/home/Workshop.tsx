import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { soonProducts } from "@/lib/content/products";
import { ProjectRow } from "./ProjectCard";

export function Workshop() {
  return (
    <section className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <SectionHeader tone="studio" label="Coming soon" heading="Still being built." />
        <ul className="mt-10 border-t border-studio-border">
          {soonProducts.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
