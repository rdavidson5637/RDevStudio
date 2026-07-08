import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Paintball Wales",
  description:
    "Case study: a fast, mobile-first marketing site for North Wales' longest-established outdoor paintball park.",
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
  "Mobile-first responsive design",
  "Per-experience landing pages",
  "Photo gallery",
  "Enquiry form (Formspree)",
  "Local SEO & structured data",
  "Single-file site config",
] as const;

export default function PaintballWalesCaseStudyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY — 03</p>
          <h1 className="programme-h1">PAINTBALL WALES</h1>
          <p className="max-w-2xl text-lg text-secondary">
            A fast, mobile-first marketing site for North Wales&apos;
            longest-established outdoor paintball park, in the heart of
            Snowdonia.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE — Design &amp; development</p>
            <p>STACK — Next.js 14 · TypeScript · Tailwind</p>
            <p>TYPE — Marketing site · Local SEO</p>
            <p>YEAR — 2026</p>
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
            HERO — &ldquo;WARRIOR WOODS&rdquo;, SNOWDONIA
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE BRIEF</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Paintball Wales has run outdoor paintball in the Snowdonia National
            Park for over twenty years — the longest-established park of its kind
            in North Wales, featured on BBC, Radio 1 and S4C. The experience was
            first-rate; the web presence hadn&apos;t kept up. Enquiries came
            through a single cluttered promotional banner that was hard to read,
            harder still on a phone, where most groups plan a day out. The brief
            was to turn a trusted local name into a site that looks the part and
            converts visitors into bookings.
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>BEFORE</SectionHeading>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            The starting point: everything competing for attention at once —
            prices, phone numbers and slogans stacked over a busy background,
            with no clear path to enquire.
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
            BEFORE — THE LEGACY PROMOTIONAL BANNER
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE BUILD</SectionHeading>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
            <p>
              The new site leads with the action — full-bleed photography from
              the park, a tight brand palette, and a clear route to enquire on
              every screen. Each type of day out gets its own page: stag and hen
              parties, birthdays, kids&apos; low-impact sessions, corporate team
              building and the travelling paintball roadshow, so visitors land
              exactly where they need to and staff field better-qualified
              enquiries.
            </p>
            <p>
              Under the hood it&apos;s a Next.js 14 build in TypeScript with
              Tailwind — server-rendered, fast on mobile, and cheap to host on
              Vercel. Contact details, address, opening hours and the enquiry
              inbox all read from a single configuration file, so the owner can
              update the whole site from one place without touching a component.
              Local SEO was treated as a feature: structured data, geolocation
              and location-rich copy help the park show up when people nearby
              search for a day out.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUILD_FEATURES.map((feature) => (
              <li
                key={feature}
                className="shell-label rounded-lg border border-border bg-raised px-4 py-3 text-secondary"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8">
            <ScreenshotSlot
              caption="EXPERIENCE — STAG &amp; HEN GROUPS IN THE WOODS"
              src="/images/work/paintball-wales-stag.jpg"
              alt="Stag group in fancy dress kitted up for paintball at Paintball Wales"
            />
            <ScreenshotSlot
              caption="EXPERIENCE — KIDS' LOW-IMPACT CAPTURE THE FLAG"
              src="/images/work/paintball-wales-kids.jpg"
              alt="Children playing low-impact paintball with a flag at Paintball Wales"
            />
            <ScreenshotSlot
              caption="EXPERIENCE — TOURNAMENT ACTION ON THE ARENA"
              src="/images/work/paintball-wales-action.jpg"
              alt="Paintball players taking cover during a game at Paintball Wales"
            />
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>DECISIONS</SectionHeading>
          <div className="grid gap-8">
            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                Mobile-first, because that&apos;s where the bookings are
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                Groups plan days out on their phones. The whole layout was
                designed small-screen first — one-tap calling, thumb-friendly
                buttons and photography that still lands on a narrow display.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                One file the owner can actually edit
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                Phone numbers, address, opening hours and the enquiry inbox live
                in a single config file with plain comments. No dev needed to
                change a number — and no risk of it going stale in six places at
                once.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                Found before it&apos;s clicked
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                Structured data, geolocation and location-led copy were built in
                from the start, so a twenty-year reputation finally has the
                search visibility to match it.
              </p>
            </section>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE RESULT</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            A modern, fast marketing site that finally matches the quality of
            the day out — dedicated pages for every kind of booking, a clear
            enquiry path on every screen, and a foundation the owner can keep
            current without a developer. Built and deployed on Vercel.
          </p>
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
