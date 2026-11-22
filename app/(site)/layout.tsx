import { ChunkLoadRecovery } from "@/components/ChunkLoadRecovery";
import { SiteShell } from "@/components/studio/SiteChrome";
import "./studio.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteShell before={<ChunkLoadRecovery />}>{children}</SiteShell>;
}
