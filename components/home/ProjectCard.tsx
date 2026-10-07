import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const badge =
    project.status === "live" ? (
      <StatusBadge variant="live">Live</StatusBadge>
    ) : (
      <StatusBadge variant="soon">Soon</StatusBadge>
    );

  return (
    <Link
      href={project.href}
      className="studio-card group flex h-full flex-col overflow-hidden rounded-studio border border-studio-border bg-studio-surface transition-transform duration-200 hover:-translate-y-0.5 hover:border-studio-border-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-studio-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center">
            <span className="glow-amber absolute inset-8 opacity-80" aria-hidden="true" />
            <span className="display-lg relative text-studio-text">{project.name.slice(0, 1)}</span>
          </div>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-3 left-3">{badge}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="type-h3 text-studio-text">{project.name}</h3>
          <span
            className="mt-1 text-studio-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-amber"
            aria-hidden="true"
          >
            →
          </span>
        </div>
        <p className="type-body mt-2 text-studio-muted">{project.tagline}</p>
      </div>
    </Link>
  );
}
