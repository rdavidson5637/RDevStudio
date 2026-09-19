import Link from "next/link";

export function OsmCredit({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-secondary ${className}`}>
      Pub locations from{" "}
      <Link
        href="https://www.openstreetmap.org/copyright"
        className="underline-offset-2 hover:text-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        OpenStreetMap contributors
      </Link>
      .
    </p>
  );
}
