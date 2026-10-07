import Image from "next/image";
import Link from "next/link";
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
