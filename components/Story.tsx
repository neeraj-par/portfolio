"use client";

import { motion } from "framer-motion";
import { roleHeader, timeline } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

const ROTATIONS = ["-rotate-[1deg]", "rotate-[0.9deg]", "-rotate-[0.7deg]"];
const TAPE_ROTATIONS = ["-rotate-[6deg]", "rotate-[4deg]", "-rotate-[3deg]"];

const TL_ICONS = [
  <>
    <path key="a" d="M3 3h18v18H3z" />
    <path d="M3 9h18M9 21V9" />
  </>,
  <>
    <rect key="b" x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </>,
  <path key="c" d="M22 12h-4l-3 9L9 3l-3 9H2" />,
];

const Story = () => {
  return (
    <section id="story" className="section-pad">
      <div className="mx-auto max-w-[1120px] px-5 md:px-7">
        <SectionHead
          eyebrow="The Story So Far"
          title="The Story So Far"
          subtitle="Roles, releases and the road that shaped how I build."
        />

        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <div className="card card-hover mobile-card relative mb-7 rotate-[0.6deg] p-5 md:mb-10 md:w-auto md:p-7">
              <span className="tape left-1/2 top-[-9px] -translate-x-1/2 -rotate-[4deg]" />
              <div className="font-sora text-[16px] font-bold md:text-lg">
                {roleHeader.role} <span className="font-normal text-accent">at {roleHeader.org}</span>
              </div>
              <div className="mt-0.5 font-mono text-xs text-ink-faint">{roleHeader.date}</div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft md:text-[14.5px]">{roleHeader.summary}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13.5px] leading-relaxed text-ink-soft marker:text-accent md:text-[14.5px]">
                {roleHeader.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[11.5px] text-ink-faint">{roleHeader.softSkills}</p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-0 left-[18px] top-0 border-l-2 border-dashed border-black/[0.14]" />

            {timeline.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.1}
                className="relative mb-6 pl-[44px] last:mb-0 md:mb-8 md:pl-[56px]"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute left-1.5 top-0.5 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-accent bg-card"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-3 w-3">
                    {TL_ICONS[i % 3]}
                  </svg>
                </motion.div>
                <div className={`card card-hover relative p-5 md:p-6 ${ROTATIONS[i % 3]}`}>
                  <span className={`tape left-6 top-[-9px] ${TAPE_ROTATIONS[i % 3]}`} />
                  <div className="font-sora text-[15px] font-semibold md:text-[16px]">{item.title}</div>
                  <div className="my-1 font-mono text-[11.5px] text-ink-faint">{item.date}</div>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft md:text-[14.5px]">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
