import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: readonly string[];
  buttonLabel: string;
  href: string;
  demo?: boolean;
  image?: string;
  imageAlt?: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card-hover flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-navy to-slate-800">
        {project.image && project.imageAlt ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
          />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-4xl font-bold text-white/20 sm:text-5xl"
                aria-hidden="true"
              >
                {project.title.charAt(0)}
              </span>
            </div>
            <span className="sr-only">
              Preview placeholder for {project.title} project
            </span>
          </>
        )}
        {project.demo && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
            Demo
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm font-medium text-accent">{project.type}</p>
        <h2 className="mt-2 text-xl font-bold text-navy">{project.title}</h2>
        <p className="mt-3 flex-1 text-slate-text">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy"
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
            className="btn-outline-accent mt-6 inline-flex w-fit"
          >
            {project.buttonLabel}
          </a>
        ) : (
          <Link
            href={project.href}
            className="btn-outline-accent mt-6 inline-flex w-fit"
          >
            {project.buttonLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
