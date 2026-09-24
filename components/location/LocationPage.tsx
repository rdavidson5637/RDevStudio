import Link from "next/link";
import { CHARITY_NOTE, PRICING_FEATURES, REPLY_PROMISE } from "@/lib/constants";
import type { LocationPageData } from "@/lib/locations";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQStructuredData } from "@/components/FAQStructuredData";
import { BUSINESS_ID, absoluteUrl } from "@/lib/seo";

export function LocationPage({ data }: { data: LocationPageData }) {
  return (
    <div className="section-padding pt-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(data.path)}#service`,
          name: `Web design in ${data.town}`,
          serviceType: "Web design",
          url: absoluteUrl(data.path),
          provider: { "@id": BUSINESS_ID },
          areaServed: data.areas.map((name) => ({ "@type": "Place", name })),
          offers: {
            "@type": "Offer",
            price: "650",
            priceCurrency: "GBP",
            url: absoluteUrl("/services/websites"),
          },
        }}
      />
      <FAQStructuredData items={data.faqs} />

      <div className="container-wide px-6">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: `Web design ${data.town}`, href: data.path },
          ]}
        />

        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">{data.kicker}</p>
          <h1 className="programme-h1 text-balance">
            Web design in {data.town}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-primary sm:text-lg">
            {data.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <WhatsAppLink />
          </div>
          <p className="mt-4 text-sm text-secondary">{REPLY_PROMISE}</p>
        </header>

        <section className="border-b border-border py-12">
          <h2 className="sr-only">Why work with me</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {data.whyLocal.map((item) => (
              <div
                key={item.title}
                className="rounded-[10px] border border-border bg-raised p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-border py-12 lg:grid-cols-2">
          <div>
            <p className="shell-label mb-3 text-accent">£650, one-off</p>
            <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              What you get
            </h2>
            <ul className="mt-6 space-y-2">
              {PRICING_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-primary">
                  <span className="mt-1 text-accent" aria-hidden="true">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-primary">
              {CHARITY_NOTE}{" "}
              <Link href="/services/websites" className="link-editorial">
                Full details
              </Link>
            </p>
          </div>

          <div>
            <p className="shell-label mb-3 text-accent">Fixtures</p>
            <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Work
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {data.work.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group block py-4 transition-colors hover:bg-accent-light"
                  >
                    <p className="font-semibold text-primary group-hover:text-accent">
                      {item.title} <span aria-hidden="true">→</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-primary">
                      {item.line}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <p className="shell-label mb-3 text-accent">Where I work</p>
          <p className="max-w-3xl text-primary">
            {data.areas.join(", ")}, and anywhere else in Northern Ireland.
          </p>
        </section>

        <section className="py-12">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
            Questions
          </h2>
          <dl className="max-w-3xl divide-y divide-border border-y border-border">
            {data.faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="font-semibold text-primary">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-primary">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <WhatsAppLink />
          </div>
        </section>
      </div>
    </div>
  );
}
