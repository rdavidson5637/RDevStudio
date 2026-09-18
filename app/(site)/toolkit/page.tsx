import { ToolkitLanding } from "@/components/business-toolkit/ToolkitLanding";
import { createPageMetadata } from "@/lib/metadata";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";

export const metadata = createPageMetadata({
  title: "Business Toolkit",
  description:
    "Free business tools for local shops, freelancers, and small teams - website audits, generators, and practical utilities from RDev Studio.",
  path: "/toolkit",
});

export default function ToolkitPage() {
  const toolCount = BUSINESS_TOOLS.length;

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">Business Toolkit</p>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {toolCount} tools
            </span>
          </div>
          <h1 className="programme-h1 mt-3">TOOLS</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Practical utilities for running a small business - audits,
            generators, and experiments. Free to use, no sign-up, saved
            favourites on this device.
          </p>
        </header>

        <ToolkitLanding />
      </div>
    </div>
  );
}
