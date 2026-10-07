import { ProjectRow } from "@/components/home/ProjectCard";
import { StudioPage } from "@/components/ui/StudioPage";
import { createPageMetadata } from "@/lib/metadata";
import { games } from "@/lib/projects";

export const metadata = createPageMetadata({
  title: "Games",
  description:
    "Free browser games built by Ryan Davidson. No ads, no sign-up.",
  path: "/games",
});

export default function GamesPage() {
  return (
    <StudioPage
      label="Games"
      title="Play something."
      intro="Free in the browser. No ads, no sign-up."
    >
      <ul className="border-t border-studio-border">
        {games.map((game) => (
          <ProjectRow key={game.slug} project={game} />
        ))}
      </ul>
    </StudioPage>
  );
}
