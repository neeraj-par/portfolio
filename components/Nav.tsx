"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

const LINKS: NavLink[] = [
  { href: "#top", label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "The Engineer" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#story", label: "Story So Far" },
  { href: "#education", label: "Education" },
];

const OBSERVED_SECTIONS = [...LINKS, { href: "#contact", label: "Contact" }];
const DRAWER_LINKS: NavLink[] = LINKS;

const Nav = () => {
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = OBSERVED_SECTIONS.map((l) => document.querySelector(l.href)).filter((el): el is Element => !!el);

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

  useEffect(() => {
    if (!pendingScroll || open) {
      return;
    }

    const timeout = window.setTimeout(() => {
      scrollToSection(pendingScroll);
      setPendingScroll(null);
    }, 240);

    return () => window.clearTimeout(timeout);
  }, [open, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 72);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRouteClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    setActive(href);
    window.history.pushState(null, "", href);

    if (open) {
      setPendingScroll(href);
      setOpen(false);
      return;
    }

    scrollToSection(href);
  };

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (!target) {
      window.location.hash = href;
      return;
    }

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="sticky top-0 z-50 flex justify-center px-0 md:top-4 md:px-4">
      <nav
        className={`relative w-full max-w-none px-5 py-3 transition-[background-color,border-color,box-shadow] duration-200 md:flex md:max-w-[1280px] md:items-center md:justify-center md:gap-1.5 md:overflow-x-auto md:rounded-full md:bg-[#FBF8F0]/92 md:py-2 md:pl-5 md:pr-2 md:shadow-[0_1px_0_rgba(34,31,26,0.05),0_14px_26px_-18px_rgba(34,31,26,0.35)] md:backdrop-blur ${
          scrolled || open
            ? "bg-[#FBF8F0] border-b border-black/[0.2] shadow-[0_1px_0_rgba(34,31,26,0.08)]"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:contents">
          <a
            href="#top"
            onClick={(event) => handleRouteClick(event, "#top")}
            className="mr-1.5 flex shrink-0 items-center gap-1.5 justify-self-start font-caveat text-[22px] font-bold leading-none md:mr-2.5 md:font-sora md:text-[15px] md:leading-normal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-4 w-4">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Neeraj
          </a>

          <a
            href="#contact"
            onClick={(event) => handleRouteClick(event, "#contact")}
            className="sketch-btn shrink-0 justify-self-center whitespace-nowrap px-5 py-2.5 text-[13px] font-semibold md:hidden"
          >
            <span>Let&apos;s Talk</span>
          </a>

          <div
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[112px] transition-opacity duration-200 max-[767px]:flex ${
              scrolled && !open ? "opacity-30" : "opacity-0"
            }`}
          ></div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 shrink-0 items-center justify-center justify-self-end rounded-full text-ink transition-colors hover:bg-black/[0.04] md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M5 7h14M5 12h14M5 17h14" />}
            </svg>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: { height: "auto", opacity: 1, marginTop: 16 },
            closed: { height: 0, opacity: 0, marginTop: 0 },
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="overflow-hidden md:!m-0 md:!flex md:!h-auto md:!opacity-100"
        >
          <div className="flex w-full flex-col gap-2 rounded-[14px] border border-black/[0.48] bg-[#FFFDF7] p-3 shadow-[0_2px_0_rgba(34,31,26,0.18)] md:w-auto md:flex-row md:gap-1 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            {DRAWER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleRouteClick(event, link.href)}
                className="relative whitespace-nowrap rounded-[9px] px-4 py-3 font-caveat text-[18px] font-bold text-ink-soft transition-colors hover:text-ink md:rounded-full md:px-3 md:py-2 md:text-[13.5px] md:font-medium md:font-sora"
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-[9px] bg-accent-soft md:rounded-full md:bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${active === link.href ? "text-accent md:text-white" : ""}`}>
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <a
          href="#contact"
          onClick={(event) => handleRouteClick(event, "#contact")}
          className="sketch-btn ml-1.5 shrink-0 whitespace-nowrap px-4 py-2.5 text-[13px] font-semibold max-md:!hidden md:inline-flex md:px-5"
        >
          <span>Let&apos;s Talk</span>
        </a>
      </nav>
    </div>
  );
};

export default Nav;
