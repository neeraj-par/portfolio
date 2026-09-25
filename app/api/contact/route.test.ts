import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST } from "./route";

let ipCounter = 0;

// Builds a POST request with a unique IP so the in-memory rate limit does not leak between tests.
const makeRequest = (body: unknown, ip = `10.0.0.${++ipCounter}`) =>
  new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });

const valid = { name: "Ada", email: "ada@example.com", subject: "Hello", message: "Nice site" };

describe("POST /api/contact", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ error: null });
    process.env.RESEND_API_KEY = "test-key";
  });

  it("rejects missing fields", async () => {
    const res = await POST(makeRequest({ ...valid, message: "" }));
    expect(res.status).toBe(400);
  });

  it("rejects an invalid email", async () => {
    const res = await POST(makeRequest({ ...valid, email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("rejects over-long fields", async () => {
    const res = await POST(makeRequest({ ...valid, message: "x".repeat(5001) }));
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot submissions without sending", async () => {
    const res = await POST(makeRequest({ ...valid, hp_trap: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 500 when the API key is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(makeRequest(valid));
    expect(res.status).toBe(500);
  });

  it("sends the email and escapes HTML", async () => {
    const res = await POST(makeRequest({ ...valid, message: "<script>alert(1)</script>" }));
    expect(res.status).toBe(200);
    const html = send.mock.calls[0][0].html as string;
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("rate limits after 5 messages from the same IP", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await POST(makeRequest(valid, "9.9.9.9"))).status);
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses[5]).toBe(429);
  });
});
