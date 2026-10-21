import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { GITHUB_URL } from "@/lib/constants";

const ROWS = [
  {
    title: "Real-time rooms",
    body: "Pub Quiz keeps each game in memory, and in Upstash when it is set up. Players follow a Pusher channel for the game. Draft Analyser pushes its live board the same way.",
    products: "Pub Quiz, Draft Analyser",
  },
  {
    title: "Postgres with row level security",
    body: "Draft Analyser stores teams, picks and the live board in Supabase. Row level security is on for those tables.",
    products: "Draft Analyser",
  },
  {
    title: "One grid for the day",
    body: "Longest Word builds the 4x4 from the date, so everyone gets the same letters. Found words stay in your browser.",
    products: "Longest Word",
  },
  {
    title: "Server components first",
    body: "Pages are React Server Components. Client code only turns up where something moves: the menu, the quiz, the draft board.",
    products: "This site",
  },
] as const;

export function UnderTheHood() {
  return (
    <Section heading="Under the hood" intro="Everything here is built and run by me.">
      <div className="mt-10 border-t border-studio-line">
        {ROWS.map((row) => (
          <article key={row.title} className="grid gap-2 border-b border-studio-line py-6 md:grid-cols-[18rem_1fr] md:gap-10">
            <div>
              <h3 className="font-studio-display text-2xl text-studio-text">{row.title}</h3>
              <p className="mt-1 text-sm text-studio-faint">{row.products}</p>
            </div>
            <p className="type-body max-w-prose text-studio-muted">{row.body}</p>
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
