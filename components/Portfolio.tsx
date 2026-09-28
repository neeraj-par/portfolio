"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import TechChip from "./ui/TechChip";
import ProjectModal from "./ProjectModal";

// Degrees, set through Framer so its transform does not overwrite a CSS rotate class.
const ROTATIONS = [-1.1, 0.8, -0.6];
const TAPE_ROTATIONS = ["-rotate-[6deg]", "rotate-[3deg]", "-rotate-[2deg]"];
const TAPE_POSITIONS = ["left-6", "left-1/2 -translate-x-1/2", "right-6"];
const PREVIEWS = ["portfolio-preview-grid", "portfolio-preview-panel", "portfolio-preview-news"];

// Portfolio grid. Each card opens a detail dialog with the video, live link or internal tool walkthrough.
const Portfolio = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <Reveal key={project.title} delay={i * 0.08} className="h-full">
              <motion.div
                style={{ rotate: ROTATIONS[i % 3] }}
                whileHover={{ y: -5, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card card-hover group mobile-card relative flex h-full flex-col p-[18px] md:w-auto md:p-5`}
              >
                <span className={`tape top-[-9px] ${TAPE_POSITIONS[i % 3]} ${TAPE_ROTATIONS[i % 3]}`} />

                {/* The preview is a real button so keyboard and screen reader users can open the details too */}
                <div
                  className={`portfolio-preview ${PREVIEWS[i % PREVIEWS.length]} relative mb-4 aspect-[16/11.5] w-full overflow-hidden rounded-[3px]`}
                >
                  {/* Muted looping preview; pointer-events-none so clicks reach the button above it */}
                  {project.videoId && (
                    <iframe
                      className="pointer-events-none absolute inset-0 h-full w-full scale-[1.5]"
                      src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&loop=1&playlist=${project.videoId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&start=18&end=50`}
                      title={`${project.title} preview`}
                      allow="autoplay; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Open details for ${project.title}`}
                    className="absolute inset-0 block text-left"
                  >
                    {!project.videoId && (
                      <>
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
                      </>
                    )}
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-wide text-[#F5E9DE]">
                      {project.internal ? "Internal tool" : project.status}
                    </span>
                    <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                      <span className="sketch-btn px-4 py-2 font-caveat text-[18px] font-bold">
                        <span>View details</span>
                      </span>
                    </span>
                  </button>
                </div>

                <div className="mb-4 flex items-center justify-between gap-2 md:hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="rounded-full border border-black/[0.14] bg-accent-soft px-3 py-1 font-caveat text-[17px] font-bold text-ink"
                  >
                    View project
                  </button>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                    {project.internal ? "Internal tool" : project.status}
                  </span>
                </div>

                <h3 className="font-caveat text-[27px] font-bold leading-none">{project.title}</h3>
                <p className="mb-2.5 mt-1 font-mono text-[11px] text-ink-faint">{project.date}</p>
                <p className="mb-4 text-[14px] leading-relaxed text-ink-soft">{project.description}</p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <TechChip key={tag} tag={tag} />
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={openIndex === null ? null : projects[openIndex]} onClose={() => setOpenIndex(null)} />
    </section>
  );
};

export default Portfolio;
