import GameShell from "@/components/champions-draft/GameShell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Champions Draft",
  description:
    "Spin iconic squads, draft your ultimate XI, and compete in league, Champions League, and World Cup modes.",
  path: "/champions-draft",
});

export default function ChampionsDraftPage() {
  return <GameShell />;
}
