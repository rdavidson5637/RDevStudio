import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { rootMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { SiteMetrics } from "@/components/layout/SiteMetrics";
import "./globals.css";

// Self-hosted (OFL, from Fontsource) so builds never depend on Google Fonts.
const dmSerifDisplay = localFont({
  src: [
    { path: "./fonts/dm-serif-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-serif-display-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const instrumentSans = localFont({
  src: [
    { path: "./fonts/instrument-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
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
      className={`${dmSerifDisplay.variable} ${instrumentSans.variable}`}
    >
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <SiteMetrics />
      </body>
    </html>
  );
}
