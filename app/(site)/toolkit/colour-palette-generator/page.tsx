import { ColourPaletteGeneratorApp } from "@/components/colour-palette/ColourPaletteGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Colour Palette Generator",
  description: "Generate harmonious colour palettes from a base hex colour.",
  path: "/toolkit/colour-palette-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <ColourPaletteGeneratorApp />
      </div>
    </div>
  );
}
