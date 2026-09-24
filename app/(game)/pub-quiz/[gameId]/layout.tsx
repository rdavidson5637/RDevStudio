import type { Metadata } from "next";

// Game rooms (and their /present screens) are short-lived and private to the
// people playing: keep them out of search. No canonical, since a noindex page
// should not also claim to be a copy of /pub-quiz. Everything else, including
// the link preview, is inherited from the Pub Quiz layout.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function PubQuizGameLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
