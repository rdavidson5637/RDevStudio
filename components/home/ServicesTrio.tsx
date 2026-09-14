import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesTrio() {
  return (
    <section
      id="services"
      className="section-padding border-t border-border bg-base"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="section-heading-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            className="max-w-2xl"
            label="The offer"
            title="Three packages"
          />
          <Link
            href="/services"
            className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            See services →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
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

              <p className="mt-3 sm:mt-4">
                <span className="text-2xl font-bold text-primary">
                  {service.price}
                </span>
                {service.priceNote ? (
                  <span className="ml-1 text-sm text-secondary">
                    {service.priceNote}
                  </span>
                ) : null}
              </p>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-primary">
                {service.description}
              </p>

              <Link
                href={`/services#${service.slug}`}
                className="link-editorial mt-5 inline-flex items-center gap-2 sm:mt-6"
              >
                See the package
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
