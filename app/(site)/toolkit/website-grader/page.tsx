import { WebsiteGraderApp } from "@/components/website-grader/WebsiteGraderApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Website Grader",
  description:
    "Reads one page for a title, headings, image alt text, the server response, and a few security headers. It is not a phone speed test.",
  path: "/toolkit/website-grader",
});

export default function WebsiteGraderPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <WebsiteGraderApp />
      </div>
    </div>
  );
}
