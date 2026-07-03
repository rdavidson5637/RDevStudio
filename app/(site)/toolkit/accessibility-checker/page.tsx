import { AccessibilityCheckerApp } from "@/components/audit-tools/AccessibilityCheckerApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Accessibility Checker",
  description:
    "Free website accessibility checker - contrast, alt text, forms, and keyboard navigation.",
  path: "/toolkit/accessibility-checker",
});

export default function AccessibilityCheckerPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <AccessibilityCheckerApp />
      </div>
    </div>
  );
}
