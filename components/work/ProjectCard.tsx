import Link from "next/link";
import type { ProjectCategory } from "@/lib/constants";
import { ProjectTag } from "@/components/home/ProjectTag";
import { ProjectPreview } from "./ProjectPreview";

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  type: string;
  description: string;
  tags: readonly string[];
  buttonLabel: string;
  href: string;
  image?: string;
  imageAlt?: string;
  previewVideo?: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group card-hover flex flex-col overflow-hidden border border-border bg-raised">
      <ProjectPreview
        title={project.title}
        image={project.image}
        imageAlt={project.imageAlt}
        previewVideo={project.previewVideo}
        category={project.category}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <ProjectTag category={project.category} />
        <p className="mt-3 text-[10px] font-display font-semibold uppercase tracking-widest text-tertiary">
          {project.type}
        </p>
        <h2 className="heading-display mt-2 text-xl sm:text-2xl">
          {project.title}
        </h2>
        <p className="mt-3 flex-1 leading-relaxed text-secondary">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-border px-3 py-1 text-xs font-medium text-tertiary"
            >
              {tag}
            </li>
          ))}
        </ul>
        {project.href.startsWith("http") ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-accent mt-6 inline-flex w-fit gap-2"
          >
            {project.buttonLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <Link href={project.href} className="btn-outline-accent mt-6 inline-flex w-fit">
            {project.buttonLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
