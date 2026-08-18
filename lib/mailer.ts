/**
 * Sending the office its quote PDF.
 *
 * Resend first, SMTP second.
 *
 * The SMTP path stopped delivering while reporting success — nodemailer
 * accepted the message, the function returned 200, and nothing arrived. That
 * failure lives somewhere between the relay and the mailbox, which is not
 * somewhere code can reach. Resend is already proven on this domain, so it
 * becomes the primary and SMTP stays as the fallback rather than being ripped
 * out: if Resend is ever unconfigured, the old path still runs.
 *
 * Whichever path is used, the outcome is returned rather than assumed, so the
 * caller can say plainly that the office did not get its copy.
 */

export type MailOutcome =
  | { ok: true; via: "resend" | "smtp" }
  | { ok: false; via: "resend" | "smtp" | "none"; reason: string };

export async function sendViaResend(params: {
  to: string;
  subject: string;
  text: string;
  pdf: Buffer;
  filename: string;
}): Promise<MailOutcome> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, via: "none", reason: "RESEND_API_KEY not set" };

  const from =
    process.env.QUOTE_FROM_EMAIL?.trim() ||
    "Dirty Dawgz Oven Cleaning <info@dirtydawgzovencleaning.com>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: params.subject,
        text: params.text,
        attachments: [
          { filename: params.filename, content: params.pdf.toString("base64") },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const body = await res.text();
      return {
        ok: false,
        via: "resend",
        reason: `Resend returned ${res.status}: ${body.slice(0, 300)}`,
      };
    }
    return { ok: true, via: "resend" };
  } catch (err) {
    return {
      ok: false,
      via: "resend",
      reason: err instanceof Error ? err.message : "Resend unreachable",
    };
  }
}
