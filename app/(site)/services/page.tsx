import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { CHARITY_NOTE, PROCESS_STEPS, SERVICES } from "@/lib/constants";
import { SERVICE_DETAILS } from "@/lib/services";
import { FAQ } from "@/components/services/FAQ";
import { Terms } from "@/components/services/Terms";
import { Comparison } from "@/components/services/Comparison";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const metadata = createPageMetadata({
  title: "Services and prices",
  description:
    "Websites from £650, social media from £150 a month, content from £200. Straight prices, 50% to start and 50% at launch, and you own what I build. Based in Carrickfergus.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">The offer</p>
          <h1 className="programme-h1">SERVICES</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            Websites, social media, and content for Northern Ireland small
            businesses and charities. Prices on the page, one person from start
            to finish, and you own what I build.
          </p>

          <aside className="mt-8 max-w-3xl rounded-[10px] border border-border bg-raised p-5 sm:p-6">
            <p className="shell-label mb-2 text-accent">Charities</p>
            <p className="text-sm leading-relaxed text-primary">
              {CHARITY_NOTE}
            </p>
          </aside>
        </header>

        <section className="py-12" aria-labelledby="packages-heading">
          <h2 id="packages-heading" className="sr-only">
            Packages
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const detail = SERVICE_DETAILS.find(
                (item) => item.slug === service.slug,
              );
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="flex scroll-mt-24 flex-col rounded-[10px] border border-border-strong bg-raised p-6 sm:p-7"
                >
                  <p className="shell-label text-accent">{service.number}</p>
                  <h3 className="mt-2 font-display text-3xl uppercase tracking-tight text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-display text-2xl uppercase text-primary">
                    {service.price}
                    {service.priceNote ? (
                      <span className="shell-label ml-2 align-middle text-secondary">
                        {service.priceNote}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-primary">{service.description}</p>
                  {detail ? (
                    <ul className="mt-5 flex-1 space-y-2 border-t border-border pt-5">
                      {detail.features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-primary"
                        >
                          <span className="mt-0.5 text-accent" aria-hidden="true">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary"
                  >
                    What&apos;s in it, what isn&apos;t
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border py-12" aria-labelledby="terms-heading">
          <p className="shell-label mb-3 text-accent">Small print, in big print</p>
          <h2
            id="terms-heading"
            className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl"
          >
            Paying, owning, and after launch
          </h2>
          <Terms className="mt-8" />
        </section>

        <section className="border-t border-border py-12" aria-labelledby="compare-heading">
          <p className="shell-label mb-3 text-accent">Form guide</p>
          <h2
            id="compare-heading"
            className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl"
          >
            Why not Wix, or an agency?
          </h2>
          <p className="mt-4 max-w-2xl text-primary">
            Both are fine choices for some people. Here is where I sit.
          </p>
          <div className="mt-8">
            <Comparison />
          </div>
        </section>

        <section className="border-t border-border py-12">
          <p className="shell-label mb-3 text-accent">Game plan</p>
          <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
            How it works
          </h2>
          <p className="mt-4 max-w-2xl text-primary">
            No committees. Here is what working together looks like.
          </p>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.number}
                className="rounded-[10px] border border-border bg-base p-5"
              >
                <p className="shell-label text-accent">{step.number}</p>
                <h3 className="mt-3 font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border py-12">
          <FAQ />
        </section>

        <section className="border-t border-border py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="shell-label mb-3 text-accent">Full time</p>
            <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Tell me what you need
            </h2>
            <p className="mt-4 text-primary">
              Send a note or a WhatsApp. I will come back with a price and a
              date.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <WhatsAppLink />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
