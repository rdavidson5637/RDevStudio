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
    <article className="coming-soon-project-card flex h-full cursor-default flex-col rounded-2xl border border-[#1F1F2E] bg-[#111118] p-7 transition-[transform,border-color,box-shadow] duration-[250ms] ease-out">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[2rem] leading-none" aria-hidden="true">
          {emoji}
        </span>
        <span className="shrink-0 rounded-full border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.1)] px-2.5 py-0.5 text-[11px] font-medium text-[#F59E0B]">
          Coming Soon
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-[#F9FAFB]">{name}</h3>

      <p className="mt-2 text-[0.9rem] leading-relaxed text-[#9CA3AF]">
        {description}
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-[#D1D5DB]"
          >
            <span className="shrink-0 text-[#F59E0B]" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {tagline && (
        <p className="mt-4 border-t border-[#1F1F2E] pt-3 text-[0.85rem] italic text-[#9CA3AF]">
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
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#1F1F2E]">
          <div
            className="h-full rounded-full bg-[#F59E0B] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}

export function ComingSoonProjects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#F59E0B]">
          What&apos;s Coming
        </p>
        <h2
          className="mt-3 font-bold text-[#F9FAFB]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
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
