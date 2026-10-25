import Link from "next/link";
import Image from "next/image";
import { CaseShot } from "@/components/work/CaseShot";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Concept Builds",
  description:
    "Three concept builds showing range across trades, restaurant, and salon website design.",
  path: "/work/concept-builds",
  ogImage: "/work/concept-builds/opengraph-image",
});

function BuildSection({
  title,
  description,
  href,
  screenshotCaption,
  screenshotSrc,
  screenshotAlt,
  bleed = false,
}: {
  title: string;
  description: string;
  href: string;
  screenshotCaption: string;
  screenshotSrc: string;
  screenshotAlt: string;
  bleed?: boolean;
}) {
  return (
    <section className="border-t border-studio-line py-10 first:border-t-0 first:pt-0">
      <h2 className="font-studio-display text-2xl text-studio-text">{title}</h2>
      {bleed ? (
        <div className="mt-5">
          <CaseShot src={screenshotSrc} alt={screenshotAlt} caption={screenshotCaption} priority />
        </div>
      ) : (
        <figure className="mt-5">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-studio-surface">
            <Image
              src={screenshotSrc}
              alt={screenshotAlt}
              fill
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-3 font-studio-sans text-sm text-studio-faint">{screenshotCaption}</figcaption>
        </figure>
      )}
      <p className="mt-5 max-w-prose type-body text-studio-text">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center text-base font-semibold text-studio-text transition-colors hover:text-studio-accent"
      >
        Visit the build
      </a>
    </section>
  );
}

const BUILDS = [
  {
    title: "Carrick Plumbing Co",
    description:
      "Homeowners need to know what the firm does, where it covers, and how to get a quote - before anything else. The layout puts services and contact above the fold, with a restrained palette that reads as dependable rather than flashy.",
    href: "https://carrick-plumbing-co.vercel.app/",
    screenshotCaption: "Carrick Plumbing Co homepage",
    screenshotSrc: "/images/work/carrick-plumbing.png",
    screenshotAlt: "Carrick Plumbing Co homepage - trades firm concept site",
  },
  {
    title: "The Anchor Restaurant",
    description:
      "Diners want the menu, opening hours, and a way to book - fast, on a phone, often one-handed. Photography carries the atmosphere; type stays large and legible so the essentials never compete with the mood.",
    href: "https://the-anchor-restaurant.vercel.app/",
    screenshotCaption: "The Anchor Restaurant landing page",
    screenshotSrc: "/images/work/anchor-restaurant.png",
    screenshotAlt:
      "The Anchor Restaurant landing page - restaurant concept site",
  },
  {
    title: "Harbour Hair Studio",
    description:
      "Salon visitors need services, pricing direction, and booking options without hunting through a gallery first. A single-column flow with clear treatment blocks and one prominent booking path keeps the brand polished without slowing the decision.",
    href: "https://harbour-hair-studio11.vercel.app/",
    screenshotCaption: "Harbour Hair Studio hero and services",
    screenshotSrc: "/images/work/harbour-hair.png",
    screenshotAlt: "Harbour Hair Studio hero and services - salon concept site",
  },
] as const;

export default function ConceptBuildsPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">Concept builds</h1>
          <p className="type-body max-w-prose text-studio-muted">
            Three sites exploring how local businesses could look online.
          </p>
          <p className="max-w-prose type-body text-studio-text">
            Not every business I want to design for has hired me yet. These
            three concept builds - a trades firm, a restaurant, and a salon -
            are how I show range: three different brands, three different
            audiences, one standard.
          </p>
        </header>

        <div className="border-b border-studio-line py-12">
          {BUILDS.map((build, index) => (
            <BuildSection key={build.title} {...build} bleed={index === 0} />
          ))}
        </div>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/uc-caseworker-tool"
              className="font-studio-sans text-sm text-studio-text transition-colors hover:text-studio-accent"
            >
              Next case study
            </Link>
            <Link
              href="/contact"
              className="text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent"
            >
              Got a similar problem? Get in touch.
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
