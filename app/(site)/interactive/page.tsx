import { InteractiveToolsLanding } from "@/components/interactive-tools/InteractiveToolsLanding";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Interactive Tools",
  description:
    "Free interactive tools for events, debates, and group fun — countdowns, tier lists, brackets, wheels, quizzes, and bingo from RDev Studio.",
  path: "/interactive",
});

export default function InteractiveToolsPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="animate-fade-in border-b border-border pb-10 opacity-0">
          <p className="shell-label mb-3 text-accent">Interactive Tools</p>
          <h1 className="programme-h1">PLAY</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Browser tools for parties, pub nights, and group decisions — spin
            wheels, build brackets, run countdowns, and more. Free, no sign-up.
          </p>
        </header>

        <InteractiveToolsLanding />
      </div>
    </div>
  );
}
