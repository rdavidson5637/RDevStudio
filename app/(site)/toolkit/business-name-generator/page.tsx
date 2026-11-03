import { BusinessNameGeneratorApp } from "@/components/business-name/BusinessNameGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Business Name Generator",
  description:
    "Shuffle name ideas from your keywords and the industry. It does not check if a name is free.",
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
