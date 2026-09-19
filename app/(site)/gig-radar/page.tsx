import { ComingSoon } from "@/components/ui/ComingSoon";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gig Radar",
  description:
    "A weekly email of who you listen to, playing in Belfast or Dublin, before the tickets go. In build, not live yet.",
  path: "/gig-radar",
});

export default function GigRadarPage() {
  return (
    <ComingSoon
      eyebrow="Belfast and Dublin"
      title="GIG RADAR"
      blurb="A weekly email of who you actually listen to, playing in Belfast or Dublin, before the tickets go. Matched to your Last.fm, not a listings dump."
      points={[
        "Pulls your Last.fm artists, or you pick them yourself",
        "Ingests Belfast and Dublin gigs from Ticketmaster and Skiddle",
        "Matches messy artist names so Fontaines D.C. is Fontaines D.C., not a near miss",
        "Friday digest. If there is nothing to send, nothing goes out",
      ]}
      note="The matching and ingest are written. It is waiting on a proper send before it goes live, because an empty Friday email is worse than no email."
    />
  );
}
