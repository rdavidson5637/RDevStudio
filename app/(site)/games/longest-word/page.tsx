import Link from "next/link";
import { LongestWord } from "@/components/games/LongestWord";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Longest Word",
  description:
    "Spell the longest word you can from today's 4x4 letter grid. Same grid for everyone, resets at midnight.",
  path: "/games/longest-word",
});

export default function LongestWordPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">DAILY</p>
          <h1 className="programme-h1">LONGEST WORD</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Spell the longest word you can from today&apos;s grid. Same sixteen
            letters for everyone, a new set at midnight. No sign-up, and your
            finds are kept on this device.
          </p>
        </header>

        <div className="mt-10">
          <LongestWord />
        </div>

        <section className="mt-16 border-t border-border pt-10">
          <p className="shell-label text-accent">HOW IT WORKS</p>
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-secondary">
            <p>Tap letters to build a word, then submit it.</p>
            <p>Words are checked against a dictionary, so no made-up ones.</p>
            <p>Longest word wins. There is nobody to beat but yesterday.</p>
          </div>
          <Link
            href="/games"
            className="mt-8 inline-flex rounded-md border border-border-strong px-6 py-3 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            ← All games
          </Link>
        </section>
      </div>
    </div>
  );
}
