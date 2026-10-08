import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Project } from "@/lib/projects";

type ProjectRowProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectRow({ project, priority = false }: ProjectRowProps) {
  const status = project.status === "live" ? "Live" : "Soon";

  return (
    <li className="border-b border-studio-border">
      <Link
        href={project.href}
        className="group flex min-h-16 items-center gap-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        {project.image ? (
          <span className="relative hidden h-16 w-24 shrink-0 overflow-hidden sm:block">
            <Image
              src={project.image}
              alt=""
              fill
              priority={priority}
              sizes="6rem"
              className="object-cover"
            />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-4">
            <span className="font-studio-display text-2xl leading-tight text-studio-text transition-colors duration-200 group-hover:text-amber">
              {project.name}
            </span>
            <span className="type-label shrink-0 text-studio-muted">{status}</span>
          </span>
          <span className="type-body mt-1 block text-studio-muted">{project.tagline}</span>
        </span>
      </Link>
    </li>
  );
}

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  delay?: number;
  className?: string;
};

export function ProjectCard({ project, priority = false, delay = 0, className = "" }: ProjectCardProps) {
  const live = project.status === "live";

  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <Link
        href={project.href}
        className="studio-card group flex h-full flex-col overflow-hidden rounded-studio border border-studio-border bg-studio-surface transition duration-200 hover:-translate-y-0.5 hover:border-amber/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <span className="relative block aspect-[16/10] overflow-hidden bg-studio-surface-2">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="relative flex h-full w-full items-center justify-center">
              <span
                aria-hidden="true"
                className="glow-amber absolute inset-0 opacity-30"
              />
              <span
                aria-hidden="true"
                className="relative font-studio-display text-7xl text-studio-text/90"
              >
                {project.name.charAt(0)}
              </span>
            </span>
          )}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-studio-surface to-transparent"
          />
        </span>
        <span className="flex flex-1 flex-col gap-2 p-5">
          <span className="flex items-start justify-between gap-3">
            <span className="font-studio-display text-2xl leading-tight text-studio-text transition-colors duration-200 group-hover:text-amber">
              {project.name}
            </span>
            <StatusBadge variant={live ? "live" : "soon"} className="shrink-0">
              {live ? "Live" : "Soon"}
            </StatusBadge>
          </span>
          <span className="type-body text-studio-muted">{project.tagline}</span>
          <span
            aria-hidden="true"
            className="mt-auto pt-2 text-studio-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-amber"
          >
            &rarr;
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
