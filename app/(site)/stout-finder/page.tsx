import { ComingSoon } from "@/components/ui/ComingSoon";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Stout Finder",
  description:
    "A map of which pubs in Antrim and Down actually have Beamish, Murphy's and Guinness on. In build, not live yet.",
  path: "/stout-finder",
});

export default function StoutFinderPage() {
  return (
    <ComingSoon
      eyebrow="Antrim and Down"
      title="STOUT FINDER"
      blurb="A map of which pubs actually have Beamish, Murphy's and Guinness on, built on reports from people who were in the bar rather than on a brewery list."
      points={[
        "A map and a nearest-first list for Antrim and Down",
        "Filter by Beamish, Murphy's or Guinness",
        "Every claim carries the date it was last confirmed, and goes stale on its own",
        "Two taps to confirm or deny a pub, no account needed",
        "Add a pub that is missing",
      ]}
      note="The build is done. It is waiting on pub data being checked before it goes live, because a map full of guesses is worse than no map."
    />
  );
}
