import Link from "next/link";
import type { ProjectCategory } from "@/lib/constants";
import { ProjectTag } from "@/components/home/ProjectTag";
import { ProjectPreview } from "./ProjectPreview";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  type: string;
  summary: string;
  description: string;
  highlights: readonly string[];
  tags: readonly string[];
  buttonLabel: string;
  href: string;
  image?: string;
  imageAlt?: string;
  previewVideo?: string;
};

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const LinkIcon = (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  const cta =
    project.href.startsWith("http") ? (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-primary"
      >
        {project.buttonLabel}
        {LinkIcon}
      </a>
    ) : (
      <Link
        href={project.href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-primary"
      >
        {project.buttonLabel}
        {LinkIcon}
      </Link>
    );

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border-strong bg-raised transition-colors hover:border-accent/40">
      <ProjectPreview
        title={project.title}
        image={project.image}
        imageAlt={project.imageAlt}
        previewVideo={project.previewVideo}
        simple
      />

      <div className={`flex flex-1 flex-col ${compact ? "p-5 sm:p-6" : "p-6 sm:p-7"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <ProjectTag category={project.category} />
          <span className="text-sm text-secondary">{project.type}</span>
        </div>

        <h2 className="mt-3 font-display text-xl font-bold text-primary sm:text-2xl">
          {project.title}
        </h2>

        <p className="mt-1 text-sm text-secondary">{project.summary}</p>

        <p className="mt-3 flex-1 text-base leading-relaxed text-primary/90">
          {project.description}
        </p>

        {!compact && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key features">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="border border-border px-2.5 py-1 text-xs text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {cta}
      </div>
    </article>
  );
}
