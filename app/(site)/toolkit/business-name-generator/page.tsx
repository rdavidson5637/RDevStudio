import { BusinessNameGeneratorApp } from "@/components/business-name/BusinessNameGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Business Name Generator",
  description: "Brainstorm business name ideas by industry and keywords.",
  path: "/toolkit/business-name-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <BusinessNameGeneratorApp />
      </div>
    </div>
  );
}
