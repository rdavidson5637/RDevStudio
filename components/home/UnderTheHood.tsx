import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GITHUB_URL } from "@/lib/constants";

const CARDS = [
  {
    title: "Real-time rooms",
    body: "Pub Quiz keeps each game in memory and, when Redis is configured, in Upstash. Players subscribe to a Pusher channel named from the game id. Draft Analyser pushes the live board on its own channel when the stats refresh.",
    products: "Pub Quiz, Draft Analyser",
    snippet: "game-${gameId}  ·  draft-live",
  },
  {
    title: "Postgres with row level security",
    body: "Draft Analyser stores teams, picks and the live board in Supabase. The migration turns row level security on for those tables, with public reads and writes left to the service role.",
    products: "Draft Analyser",
    snippet: "LiveBoardData",
  },
  {
    title: "One grid for the day",
    body: "Longest Word builds the 4x4 from the calendar date, so everyone playing that day gets the same letters. Found words stay in the browser. Nothing is sent to an account.",
    products: "Longest Word",
    snippet: "getTodaySeed()",
  },
  {
    title: "Server components first",
    body: "The studio pages are React Server Components on the App Router. Client components show up where something has to move: the menu, the quiz, the draft board.",
    products: "This site",
    snippet: "app/(site)/page.tsx",
  },
] as const;

export function UnderTheHood() {
  return (
    <Section
      compact
      eyebrow="UNDER THE HOOD"
      heading="How the games actually work."
      intro="Everything here is built and run by me. The code is on GitHub."
    >
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {CARDS.map((card, index) => (
          <Reveal key={card.title} delay={index * 60}>
            <article className="card h-full p-5">
              <h3 className="font-studio-display text-2xl text-studio-text">{card.title}</h3>
              <p className="type-body mt-3 text-studio-muted">{card.body}</p>
              <p className="mt-4 text-sm text-studio-text">{card.products}</p>
              <p className="mt-3 font-studio-mono text-xs text-amber">{card.snippet}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button href={GITHUB_URL}>GitHub</Button>
        <Link
          href="/hire"
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-amber"
        >
          Hiring? The long version
        </Link>
      </div>
    </Section>
  );
}
