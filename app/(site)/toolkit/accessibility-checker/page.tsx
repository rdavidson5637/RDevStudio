import { AccessibilityCheckerApp } from "@/components/audit-tools/AccessibilityCheckerApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Accessibility Checker",
  description:
    "Reads a page for a language, a title, a heading, a viewport, and image alt text. It does not measure contrast or keyboard use.",
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
