import GameShell from "@/components/rugby-draft/GameShell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Rugby Draft",
  description:
    "Spin squads, draft your XV, and compete in Six Nations, World Cup, and Champions Cup modes.",
  path: "/rugby-draft",
});

export default function RugbyDraftPage() {
  return <GameShell />;
}
