import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";
import { COMING_SOON_PROJECTS } from "@/lib/coming-soon-projects";

function ProjectCard({
  emoji,
  name,
  description,
  features,
  tagline,
  progress,
}: (typeof COMING_SOON_PROJECTS)[number]) {
  return (
    <article className="coming-soon-project-card flex h-full cursor-default flex-col rounded-2xl border border-border bg-raised p-7 transition-[transform,border-color,box-shadow] duration-[250ms] ease-out">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[2rem] leading-none" aria-hidden="true">
          {emoji}
        </span>
        <span className="shrink-0 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
          Coming Soon
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-primary">{name}</h3>

      <p className="mt-2 text-sm leading-relaxed text-secondary">
        {description}
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-secondary"
          >
            <span className="shrink-0 text-accent" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {tagline && (
        <p className="editorial-note mt-4 border-t border-border pt-3">
          {tagline}
        </p>
      )}

      <div
        className="mt-4 w-full"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} development progress`}
      >
        <div className="h-1 w-full overflow-hidden rounded-full bg-overlay">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}

export function ComingSoonProjects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-wide">
        <p className="section-label">What&apos;s Coming</p>
        <h2 className="section-heading mt-3 text-2xl sm:text-3xl lg:text-4xl">
          Projects in Development
        </h2>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
          {COMING_SOON_PROJECTS.map((project, index) => (
            <ComingSoonFadeIn
              key={project.id}
              y={24}
              duration={0.6}
              delay={index * 0.1}
              className="h-full"
            >
              <ProjectCard {...project} />
            </ComingSoonFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
