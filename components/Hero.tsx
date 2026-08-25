"use client";

import { motion } from "framer-motion";
import { profile, heroNote } from "@/lib/content";
import { StarDoodle, TargetDoodle } from "./ui/Doodles";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-10 md:pt-22">
      <StarDoodle className="absolute right-[6%] top-6 hidden md:block" />
      <TargetDoodle className="absolute left-[4%] bottom-2 hidden md:block" />

      <div className="mx-auto max-w-[1080px] px-7">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.14] bg-card px-3.5 py-1.5 font-mono text-xs text-ink-soft"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for full-time roles
            </motion.span>

            <p className="font-caveat text-[28px] leading-none text-accent">Hello, I&apos;m</p>

            <h1 className="font-sora text-[38px] font-extrabold leading-[1.04] tracking-tight md:text-[58px]">
              {profile.name}
            </h1>

            <span className="font-sora text-[17px] font-semibold text-accent md:text-[21px]">
              {profile.role}
            </span>

            <p className="mt-5 max-w-[520px] text-[16px] text-ink-soft">{heroNote}</p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#portfolio"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
              >
                See the Portfolio
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={profile.resumeUrl}
                download
                className="flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-card hover:border-solid"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                </svg>
                Download Resume
              </motion.a>
            </div>

            <div className="mt-8 flex gap-2.5">
              <SocialCircle href={`mailto:${profile.email}`} label="Email">
                <path d="M4 4h16v16H4z" />
                <path d="m4 4 8 8 8-8" />
              </SocialCircle>
              <SocialCircle href={profile.github} label="GitHub" external>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91.5S18.73.15 16 2a13.38 13.38 0 0 0-7 0C6.27.15 5.09.5 5.09.5A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </SocialCircle>
              <SocialCircle href={profile.linkedin} label="LinkedIn" external>
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
                <path d="M10 9h4v2a4 4 0 0 1 8 0v9h-4v-8a2 2 0 0 0-4 0v8h-4z" />
              </SocialCircle>
            </div>
          </div>

          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 12 }}
              animate={{ opacity: 1, rotate: 3, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="card relative w-[220px] p-4 pb-5"
            >
              <span className="tape left-1/2 top-[-12px] -translate-x-1/2 -rotate-[4deg]" />
              <div className="flex aspect-square items-center justify-center rounded-sm bg-gradient-to-br from-accent-soft to-[#F5E4D8] font-caveat text-8xl font-bold text-accent">
                N
              </div>
              <p className="mt-3 text-center font-caveat text-xl text-ink-soft">Neeraj</p>
            </motion.div>

            <StatCard className="-bottom-2.5 -left-7 -rotate-[4deg]" num="~2" label="Years Exp." delay={0.3} />
            <StatCard className="right-[-1.5rem] top-1.5 rotate-[4deg]" num="3+" label="Shipped" delay={0.45} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  className,
  num,
  label,
  delay,
}: {
  className: string;
  num: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3 }}
      className={`card absolute min-w-[92px] px-4 py-3 text-center ${className}`}
    >
      <div className="font-sora text-xl font-bold">{num}</div>
      <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">{label}</div>
    </motion.div>
  );
}

function SocialCircle({
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
      whileHover={{ y: -3, borderColor: "#C15E3D", color: "#C15E3D" }}
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/[0.14] bg-card text-ink-soft"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        {children}
      </svg>
    </motion.a>
  );
}
