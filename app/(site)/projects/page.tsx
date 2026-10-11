import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { products } from "@/lib/content/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Personal builds from RDev Studio. Wardrobe AI, Draft Analyser, Gig Radar, Stout Finder, and Guitar Lab.",
  path: "/projects",
});

const apps = [
  ...products.filter((product) => product.kind === "project" && product.status === "live"),
  ...products.filter((product) => product.kind === "project" && product.status === "soon"),
];

export default function ProjectsPage() {
  return (
    <Section className="bg-bg text-studio-text">
      <p className="eyebrow text-studio-muted">Projects</p>
      <h1 className="display-lg mt-4 max-w-3xl text-balance text-studio-text">Things I build for myself.</h1>
      <p className="type-body mt-5 max-w-xl text-studio-muted">
        Not client work, and not the games. Some are live. The rest are still being built.
      </p>
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apps.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60} className={project.featured ? "lg:col-span-2" : undefined}>
            <ProductCard product={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
