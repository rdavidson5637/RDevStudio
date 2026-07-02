import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Concept Builds",
  description:
    "Three concept builds showing range across trades, restaurant, and salon website design.",
  path: "/work/concept-builds",
});

function BuildSection({
  title,
  description,
  href,
  screenshotCaption,
  screenshotSrc,
  screenshotAlt,
}: {
  title: string;
  description: string;
  href: string;
  screenshotCaption: string;
  screenshotSrc: string;
  screenshotAlt: string;
}) {
  return (
    <section className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <p className="shell-label mb-3 text-secondary">CONCEPT BUILD</p>
      <h2 className="text-[1.25rem] font-semibold text-primary">{title}</h2>
      <div className="relative mt-5 h-64 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-80">
        <Image
          src={screenshotSrc}
          alt={screenshotAlt}
          fill
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover object-top"
        />
      </div>
      <p className="shell-label mt-3 text-secondary">{screenshotCaption}</p>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center text-base font-semibold text-primary transition-colors hover:text-accent"
      >
        Visit the build →
      </a>
    </section>
  );
}

const BUILDS = [
  {
    title: "Carrick Plumbing Co",
    description:
      "Homeowners need to know what the firm does, where it covers, and how to get a quote — before anything else. The layout puts services and contact above the fold, with a restrained palette that reads as dependable rather than flashy.",
    href: "https://carrick-plumbing-co.vercel.app/",
    screenshotCaption: "SCREENSHOT — CARRICK PLUMBING CO HOMEPAGE",
    screenshotSrc: "/images/work/carrick-plumbing.png",
    screenshotAlt: "Carrick Plumbing Co homepage — trades firm concept site",
  },
  {
    title: "The Anchor Restaurant",
    description:
      "Diners want the menu, opening hours, and a way to book — fast, on a phone, often one-handed. Photography carries the atmosphere; type stays large and legible so the essentials never compete with the mood.",
    href: "https://the-anchor-restaurant.vercel.app/",
    screenshotCaption: "SCREENSHOT — THE ANCHOR RESTAURANT LANDING PAGE",
    screenshotSrc: "/images/work/anchor-restaurant.png",
    screenshotAlt: "The Anchor Restaurant landing page — restaurant concept site",
  },
  {
    title: "Harbour Hair Studio",
    description:
      "Salon visitors need services, pricing direction, and booking options without hunting through a gallery first. A single-column flow with clear treatment blocks and one prominent booking path keeps the brand polished without slowing the decision.",
    href: "https://harbour-hair-studio11.vercel.app/",
    screenshotCaption: "SCREENSHOT — HARBOUR HAIR STUDIO HERO AND SERVICES",
    screenshotSrc: "/images/work/harbour-hair.png",
    screenshotAlt: "Harbour Hair Studio hero and services — salon concept site",
  },
] as const;

export default function ConceptBuildsPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY — 03</p>
          <h1 className="programme-h1">CONCEPT BUILDS</h1>
          <p className="max-w-2xl text-lg text-secondary">
            Three sites exploring how local businesses could look online.
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Not every business I want to design for has hired me yet. These three
            concept builds — a trades firm, a restaurant, and a salon — are how I
            show range: three different brands, three different audiences, one
            standard.
          </p>
        </header>

        <div className="border-b border-border py-12">
          {BUILDS.map((build) => (
            <BuildSection key={build.title} {...build} />
          ))}
        </div>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work"
              className="shell-label text-lg text-primary transition-colors hover:text-accent"
            >
              BACK TO THE FIXTURE LIST →
            </Link>
            <Link
              href="/contact"
              className="text-base text-secondary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Got a similar problem? Get in touch.
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
