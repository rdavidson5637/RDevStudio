import { Button } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "@/components/work/BrowserFrame";
import { captureFor } from "@/lib/work-captures";
import type { ClientWork } from "@/lib/content/products";

type Props = {
  job: ClientWork;
  /** Flip image and text on large screens. */
  flip?: boolean;
  /** Text for the external link, when the job has a siteUrl. */
  siteLinkLabel?: string;
  /** Shown in the image slot when there is no screenshot and the job is waiting on sign-off. */
  waitingLabel?: string;
};

function domainOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

/**
 * One project, large. Uses the screenshots from `npm run capture:screens` when
 * they exist. Without one, it shows the name set in the display face rather
 * than a broken or placeholder image.
 */
export function FeaturedRow({ job, flip = false, siteLinkLabel = "Open the live site", waitingLabel }: Props) {
  // A fresh capture wins. Otherwise use the job's own screenshot, if it has one.
  const desktop = captureFor(job.slug, "desktop") ?? job.image;
  const mobile = captureFor(job.slug, "mobile");
  const domain = domainOf(job.siteUrl);
  const hasCaseStudy = job.href && job.href !== "/work";
  // No screenshot and not waiting on sign-off: skip the image column rather
  // than show an empty panel. The row becomes text only until captures exist.
  const showImage = Boolean(desktop || waitingLabel);

  return (
    <article className="grid items-center gap-8 border-t border-studio-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
      {showImage ? (
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""} ${desktop ? "" : "hidden lg:block"}`}>
          <div className="relative">
            {desktop ? (
              <BrowserFrame src={desktop} alt={`${job.name} website`} domain={domain} sizes="(max-width: 1024px) 100vw, 58vw" />
            ) : (
              <BrowserFrame alt="" domain={domain} sizes="58vw" mutedLabel={waitingLabel} />
            )}
            {mobile ? (
              <div className="absolute -bottom-6 right-4 hidden sm:block">
                <PhoneFrame src={mobile} alt={`${job.name} on a phone`} sizes="144px" />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={`${showImage ? "lg:col-span-5" : "lg:col-span-9"} ${showImage && flip ? "lg:order-1" : ""}`}>
        <p className="text-sm font-bold text-studio-muted">{job.statusLabel}</p>
        <h3 className="mt-2 font-studio-display text-3xl leading-tight text-studio-text md:text-4xl">{job.name}</h3>
        <p className="type-body mt-4 max-w-prose text-studio-muted">{job.summary}</p>
        {job.stack && job.stack.length > 0 ? (
          <p className="mt-4 text-sm text-studio-faint">Built with {job.stack.join(", ")}.</p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {hasCaseStudy ? (
            <Button href={job.href as string} variant="outline">
              Read the case study
            </Button>
          ) : null}
          {job.siteUrl ? (
            <Button href={job.siteUrl} variant="secondary">
              {siteLinkLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function WorkSubheading({ title, note }: { title: string; note: string }) {
  return (
    <div className="mt-16 first:mt-0">
      <h2 className="type-h2 text-studio-text">{title}</h2>
      <p className="type-body mt-2 text-studio-muted">{note}</p>
    </div>
  );
}
