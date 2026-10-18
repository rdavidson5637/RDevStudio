import Image from "next/image";
import Link from "next/link";
import { ProductCover } from "@/components/covers";
import { Button } from "@/components/ui/Button";
import { clientBySlug } from "@/lib/content/products";

function ClientShot({
  slug,
  className = "",
  sizes,
}: {
  slug: "rvs-cold-brew" | "paintball-wales" | "shelterlink";
  className?: string;
  sizes: string;
}) {
  const job = clientBySlug(slug);
  if (!job?.image) return null;

  const card = (
    <>
      <div className="relative aspect-[16/10] w-full bg-studio-bg">
        <Image
          src={job.image}
          alt={`${job.name} website`}
          fill
          sizes={sizes}
          className="object-cover object-top"
          priority={slug === "rvs-cold-brew"}
        />
      </div>
      <div className="border-t border-studio-border px-3 py-2.5 sm:px-4 sm:py-3">
        <p className="font-studio-display text-lg leading-tight text-studio-text sm:text-xl">{job.name}</p>
        <p className="mt-1 text-sm text-studio-faint">{job.statusLabel}</p>
      </div>
    </>
  );

  const shell =
    "block overflow-hidden bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text";

  if (!job.href) {
    return <article className={`${shell} ${className}`}>{card}</article>;
  }

  return (
    <Link href={job.href} className={`${shell} ${className}`}>
      {card}
    </Link>
  );
}

export function Hero() {
  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="mx-auto max-w-studio px-6 md:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h1 className="display-xl max-w-[16ch] text-balance text-studio-text">
              Websites for businesses and charities in Northern Ireland
            </h1>
            <p className="type-body mt-5 max-w-prose text-studio-muted md:mt-6">
              I&apos;m Ryan, one person in Carrickfergus doing the whole job, from the first chat to launch. Client
              sites, charity work and the games I build for mates all live here.
            </p>
            <div className="mt-6 md:mt-8">
              <Button href="/contact">Get a quote</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <ClientShot
              slug="rvs-cold-brew"
              className="col-span-2"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <ClientShot slug="paintball-wales" sizes="(max-width: 1024px) 50vw, 25vw" />
            <ClientShot slug="shelterlink" sizes="(max-width: 1024px) 50vw, 25vw" />
            <Link
              href="/champions-draft"
              className="col-span-2 block overflow-hidden bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              <ProductCover slug="champions-draft" initial="Champions Draft" />
              <p className="border-t border-studio-border px-3 py-2.5 text-sm text-studio-faint sm:px-4 sm:py-3">
                Champions Draft. Spin squads, draft your XI.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
