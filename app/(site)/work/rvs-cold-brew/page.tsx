import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "RVS Cold Brew",
  description:
    "Case study: a brand-led site for a Northern Irish cold brew company.",
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
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY — 02</p>
          <h1 className="programme-h1">RVS COLD BREW</h1>
          <p className="max-w-2xl text-lg text-secondary">
            A brand-led site for a Northern Irish cold brew company.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE — Design & development</p>
            <p>TYPE — Brand site</p>
            <p>STATUS — Active client build</p>
            <p>YEAR — 2026</p>
          </div>
        </header>

        <section
          className="border-b border-border py-12"
          aria-label="Hero screenshot"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-[34rem]">
            <Image
              src="/images/work/rvs-coldbrew.png"
              alt="RVS Cold Brew landing page hero screenshot"
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-contain bg-[#0a1a1f]"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            HERO SCREENSHOT — LANDING PAGE
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE BRIEF</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            RVS makes cold brew coffee in Northern Ireland. They needed a site
            that sells the product before a word is read — bold, simple, and
            unmistakably theirs, not a template with a logo swapped in.
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE BUILD</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            The site leads with the product: strong photography, a tight palette
            pulled from the brand, and copy that gets out of the way. Under the
            hood it&apos;s lightweight and fast — no heavy framework, quick
            loads on mobile, where most of their customers are.
          </p>

          <div className="mt-10 grid gap-8">
            <ScreenshotSlot
              caption="SCREEN 01 — PRODUCT-LED HERO SECTION"
              src="/images/work/rvs-coldbrew.png"
              alt="RVS Cold Brew product-led hero section screenshot"
            />
            <ScreenshotSlot
              caption="SCREEN 02 — STORY AND PRODUCT DETAIL LAYOUT"
              src="/images/placeholders/screenshot-slot.svg"
              alt=""
            />
          </div>
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
