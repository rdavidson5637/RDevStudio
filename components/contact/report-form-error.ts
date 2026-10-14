import type { FormErrorForm, FormErrorKind } from "@/lib/form-error";

export function reportFormError(form: FormErrorForm, kind: FormErrorKind) {
  const body = JSON.stringify({ form, kind });

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon("/api/form-error", blob)) return;
  }

  void fetch("/api/form-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
