import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ChunkLoadRecovery } from "@/components/ChunkLoadRecovery";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { BackToTop } from "@/components/ui/BackToTop";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-paper text-primary">
      <SkipToContent />
      <ChunkLoadRecovery />
      <Header />
      {/* tabIndex -1 lets the skip link move focus here, not just scroll. */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
