import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectTag } from "./ProjectTag";

const GRID_LAYOUT = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

export function SelectedWork() {
  return (
    <section id="work" className="section-padding border-t border-border bg-raised">
      <div className="container-wide">
        <div className="section-heading-gap flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-8">
          <SectionHeader label="Portfolio" title="Selected work" />
          <Link href="/work" className="link-editorial shrink-0">
            Full portfolio →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {PROJECTS.map((project, index) => {
            const layout = GRID_LAYOUT[index] ?? "lg:col-span-6";
            const isFeatured = index === 0;

            return (
              <article
                key={project.id}
                className={`group card-hover flex flex-col overflow-hidden border border-border bg-overlay transition-all duration-normal ease-out hover:border-accent/30 ${layout}`}
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-base ${isFeatured ? "lg:aspect-auto lg:min-h-[300px] lg:flex-1" : ""}`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover object-top transition-transform duration-slow ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/20 to-transparent opacity-80 transition-opacity duration-normal group-hover:opacity-90" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                  <ProjectTag category={project.category} />

                  <h3 className="heading-display mt-3 text-lg sm:mt-4 sm:text-2xl lg:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary sm:mt-3 sm:text-base">
                    {project.description}
                  </p>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-primary transition-colors duration-normal ease-out hover:text-accent sm:mt-6"
                  >
                    {project.buttonLabel}
                    <span
                      className="inline-block transition-transform duration-normal ease-out group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
