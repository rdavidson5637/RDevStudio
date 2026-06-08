import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURED_SERVICE = SERVICES[0];
const SECONDARY_SERVICES = SERVICES.slice(1);

export function ServicesTrio() {
  return (
    <section id="services" className="section-padding bg-base">
      <div className="container-wide">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="What we do"
          title="Three disciplines, one studio"
        />

        <div className="flex flex-col gap-5">
          <article className="group interactive-surface relative flex flex-col p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:p-12">
            <div className="max-w-2xl">
              <span
                className="font-display text-[4rem] font-bold leading-none text-primary/10 sm:text-[5.5rem] lg:text-[7rem]"
                aria-hidden="true"
              >
                {FEATURED_SERVICE.number}
              </span>

              <h3 className="heading-display mt-4 text-2xl sm:mt-6 sm:text-3xl lg:text-4xl">
                {FEATURED_SERVICE.title}
              </h3>

              <p className="mt-3 font-display text-xl font-semibold text-accent sm:mt-4 sm:text-2xl">
                from £650
              </p>

              <p className="mt-3 text-base leading-relaxed text-secondary sm:mt-4 sm:text-lg">
                Custom websites built in 7 days — sharp, responsive, and ready
                to launch
              </p>
            </div>

            <Link href="/contact" className="btn-primary mt-8 shrink-0 lg:mt-0">
              Get started
            </Link>
          </article>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SECONDARY_SERVICES.map((service) => (
              <article
                key={service.number}
                className="group interactive-surface relative flex flex-col p-5 sm:p-6"
              >
                <span
                  className="font-display text-[2.5rem] font-bold leading-none text-primary/10 sm:text-[3rem]"
                  aria-hidden="true"
                >
                  {service.number}
                </span>

                <h3 className="heading-display mt-3 text-lg sm:mt-4">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
                  {service.description}
                </p>

                <Link
                  href="#contact"
                  className="link-editorial mt-5 inline-flex items-center gap-2 sm:mt-6"
                >
                  Get in touch
                  <span
                    className="inline-block transition-transform duration-normal ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
