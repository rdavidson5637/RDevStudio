import type { Metadata } from "next";
import "./mock-c.css";
import { RevealObserver } from "./RevealObserver";

export const metadata: Metadata = {
  title: "RDev Studio — Independent digital studio",
  description: "Websites and digital products for small businesses and charities.",
  robots: { index: false, follow: false },
};

export default function MockCLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="mock-c"><RevealObserver />{children}</div>;
}
