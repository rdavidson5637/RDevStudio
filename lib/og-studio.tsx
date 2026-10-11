import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export async function studioOgImage(headline: string) {
  const [display, mono] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/DMSerifDisplay.ttf")),
    readFile(join(process.cwd(), "app/fonts/GeistMono.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0F",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#F4F4F5",
          padding: "72px",
        }}
      >
        <div style={{ fontFamily: "DM Serif Display", fontSize: 44 }}>RDev Studio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "DM Serif Display", fontSize: 68, lineHeight: 1.08, maxWidth: 980 }}>{headline}</div>
          <div style={{ width: 88, height: 4, background: "#F59E0B", marginTop: 28 }} />
        </div>
        <div style={{ fontFamily: "Geist Mono", fontSize: 24, letterSpacing: 1, color: "#A1A1AA" }}>rdevstudio.co.uk</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "DM Serif Display", data: toArrayBuffer(display), style: "normal", weight: 400 },
        { name: "Geist Mono", data: toArrayBuffer(mono), style: "normal", weight: 400 },
      ],
    },
  );
}
