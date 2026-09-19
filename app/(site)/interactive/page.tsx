import { InteractiveToolsLanding } from "@/components/interactive-tools/InteractiveToolsLanding";
import { createPageMetadata } from "@/lib/metadata";
import { INTERACTIVE_TOOLS } from "@/lib/interactive-tools/catalog";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Interactive Tools",
  description:
    "Free interactive tools for events, debates, and group fun - countdowns, tier lists, brackets, wheels, quizzes, and bingo from RDev Studio.",
  path: "/interactive",
});

export default function InteractiveToolsPage() {
  const toolCount = INTERACTIVE_TOOLS.length;

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="animate-fade-in border-b border-border pb-10 opacity-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">Interactive Tools</p>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {toolCount} tools
            </span>
          </div>
          <h1 className="programme-h1 mt-3">PLAY</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Browser tools for parties, pub nights, and group decisions - spin
            wheels, build brackets, run countdowns, and more. Free, no sign-up.
          </p>
        </header>

        <InteractiveToolsLanding />

        <section className="border-t border-border pt-10">
          <p className="shell-label mb-2 text-accent">PROJECTS</p>
          <p className="max-w-2xl text-base leading-relaxed text-secondary">
            Draft Analyser and Wardrobe AI live under Projects, not here.
          </p>
          <Link
            href="/projects"
            className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            See projects →
          </Link>
        </section>
      </div>
    </div>
  );
}
