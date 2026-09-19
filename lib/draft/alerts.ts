import "server-only";
import { deadlineFlags, inDeadlineAlertWindow } from "./deadline";
import { getCurrentEvent } from "./queries";
import { getSquad } from "./squad";

export async function sendDeadlineAlerts(): Promise<{
  sent: boolean;
  reason?: string;
  flags: string[];
  deadline: string | null;
  email: boolean;
  webhook: boolean;
}> {
  const event = await getCurrentEvent();
  const deadline = event?.nextDeadlineTime ?? null;
  if (!event || !inDeadlineAlertWindow(deadline)) {
    return { sent: false, reason: "outside window", flags: [], deadline, email: false, webhook: false };
  }

  let entryId: number;
  try {
    entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
  } catch {
    return { sent: false, reason: "missing entry id", flags: [], deadline, email: false, webhook: false };
  }

  const flags = deadlineFlags(await getSquad(entryId, event.id));
  if (flags.length === 0) {
    return { sent: false, reason: "clean XI", flags, deadline, email: false, webhook: false };
  }

  const body = {
    title: "FPL Draft deadline",
    message: `Deadline check: your XI currently has ${flags.join(", ")}. Change it in the FPL app - this site is read-only.`,
    flags,
    deadline,
    event: event.name,
  };

  let email = false;
  let webhook = false;

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.DRAFT_ALERT_EMAIL;
  const from = process.env.DRAFT_ALERT_FROM;
  if (resendKey && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `${body.title}: ${flags.join(", ")}`,
        text: `${body.message}\n\nDeadline: ${deadline}\n${event.name}`,
      }),
    });
    email = res.ok;
    if (!res.ok) {
      return {
        sent: false,
        reason: `email failed: ${await res.text()}`,
        flags,
        deadline,
        email,
        webhook,
      };
    }
  }

  const hook = process.env.DRAFT_ALERT_WEBHOOK;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    webhook = res.ok;
  }

  return {
    sent: email || webhook,
    reason: email || webhook ? undefined : "no DRAFT_ALERT_EMAIL/FROM or DRAFT_ALERT_WEBHOOK configured",
    flags,
    deadline,
    email,
    webhook,
  };
}
