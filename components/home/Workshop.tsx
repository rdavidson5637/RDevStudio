import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { soonProjects } from "@/lib/projects";

export function Workshop() {
  return (
    <section className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <SectionHeader tone="studio" label="Coming soon" heading="Still being built." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {soonProjects.map((project) => (
            <Link
              key={project.slug}
              href={project.href}
              className="studio-card rounded-studio border border-studio-border bg-studio-surface p-6 transition-colors hover:border-studio-border-strong"
            >
              <StatusBadge variant="soon">Soon</StatusBadge>
              <h3 className="type-h3 mt-4 text-studio-text">{project.name}</h3>
              <p className="type-body mt-2 text-studio-muted">{project.tagline}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
