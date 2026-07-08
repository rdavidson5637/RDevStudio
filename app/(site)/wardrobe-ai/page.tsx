import { createPageMetadata } from "@/lib/metadata";
import { WardrobeAI } from "@/components/wardrobe-ai/WardrobeAI";
import { WardrobeAIComingSoon } from "@/components/wardrobe-ai/WardrobeAIComingSoon";

export const metadata = createPageMetadata({
  title: "Wardrobe AI",
  description:
    "Generate outfits from a real wardrobe. AI-tagged clothes, every valid line-up, and an honest verdict from the AI stylist. Coming soon from RDev Studio.",
  path: "/wardrobe-ai",
});

// Flip WARDROBE_LIVE=true (env) to swap the coming-soon teaser for the live app.
const IS_LIVE = process.env.WARDROBE_LIVE === "true";

export default function WardrobeAIPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        {IS_LIVE ? (
          <>
            <header className="border-b border-border pb-10">
              <p className="section-label text-accent">RDev Studio // Wardrobe AI</p>
              <h1 className="programme-h1">WARDROBE AI</h1>
              <p className="lead-text mt-5 max-w-3xl">
                Every piece is from Ryan&apos;s actual wardrobe, photographed and tagged by AI.
                Generate every valid line-up, then get an honest verdict from the AI stylist. No
                dressing room required.
              </p>
            </header>
            <div className="mt-10">
              <WardrobeAI />
            </div>
          </>
        ) : (
          <WardrobeAIComingSoon />
        )}
      </div>
    </div>
  );
}
