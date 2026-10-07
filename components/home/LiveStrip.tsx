import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { liveProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function LiveStrip() {
  return (
    <section id="live" className="bg-bg pb-20 text-studio-text md:pb-28">
      <Container>
        <SectionHeader tone="studio" label="Live now" heading="On the site, and open." />
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
          {liveProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 60}
              className="min-w-[78%] snap-start md:min-w-0"
            >
              <ProjectCard project={project} priority={index < 2} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link
            href="/games"
            className="inline-flex min-h-11 items-center text-sm text-studio-muted underline-offset-4 transition-colors hover:text-amber hover:underline"
          >
            All games
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center text-sm text-studio-muted underline-offset-4 transition-colors hover:text-amber hover:underline"
          >
            All projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
