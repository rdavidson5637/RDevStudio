import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CaseFooter } from "@/components/work/CaseFooter";
import { DRAFT_CASE_STUDIES, DRAFT_PROOF_ITEMS } from "@/lib/content/redesign-draft";

const study = DRAFT_CASE_STUDIES.find((item) => item.slug === "assisi")!;
const proof = DRAFT_PROOF_ITEMS.find((item) => item.href === "/work/assisi")!;

export const metadata = createPageMetadata({
  title: study.name,
  description: proof.role,
  path: "/work/assisi",
  ogImage: "/work/assisi/opengraph-image",
});

const FACTS = [
  "A full rebuild of the public website for Assisi Animal Sanctuary.",
  "A new brand to go with it.",
  "Laid out so adopters, donors and supporters can find animals and ways to help without hunting through menus.",
  "Designed for phone and desktop from the start.",
] as const;

export default function AssisiCaseStudyPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: study.name },
          ]}
          className="mb-8"
        />
        <header className="space-y-4 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">{study.name}</h1>
          <p className="text-sm text-studio-muted">
            {study.category}. Built, waiting on the sanctuary&apos;s sign-off.
          </p>
        </header>

        <div className="border-b border-studio-line py-12">
          <div className="flex min-h-56 w-full flex-col items-center justify-center gap-2 border border-studio-line bg-studio-surface p-8 text-center">
            <p className="font-studio-display text-2xl text-studio-text">Preview after sign-off</p>
            <p className="max-w-prose text-sm text-studio-muted">
              Screenshots and a public link go up here once the sanctuary has approved them.
            </p>
          </div>
        </div>

        <section className="border-b border-studio-line py-12">
          <h2 className="mb-4 font-studio-display text-2xl text-studio-text">What it is</h2>
          <ul className="max-w-prose list-disc space-y-3 pl-5 type-body text-studio-text marker:text-studio-faint">
            {FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <p className="mt-6 type-body text-studio-muted">
            Also for Assisi:{" "}
            <Link
              href="/work/shelterlink"
              className="inline-flex min-h-11 items-center font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              ShelterLink<span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <h2 className="mb-3 font-studio-display text-2xl text-studio-text">
            Run a rescue or a charity?
          </h2>
          <p className="max-w-prose type-body text-studio-muted">
            Registered charities get their site free. Tell me what you need and I&apos;ll walk you
            through how this one was put together.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="/contact">Ask for a walkthrough</Button>
            <Link
              href="/services/charities"
              className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              How charity sites work
            </Link>
          </div>
        </section>

        <CaseFooter next={{ href: "/work/shelterlink", label: "ShelterLink" }} />
      </article>
    </div>
  );
}
