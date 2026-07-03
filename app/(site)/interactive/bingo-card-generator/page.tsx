import { BingoCardGeneratorApp } from "@/components/interactive-tools/bingo/BingoCardGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Bingo Card Generator",
  description: "Generate unique bingo cards from your word list.",
  path: "/interactive/bingo-card-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <BingoCardGeneratorApp />
      </div>
    </div>
  );
}
