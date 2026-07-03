import { TournamentBuilderApp } from "@/components/interactive-tools/tournament/TournamentBuilderApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Tournament Builder",
  description: "Generate tournament groups from 8 teams.",
  path: "/interactive/tournament-builder",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <TournamentBuilderApp />
      </div>
    </div>
  );
}
