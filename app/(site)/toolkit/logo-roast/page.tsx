import { LogoRoastApp } from "@/components/logo-roast/LogoRoastApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Logo Roast",
  description:
    "Upload a PNG, JPG, WebP, or GIF for a written critique. If the roast service is not connected, the page says so.",
  path: "/toolkit/logo-roast",
});

export default function LogoRoastPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <LogoRoastApp />
      </div>
    </div>
  );
}
