"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-[1120px] px-5 md:px-7">
        <div className="mx-auto mb-9 max-w-xl text-center md:mb-14">
          <p className="section-eyebrow">Let&apos;s Create</p>
          <h2 className="section-title inline-block">Let&apos;s build something.</h2>
          <svg className="mx-auto block h-2.5 w-full max-w-[220px]" viewBox="0 0 220 10" fill="none">
            <path
              d="M2 6 Q 20 1 38 6 T 74 6 T 110 6 T 146 6 T 182 6 T 218 6"
              stroke="#C15E3D"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </svg>
          <p className="mx-auto mt-2.5 max-w-[320px] font-caveat text-xl leading-snug text-ink-soft">Drop me a line. I usually reply the same day.</p>
        </div>

        <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(300px,0.9fr)_minmax(420px,1.1fr)] md:gap-8">
          <div className="mobile-card rounded-[10px] bg-ink p-6 text-paper md:w-auto md:p-8">
            <h3 className="mb-2 font-sora text-[22px]">Say Hello</h3>
            <p className="mb-6 font-caveat text-xl text-[#E7B39D]">
              Building projects and collaborations. Drop me a line.
            </p>

            <ContactRow href={`mailto:${profile.email}`} label={profile.email}>
              <path d="M4 4h16v16H4z" />
              <path d="m4 4 8 8 8-8" />
            </ContactRow>
            <ContactRow href={profile.mapsUrl} label="I.I. Chundrigar, Karachi" external>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </ContactRow>

            <div className="mt-6 flex gap-2.5">
              <ContactIcon href={profile.github} label="GitHub" external>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91.5S18.73.15 16 2a13.38 13.38 0 0 0-7 0C6.27.15 5.09.5 5.09.5A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </ContactIcon>
              <ContactIcon href={profile.linkedin} label="LinkedIn" external>
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
                <path d="M10 9h4v2a4 4 0 0 1 8 0v9h-4v-8a2 2 0 0 0-4 0v8h-4z" />
              </ContactIcon>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card card-hover mobile-card min-w-0 p-5 pb-6 md:w-auto md:p-7">
            <Field id="name" label="Name" placeholder="Your full name" />
            <Field id="email" label="Email" type="email" placeholder="you@example.com" />
            <Field id="subject" label="Subject" placeholder="What's this about?" />
            <div className="mb-4">
              <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full rounded-md border border-black/[0.14] bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <motion.button
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="sketch-btn w-full py-3.5 text-[14.5px] font-semibold disabled:opacity-60"
            >
              <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
            </motion.button>

            {status === "sent" && (
              <p className="mt-3 text-sm text-emerald-700">Message sent. I&apos;ll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-700">
                Couldn&apos;t send that: {errorMsg}. You can also email {profile.email} directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-ink-faint">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-md border border-black/[0.14] bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}

function ContactRow({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3 text-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-[18px] w-[18px] shrink-0">
        {children}
      </svg>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="border-b border-paper/30 text-paper hover:border-accent hover:text-accent"
      >
        {label}
      </a>
    </div>
  );
}

function ContactIcon({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="sketch-icon-btn float-icon flex h-[38px] w-[38px] items-center justify-center rounded-full border border-paper/20 bg-paper/[0.06] text-paper hover:border-accent hover:text-accent"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        {children}
      </svg>
    </motion.a>
  );
}
