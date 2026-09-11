import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

/**
 * Shared Open Graph image renderer for tool pages. Keeps every tool's shared
 * link preview on-brand and per-tool (title + section) without duplicating the
 * markup in 20+ route files. Each tool's opengraph-image.tsx just calls this.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function toolOgImage(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F7F5F0",
          color: "#16150F",
          borderTop: "10px solid #1E5C3A",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#1E5C3A",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            color: "#6B685E",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 16,
              background: "#1E5C3A",
              marginRight: 16,
            }}
          />
          {SITE_NAME} · rdevstudio.co.uk
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
