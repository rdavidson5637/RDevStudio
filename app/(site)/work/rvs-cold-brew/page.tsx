import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "RV's Cold Brew",
  description:
    "Live site for a Belfast cold brew and matcha counter at Great Northern Mall. Menu, hours, and directions.",
  path: "/work/rvs-cold-brew",
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="shell-label mb-3 text-accent">{children}</h2>;
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
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-80">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="shell-label text-secondary">{caption}</figcaption>
    </figure>
  );
}

export default function RvsColdBrewCaseStudyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "RV's Cold Brew" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY — 02</p>
          <h1 className="programme-h1">RV&apos;S COLD BREW</h1>
          <p className="max-w-2xl text-lg text-primary">
            A live site for a Belfast cold brew and matcha counter at
            Great Northern Mall.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE — Design & development</p>
            <p>TYPE — Brand site</p>
            <p>STATUS — Live · still a client</p>
            <p>YEAR — 2026</p>
          </div>
        </header>

        <section
          className="border-b border-border py-12"
          aria-label="Hero screenshot"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-[34rem]">
            <Image
              src="/images/work/rvs-coldbrew-hero.jpg"
              alt="RV's Cold Brew landing page hero screenshot"
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-cover object-top"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            Landing page, Great Northern Mall
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE COUNTER</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            RV&apos;s pours cold brew and ceremonial Okumidori matcha from Unit
            11 in Great Northern Mall, beside Grand Central. People find them
            on a phone: what is on, where is the unit, when are they open. They
            needed a site that shows the drinks properly and how to get there,
            not a template with a logo swapped in.
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE SITE</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            It leads with the product, then the menu, opening hours, the unit
            number, and directions. Copy stays short. Built to load quickly on
            a phone, which is how most of their customers arrive.
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

        <section className="border-b border-border py-12">
          <SectionHeading>WHERE IT STANDS</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            The site is live. Menu, hours, and directions for Unit 11 at Great
            Northern Mall. RV&apos;s is still a client.
          </p>
          <a
            href="https://rvscoldbrew.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center text-base font-semibold text-primary transition-colors hover:text-accent"
          >
            Visit live site →
          </a>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/paintball-wales"
              className="shell-label text-lg text-primary transition-colors hover:text-accent"
            >
              NEXT FIXTURE →
            </Link>
            <Link
              href="/contact"
              className="text-base text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Got a similar problem? Get in touch.
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
