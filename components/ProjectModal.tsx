"use client";

import { useEffect, useRef } from "react";
import { profile, type Project } from "@/lib/content";
import TechChip from "./ui/TechChip";

// Plays muted as soon as the dialog opens (the iframe unmounts with the dialog content). Controls stay so sound can be turned on.
const VideoFacade = ({ id, title }: { id: string; title: string }) => (
  <div className="relative mb-5 aspect-video overflow-hidden rounded-md border border-black/[0.14] bg-ink">
    <iframe
      className="absolute inset-0 h-full w-full"
      src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&rel=0&playsinline=1&start=18&end=50`}
      title={`${title} walkthrough`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);

// Simple left to right step diagram that shows how an internal tool works without exposing any data.
const Flow = ({ caption, steps }: { caption: string; steps: string[] }) => (
  <figure className="mb-5 rounded-md border border-dashed border-black/[0.25] bg-white/60 p-4">
    <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-1 flex-col items-center gap-2 md:flex-row">
          <span className="w-full rounded-md border border-black/[0.4] bg-card px-3 py-2 text-center font-mono text-[12px] text-ink shadow-[0_2px_0_rgba(34,31,26,0.18)]">
            {step}
          </span>
          {i < steps.length - 1 && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B0502F"
              strokeWidth={2}
              className="h-4 w-4 shrink-0 rotate-90 md:rotate-0"
              aria-hidden
            >
              <path d="M5 12h14m-5-5 5 5-5 5" />
            </svg>
          )}
        </li>
      ))}
    </ol>
    <figcaption className="mt-3 text-center font-caveat text-lg text-ink-soft">{caption}</figcaption>
  </figure>
);

// Native dialog that shows the full detail for one project, or nothing when project is null.
const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  // True when the press started on the backdrop, so a text-selection drag that ends there does not close the dialog.
  const pressedBackdrop = useRef(false);

  // Checks the pointer position, because the dialog scrollbar also reports the dialog as the event target.
  const isOutside = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    return !!r && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
  };

  // Keep the native dialog in step with the selected project and lock page scroll while it is open.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onMouseDown={(e) => (pressedBackdrop.current = isOutside(e))}
      onClick={(e) => pressedBackdrop.current && isOutside(e) && onClose()}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[88vh] w-[min(92vw,720px)] overflow-y-auto rounded-lg border border-black/[0.2] bg-card p-0 text-ink shadow-2xl backdrop:bg-black/55"
    >
      {project && (
        <div className="p-5 md:p-7">
          <div className="mb-1 flex items-start justify-between gap-3">
            <h3 id="project-modal-title" className="font-caveat text-[30px] font-bold leading-none md:text-[34px]">
              {project.title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/[0.2] text-ink-soft hover:border-accent hover:text-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-ink-faint">{project.date}</span>
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink">
              {project.internal ? "Internal tool" : project.status}
            </span>
          </div>

          {project.videoId && <VideoFacade id={project.videoId} title={project.title} />}
          {project.flow && <Flow caption={project.flow.caption} steps={project.flow.steps} />}

          <ul className="mb-5 list-disc space-y-2 pl-5 text-[14.5px] leading-relaxed text-ink-soft marker:text-accent">
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="mb-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TechChip key={tag} tag={tag} />
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn px-6 py-3 text-sm font-semibold"
            >
              <span>Visit {new URL(project.liveUrl).host}</span>
            </a>
          )}

          {project.internal && (
            <div className="rounded-md border border-dashed border-black/[0.25] bg-accent-soft/40 p-4">
              <p className="mb-3 text-[14px] leading-relaxed text-ink-soft">
                This is an internal tool, so the code and data are private and there is no public link. I am happy to
                walk you through it live.
              </p>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`Walkthrough request: ${project.title}`)}`}
                className="sketch-btn-ghost px-5 py-2.5 text-sm font-semibold"
              >
                <span>Ask for a walkthrough</span>
              </a>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
};

export default ProjectModal;
