import { RobotsTxtGeneratorApp } from "@/components/robots-generator/RobotsTxtGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "robots.txt Generator",
  description:
    "Build and download a robots.txt file with allow, disallow, and sitemap rules.",
  path: "/toolkit/robots-txt-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <RobotsTxtGeneratorApp />
      </div>
    </div>
  );
}
