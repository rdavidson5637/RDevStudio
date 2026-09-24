import { LocationPage } from "@/components/location/LocationPage";
import { LOCATIONS } from "@/lib/locations";
import { createPageMetadata } from "@/lib/metadata";

const data = LOCATIONS.belfast;

export const metadata = createPageMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: data.path,
  ogEyebrow: "Websites from £650",
});

export default function WebDesignBelfastPage() {
  return <LocationPage data={data} />;
}
