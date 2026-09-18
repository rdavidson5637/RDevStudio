import { AddPubForm } from "@/components/stout-finder/AddPubForm";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Add a pub - Stout Finder",
  description:
    "Submit a pub in Antrim or Down that is missing from Stout Finder. Submissions stay pending until they are reviewed.",
  path: "/stout-finder/add",
});

export default function AddPubPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow px-6">
        <p className="shell-label mb-3 text-accent">STOUT FINDER</p>
        <h1 className="heading-display text-4xl sm:text-5xl">ADD A PUB</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary">
          New pubs land as pending. They do not go live when you hit submit.
          Someone checks them first so the map does not fill with jokes.
        </p>
        <p className="mt-3 text-sm text-secondary">
          If the pub is already on the map,{" "}
          <Link href="/stout-finder" className="text-accent underline-offset-2 hover:underline">
            confirm its stouts
          </Link>{" "}
          instead.
        </p>
        <div className="mt-10">
          <AddPubForm />
        </div>
        <OsmCredit className="mt-10" />
      </div>
    </div>
  );
}
