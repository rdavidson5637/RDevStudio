import { InvoiceGeneratorApp } from "@/components/invoice-generator/InvoiceGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Invoice Generator",
  description:
    "Create professional invoices in the browser and print or save as PDF.",
  path: "/toolkit/invoice-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <InvoiceGeneratorApp />
      </div>
    </div>
  );
}
