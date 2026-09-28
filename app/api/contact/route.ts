import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "neeraj.dsu@gmail.com";
// Sender is configurable so a verified Resend domain can replace the shared sandbox address without a code change.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 };
// Rough ceiling on raw request body size, well above the combined LIMITS fields plus JSON overhead.
const MAX_BODY_BYTES = 20_000;
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// TODO: in-memory per instance, so serverless cold starts reset it. Move to Redis or Upstash if abuse shows up.
const hits = new Map<string, number[]>();

// Drops this IP's old timestamps, and sweeps the whole map when it gets large so it cannot grow forever.
const recentHits = (ip: string) => {
  const now = Date.now();
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  const fresh = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.set(ip, fresh);
  return fresh;
};

// Returns true when this IP already used all RATE_MAX slots inside the window.
const isRateLimited = (ip: string) => recentHits(ip).length >= RATE_MAX;

// Reserves one slot for this IP before sending, so parallel requests cannot all slip past the check.
const reserveSlot = (ip: string) => hits.set(ip, [...recentHits(ip), Date.now()]);

// Gives the slot back when the send failed, so a failed send does not count against the visitor.
const releaseSlot = (ip: string) => hits.set(ip, recentHits(ip).slice(0, -1));

// Escapes user text before it goes into the HTML email body.
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Receives the contact form and forwards it to the owner's inbox through Resend.
export const POST = async (req: NextRequest) => {
  // The last forwarded hop is the one the hosting proxy added, so a client cannot fake it by sending its own header.
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages, please try again later" }, { status: 429 });
  }

  // Measure actual bytes, not a client-supplied content-length header (chunked requests omit it anyway).
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Bots fill the hidden "hp_trap" field. Pretend it worked so they do not retry.
  if (body.hp_trap) return NextResponse.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "One of the fields is too long" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "That doesn't look like a valid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet. Add RESEND_API_KEY to .env.local, or to the hosting provider's environment variables.
    console.error("RESEND_API_KEY is not set. Contact form submission was not sent.");
    return NextResponse.json({ error: "Email sending isn't configured on this deployment yet" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  reserveSlot(ip);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO_EMAIL,
      replyTo: email,
      // Strip line breaks so the subject cannot inject extra mail headers.
      subject: `[Portfolio] ${subject.replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #B0502F; margin-bottom: 4px;">New message from your portfolio</h2>
          <p style="color: #5B564A; font-size: 13px; margin-top: 0;">Sent via the contact form on your site</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 6px 0; color: #96907D; font-size: 12px; text-transform: uppercase;">Name</td>
              <td style="padding: 6px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #96907D; font-size: 12px; text-transform: uppercase;">Email</td>
              <td style="padding: 6px 0;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #96907D; font-size: 12px; text-transform: uppercase;">Subject</td>
              <td style="padding: 6px 0;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="border-top: 1px dashed #ddd8cc; padding-top: 12px; white-space: pre-wrap; line-height: 1.6;">
            ${escapeHtml(message)}
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #96907D;">
            Reply directly to this email to respond to ${escapeHtml(name)}.
          </p>
        </div>
      `,
    });

    if (error) {
      releaseSlot(ip);
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send the message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    releaseSlot(ip);
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send the message" }, { status: 500 });
  }
};
