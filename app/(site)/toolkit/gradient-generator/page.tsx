import { GradientGeneratorApp } from "@/components/gradient-generator/GradientGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gradient Generator",
  description: "Build CSS and Tailwind gradients with live preview.",
  path: "/toolkit/gradient-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <GradientGeneratorApp />
      </div>
    </div>
  );
}
