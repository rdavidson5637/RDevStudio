import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ChunkLoadRecovery } from "@/components/ChunkLoadRecovery";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-base text-primary">
      <ChunkLoadRecovery />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
