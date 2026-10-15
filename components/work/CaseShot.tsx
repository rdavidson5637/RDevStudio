import Image from "next/image";

export function CaseShot({
  src,
  alt,
  caption,
  priority = false,
  position = "top",
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
  position?: "top" | "center";
}) {
  return (
    <figure className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
      <div className="relative aspect-[16/10] bg-studio-surface">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={position === "center" ? "object-cover object-center" : "object-cover object-top"}
        />
      </div>
      <figcaption className="mx-auto mt-3 max-w-studio px-6 text-sm text-studio-faint md:px-8">{caption}</figcaption>
    </figure>
  );
}
