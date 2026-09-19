import { ComingSoon } from "@/components/ui/ComingSoon";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Guitar Lab",
  description:
    "Fretboard viewer, chord finder and progression tool for guitar. In build, not live yet.",
  path: "/guitar-lab",
});

export default function GuitarLabPage() {
  return (
    <ComingSoon
      eyebrow="Fretboard"
      title="GUITAR LAB"
      blurb="Scales, chords and progressions drawn on a real fretboard, with alternate tunings and a capo, all held in the URL so you can send someone a link to exactly what you are looking at."
      points={[
        "Fretboard viewer for any key, scale or mode",
        "Alternate tunings and capo positions",
        "Chord finder that works both ways: name to shape, and shape to name",
        "Progression builder with Roman numerals and key signatures",
      ]}
      note="The music theory engine is written. The fretboard rendering is the part still to do."
    />
  );
}
