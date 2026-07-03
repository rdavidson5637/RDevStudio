import Link from "next/link";
import { FadeIn } from "./FadeIn";

type ToolkitToolHeaderProps = {
  backHref?: string;
  backLabel?: string;
  category: string;
  title: string;
  description: string;
};

export function ToolkitToolHeader({
  backHref = "/toolkit",
  backLabel = "Business Toolkit",
  category,
  title,
  description,
}: ToolkitToolHeaderProps) {
  return (
    <>
      <Link
        href={backHref}
        className="text-sm font-medium text-secondary transition-colors hover:text-accent"
      >
        ← {backLabel}
      </Link>

      <FadeIn
        as="header"
        className="mt-8 max-w-3xl border-b border-border pb-10"
      >
        <p className="shell-label text-accent">{category}</p>
        <h1 className="programme-h1 mt-4">{title}</h1>
        <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
          {description}
        </p>
      </FadeIn>
    </>
  );
}
