import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "ShelterLink",
  description:
    "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
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
  "Volunteer registration and profiles",
  "Shift scheduling",
  "Role management",
  "Admin dashboards",
  "CSV exports",
  "Auth and security middleware",
] as const;

export default function ShelterLinkCaseStudyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "ShelterLink" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY — 01</p>
          <h1 className="programme-h1">SHELTERLINK</h1>
          <p className="max-w-2xl text-lg text-primary">
            Volunteer rotas, roles, and an admin dashboard for Assisi Animal
            Sanctuary.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE — Design & development (solo)</p>
            <p>STACK — Node.js · Express · MySQL · Vanilla JS · PicoCSS</p>
            <p>STATUS — Ready for live use</p>
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
            Admin dashboard
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>HOW THEY WERE RUNNING IT</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            Assisi runs on volunteers. Who was in, who was trained for which
            jobs, and who was covering Sunday all lived in paper rotas, phone
            calls, and whoever happened to remember. Staff spent time chasing
            people when that time should have gone to the animals. It worked
            for a smaller list. It did not work once the list got long.
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>WHAT I BUILT</SectionHeading>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-primary sm:text-lg">
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
                className="shell-label rounded-lg border border-border bg-raised px-4 py-3 text-primary"
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

        <section className="border-b border-border py-12">
          <SectionHeading>WHY IT IS PLAIN</SectionHeading>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-primary sm:text-lg">
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

        <section className="border-b border-border py-12">
          <SectionHeading>WHERE IT STANDS</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            ShelterLink started as my MSc dissertation at Queen&apos;s
            University Belfast. I graduated with Commendation. The platform is
            ready for the sanctuary to use.
          </p>
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
