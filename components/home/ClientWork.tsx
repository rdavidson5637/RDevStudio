import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { clientBySlug, type ClientWork as ClientJob } from "@/lib/content/products";
import { captureFor } from "@/lib/work-captures";

const FEATURED = ["rvs-cold-brew", "shelterlink"] as const;

function Panel({ job }: { job: ClientJob }) {
  const image = captureFor(job.slug, "desktop") ?? job.image;
  const body = (
    <>
      {image ? (
        <div className="relative aspect-[16/10] bg-studio-bg">
          <Image
            src={image}
            alt={`${job.name} website`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-studio-display text-2xl text-studio-text">{job.name}</h3>
        <p className="type-body mt-2 text-studio-muted">{job.summary}</p>
        <p className="mt-auto pt-3 text-sm font-bold text-studio-text">{job.statusLabel}</p>
      </div>
    </>
  );

  if (!job.href) {
    return <article className="flex h-full flex-col bg-studio-surface">{body}</article>;
  }

  return (
    <Link
      href={job.href}
      className="flex h-full flex-col bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
    >
      {body}
    </Link>
  );
}

export function ClientWork() {
  const jobs = FEATURED.map((slug) => clientBySlug(slug)).filter((job) => job !== undefined);
  const assisi = clientBySlug("assisi");

  return (
    <Section heading="Sites I've built" className="studio-light">
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <Panel key={job.slug} job={job} />
        ))}
      </div>
      {assisi ? (
        <p className="type-body mt-8 max-w-prose text-studio-muted">
          Also: a new site and brand for Assisi Animal Sanctuary. {assisi.statusLabel}.
        </p>
      ) : null}
    </Section>
  );
}
