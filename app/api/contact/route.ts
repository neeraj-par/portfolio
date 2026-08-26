import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "neeraj.dsu@gmail.com";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "That doesn't look like a valid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet. This is expected until you add your own Resend API key.
    // See README.md "Wiring up the contact form" for setup steps.
    console.error("RESEND_API_KEY is not set. Contact form submission was not sent.");
    return NextResponse.json(
      { error: "Email sending isn't configured on this deployment yet" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #C15E3D; margin-bottom: 4px;">New message from your portfolio</h2>
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
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send the message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send the message" }, { status: 500 });
  }
}
