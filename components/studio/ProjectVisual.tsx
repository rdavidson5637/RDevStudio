import Image from "next/image";
import type { CaseStudy, PreviewPanel } from "@/components/studio/case-studies";

function PlainFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-frame">
      <div className="mb-frame-chrome">
        <span className="truncate">{label}</span>
      </div>
      {children}
    </div>
  );
}

/** Typographic panel for projects without approved screenshots. Real facts only. */
function PanelBody({ panel, tall = false }: { panel: PreviewPanel; tall?: boolean }) {
  return (
    <div
      className={`flex flex-col justify-between bg-[var(--mb-bg)] p-4 sm:p-5 ${
        tall ? "min-h-[260px] sm:p-6" : "min-h-[210px] sm:aspect-[16/10]"
      }`}
    >
      <div className="grid gap-6 py-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:gap-8">
        <div className="min-w-0 space-y-2">
          <span className="block h-1 w-10 bg-[var(--mb-accent)]" aria-hidden="true" />
          <p className="mb-preview-lede">{panel.title}</p>
          <p className="mb-preview-note">{panel.lede}</p>
        </div>
        <ul className="mb-preview-note divide-y divide-[var(--mb-line)] border-y border-[var(--mb-line)] font-medium text-[var(--mb-ink)]">
          {panel.items.map((item) => (
            <li key={item} className="py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-preview-note border-t border-[var(--mb-line)] pt-3 font-medium">
        {panel.footer}
      </p>
    </div>
  );
}

/** Compact visual for project rows on the home and work pages. */
export function ProjectPreview({
  study,
  size = "compact",
}: {
  study: CaseStudy;
  size?: "compact" | "featured";
}) {
  const shot = study.shots?.[0];

  if (shot) {
    return (
      <figure className="mb-frame">
        <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--mb-bg)]">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes={
              size === "featured"
                ? "(max-width: 768px) 100vw, 720px"
                : "(max-width: 768px) 100vw, 520px"
            }
            className="h-full w-full object-cover object-top"
            priority={size === "featured"}
          />
        </div>
        <figcaption className="mb-caption">{shot.caption}</figcaption>
      </figure>
    );
  }

  if (study.panel) {
    return (
      <PlainFrame label={study.panel.label}>
        <PanelBody panel={study.panel} />
      </PlainFrame>
    );
  }

  return null;
}

/** Full-width visual band for a case study page and the featured work row. */
export function CaseShowcase({ study, priority = false }: { study: CaseStudy; priority?: boolean }) {
  const [main, ...extras] = study.shots ?? [];

  if (main) {
    return (
      <div className="space-y-5">
        <figure className="mb-frame">
          <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--mb-bg)]">
            <Image
              src={main.src}
              alt={main.alt}
              width={main.width}
              height={main.height}
              sizes="(max-width: 768px) 100vw, 1100px"
              priority={priority}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="mb-caption">{main.caption}</figcaption>
        </figure>

        {extras.length > 0 ? (
          <div
            className={`grid gap-5 md:items-start ${
              extras.length === 1 ? "" : "md:grid-cols-[1.2fr_0.8fr]"
            }`}
          >
            {extras.map((shot, index) => (
              <figure key={shot.src} className="mb-frame">
                <div
                  className={`${
                    index === 0 ? "aspect-[16/10]" : "aspect-[4/3] md:aspect-[16/10]"
                  } w-full overflow-hidden bg-[var(--mb-bg)]`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 640px"
                        : "(max-width: 768px) 100vw, 420px"
                    }
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="mb-caption">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (study.panel) {
    return (
      <PlainFrame label={study.panel.label}>
        <PanelBody panel={study.panel} tall />
      </PlainFrame>
    );
  }

  return null;
}
