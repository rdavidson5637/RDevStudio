import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesTrio() {
  return (
    <section id="services" className="section-padding bg-base">
      <div className="container-wide">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="What we do"
          title="Three disciplines, one studio"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.number}
              className="group interactive-surface relative flex flex-col p-6 sm:p-8 lg:p-10"
            >
              <span
                className="font-display text-[3.5rem] font-extrabold leading-none tracking-tighter text-primary/10 transition-colors duration-normal group-hover:text-accent/50 sm:text-[5rem] lg:text-[6rem]"
                aria-hidden="true"
              >
                {service.number}
              </span>

              <h3 className="heading-display mt-4 text-lg sm:mt-6 sm:text-2xl">
                {service.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary sm:mt-4 sm:text-base">
                {service.description}
              </p>

              <Link
                href="#contact"
                className="link-editorial mt-6 inline-flex items-center gap-2 sm:mt-8"
              >
                Get in touch
                <span
                  className="inline-block transition-transform duration-normal ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <div
                className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-normal ease-out group-hover:w-full"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
