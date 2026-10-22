import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaseShot } from "@/components/work/CaseShot";

export const metadata = createPageMetadata({
  title: "RV's Cold Brew",
  description:
    "A Belfast cold brew and matcha counter. Menu, hours and where to find Unit 11. Square is linked and the last details are being finished.",
  path: "/work/rvs-cold-brew",
  ogImage: null,
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-studio-display text-2xl text-studio-text">{children}</h2>;
}

function ScreenshotSlot({
  caption,
  src,
  alt,
}: {
  caption: string;
  src: string;
  alt: string;
}) {
  return (
    <figure className="space-y-3">
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-studio-line bg-studio-surface sm:h-80">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="font-studio-sans text-sm text-studio-faint">{caption}</figcaption>
    </figure>
  );
}

export default function RvsColdBrewCaseStudyPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "RV's Cold Brew" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">RV&apos;s Cold Brew</h1>
          <p className="type-body max-w-prose text-studio-muted">
            A Belfast cold brew and matcha counter. Menu, hours and where to
            find Unit 11. Square is linked and the last details are being
            finished.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-studio-line pt-5 font-studio-sans text-sm text-studio-muted lg:grid-cols-4">
            <p>Role: design and development</p>
            <p>Type: Brand site</p>
            <p>Status: Live site - nearly finished</p>
            <p>Year - 2026</p>
          </div>
        </header>

        <div className="border-b border-studio-line py-12">
          <CaseShot
            src="/images/work/rvs-coldbrew-hero.jpg"
            alt="RV's Cold Brew landing page hero screenshot"
            caption="Landing page, Great Northern Mall"
            priority
          />
        </div>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>The counter</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            RV&apos;s pours cold brew and ceremonial Okumidori matcha from Unit
            11 in Great Northern Mall, beside Grand Central. The site shows
            what is on, where the unit is, and when they are open. They
            needed a site that shows the drinks properly and how to get there,
            not a template with a logo swapped in.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>The site</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            It leads with the product, then the menu, opening hours, the unit
            number, and directions. Copy stays short. Built to load quickly on
            a phone.
          </p>

          <div className="mt-10 grid gap-8">
            <ScreenshotSlot
              caption="Menu, visit, and process"
              src="/images/work/rvs-coldbrew-product-row.jpg"
              alt="RV's Cold Brew homepage cards for the menu, visit details, and brewing process"
            />
            <ScreenshotSlot
              caption="Okumidori matcha story"
              src="/images/work/rvs-coldbrew-matcha-story.jpg"
              alt="RV's Cold Brew product story section detailing the Okumidori matcha"
            />
          </div>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where it stands</SectionHeading>
          <p className="type-body max-w-prose text-studio-text">
            Nearly finished. Square is linked and the last details are being
            finished. Menu, hours, and where to find Unit 11 at Great Northern
            Mall.
          </p>
          <a
            href="https://rvscoldbrew.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center text-base font-semibold text-studio-text transition-colors hover:text-studio-accent"
          >
            Open the site
          </a>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/shelterlink"
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
