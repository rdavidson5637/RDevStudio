import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DRAFT_CASE_STUDIES, DRAFT_PROOF_ITEMS } from "@/lib/content/redesign-draft";

const study = DRAFT_CASE_STUDIES.find((item) => item.slug === "assisi")!;
const proof = DRAFT_PROOF_ITEMS.find((item) => item.href === "/work/assisi")!;

export const metadata = createPageMetadata({
  title: study.name,
  description: proof.role,
  path: "/work/assisi",
  ogImage: "/work/assisi/opengraph-image",
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-studio-display text-2xl text-studio-text">{children}</h2>;
}

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
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">{study.name}</h1>
          <p className="type-body max-w-prose text-studio-muted">{proof.role}</p>

          <div className="grid grid-cols-1 gap-x-4 gap-y-2 border-t border-studio-line pt-5 font-studio-sans text-sm text-studio-muted sm:grid-cols-2">
            <p>{study.category}</p>
            <p>Status: {study.status}</p>
          </div>
        </header>

        <div className="border-b border-studio-line py-12">
          <div className="flex h-56 w-full max-w-3xl flex-col justify-between border border-studio-line bg-studio-surface p-6">
            <p className="text-sm text-studio-faint">{study.category}</p>
            <p className="font-studio-display text-3xl text-studio-text">{study.name}</p>
            <p className="text-sm font-bold text-studio-muted">Preview after sign-off</p>
          </div>
        </div>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>The brief</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">{study.challenge}</p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>What I built</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">{study.solution}</p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where it stands</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">{study.result}</p>
          <p className="mt-4 max-w-prose type-body text-studio-muted">
            Screenshots and a public link go up here once the sanctuary has signed it off.
          </p>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work/shelterlink"
              className="inline-flex min-h-11 items-center font-studio-sans text-sm text-studio-text transition-colors hover:text-studio-accent"
            >
              Next case study
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent"
            >
              Got a similar problem? Get in touch.
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
