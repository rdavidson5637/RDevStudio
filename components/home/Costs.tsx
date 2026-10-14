import { HomeProcess } from "@/components/home/HomeProcess";
import { Scoreboard } from "@/components/pricing/Scoreboard";
import { Section } from "@/components/ui/Section";

export function Costs() {
  return (
    <Section heading="What it costs">
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
        <Scoreboard />
        <div>
          <h3 className="font-studio-display text-3xl leading-tight text-studio-text">
            Half up front, half when it goes live. The domain, the content and the code are yours.
          </h3>
          <p className="type-body mt-6 max-w-prose border-l-4 border-studio-accent pl-4 text-studio-text">
            Registered charities get every package free. Say you&apos;re registered when you get in touch.
          </p>
        </div>
      </div>
      <HomeProcess />
    </Section>
  );
}
