"use client";

import { useEffect, useRef } from "react";
import { classifyFormErrors, type FormErrorForm } from "@/lib/form-error";
import { reportFormError } from "@/components/contact/report-form-error";

type FormErrorState = {
  getFormErrors: () => readonly { code: string; message: string }[];
};

export function useFormFailureReport(form: FormErrorForm, errors: FormErrorState | null) {
  const reported = useRef<FormErrorState | null>(null);

  useEffect(() => {
    const onViolation = (event: SecurityPolicyViolationEvent) => {
      if (String(event.blockedURI).includes("formspree.io")) {
        reportFormError(form, "csp");
      }
    };
    document.addEventListener("securitypolicyviolation", onViolation);
    return () => document.removeEventListener("securitypolicyviolation", onViolation);
  }, [form]);

  useEffect(() => {
    if (!errors || errors === reported.current) return;
    const kind = classifyFormErrors(errors.getFormErrors());
    if (!kind) return;
    reported.current = errors;
    reportFormError(form, kind);
  }, [errors, form]);
}
