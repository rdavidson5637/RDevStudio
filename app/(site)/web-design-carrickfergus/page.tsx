import { LocationPage } from "@/components/location/LocationPage";
import { LOCATIONS } from "@/lib/locations";
import { createPageMetadata } from "@/lib/metadata";

const data = LOCATIONS.carrickfergus;

export const metadata = createPageMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: data.path,
  ogEyebrow: "Websites from £650",
});

export default function WebDesignCarrickfergusPage() {
  return <LocationPage data={data} />;
}
