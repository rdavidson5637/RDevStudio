import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Job = {
  title: string;
  badge: string;
  badgeVariant: "note" | "soon";
  copy: string;
  href: string;
  tags: readonly string[];
  image?: { src: string; alt: string; position?: string };
  wide?: boolean;
};

const JOBS: readonly Job[] = [
  {
    title: "Assisi Animal Sanctuary",
    badge: "Built - awaiting sign-off",
    badgeVariant: "note",
    copy: "A rebuilt site and brand for Assisi Animal Sanctuary in Belfast. Built and ready for their feedback.",
    href: "/work",
    tags: ["Charity", "Rebrand", "Next.js"],
  },
  {
    title: "ShelterLink",
    badge: "Ready for live use",
    badgeVariant: "soon",
    copy: "Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary.",
    href: "/work/shelterlink",
    tags: ["Charity", "Web app", "Admin dashboard"],
    image: {
      src: "/images/work/shelterlink-admin-dashboard.png",
      alt: "ShelterLink admin dashboard showing volunteer rotas",
      position: "object-top",
    },
  },
  {
    title: "RV's Cold Brew",
    badge: "Live site - nearly finished",
    badgeVariant: "soon",
    copy: "A Belfast cold brew and matcha counter. Menu, hours and where to find Unit 11. Square is linked and the last details are being finished.",
    href: "/work/rvs-cold-brew",
    tags: ["Brand site", "Belfast", "Next.js"],
    image: {
      src: "/images/work/rvs-coldbrew-hero.jpg",
      alt: "RV's Cold Brew website, with the counter behind the headline",
      position: "object-top",
    },
    wide: true,
  },
];

function JobCard({ job, delay }: { job: Job; delay: number }) {
  return (
    <Reveal delay={delay} className={`h-full ${job.wide ? "lg:col-span-2" : ""}`}>
      <Link
        href={job.href}
        className={`studio-card group flex h-full flex-col overflow-hidden rounded-studio border border-studio-border bg-studio-surface transition duration-200 hover:-translate-y-0.5 hover:border-amber/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber ${
          job.wide ? "lg:flex-row" : ""
        }`}
      >
        <span
          className={`relative block aspect-[16/10] overflow-hidden bg-studio-surface-2 ${
            job.wide ? "lg:aspect-auto lg:min-h-[18rem] lg:w-3/5" : ""
          }`}
        >
          {job.image ? (
            <Image
              src={job.image.src}
              alt={job.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${job.image.position ?? ""}`}
            />
          ) : (
            <span className="relative flex h-full w-full items-center justify-center">
              <span aria-hidden="true" className="glow-amber absolute inset-0 opacity-30" />
              <span
                aria-hidden="true"
                className="relative font-studio-display text-8xl text-studio-text/90"
              >
                {job.title.charAt(0)}
              </span>
            </span>
          )}
        </span>
        <span className={`flex flex-1 flex-col gap-3 p-6 ${job.wide ? "lg:justify-center lg:p-8" : ""}`}>
          <StatusBadge variant={job.badgeVariant} className="self-start">
            {job.badge}
          </StatusBadge>
          <span className="font-studio-display text-3xl leading-tight text-studio-text transition-colors duration-200 group-hover:text-amber">
            {job.title}
          </span>
          <span className="type-body text-studio-muted">{job.copy}</span>
          <span className="mt-auto flex flex-wrap gap-2 pt-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="type-label rounded-full border border-studio-border px-2.5 py-1 text-studio-faint"
              >
                {tag}
              </span>
            ))}
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function ClientWork() {
  return (
    <section className="bg-bg py-14 text-studio-text md:py-20">
      <Container>
        <SectionHeader
          tone="studio"
          label="Client work"
          heading="Real clients. Real sites."
          href="/work"
          linkLabel="All work"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {JOBS.map((job, index) => (
            <JobCard key={job.href} job={job} delay={index * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
