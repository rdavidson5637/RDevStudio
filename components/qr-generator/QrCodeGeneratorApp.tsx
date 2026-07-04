"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

type QrType = "url" | "wifi" | "text";

export function QrCodeGeneratorApp() {
  const canvasId = useId();
  const [qrType, setQrType] = useState<QrType>("url");
  const [url, setUrl] = useState("https://rdevstudio.co.uk");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    recordRecentSlug("qr-code-generator");
  }, []);

  const getPayload = useCallback((): string => {
    if (qrType === "url") return url.trim();
    if (qrType === "text") return text.trim();
    if (!ssid.trim()) return "";
    const escaped = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
    return `WIFI:T:WPA;S:${escaped(ssid)};P:${escaped(wifiPassword)};;`;
  }, [qrType, url, text, ssid, wifiPassword]);

  useEffect(() => {
    let cancelled = false;
    const payload = getPayload();
    if (!payload) return;

    import("qrcode")
      .then((QRCode) => {
        if (cancelled) return;
        const canvas = document.getElementById(
          canvasId,
        ) as HTMLCanvasElement | null;
        if (!canvas) return;
        QRCode.toCanvas(canvas, payload, {
          width: 280,
          margin: 2,
          color: { dark: "#16150f", light: "#ffffff" },
        }).catch(() => setError("Could not generate QR code for this input."));
      })
      .catch(() => setError("Could not load QR code generator."));

    return () => {
      cancelled = true;
    };
  }, [getPayload, canvasId, qrType, url, text, ssid, wifiPassword]);

  const downloadPng = () => {
    const canvas = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="QR Code Generator"
        description="Create downloadable QR codes for URLs, Wi-Fi networks, or plain text — no sign-up required."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-5 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <fieldset>
            <legend className="shell-label text-accent">QR type</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["url", "wifi", "text"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setQrType(type)}
                  aria-pressed={qrType === type}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                    qrType === type
                      ? "border-accent bg-accent text-on-accent"
                      : "border-border-strong bg-base text-primary hover:border-accent"
                  }`}
                >
                  {type === "url" ? "URL" : type === "wifi" ? "Wi-Fi" : "Text"}
                </button>
              ))}
            </div>
          </fieldset>

          {qrType === "url" ? (
            <label className="block">
              <span className="shell-label text-accent">URL</span>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
          ) : null}

          {qrType === "wifi" ? (
            <div className="space-y-4">
              <label className="block">
                <span className="shell-label text-accent">
                  Network name (SSID)
                </span>
                <input
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="block">
                <span className="shell-label text-accent">Password</span>
                <input
                  type="password"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
            </div>
          ) : null}

          {qrType === "text" ? (
            <label className="block">
              <span className="shell-label text-accent">Text</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </FadeIn>

        <FadeIn
          delayMs={100}
          className="flex flex-col items-center rounded-[10px] border border-border-strong bg-raised p-6"
        >
          <canvas
            id={canvasId}
            className="rounded-md border border-border bg-white"
            aria-label="Generated QR code preview"
          />
          <button
            type="button"
            onClick={downloadPng}
            className="btn-primary mt-6"
          >
            Download PNG
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
