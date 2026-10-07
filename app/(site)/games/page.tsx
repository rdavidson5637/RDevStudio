import { ProjectCard } from "@/components/home/ProjectCard";
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
      <div className="grid gap-4 md:grid-cols-2">
        {games.map((game) => (
          <ProjectCard key={game.slug} project={game} />
        ))}
      </div>
    </StudioPage>
  );
}
