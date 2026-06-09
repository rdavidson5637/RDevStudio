import type { Metadata } from "next";
import { HireRyanPage } from "@/components/hire/HireRyanPage";

export const metadata: Metadata = {
  title: "Hire Ryan — Ryan Davidson",
  description:
    "Software developer, product builder, and MSc graduate based in Northern Ireland. Available for hire.",
  alternates: {
    canonical: "/hire",
  },
};

export default function HirePage() {
  return <HireRyanPage />;
}
