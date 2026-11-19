import { CaseFooter } from "@/components/work/CaseFooter";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Rondo",
  description:
    "Free coaching app for grassroots football teams. Availability, training plans, match day and subs. Built by RDev Studio. Live pilot with Grove United 3rds.",
  path: "/work/rondo",
  ogImage: "/work/rondo/opengraph-image",
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-studio-display text-2xl text-studio-text">{children}</h2>;
}

const BUILD_FEATURES = [
  "Player availability from a WhatsApp team link",
  "Training planner that fits who is coming",
  "Line-up builder and live match tracker",
  "Subs and match fee tracking",
  "Public drill library",
  "Push reminders for unanswered availability",
] as const;

export default function RondoCaseStudyPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "Rondo" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">Rondo</h1>
          <p className="type-body max-w-prose text-studio-muted">
            Free coaching app for grassroots football. Players tap in from
            WhatsApp. Coaches plan training, share line-ups, run the match and
            track fees. Built by RDev Studio as part of NIFD. Pilot: Grove
            United 3rds.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-studio-line pt-5 font-studio-sans text-sm text-studio-muted lg:grid-cols-4">
            <p>Role: design and development, solo</p>
            <p>Stack: Next.js, Tailwind, Supabase</p>
            <p>Status: Live pilot</p>
            <p>Year - 2026</p>
          </div>
        </header>

        <div className="border-b border-studio-line py-12">
          <div className="flex min-h-56 w-full flex-col items-center justify-center gap-2 border border-studio-line bg-studio-surface p-8 text-center">
            <p className="font-studio-display text-2xl text-studio-text">
              Screenshot placeholder
            </p>
            <p className="max-w-prose text-sm text-studio-muted">
              Player and coach screenshots go here once captured from the live
              pilot.
            </p>
          </div>
        </div>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>The problem on a Tuesday night</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            Grassroots coaches run availability, training, line-ups, match
            reports and fees across WhatsApp threads and spreadsheets. Players
            need a simple way to say if they are in, see where they are playing,
            and know what they owe - without another account to remember.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>What I built</SectionHeading>
          <div className="max-w-prose space-y-5 type-body text-studio-text">
            <p>
              Rondo is a phone-first app. Players open a team link, tap their
              name, set availability, see match details, offer or grab lifts,
              and check fees. Coaches add the week in one go, plan sessions
              around who is actually coming, build a line-up, run the match from
              the touchline, and track subs.
            </p>
            <p>
              There are no traditional accounts. A device token in an httpOnly
              cookie identifies a player; the coach uses a private link. Data
              sits in Supabase behind checked server functions. Anyone can browse
              the public drill library.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUILD_FEATURES.map((feature) => (
              <li
                key={feature}
                className="rounded-lg border border-studio-line bg-studio-surface px-4 py-3 font-studio-sans text-sm text-studio-text"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where it stands</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            Live as a pilot with Grove United 3rds. Further clubs wait on
            review. Some follow-up work (drills, privacy and identity hardening)
            sits in open PRs and is not treated as finished until Ryan merges
            it.
          </p>
          <a
            href="https://rondo-cyan.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center text-base font-semibold text-studio-text transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            Open the pilot
          </a>
        </section>

        <CaseFooter next={{ href: "/work/assisi", label: "Assisi site and brand" }} />
      </article>
    </div>
  );
}
