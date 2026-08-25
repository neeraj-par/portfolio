"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

const ROTATIONS = ["-rotate-[1.1deg]", "rotate-[0.8deg]", "-rotate-[0.6deg]"];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-[76px]">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead
          eyebrow="The Portfolio"
          title="The Portfolio"
          subtitle="Projects — open one to see what's under the hood."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card relative p-4 ${ROTATIONS[i % 3]}`}
              >
                <span className="tape left-6 top-[-9px] -rotate-3" />

                <div className="relative mb-3.5 aspect-[16/11] overflow-hidden rounded-[3px] bg-gradient-to-br from-[#2b2620] to-[#413a30]">
                  <div className="flex h-[22px] items-center gap-1.5 bg-white/[0.08] px-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  </div>
                  <div className="flex h-[calc(100%-22px)] gap-2 p-3.5">
                    <div className="flex flex-1 flex-col justify-center gap-2">
                      <div className="h-3 w-3/4 rounded-sm bg-white/[0.16]" />
                      <div className="h-3 w-1/2 rounded-sm bg-white/[0.16]" />
                      <div className="h-3 w-2/3 rounded-sm bg-white/[0.16]" />
                    </div>
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-wide text-[#F5E9DE]">
                    {project.status}
                  </span>
                </div>

                <p className="font-caveat text-[26px] font-bold leading-none">{project.title}</p>
                <p className="mb-2.5 mt-1 font-mono text-[11px] text-ink-faint">{project.date}</p>
                <p className="mb-3.5 text-[13.8px] text-ink-soft">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      <span className="dot" />
                      {tag}
                    </span>
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
