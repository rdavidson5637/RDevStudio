import Link from "next/link";
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
            <ul className="mt-6 border-t border-studio-border">
              {group.tools.map((tool) => (
                <li key={tool.slug} className="border-b border-studio-border">
                  <Link
                    href={tool.href}
                    className="group block py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                  >
                    <span className="block font-studio-display text-2xl text-studio-text transition-colors duration-200 group-hover:text-amber">
                      {tool.title}
                    </span>
                    <span className="type-body mt-1 block max-w-2xl text-studio-muted">{tool.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </StudioPage>
  );
}
