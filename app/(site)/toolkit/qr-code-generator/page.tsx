import { Suspense } from "react";
import { QrCodeGeneratorApp } from "@/components/qr-generator/QrCodeGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "QR Code Generator",
  description: "Free QR code generator for URLs, Wi-Fi, and text.",
  path: "/toolkit/qr-code-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <QrCodeGeneratorApp />
      </div>
    </div>
  );
}
