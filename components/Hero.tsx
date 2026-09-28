"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile, heroNote } from "@/lib/content";
import { StarDoodle, TargetDoodle } from "./ui/Doodles";
import Squiggle from "./ui/Squiggle";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-5 md:pb-20 md:pt-20">
      <StarDoodle className="absolute right-[6%] top-6 hidden md:block" />
      <TargetDoodle className="absolute left-[4%] bottom-2 hidden md:block" />

      <div className="mx-auto max-w-[1120px] px-7 max-[480px]:px-5">
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-[1.12fr_0.88fr] md:gap-16">
          <div className="order-2 text-center md:order-1 md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-1.5 font-caveat text-lg italic text-accent md:text-xl"
            >
              Available for full-time roles
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
                <path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                <circle cx="12" cy="13" r="3.2" />
              </svg>
            </motion.span>

            <p className="font-caveat text-[26px] leading-none text-accent md:text-[28px]">Hello, I&apos;m</p>

            <h1 className="font-sora text-[34px] font-extrabold leading-[1.04] tracking-tight md:text-[58px]">
              {profile.name}
            </h1>

            <span className="inline-block font-caveat text-[19px] font-bold text-accent md:text-[24px]">
              <Squiggle className="mx-auto mt-0.5 !max-w-none md:mx-0" />
            </span>

            <p className="mx-auto mt-4 max-w-[330px] text-[14.5px] font-medium leading-[1.58] text-accent md:mx-0 md:mt-5 md:max-w-[520px] md:text-[16px]">
              {heroNote}
              <span aria-hidden className="ml-1">✦</span>
            </p>

            <div className="mx-auto mt-7 grid max-w-[260px] grid-cols-1 gap-3 md:mx-0 md:flex md:max-w-none md:flex-wrap md:justify-start md:gap-3.5">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#portfolio"
                className="sketch-btn px-6 py-3 text-sm font-semibold"
              >
                <span>See the Portfolio</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="sketch-btn-ghost px-6 py-3 text-sm font-semibold"
              >
                <span className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                  </svg>
                  Download Resume
                </span>
              </motion.a>
            </div>

            <div className="mt-8 flex justify-center gap-2.5 md:justify-start">
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

          <div className="relative order-1 flex min-h-[320px] justify-center md:order-2">
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 12 }}
              animate={{ opacity: 1, rotate: 3, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="card float-card float-card-slow relative z-0 w-[188px] p-4 pb-5 [--float-rotate:3deg] md:w-[220px]"
            >
              <span className="tape left-1/2 top-[-12px] -translate-x-1/2 -rotate-[4deg]" />
              <Image
                src="/neeraj.jpg"
                alt="Portrait of Neeraj Kumar"
                width={440}
                height={440}
                priority
                className="aspect-square w-full rounded-sm object-cover"
              />
              <p className="mt-3 text-center font-caveat text-xl text-ink-soft">Neeraj</p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

const SocialCircle = ({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.a
      whileHover={{ y: -3, borderColor: "#B0502F", color: "#B0502F" }}
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="sketch-icon-btn float-icon flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/[0.14] bg-card text-ink-soft"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        {children}
      </svg>
    </motion.a>
  );
};

export default Hero;
