import { ReviewResponseGeneratorApp } from "@/components/review-response/ReviewResponseGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Review Response Generator",
  description: "Draft replies to Google and social reviews.",
  path: "/toolkit/review-response-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <ReviewResponseGeneratorApp />
      </div>
    </div>
  );
}
