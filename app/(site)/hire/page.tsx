import { createPageMetadata } from "@/lib/metadata";
import { HireRyanPage } from "@/components/hire/HireRyanPage";

export const metadata = createPageMetadata({
  title: "CV",
  description:
    "Ryan Davidson — designer and developer in Northern Ireland. Qualifications, experience, and selected work.",
  path: "/hire",
});

export default function HirePage() {
  return <HireRyanPage />;
}
