"use client";

import { motion } from "framer-motion";
import { roleHeader, timeline } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

const TL_ICONS = [
  <><path key="a" d="M3 3h18v18H3z" /><path d="M3 9h18M9 21V9" /></>,
  <><rect key="b" x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  <path key="c" d="M22 12h-4l-3 9L9 3l-3 9H2" />,
];

export default function Story() {
  return (
    <section id="story" className="py-[76px]">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead
          eyebrow="The Story So Far"
          title="The Story So Far"
          subtitle="Roles, releases and the road that shaped how I build."
        />

        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <div className="card mb-9 p-7">
              <div className="font-sora text-lg font-bold">
                {roleHeader.role} <span className="font-normal text-accent">— {roleHeader.org}</span>
              </div>
              <div className="mt-0.5 font-mono text-xs text-ink-faint">{roleHeader.date}</div>
              <p className="mt-3 text-[14.5px] text-ink-soft">{roleHeader.summary}</p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-0 left-[18px] top-0 border-l-2 border-dashed border-black/[0.14]" />

            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="relative mb-8 pl-[52px] last:mb-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute left-1.5 top-0.5 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-accent bg-card"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-3 w-3">
                    {TL_ICONS[i % 3]}
                  </svg>
                </motion.div>
                <div className="font-sora text-[16px] font-semibold">{item.title}</div>
                <div className="my-1 font-mono text-[11.5px] text-ink-faint">{item.date}</div>
                <p className="text-[14px] text-ink-soft">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
