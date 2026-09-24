import Link from "next/link";
import { notFound } from "next/navigation";
import { CHARITY_NOTE, HOME_PROJECT_IDS, PROJECTS, SERVICES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { getService } from "@/lib/services";
import { serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Terms } from "@/components/services/Terms";
import { Comparison } from "@/components/services/Comparison";
import { FAQ } from "@/components/services/FAQ";
import { ProjectCard } from "@/components/work/ProjectCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createPageMetadata({
    title: service.pageTitle,
    description: service.metaDescription,
    path: service.href,
    ogEyebrow: `${service.title} - ${service.price}`,
  });
}

const featuredWork = HOME_PROJECT_IDS.flatMap((id) => {
  const project = PROJECTS.find((item) => item.id === id);
  return project ? [project] : [];
});

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isWebsites = service.slug === "websites";
  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <div className="section-padding pt-28">
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.metaDescription,
          url: service.href,
          price: service.schemaPrice,
          priceSuffix: service.schemaPriceUnit,
        })}
      />
      <div className="container-wide px-6">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: service.href },
          ]}
        />

        <header className="grid gap-10 border-b border-border pb-10 lg:grid-cols-[1.4fr,1fr] lg:items-end">
          <div>
            <p className="shell-label mb-3 text-accent">
              {service.number} - {service.title}
            </p>
            <h1 className="programme-h1 text-balance text-[clamp(2.5rem,6vw,4.75rem)]">
              {service.pageTitle}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-primary sm:text-lg">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[10px] border border-border-strong bg-raised p-6">
            <p className="shell-label text-secondary">Price</p>
            <p className="mt-1 font-display text-4xl uppercase text-primary">
              {service.price}
            </p>
            {service.priceNote ? (
              <p className="shell-label mt-1 text-secondary">{service.priceNote}</p>
            ) : null}
            <p className="mt-4 text-sm leading-relaxed text-primary">
              {service.timeline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {service.cta}
              </Link>
              <WhatsAppLink variant="compact" label="WhatsApp" />
            </div>
          </div>
        </header>

        <section className="grid gap-6 border-b border-border py-12 lg:grid-cols-2">
          <div className="rounded-[10px] border border-border bg-raised p-6 sm:p-8">
            <h2 className="shell-label mb-4 text-accent">What&apos;s included</h2>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-primary">
                  <span className="mt-1 text-accent" aria-hidden="true">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[10px] border border-border bg-raised p-6 sm:p-8">
            <h2 className="shell-label mb-4 text-accent">What is not</h2>
            <ul className="space-y-2">
              {service.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary">
                  <span className="mt-1 text-secondary" aria-hidden="true">
                    -
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-2">
          <div>
            <h2 className="shell-label mb-4 text-accent">The process</h2>
            <ol className="space-y-3">
              {service.process.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-primary">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="shell-label mb-3 text-accent">Revisions</h2>
              <p className="leading-relaxed text-primary">{service.revisions}</p>
            </div>
            <div>
              <h2 className="shell-label mb-3 text-accent">Ideal for</h2>
              <p className="leading-relaxed text-primary">{service.ideal}</p>
            </div>
            <div>
              <h2 className="shell-label mb-3 text-accent">Charities</h2>
              <p className="leading-relaxed text-primary">{CHARITY_NOTE}</p>
            </div>
          </div>
        </section>

        {isWebsites ? (
          <>
            <section className="border-b border-border py-12">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="shell-label mb-3 text-accent">Fixtures</p>
                  <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
                    Sites I have built
                  </h2>
                </div>
                <Link href="/work" className="text-sm font-semibold text-primary hover:text-accent">
                  All work →
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {featuredWork.map((project) => (
                  <ProjectCard key={project.id} project={project} compact />
                ))}
              </div>
            </section>

            <section className="border-b border-border py-12">
              <h2 className="mb-8 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
                Paying, owning, and after launch
              </h2>
              <Terms />
            </section>

            <section className="border-b border-border py-12">
              <h2 className="mb-8 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
                Why not Wix, or an agency?
              </h2>
              <Comparison />
            </section>

            <section className="border-b border-border py-12">
              <FAQ />
            </section>
          </>
        ) : null}

        <section className="py-12">
          <div className="flex flex-col gap-6 rounded-[10px] border border-border bg-raised p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="shell-label mb-2 text-accent">Also on the menu</p>
              <p className="text-primary">
                {others.map((item, index) => (
                  <span key={item.slug}>
                    {index > 0 ? " and " : ""}
                    <Link href={item.href} className="link-editorial">
                      {item.title.toLowerCase()} ({item.price})
                    </Link>
                  </span>
                ))}
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {service.cta}
              </Link>
              <WhatsAppLink />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
