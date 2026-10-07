import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Archivo, DM_Serif_Display, Geist, Geist_Mono, Space_Mono } from "next/font/google";
import { rootMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-studio-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-studio-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-studio-mono",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${anton.variable} ${archivo.variable} ${spaceMono.variable} ${dmSerif.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
