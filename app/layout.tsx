import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { rootMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { SiteMetrics } from "@/components/layout/SiteMetrics";
import "./globals.css";

// Self-hosted (OFL, from Fontsource) so builds never depend on Google Fonts.
// Grenadine brief: Big Shoulders Display 800 for headings, Atkinson Hyperlegible for body.
const bigShouldersDisplay = localFont({
  src: [
    { path: "./fonts/big-shoulders-display-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const atkinsonHyperlegible = localFont({
  src: [
    { path: "./fonts/atkinson-hyperlegible-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/atkinson-hyperlegible-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#112F2C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${bigShouldersDisplay.variable} ${atkinsonHyperlegible.variable}`}
    >
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <SiteMetrics />
      </body>
    </html>
  );
}
