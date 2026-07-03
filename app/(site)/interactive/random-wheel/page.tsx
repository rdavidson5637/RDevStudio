import { RandomWheelApp } from "@/components/interactive-tools/random-wheel/RandomWheelApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Random Wheel",
  description: "Spin the wheel to pick a random winner.",
  path: "/interactive/random-wheel",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <RandomWheelApp />
      </div>
    </div>
  );
}
