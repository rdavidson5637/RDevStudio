import { LogoRoastApp } from "@/components/logo-roast/LogoRoastApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Logo Roast",
  description:
    "Upload your logo for an honest critique - brand score, typography, colour, scalability, and more from RDev Studio.",
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
