import { ToolkitLanding } from "@/components/business-toolkit/ToolkitLanding";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Business Toolkit",
  description:
    "Free business tools for local shops, freelancers, and small teams — website audits, generators, and practical utilities from RDev Studio.",
  path: "/toolkit",
});

export default function ToolkitPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">Business Toolkit</p>
          <h1 className="programme-h1">TOOLS</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Practical utilities for running a small business — audits,
            generators, and experiments. Free to use, no sign-up, saved
            favourites on this device.
          </p>
        </header>

        <ToolkitLanding />
      </div>
    </div>
  );
}
