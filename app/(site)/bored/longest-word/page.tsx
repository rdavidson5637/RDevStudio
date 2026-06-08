import { GamePageHeader } from "@/components/bored/GamePageHeader";
import { LongestWord } from "@/components/games/LongestWord";
import { getBoredGame } from "@/lib/bored-games";
import { createPageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

const game = getBoredGame("longest-word");

export const metadata = game
  ? createPageMetadata({
      title: game.title,
      description: game.description,
      path: `/bored/${game.slug}`,
    })
  : {};

export default function LongestWordPage() {
  if (!game) {
    notFound();
  }

  return (
    <>
      <GamePageHeader game={game} />
      <section className="section-padding bg-base">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <LongestWord />
        </div>
      </section>
    </>
  );
}
