import { education } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="mx-auto max-w-[1120px] px-5 md:px-7">
        <SectionHead
          eyebrow="Study & Training"
          title="Study & Training"
          subtitle="Where the fundamentals got laid down."
        />

        <Reveal className="flex justify-center">
          <div className="card card-hover mobile-card flex gap-4 p-5 md:max-w-[520px] md:p-7">
            <div className="sketch-icon-btn float-icon flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-black/[0.14] bg-accent-soft text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[22px] w-[22px]">
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-sora text-[16px] font-bold">{education.school}</div>
              <div className="mt-0.5 text-sm text-accent">{education.degree}</div>
              <div className="mt-1 font-mono text-xs text-ink-faint">{education.date}</div>
              <p className="mt-2 text-[13.5px] text-ink-soft">{education.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
