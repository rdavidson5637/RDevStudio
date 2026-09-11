import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ChunkLoadRecovery } from "@/components/ChunkLoadRecovery";
import { SkipToContent } from "@/components/layout/SkipToContent";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-base text-primary">
      <SkipToContent />
      <ChunkLoadRecovery />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
