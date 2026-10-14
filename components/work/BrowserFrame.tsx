import Image from "next/image";

type FrameProps = {
  src?: string;
  alt: string;
  domain?: string;
  sizes: string;
  priority?: boolean;
  mutedLabel?: string;
};

export function BrowserFrame({ src, alt, domain, sizes, priority = false, mutedLabel }: FrameProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-studio-line bg-studio-surface">
      <div className="flex items-center gap-2 border-b border-studio-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {domain ? (
          <span className="ml-2 truncate font-studio-sans text-xs text-studio-muted">
            {domain}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-[16/10] bg-studio-surface-2">
        {src ? (
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
        ) : (
          <p className="flex h-full items-center justify-center px-4 text-center font-studio-sans text-xs text-studio-muted">
            {mutedLabel ?? "Preview after sign-off"}
          </p>
        )}
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, sizes }: { src?: string; alt: string; sizes: string }) {
  return (
    <div className="w-28 overflow-hidden rounded-[1.4rem] border border-studio-line-strong bg-studio-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:w-36">
      <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-white/15" />
      <div className="relative mx-1.5 mb-1.5 mt-2 aspect-[9/16] overflow-hidden rounded-lg bg-studio-surface-2">
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        ) : (
          <p className="flex h-full items-center justify-center px-2 text-center font-studio-sans text-xs text-studio-muted">
            Preview after sign-off
          </p>
        )}
      </div>
    </div>
  );
}
