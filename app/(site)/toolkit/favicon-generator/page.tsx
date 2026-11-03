import { FaviconGeneratorApp } from "@/components/favicon-generator/FaviconGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Favicon Generator",
  description: "Upload an image and download PNG favicons at 16, 32, 180, and 512 pixels.",
  path: "/toolkit/favicon-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <FaviconGeneratorApp />
      </div>
    </div>
  );
}
