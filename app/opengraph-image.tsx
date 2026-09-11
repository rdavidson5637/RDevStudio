import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

// Route segment config
export const alt = "RDev Studio - Ryan Davidson, designer and developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Code-generated Open Graph image (1200x630 PNG). Raster output means it
 * actually renders on LinkedIn, Facebook, X, WhatsApp and iMessage, unlike the
 * previous SVG. Auto-applied site-wide by the Next.js file convention.
 */
export default function OpengraphImage() {
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
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#1E5C3A",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Ryan Davidson
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 40,
            color: "#6B685E",
          }}
        >
          Design & development, Northern Ireland
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
          rdevstudio.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
