"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import TechChip from "./ui/TechChip";

const ROTATIONS = ["-rotate-[1.1deg]", "rotate-[0.8deg]", "-rotate-[0.6deg]"];
const TAPE_ROTATIONS = ["-rotate-[6deg]", "rotate-[3deg]", "-rotate-[2deg]"];
const TAPE_POSITIONS = ["left-6", "left-1/2 -translate-x-1/2", "right-6"];
const PREVIEWS = ["portfolio-preview-grid", "portfolio-preview-panel", "portfolio-preview-news"];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-pad">
      <div className="mx-auto max-w-[1120px] px-5 md:px-7">
        <SectionHead
          eyebrow="The Portfolio"
          title="The Portfolio"
          subtitle="Open a project to see what's under the hood."
        />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card card-hover group mobile-card relative p-[18px] md:w-auto md:p-5 ${ROTATIONS[i % 3]}`}
              >
                <span className={`tape top-[-9px] ${TAPE_POSITIONS[i % 3]} ${TAPE_ROTATIONS[i % 3]}`} />

                <div className={`portfolio-preview ${PREVIEWS[i % PREVIEWS.length]} relative mb-4 aspect-[16/11.5] overflow-hidden rounded-[3px]`}>
                  <div className="flex h-[22px] items-center gap-1.5 bg-white/[0.08] px-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  </div>
                  <div className="flex h-[calc(100%-22px)] gap-2 p-3.5">
                    <div className="flex flex-1 flex-col justify-center gap-2">
                      <div className="h-3 w-3/4 rounded-sm bg-white/[0.22]" />
                      <div className="h-3 w-1/2 rounded-sm bg-white/[0.18]" />
                      <div className="h-3 w-2/3 rounded-sm bg-white/[0.18]" />
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <span className="h-8 rounded-sm bg-white/[0.13]" />
                        <span className="h-8 rounded-sm bg-white/[0.17]" />
                        <span className="h-8 rounded-sm bg-white/[0.11]" />
                      </div>
                    </div>
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-wide text-[#F5E9DE]">
                    {project.status}
                  </span>
                  <div className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="sketch-btn px-4 py-2 font-caveat text-[18px] font-bold">
                      <span>View details</span>
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between gap-2 md:hidden">
                  <span className="rounded-full border border-black/[0.14] bg-accent-soft px-3 py-1 font-caveat text-[17px] font-bold text-accent">
                    View project
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">{project.status}</span>
                </div>

                <p className="font-caveat text-[27px] font-bold leading-none">{project.title}</p>
                <p className="mb-2.5 mt-1 font-mono text-[11px] text-ink-faint">{project.date}</p>
                <p className="mb-4 text-[14px] leading-relaxed text-ink-soft">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
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
}
