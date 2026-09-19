import { createPageMetadata } from "@/lib/metadata";
import { STUDIO_PROJECTS } from "@/lib/constants";
import { ExperimentSpotlight } from "@/components/ui/ExperimentSpotlight";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Personal builds from RDev Studio. Wardrobe AI, Draft Analyser, Gig Radar, Stout Finder, and Guitar Lab.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">PERSONAL BUILDS</p>
          <h1 className="programme-h1">PROJECTS</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Things I build for myself. Not client work, not games. Some are
            live. The rest are coming soon.
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2"
          aria-label="Personal projects"
        >
          {STUDIO_PROJECTS.map((project) => (
            <ExperimentSpotlight
              key={project.href}
              experiment={project}
              animated={false}
              kicker="Project"
            />
          ))}
        </section>
      </div>
    </div>
  );
}
