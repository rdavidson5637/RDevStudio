import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";

const FLAGSHIPS = [
  {
    title: "Pub Quiz",
    line: "Real-time multiplayer quiz. Next.js route handlers, Redis state, Pusher events, server-decided buzzer.",
    play: "/pub-quiz",
    build: "/build/pub-quiz",
  },
  {
    title: "Draft Analyser",
    line: "FPL Draft analyser. Cron ingestion into Supabase, RLS, projection models, Claude news extraction, Vitest.",
    play: "/draft",
    build: "/build/draft-analyser",
  },
  {
    title: "Champions Draft",
    line: "Football draft game played by real people. Client-side match engine, three tournament modes.",
    play: "/champions-draft",
    build: "/build/champions-draft",
  },
  {
    title: "ShelterLink",
    line: "MSc dissertation. Volunteer platform for Assisi Animal Sanctuary. Node, Express, MySQL.",
    play: "/work/shelterlink",
    build: "/work/shelterlink",
  },
] as const;

/**
 * The 30-second version for anyone arriving from a CV link. Everything below
 * it (including the easter eggs) is the long version.
 */
export function RecruiterSummary() {
  return (
    <div className="mt-12 rounded-[10px] border border-border-strong bg-raised p-6 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="shell-label text-accent">The 30-second version</p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-primary sm:text-lg">
            Looking for a graduate or junior software developer or product
            design role in Belfast. MSc Software Development, Queen&apos;s
            (Commendation). I ship and maintain live products in TypeScript and
            Next.js, and I write down how they work.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
        </div>
      </div>

      <ul className="grid gap-4 pt-6 sm:grid-cols-2">
        {FLAGSHIPS.map((item) => (
          <li key={item.title} className="rounded-md border border-border bg-base p-4">
            <p className="font-semibold text-primary">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-primary">{item.line}</p>
            <div className="mt-3 flex gap-5">
              {item.play !== item.build ? (
                <Link href={item.play} className="link-editorial text-sm">
                  Open it
                </Link>
              ) : null}
              <Link
                href={item.build}
                className="shell-label text-secondary transition-colors hover:text-accent"
              >
                {item.play !== item.build ? "How it's built" : "Case study"}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
