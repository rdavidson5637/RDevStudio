import Link from "next/link";
import { ABOUT_BLURB } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

const VALUE_PROPS = [
  {
    icon: "🎯",
    title: "One person, full ownership",
    description: "Design to deployment — no handoffs, no miscommunication.",
  },
  {
    icon: "⚡",
    title: "Fast turnaround",
    description: "Most sites go live within a week. Clear process, no delays.",
  },
  {
    icon: "🏠",
    title: "Local to Northern Ireland",
    description: "Based in Carrickfergus. Happy to meet for a coffee.",
  },
] as const;

export function AboutClose() {
  return (
    <section
      id="about"
      className="section-padding border-t border-border bg-raised"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader label="About" title="A bit about me" />

          <p className="lead-text mt-8 max-w-3xl text-lg sm:text-xl">
            {ABOUT_BLURB}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="rounded-xl border border-border bg-base p-5"
              >
                <span className="text-2xl" aria-hidden="true">
                  {prop.icon}
                </span>
                <h3 className="mt-3 font-semibold text-primary">{prop.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>

          <p className="editorial-note mt-8">
            Open to freelance work — say hello if you want to talk through a
            project.
          </p>

          <Link
            href="/about"
            className="link-editorial mt-6 inline-flex items-center gap-2"
          >
            More about me
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
