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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-studio-display text-2xl text-studio-text">{children}</h2>;
}

const BUILD_FEATURES = [
  "Full rebuild of the public website",
  "New brand to go with the site",
  "Phone and desktop layouts from the start",
  "Clear paths for adopters, donors and supporters",
  "Animals and ways to help without deep menus",
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
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">{study.name}</h1>
          <p className="type-body max-w-prose text-studio-muted">
            A rebuilt website and brand for Assisi Animal Sanctuary in Belfast.
            Built and waiting on the sanctuary&apos;s sign-off before a public
            preview goes up.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-studio-line pt-5 font-studio-sans text-sm text-studio-muted lg:grid-cols-4">
            <p>Role: design and development, solo</p>
            <p>Type: Website and brand</p>
            <p>Status: Built - awaiting sign-off</p>
            <p>Year - 2025-26</p>
          </div>
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
          <SectionHeading>What they needed</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            A sanctuary site has to stay calm and clear. Adopters, donors and
            supporters should find animals and ways to help without hunting
            through menus, on a phone as easily as on a desktop.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>What I built</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            A full rebuild of the public website and a new brand to go with it.
            Layout and copy aim at the jobs people actually come to do: meet
            animals, learn how to help, and get in touch.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUILD_FEATURES.map((feature) => (
              <li
                key={feature}
                className="rounded-lg border border-studio-line bg-studio-surface px-4 py-3 font-studio-sans text-sm text-studio-text"
              >
                {feature}
              </li>
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
          <SectionHeading>Where it stands</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            Built and awaiting their sign-off. The sanctuary has not adopted
            this rebrand publicly yet. Screenshots stay off the studio site
            until they say otherwise.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Run a rescue or a charity?</SectionHeading>
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

        <CaseFooter next={{ href: "/work/crosskennan", label: "Crosskennan" }} />
      </article>
    </div>
  );
}
