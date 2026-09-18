import { notFound } from "next/navigation";
import { ReportWidget } from "@/components/stout-finder/ReportWidget";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPubSlugs, getPubBySlug } from "@/lib/stout-finder/queries";
import { CONFIDENCE_LABELS, DRINKS } from "@/lib/stout-finder/types";
import { formatLastSeen } from "@/lib/stout-finder/confidence";
import type { Metadata } from "next";

export const revalidate = 3600;

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllPubSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = await getPubBySlug(slug);
  if (!pub) {
    return createPageMetadata({
      title: "Pub not found - Stout Finder",
      path: `/stout-finder/${slug}`,
    });
  }

  const place = [pub.name, pub.town].filter(Boolean).join(", ");
  const confirmed = DRINKS.filter(
    (drink) => pub.drinks[drink.id].confidence === "confirmed",
  );
  const title =
    confirmed[0]?.id === "beamish"
      ? `Beamish at ${place}`
      : confirmed[0]
        ? `${confirmed[0].label} at ${place}`
        : `${place} - stout availability`;

  const description =
    confirmed.length > 0
      ? `${confirmed
          .map(
            (drink) =>
              `${drink.label} confirmed ${formatLastSeen(pub.drinks[drink.id].lastConfirmedAt)}`,
          )
          .join(". ")}.`
      : `Stout availability at ${place} in County ${pub.county}. No confirmed reports yet.`;

  return createPageMetadata({
    title,
    description,
    path: `/stout-finder/${pub.slug}`,
  });
}

export default async function PubDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pub = await getPubBySlug(slug);
  if (!pub) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: pub.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: pub.address ?? undefined,
      addressLocality: pub.town ?? undefined,
      postalCode: pub.postcode ?? undefined,
      addressRegion: `County ${pub.county}`,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: pub.lat,
      longitude: pub.lng,
    },
  };

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pub.lat},${pub.lng}`;
  const geoUrl = `geo:${pub.lat},${pub.lng}`;

  return (
    <div className="section-padding pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-narrow px-6">
        <p className="shell-label mb-3 text-accent">STOUT FINDER</p>
        <h1 className="heading-display text-4xl sm:text-5xl">{pub.name}</h1>
        <p className="mt-3 text-base text-secondary">
          {[pub.address, pub.town, pub.postcode, `County ${pub.county}`]
            .filter(Boolean)
            .join(", ")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {DRINKS.map((drink) => {
            const status = pub.drinks[drink.id];
            return (
              <article
                key={drink.id}
                className="rounded-[10px] border border-border bg-raised p-4"
              >
                <p className="font-semibold text-primary">{drink.label}</p>
                <p
                  className={`mt-2 text-sm ${
                    status.confidence === "unlikely"
                      ? "text-secondary line-through"
                      : "text-secondary"
                  }`}
                >
                  {CONFIDENCE_LABELS[status.confidence]}
                  {status.lastConfirmedAt
                    ? ` · ${formatLastSeen(status.lastConfirmedAt)}`
                    : ""}
                </p>
                <p className="mt-1 text-xs text-tertiary">
                  {status.yesCount} yes · {status.noCount} no
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={geoUrl} className="btn-secondary md:hidden">
            Directions
          </a>
          <a
            href={mapsUrl}
            className="btn-secondary hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Directions
          </a>
          {pub.website ? (
            <a
              href={pub.website}
              className="btn-outline-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          ) : null}
        </div>

        <section className="mt-12">
          <p className="shell-label mb-4 text-accent">CONFIRM A POUR</p>
          <ReportWidget pubId={pub.id} drinks={pub.drinks} />
        </section>

        <OsmCredit className="mt-12" />
      </div>
    </div>
  );
}
