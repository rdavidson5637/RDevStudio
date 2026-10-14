import type { Metadata, Viewport } from "next";
import { Anton, Atkinson_Hyperlegible, Big_Shoulders, Geist, Space_Mono } from "next/font/google";
import { rootMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { SiteMetrics } from "@/components/layout/SiteMetrics";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-studio-display",
  display: "swap",
  adjustFontFallback: false,
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-studio-sans",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F2219",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${anton.variable} ${spaceMono.variable} ${bigShoulders.variable} ${atkinson.variable} ${geist.variable}`}
    >
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <SiteMetrics />
      </body>
    </html>
  );
}
