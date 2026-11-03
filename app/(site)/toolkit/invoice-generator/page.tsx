import { InvoiceGeneratorApp } from "@/components/invoice-generator/InvoiceGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Invoice Generator",
  description:
    "Build an invoice in the browser and print it, or save a PDF from the print dialog.",
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
