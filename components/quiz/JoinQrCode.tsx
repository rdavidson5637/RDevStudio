"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

interface JoinQrCodeProps {
  joinUrl: string;
  size?: number;
}

export function JoinQrCode({ joinUrl, size = 160 }: JoinQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void QRCode.toDataURL(joinUrl, {
      width: size,
      margin: 1,
      color: {
        dark: "#f4f0e6",
        light: "#00000000",
      },
    }).then((url) => {
      if (active) {
        setDataUrl(url);
      }
    });

    return () => {
      active = false;
    };
  }, [joinUrl, size]);

  if (!dataUrl) {
    return (
      <div
        className="image-shimmer rounded-xl"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={dataUrl}
      alt="QR code to join this game"
      width={size}
      height={size}
      className="rounded-xl"
      unoptimized
    />
  );
}
