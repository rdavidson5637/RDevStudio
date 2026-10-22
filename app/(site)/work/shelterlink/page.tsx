import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaseShot } from "@/components/work/CaseShot";

export const metadata = createPageMetadata({
  title: "ShelterLink",
  description:
    "Case study: volunteer rotas, roles and an admin dashboard built by RDev Studio for Assisi Animal Sanctuary in Northern Ireland.",
  path: "/work/shelterlink",
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

const BUILD_FEATURES = [
  "Volunteer registration and profiles",
  "Shift scheduling",
  "Role management",
  "Admin dashboards",
  "CSV exports",
  "Auth and security middleware",
] as const;

export default function ShelterLinkCaseStudyPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "ShelterLink" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">ShelterLink</h1>
          <p className="type-body max-w-prose text-studio-muted">
            Volunteer rotas, roles, and an admin dashboard for Assisi Animal
            Sanctuary.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-studio-line pt-5 font-studio-sans text-sm text-studio-muted lg:grid-cols-4">
            <p>Role: design and development, solo</p>
            <p>Stack: Node.js, Express, MySQL, Vanilla JS, PicoCSS</p>
            <p>Status: Ready for live use</p>
            <p>Year - 2025-26</p>
          </div>
        </header>

        <div className="border-b border-studio-line py-12">
          <CaseShot
            src="/images/work/shelterlink-admin-dashboard.png"
            alt="ShelterLink admin dashboard with volunteer metrics and recent activity"
            caption="Admin dashboard"
            priority
          />
        </div>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>How they were running it</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            Assisi runs on volunteers. Who was in, who was trained for which
            jobs, and who was covering Sunday all lived in paper rotas, phone
            calls, and whoever happened to remember. Staff spent time chasing
            people when that time should have gone to the animals. It worked
            for a smaller list. It did not work once the list got long.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>What I built</SectionHeading>
          <div className="max-w-prose space-y-5 type-body text-studio-text">
            <p>
              ShelterLink is the system they asked for. Volunteers sign up,
              fill in a profile, and pick shifts they can actually do. Staff
              assign roles, plan the week from an admin dashboard, and export
              records to CSV when they need them elsewhere.
            </p>
            <p>
              The stack is plain on purpose: Node and Express, MySQL, vanilla
              JavaScript, PicoCSS. No framework, no build step. Authentication,
              rate limiting, and a strict content security policy are in
              because a charity holding volunteer details cannot be casual
              about that.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUILD_FEATURES.map((feature) => (
              <li
                key={feature}
                className="font-studio-sans text-sm rounded-lg border border-studio-line bg-studio-surface px-4 py-3 text-studio-text"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8">
            <ScreenshotSlot
              caption="Volunteer list and profile"
              src="/images/work/shelterlink.png"
              alt="ShelterLink volunteer list and profile detail screenshot"
            />
            <ScreenshotSlot
              caption="Shift planner with role allocation"
              src="/images/work/shelterlink-browse-shifts.png"
              alt="ShelterLink volunteer browse shifts page showing available opportunities"
            />
            <ScreenshotSlot
              caption="Admin dashboard and export controls"
              src="/images/work/shelterlink-admin-dashboard.png"
              alt="ShelterLink admin dashboard with volunteer stats and application review"
            />
          </div>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Why it is plain</SectionHeading>
          <div className="max-w-prose space-y-5 type-body text-studio-text">
            <p>
              The sanctuary does not have a developer on staff. Whatever I
              left them had to still make sense in a few years, to whoever
              opens the folder next. Plain JavaScript with no build step
              means nothing to update, nothing to break, nothing to relearn.
            </p>
            <p>
              PicoCSS kept the front end small and readable without a pile of
              classes. The design budget went on the rota, not on chrome.
            </p>
          </div>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where it stands</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            ShelterLink started as my MSc dissertation at Queen&apos;s
            University Belfast. I graduated with Commendation. The platform is
            ready for the sanctuary to use.
          </p>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/rvs-cold-brew"
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
