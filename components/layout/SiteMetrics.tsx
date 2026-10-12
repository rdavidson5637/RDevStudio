"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (navigator.webdriver) return null;
  return event;
}

export function SiteMetrics() {
  return <Analytics beforeSend={beforeSend} />;
}
