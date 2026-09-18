import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Paintball Wales",
  description:
    "Phone-first site for a Snowdonia paintball park, built to replace a cluttered banner.",
  path: "/work/paintball-wales",
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
          className="object-cover object-center"
        />
      </div>
      <figcaption className="shell-label text-secondary">{caption}</figcaption>
    </figure>
  );
}

const BUILD_FEATURES = [
  "Phone-first layout",
  "A page per type of day out",
  "Photo gallery",
  "Enquiry form (Formspree)",
  "Local SEO and structured data",
  "Single-file site config",
] as const;

export default function PaintballWalesCaseStudyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "Paintball Wales" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY - 03</p>
          <h1 className="programme-h1">PAINTBALL WALES</h1>
          <p className="max-w-2xl text-lg text-primary">
            A phone-first site for North Wales&apos; longest-established outdoor
            paintball park, in Snowdonia.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE - Design &amp; development</p>
            <p>STACK - Next.js 14 · TypeScript · Tailwind</p>
            <p>TYPE - Marketing site · Local SEO</p>
            <p>YEAR - 2026</p>
          </div>
        </header>

        <section
          className="border-b border-border py-12"
          aria-label="Hero screenshot"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-[34rem]">
            <Image
              src="/images/work/paintball-wales-hero.jpg"
              alt="Paintball Wales players in action amid purple flares in the Snowdonia woodland"
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-cover object-center"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            Warrior Woods, Snowdonia
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE OLD BANNER</SectionHeading>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            Paintball Wales has run outdoor paintball in Snowdonia for over
            twenty years. Longest-established park of its kind in North Wales,
            and they have been on BBC, Radio 1 and S4C. Groups still landed on
            a single busy banner: prices, phone numbers and slogans stacked
            over a photo, hard to read on a phone, which is where most days out
            get planned. The job was a site that looks like the woods and makes
            it obvious how to enquire.
          </p>
          <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-72">
            <Image
              src="/images/work/paintball-wales-before-banner.png"
              alt="The previous Paintball Wales promotional banner, densely packed with text and slogans"
              fill
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-contain bg-black"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            The old promotional banner
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>WHAT REPLACED IT</SectionHeading>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-primary sm:text-lg">
            <p>
              Photos from the park, a tight palette, and an enquire path on
              every page. Each kind of group gets its own page: stag and hen,
              birthdays, kids&apos; low-impact sessions, corporate days, and
              the travelling roadshow. Visitors land on the right day out.
              Staff get cleaner enquiries.
            </p>
            <p>
              Next.js 14, TypeScript, Tailwind, hosted on Vercel. Phone number,
              address, hours and the enquiry inbox live in one config file,
              with comments, so the owner can change a number without opening
              a component. Structured data and location copy are in from the
              start so the park can show up when people nearby search for a
              day out.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUILD_FEATURES.map((feature) => (
              <li
                key={feature}
                className="shell-label rounded-lg border border-border bg-raised px-4 py-3 text-primary"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8">
            <ScreenshotSlot
              caption="EXPERIENCE - STAG &amp; HEN GROUPS IN THE WOODS"
              src="/images/work/paintball-wales-stag.jpg"
              alt="Stag group in fancy dress kitted up for paintball at Paintball Wales"
            />
            <ScreenshotSlot
              caption="EXPERIENCE - KIDS' LOW-IMPACT CAPTURE THE FLAG"
              src="/images/work/paintball-wales-kids.jpg"
              alt="Children playing low-impact paintball with a flag at Paintball Wales"
            />
            <ScreenshotSlot
              caption="EXPERIENCE - TOURNAMENT ACTION ON THE ARENA"
              src="/images/work/paintball-wales-action.jpg"
              alt="Paintball players taking cover during a game at Paintball Wales"
            />
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>WHERE IT STANDS</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            The site is live. The owner can keep contact details current
            without a developer. Built and hosted on Vercel.
          </p>
          <a
            href="https://paintball-wales.vercel.app"
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
              href="/work/concept-builds"
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
