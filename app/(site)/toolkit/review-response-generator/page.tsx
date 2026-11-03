import { ReviewResponseGeneratorApp } from "@/components/review-response/ReviewResponseGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Review Response Generator",
  description:
    "Paste a review and get a short draft that quotes it. Read the draft before you post it.",
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
