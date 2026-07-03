import { TierListBuilderApp } from "@/components/interactive-tools/tier-list/TierListBuilderApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Tier List Builder",
  description: "Build S-through-F tier lists with drag and drop.",
  path: "/interactive/tier-list-builder",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <TierListBuilderApp />
      </div>
    </div>
  );
}
