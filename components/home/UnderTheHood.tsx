import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { GITHUB_URL } from "@/lib/constants";

const ROWS = [
  {
    title: "Real-time rooms",
    body: "Pub Quiz keeps each game in memory and, when Redis is configured, in Upstash. Players subscribe to a Pusher channel named from the game id. Draft Analyser pushes the live board on its own channel when the stats refresh.",
    detail: "Pub Quiz channel game-${gameId}. Draft Analyser channel draft-live.",
    products: "Pub Quiz, Draft Analyser",
  },
  {
    title: "Postgres with row level security",
    body: "Draft Analyser stores teams, picks and the live board in Supabase. The migration turns row level security on for those tables, with public reads and writes left to the service role.",
    detail: "LiveBoardData",
    products: "Draft Analyser",
  },
  {
    title: "One grid for the day",
    body: "Longest Word builds the 4x4 from the calendar date, so everyone playing that day gets the same letters. Found words stay in the browser. Nothing is sent to an account.",
    detail: "getTodaySeed()",
    products: "Longest Word",
  },
  {
    title: "Server components first",
    body: "The studio pages are React Server Components on the App Router. Client components show up where something has to move: the menu, the quiz, the draft board.",
    detail: "app/(site)/page.tsx",
    products: "This site",
  },
] as const;

export function UnderTheHood() {
  return (
    <Section heading="How the games work" intro="Everything here is built and run by me. The code is on GitHub.">
      <div className="mt-10 border-t border-studio-line">
        {ROWS.map((row) => (
          <article key={row.title} className="border-b border-studio-line py-5">
            <h3 className="font-studio-display text-2xl text-studio-text">{row.title}</h3>
            <p className="type-body mt-2 max-w-prose text-studio-muted">{row.body}</p>
            <p className="mt-2 max-w-prose text-studio-muted">{row.detail}</p>
            <p className="mt-2 text-sm text-studio-text">{row.products}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <Link
          href={GITHUB_URL}
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          href="/hire"
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
        >
          Hiring? The long version
        </Link>
      </p>
    </Section>
  );
}
