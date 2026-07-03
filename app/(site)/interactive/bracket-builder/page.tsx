import { BracketBuilderApp } from "@/components/interactive-tools/bracket/BracketBuilderApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Bracket Builder",
  description: "8-team single-elimination bracket builder.",
  path: "/interactive/bracket-builder",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <BracketBuilderApp />
      </div>
    </div>
  );
}
