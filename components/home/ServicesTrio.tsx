import Link from "next/link";
import { CHARITY_NOTE, SERVICES } from "@/lib/constants";
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
                href={service.href}
                className="link-editorial mt-5 inline-flex items-center gap-2 sm:mt-6"
              >
                See the package
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 rounded-[10px] border border-border bg-raised p-5 text-sm leading-relaxed text-primary sm:p-6 md:grid-cols-3">
          <p>
            <span className="shell-label mb-1 block text-accent">Terms</span>
            Half to book the build in, half when it goes live. You own the
            domain, the content, and the code.
          </p>
          <p>
            <span className="shell-label mb-1 block text-accent">After launch</span>
            Optional{" "}
            <Link href="/services#care-plan" className="link-editorial">
              care plan
            </Link>{" "}
            for £30 a month: hosting, updates, and small changes.
          </p>
          <p>
            <span className="shell-label mb-1 block text-accent">Charities</span>
            {CHARITY_NOTE}
          </p>
        </div>
      </div>
    </section>
  );
}
