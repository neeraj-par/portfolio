"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";

const to = encodeURIComponent(profile.email);
const OPTIONS = [
  { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}` },
  { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}` },
  { label: "Yahoo Mail", href: `https://compose.mail.yahoo.com/?to=${to}` },
  { label: "Default mail app", href: `mailto:${profile.email}` },
];

// Email icon button that opens a menu of mail providers, since a bare mailto: does nothing without a desktop mail app.
const EmailMenu = ({ className, children }: { className: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Stop a pending "Copied!" reset if the menu unmounts.
  useEffect(() => () => clearTimeout(timer.current), []);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector("button")?.focus();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the address is still visible elsewhere on the page.
    }
  };

  const item = "block w-full px-3.5 py-2 text-left text-[13px] text-ink hover:bg-accent-soft hover:text-accent";
  return (
    <div ref={ref} className="relative" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}>
      <button
        type="button"
        aria-label="Email"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={className}
      >
        {children}
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-44 -translate-x-1/2 overflow-hidden rounded-md border border-black/[0.2] bg-card py-1 shadow-xl">
          {OPTIONS.map((o) => (
            <a
              key={o.label}
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={item}
            >
              {o.label}
            </a>
          ))}
          <button type="button" onClick={copy} className={`${item} border-t border-dashed border-black/[0.14]`}>
            {copied ? "Copied!" : "Copy address"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailMenu;
