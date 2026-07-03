import { WebsiteGraderApp } from "@/components/website-grader/WebsiteGraderApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Website Grader",
  description:
    "Score any website on SEO, accessibility, performance, security, and best practices — free from RDev Studio.",
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
