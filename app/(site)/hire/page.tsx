import { createPageMetadata } from "@/lib/metadata";
import { HireRyanPage } from "@/components/hire/HireRyanPage";

export const metadata = createPageMetadata({
  title: "Hire Ryan",
  description:
    "Software developer, product builder, and MSc graduate based in Northern Ireland. Available for hire.",
  path: "/hire",
});

export default function HirePage() {
  return <HireRyanPage />;
}
