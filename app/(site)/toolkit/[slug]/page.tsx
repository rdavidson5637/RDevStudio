import { notFound } from "next/navigation";
import { ToolPlaceholder } from "@/components/business-toolkit/ToolPlaceholder";
import { BUSINESS_TOOLS, getToolBySlug } from "@/lib/business-toolkit/catalog";
import { createPageMetadata } from "@/lib/metadata";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

// Only "soon" tools use this placeholder route. "live" tools have their own
// dedicated static page, which takes precedence over this dynamic segment.
export function generateStaticParams() {
  return BUSINESS_TOOLS.filter((tool) => tool.status === "soon").map(
    (tool) => ({
      slug: tool.slug,
    }),
  );
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return createPageMetadata({
      title: "Tool not found",
      path: "/toolkit",
    });
  }

  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: tool.href,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  // Live tools are served by their dedicated page; this route is the
  // coming-soon placeholder only.
  if (!tool || tool.status !== "soon") {
    notFound();
  }

  return <ToolPlaceholder tool={tool} />;
}
