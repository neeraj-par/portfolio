"use client";

import { motion } from "framer-motion";
import { toolkit } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import TechChip from "./ui/TechChip";

// Degrees, set through Framer so its transform does not overwrite a CSS rotate class.
const ROTATIONS = [-1.1, 0.8, -0.6];
const TAPE_ROTATIONS = ["-rotate-[6deg]", "rotate-[3deg]", "-rotate-[2deg]"];
const TAPE_POSITIONS = ["left-6", "left-1/2 -translate-x-1/2", "right-6"];

const ICON_PATHS: Record<string, React.ReactNode> = {
  brackets: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="M8 6l-6 6 6 6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  spark: (
    <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
  ),
};

const Toolkit = () => {
  return (
    <section id="toolkit" className="section-pad">
      <div className="mx-auto max-w-[1120px] px-5 md:px-7">
        <SectionHead eyebrow="The Toolkit" title="The Toolkit" subtitle="Stack and tools I sketch my systems with." />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {toolkit.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06} className="h-full">
              <motion.div
                style={{ rotate: ROTATIONS[i % 3] }}
                whileHover={{ y: -4, rotate: 0 }}
                className={`card card-hover mobile-card relative h-full p-5 md:w-auto md:p-6`}
              >
                <span className={`tape top-[-9px] ${TAPE_POSITIONS[i % 3]} ${TAPE_ROTATIONS[i % 3]}`} />
                <div className="mb-3 flex items-center gap-3">
                  <div className="sketch-icon-btn float-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.14] bg-accent-soft text-accent md:h-11 md:w-11">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                      {ICON_PATHS[cat.icon]}
                    </svg>
                  </div>
                  <h3 className="font-sora text-[15px] md:text-[16px]">{cat.title}</h3>
                </div>
                <p className="mb-4 text-[13.5px] leading-relaxed text-ink-soft md:text-[14px]">{cat.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <TechChip key={tag} tag={tag} />
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
