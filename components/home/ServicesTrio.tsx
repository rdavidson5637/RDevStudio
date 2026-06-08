import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURED_SERVICE = SERVICES[0];
const SECONDARY_SERVICES = SERVICES.slice(1);

function ServicePrice({
  price,
  priceNote,
}: {
  price: string;
  priceNote: string;
}) {
  return (
    <p className="mt-3 sm:mt-4">
      <span className="text-2xl font-bold text-accent">{price}</span>
      {priceNote ? (
        <span className="ml-1 text-sm text-white/40">{priceNote}</span>
      ) : null}
    </p>
  );
}

function ServiceCta() {
  return (
    <Link
      href="/contact"
      className="link-editorial mt-5 inline-flex items-center gap-2 sm:mt-6"
    >
      Get in touch
      <span aria-hidden="true">→</span>
    </Link>
  );
}

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
          <article className="group relative flex flex-col rounded-md border border-accent/30 bg-accent/5 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:p-12">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-black">
                Most popular
              </span>

              <span
                className="mt-4 block font-display text-[4rem] font-bold leading-none text-primary/10 sm:text-[5.5rem] lg:text-[7rem]"
                aria-hidden="true"
              >
                {FEATURED_SERVICE.number}
              </span>

              <h3 className="heading-display mt-4 text-2xl sm:mt-6 sm:text-3xl lg:text-4xl">
                {FEATURED_SERVICE.title}
              </h3>

              <ServicePrice
                price={FEATURED_SERVICE.price}
                priceNote={FEATURED_SERVICE.priceNote}
              />

              <p className="mt-3 text-base leading-relaxed text-secondary sm:mt-4 sm:text-lg">
                {FEATURED_SERVICE.description}
              </p>
            </div>

            <ServiceCta />
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

                <ServicePrice
                  price={service.price}
                  priceNote={service.priceNote}
                />

                <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
                  {service.description}
                </p>

                <ServiceCta />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
