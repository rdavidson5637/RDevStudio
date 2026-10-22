import Link from "next/link";
import { Section } from "@/components/ui/Section";
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
    <Section className="bg-bg text-studio-text">
      <h1 className="display-lg text-studio-text">Tools</h1>
      <p className="type-body mt-5 max-w-xl text-studio-muted">Free to use, no sign-up. Audits, generators, and a few utilities.</p>
      <div className="mt-14 space-y-14">
        {groups.map((group) => (
          <section key={group.title} className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-12">
            <div>
              <h2 className="type-h2 text-studio-text">{group.title}</h2>
              <p className="mt-2 text-sm text-studio-faint">
                {group.tools.length} {group.tools.length === 1 ? "tool" : "tools"}
              </p>
            </div>
            <ul className="border-t border-studio-line">
              {group.tools.map((tool) => (
                <li key={tool.slug} className="border-b border-studio-line">
                  <Link
                    href={tool.href}
                    className="group -mx-3 block px-3 py-4 transition-colors duration-200 hover:bg-studio-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
                  >
                    <span className="block font-studio-display text-2xl text-studio-text group-hover:text-studio-accent">
                      {tool.title}
                    </span>
                    <span className="type-body mt-1 block max-w-prose text-studio-muted">{tool.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
