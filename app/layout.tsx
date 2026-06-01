import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Modern Websites for Local Businesses`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "RDev Studio builds fast, affordable websites for small and medium businesses in Northern Ireland. Based in Carrickfergus. Live in 7 days.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="font-sans">
        <Header />
        <main className="min-h-[calc(100vh-16rem)]">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
