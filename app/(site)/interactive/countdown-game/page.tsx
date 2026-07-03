import { CountdownGameApp } from "@/components/interactive-tools/countdown-game/CountdownGameApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Countdown Game",
  description:
    "Play the Countdown letters and numbers rounds solo. Beat the clock, then see the best word and number the solver could find.",
  path: "/interactive/countdown-game",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <CountdownGameApp />
      </div>
    </div>
  );
}
