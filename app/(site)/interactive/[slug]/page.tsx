import { notFound } from "next/navigation";
import { InteractiveToolPlaceholder } from "@/components/interactive-tools/InteractiveToolPlaceholder";
import {
  INTERACTIVE_TOOLS,
  getInteractiveToolBySlug,
} from "@/lib/interactive-tools/catalog";
import { createPageMetadata } from "@/lib/metadata";

type InteractiveToolPageProps = {
  params: Promise<{ slug: string }>;
};

// Only "soon" tools use this placeholder route. "live" tools have their own
// dedicated static page, which takes precedence over this dynamic segment.
export function generateStaticParams() {
  return INTERACTIVE_TOOLS.filter((tool) => tool.status === "soon").map(
    (tool) => ({ slug: tool.slug }),
  );
}

export async function generateMetadata({ params }: InteractiveToolPageProps) {
  const { slug } = await params;
  const tool = getInteractiveToolBySlug(slug);

  if (!tool) {
    return createPageMetadata({
      title: "Tool not found",
      path: "/interactive",
    });
  }

  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: tool.href,
  });
}

export default async function InteractiveToolPage({
  params,
}: InteractiveToolPageProps) {
  const { slug } = await params;
  const tool = getInteractiveToolBySlug(slug);

  // Live tools are served by their dedicated page; this route is the
  // coming-soon placeholder only.
  if (!tool || tool.status !== "soon") {
    notFound();
  }

  return <InteractiveToolPlaceholder tool={tool} />;
}
