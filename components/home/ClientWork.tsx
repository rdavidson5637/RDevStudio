import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const JOBS = [
  {
    title: "Assisi Animal Sanctuary",
    badge: "Built - awaiting sign-off",
    copy: "A rebuilt site and brand for Assisi Animal Sanctuary in Belfast. Built and ready for their feedback.",
    href: "/work",
    tags: ["Charity", "Rebrand"],
    image: undefined as string | undefined,
    alt: "",
    frame: "default" as const,
    large: true,
  },
  {
    title: "ShelterLink",
    badge: "Ready for live use",
    copy: "Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary.",
    href: "/work/shelterlink",
    tags: ["Charity", "Next.js"],
    image: "/images/work/shelterlink.png",
    alt: "ShelterLink admin screen showing volunteer shifts",
    frame: "default" as const,
    large: false,
  },
  {
    title: "RV's Cold Brew",
    badge: "Live site - nearly finished",
    copy: "A Belfast cold brew and matcha counter. Menu, hours and where to find Unit 11. Square is linked and the last details are being finished.",
    href: "/work/rvs-cold-brew",
    tags: ["Brand site", "Belfast"],
    image: "/images/work/rvs-coldbrew-hero.jpg",
    alt: "RV's Cold Brew counter with drinks on the menu board",
    frame: "rvs" as const,
    large: false,
  },
] as const;

function JobCard({ job }: { job: (typeof JOBS)[number] }) {
  const rvs = job.frame === "rvs";
  return (
    <article
      className={`studio-card flex h-full flex-col overflow-hidden rounded-studio border bg-studio-surface ${
        rvs ? "border-rvs-teal" : "border-studio-border"
      }`}
    >
      <div className="border-b border-studio-border bg-studio-surface-2 px-4 py-2">
        <p className={`type-label ${rvs ? "text-rvs-cream" : "text-studio-muted"}`}>
          {rvs ? "Unit 11, Great Northern Mall" : "Case study"}
        </p>
      </div>
      <div className="relative aspect-[16/10] bg-studio-surface-2">
        {job.image ? (
          <Image
            src={job.image}
            alt={job.alt}
            fill
            sizes={job.large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
            className="object-cover object-top"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center">
            <span className="glow-amber absolute inset-10 opacity-60" aria-hidden="true" />
            <span className="display-lg relative text-studio-text">A</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <StatusBadge variant="note">{job.badge}</StatusBadge>
        <h3 className="type-h3 mt-4 text-studio-text">{job.title}</h3>
        <p className="type-body mt-2 text-studio-muted">{job.copy}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <li key={tag} className="type-label text-studio-muted">
              {tag}
            </li>
          ))}
        </ul>
        <Link
          href={job.href}
          className="mt-6 inline-flex min-h-11 items-center text-sm text-studio-text underline-offset-4 hover:text-amber hover:underline"
        >
          Read the case study
        </Link>
      </div>
    </article>
  );
}

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
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:grid-rows-2">
          {JOBS.map((job, index) => (
            <Reveal key={job.title} delay={index * 80} className={job.large ? "md:row-span-2" : undefined}>
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>
        <p className="type-body mt-8 text-studio-muted">
          Also built:{" "}
          <Link href="/work/paintball-wales" className="text-studio-text underline-offset-4 hover:text-amber hover:underline">
            Paintball Wales
          </Link>
          , a phone-first booking enquiry site.
        </p>
      </Container>
    </section>
  );
}
