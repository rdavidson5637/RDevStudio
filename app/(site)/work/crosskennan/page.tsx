import Link from "next/link";
import { CaseFooter } from "@/components/work/CaseFooter";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata = createPageMetadata({
  title: "Crosskennan Lane Animal Sanctuary",
  description:
    "Charity website for Crosskennan Lane Animal Sanctuary near Antrim: adoption listings, volunteer forms, donate and ways to help. Vercel preview online.",
  path: "/work/crosskennan",
  ogImage: "/work/crosskennan/opengraph-image",
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-studio-display text-2xl text-studio-text">{children}</h2>;
}

const BUILD_FEATURES = [
  "Adoption listings for dogs, cats and horses",
  "Rehoming applications (dog, cat, equine)",
  "Adult and under-18 volunteer forms",
  "Donate, sponsor and ways-to-help pages",
  "Phone-first layout throughout",
  "Mailto fallback until Formspree IDs are set",
] as const;

export default function CrosskennanCaseStudyPage() {
  return (
    <div className="bg-studio-bg py-16 font-studio-sans text-studio-text md:py-24 lg:py-32">
      <article className="container-wide px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: "Crosskennan" },
          ]}
          className="mb-8"
        />
        <header className="space-y-6 border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">Crosskennan Lane Animal Sanctuary</h1>
          <p className="type-body max-w-prose text-studio-muted">
            A charity site for a volunteer-run sanctuary near Antrim. Adoption,
            volunteering, donate and support pages, built so people can find an
            animal or a way to help on a phone.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-studio-line pt-5 font-studio-sans text-sm text-studio-muted lg:grid-cols-4">
            <p>Role: design and development, solo</p>
            <p>Stack: Next.js, Tailwind, TypeScript</p>
            <p>Status: Preview online</p>
            <p>Year - 2026</p>
          </div>
        </header>

        <div className="border-b border-studio-line py-12">
          <div className="flex min-h-56 w-full flex-col items-center justify-center gap-2 border border-studio-line bg-studio-surface p-8 text-center">
            <p className="font-studio-display text-2xl text-studio-text">
              Screenshot placeholder
            </p>
            <p className="max-w-prose text-sm text-studio-muted">
              Homepage and adopt screenshots go here once captured from the
              Vercel preview.
            </p>
          </div>
        </div>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>What they needed</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            Crosskennan Lane Animal Sanctuary rescues and rehomes horses, dogs,
            cats and other animals. Supporters needed one clear place to meet
            animals, apply to rehome, volunteer (including under-18s with a
            guardian), donate, sponsor and find other ways to help - without
            hunting through an old site.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>What I built</SectionHeading>
          <div className="max-w-prose space-y-5 type-body text-studio-text">
            <p>
              A phone-first Next.js site: adoption listings, species rehoming
              applications, volunteer forms with a separate under-18 path,
              donate and support pages, and the sanctuary&apos;s ways to help.
            </p>
            <p>
              Forms go through Formspree when the matching public Formspree IDs
              are set. Until then they fall back to mailto so nothing silently
              fails. Agent-written listing and form work is still being reviewed
              before anything is treated as final.
            </p>
          </div>

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
        </section>

        <section className="border-b border-studio-line py-12">
          <SectionHeading>Where it stands</SectionHeading>
          <p className="max-w-prose type-body text-studio-text">
            A Vercel preview is online. Formspree IDs are still unset, so forms
            use mailto. Animal listings and horse profiles are still being
            finished. This is not the sanctuary&apos;s production domain yet.
          </p>
          <a
            href="https://crosskennan.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center text-base font-semibold text-studio-text transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            Open the preview
          </a>
          <p className="mt-6 type-body text-studio-muted">
            Related charity work:{" "}
            <Link
              href="/work/assisi"
              className="inline-flex min-h-11 items-center font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              Assisi site and brand<span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>
          </p>
        </section>

        <CaseFooter next={{ href: "/work/rondo", label: "Rondo" }} />
      </article>
    </div>
  );
}
