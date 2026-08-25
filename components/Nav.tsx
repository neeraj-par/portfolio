"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "The Engineer" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#story", label: "Story So Far" },
  { href: "#education", label: "Education" },
];

export default function Nav() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-black/[0.14] bg-[#FBF8F0]/90 py-2 pl-5 pr-2 shadow-[0_1px_0_rgba(34,31,26,0.05),0_14px_26px_-18px_rgba(34,31,26,0.35)] backdrop-blur">
        <a href="#top" className="mr-2.5 flex shrink-0 items-center gap-1.5 font-sora text-[15px] font-bold">
          <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-4 w-4">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Neeraj
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${active === link.href ? "text-white" : ""}`}>
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="ml-2 shrink-0 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-colors hover:bg-accent"
        >
          Let&apos;s Talk
        </a>
      </nav>
    </div>
  );
}
