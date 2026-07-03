import { Suspense } from "react";
import { CountdownApp } from "@/components/interactive-tools/countdown/CountdownApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Countdown Timer",
  description: "Live countdown timer for events - shareable and fullscreen.",
  path: "/interactive/countdown",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <Suspense fallback={<p className="text-secondary">Loading…</p>}>
          <CountdownApp />
        </Suspense>
      </div>
    </div>
  );
}
