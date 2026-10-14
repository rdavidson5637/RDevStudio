import { InteractiveToolsLanding } from "@/components/interactive-tools/InteractiveToolsLanding";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Interactive Tools",
  description:
    "Free interactive tools for events, debates, and group fun - countdowns, tier lists, brackets, wheels, quizzes, and bingo from RDev Studio.",
  path: "/interactive",
});

export default function InteractiveToolsPage() {
  return (
    <div className="bg-studio-bg py-16 text-studio-text md:py-24 lg:py-32">
      <div className="container-wide px-6">
        <header className="border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">Interactive tools</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Browser tools for parties, pub nights, and group decisions - spin
            wheels, build brackets, run countdowns, and more. Free, no sign-up.
          </p>
        </header>

        <InteractiveToolsLanding />

        <section className="border-t border-border pt-10">
          <p className="mb-2 font-studio-sans text-sm text-studio-muted">Projects</p>
          <p className="max-w-2xl text-base leading-relaxed text-secondary">
            Draft Analyser and Wardrobe AI live under Projects, not here.
          </p>
          <Link
            href="/projects"
            className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            See projects
          </Link>
        </section>
      </div>
    </div>
  );
}
