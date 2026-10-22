import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { HireRyanPage } from "@/components/hire/HireRyanPage";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "CV",
    description:
      "Ryan Davidson - designer and developer in Northern Ireland. Qualifications, experience, and selected work.",
    path: "/hire",
  }),
  robots: { index: false, follow: false },
};

export default function HirePage() {
  return (
    <div className="font-geist">
      <HireRyanPage />
    </div>
  );
}
