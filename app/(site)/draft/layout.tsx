import { Nav } from "@/components/analyser/nav";
import "./analyser.css";

export const dynamic = "force-dynamic";

export default function DraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="draft-analyser">
      <div className="shell">
        <p className="t-label soft">Academy FC</p>
        <Nav />
      </div>
      <div className="shell" style={{ paddingTop: "1.75rem" }}>
        {children}
      </div>
    </div>
  );
}
