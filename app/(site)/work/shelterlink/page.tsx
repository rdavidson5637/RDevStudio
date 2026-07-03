import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "ShelterLink",
  description:
    "Case study: ShelterLink, a volunteer management platform for Assisi Animal Sanctuary.",
  path: "/work/shelterlink",
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

const BUILD_FEATURES = [
  "Volunteer registration & profiles",
  "Shift scheduling",
  "Role management",
  "Admin dashboards",
  "CSV exports",
  "Auth & security middleware",
] as const;

export default function ShelterLinkCaseStudyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY — 01</p>
          <h1 className="programme-h1">SHELTERLINK</h1>
          <p className="max-w-2xl text-lg text-secondary">
            A volunteer management platform for Assisi Animal Sanctuary.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE — Design & development (solo)</p>
            <p>STACK — Node.js · Express · MySQL · Vanilla JS · PicoCSS</p>
            <p>STATUS — Preparing for live rollout</p>
            <p>YEAR — 2025–26</p>
          </div>
        </header>

        <section
          className="border-b border-border py-12"
          aria-label="Hero screenshot"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-[34rem]">
            <Image
              src="/images/work/shelterlink-admin-dashboard.png"
              alt="ShelterLink admin dashboard with volunteer metrics and recent activity"
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-cover object-top"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            HERO SCREENSHOT — DASHBOARD OVERVIEW
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE PROBLEM</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Assisi Animal Sanctuary runs on volunteers — and coordinating them
            ran on paper rotas, phone calls and memory. Scheduling shifts,
            tracking who was trained for which roles, and onboarding new
            volunteers all ate staff time that should have gone to the animals.
            Nothing was broken, exactly. It just didn&apos;t scale, and too much
            of it lived in people&apos;s heads.
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE BUILD</SectionHeading>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
            <p>
              ShelterLink is a full-stack platform built around how the
              sanctuary actually works. Volunteers register and build a profile;
              staff assign roles, manage shifts and see who&apos;s coming in
              from an admin dashboard; records export to CSV when they&apos;re
              needed elsewhere.
            </p>
            <p>
              Under the surface it&apos;s deliberately unflashy: Node and
              Express on the back end, a MySQL database, and a plain JavaScript
              front end — no framework, no build step. Security was treated as a
              feature, not an afterthought: authentication, rate limiting and a
              strict content security policy are baked in, because a charity
              holding volunteers&apos; personal details can&apos;t be casual
              about it.
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
              caption="SCREEN 01 — VOLUNTEER LIST AND PROFILE DETAIL"
              src="/images/work/shelterlink.png"
              alt="ShelterLink volunteer list and profile detail screenshot"
            />
            <ScreenshotSlot
              caption="SCREEN 02 — SHIFT PLANNER WITH ROLE ALLOCATION"
              src="/images/work/shelterlink-browse-shifts.png"
              alt="ShelterLink volunteer browse shifts page showing available opportunities"
            />
            <ScreenshotSlot
              caption="SCREEN 03 — ADMIN DASHBOARD AND EXPORT CONTROLS"
              src="/images/work/shelterlink-admin-dashboard.png"
              alt="ShelterLink admin dashboard with volunteer stats and application review"
            />
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>DECISIONS</SectionHeading>
          <div className="grid gap-8">
            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                No framework, on purpose
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                The sanctuary doesn&apos;t have a dev team. Whatever I built had
                to be maintainable by whoever touches it next, years from now.
                Plain JavaScript with no build step means nothing to update,
                nothing to break, nothing to relearn.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                PicoCSS over a design system
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                Semantic HTML with sensible defaults kept the front end small
                and accessible without a pile of classes. The design budget went
                on clarity, not chrome.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                Boring is a feature
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
                Every technical choice optimised for the same thing: a small
                charity being able to rely on this without me in the room.
              </p>
            </section>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE RESULT</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            ShelterLink was submitted and demonstrated as my MSc dissertation at
            Queen&apos;s University Belfast — I graduated with Commendation.
            Development didn&apos;t stop at submission: the platform is now
            being prepared for live rollout at the sanctuary.
          </p>

          <blockquote className="mt-8 rounded-lg border border-border bg-raised px-5 py-5">
            <div
              className="min-h-16 border-l-2 border-accent pl-4"
              aria-label="Stakeholder quote"
            />
            <footer className="shell-label mt-3 text-secondary">
              — STAKEHOLDER NAME, ASSISI ANIMAL SANCTUARY
            </footer>
          </blockquote>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/rvs-cold-brew"
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
