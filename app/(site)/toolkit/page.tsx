import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StudioPage } from "@/components/ui/StudioPage";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Tools",
  description:
    "Free tools for small businesses and developers. Audits, generators, and utilities from RDev Studio.",
  path: "/toolkit",
});

const GROUPS = [
  {
    title: "For small business owners",
    slugs: [
      "website-grader",
      "ai-landing-page-auditor",
      "google-business-profile-audit",
      "invoice-generator",
      "review-response-generator",
      "business-name-generator",
      "logo-roast",
      "qr-code-generator",
    ],
  },
  {
    title: "For developers",
    slugs: [
      "seo-checker",
      "accessibility-checker",
      "sitemap-generator",
      "robots-txt-generator",
      "favicon-generator",
    ],
  },
  {
    title: "Free utilities",
    slugs: ["colour-palette-generator", "gradient-generator"],
  },
];

export default function ToolkitPage() {
  const claimed = new Set(GROUPS.flatMap((group) => group.slugs));
  const leftover = BUSINESS_TOOLS.filter((tool) => !claimed.has(tool.slug)).map((tool) => tool.slug);

  const groups = GROUPS.map((group) => {
    const slugs = group.title === "Free utilities" ? [...group.slugs, ...leftover] : group.slugs;
    return {
      title: group.title,
      tools: BUSINESS_TOOLS.filter((tool) => slugs.includes(tool.slug)),
    };
  }).filter((group) => group.tools.length > 0);

  return (
    <StudioPage
      label="Tools"
      title="Tools"
      intro="Free to use, no sign-up. Audits, generators, and a few utilities."
    >
      <div className="space-y-14">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="type-h2 text-studio-text">{group.title}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {group.tools.map((tool) => (
                <Card key={tool.slug} as="article" className="flex h-full flex-col">
                  <h3 className="type-h3 text-studio-text">{tool.title}</h3>
                  <p className="type-body mt-2 flex-1 text-studio-muted">{tool.description}</p>
                  <Link
                    href={tool.href}
                    className="mt-5 inline-flex min-h-11 items-center text-sm text-studio-text underline-offset-4 hover:text-amber hover:underline"
                  >
                    Open
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </StudioPage>
  );
}
