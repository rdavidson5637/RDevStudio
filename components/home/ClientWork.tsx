import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clientBySlug } from "@/lib/content/products";

const HOME_JOBS = ["assisi", "shelterlink", "rvs-cold-brew"] as const;
const JOBS = HOME_JOBS.map((slug) => clientBySlug(slug)).filter((job) => job !== undefined);

export function ClientWork() {
  return (
    <section className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <SectionHeader
          tone="studio"
          label="Client work"
          heading="Real clients. Real sites."
          href="/work"
          linkLabel="All work"
        />
        <div className="mt-12 grid items-start gap-12 md:grid-cols-12">
          <figure className="md:col-span-5">
            <div className="relative aspect-[16/10] bg-studio-surface">
              <Image
                src="/images/work/rvs-coldbrew-hero.jpg"
                alt="RV's Cold Brew website, with the counter behind the headline"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="type-body mt-3 text-studio-muted">
              RV&apos;s Cold Brew, Unit 11, Great Northern Mall.
            </figcaption>
          </figure>
          <ul className="border-t border-studio-border md:col-span-7">
            {JOBS.map((job) => (
              <li key={job.slug} className="border-b border-studio-border">
                <Link
                  href={job.href ?? "/work"}
                  className="group block py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                >
                  <span className="type-label text-studio-muted">{job.statusLabel}</span>
                  <span className="mt-2 block font-studio-display text-3xl text-studio-text transition-colors duration-200 group-hover:text-amber">
                    {job.name}
                  </span>
                  <span className="type-body mt-2 block max-w-xl text-studio-muted">{job.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
