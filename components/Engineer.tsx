"use client";

import { profile, summary } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

export default function Engineer() {
  return (
    <section id="about" className="py-[76px]">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead
          eyebrow="The Engineer"
          title="The Engineer"
          subtitle="A few notes on who's actually behind the commits."
        />

        <Reveal>
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <div className="card mx-auto w-full max-w-[230px] -rotate-2 p-3.5">
              <div className="flex aspect-square items-center justify-center rounded-sm bg-gradient-to-br from-accent-soft to-[#F5E4D8] font-caveat text-7xl font-bold text-accent">
                N
              </div>
            </div>

            <div className="card p-7 md:p-8">
              <h3 className="mb-3.5 font-sora text-lg">My Story</h3>
              <p className="mb-3 text-[15px] text-ink-soft">{summary}</p>

              <div className="mt-5 grid grid-cols-1 gap-3.5 border-t border-dashed border-black/[0.14] pt-5 sm:grid-cols-2">
                <InfoRow label="Name" value={profile.name} icon="user" />
                <InfoRow label="Email" value={profile.email} icon="mail" />
                <InfoRow label="Studio" value={profile.location} icon="pin" />
                <InfoRow label="Response Time" value="Usually within a day" icon="clock" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  user: (
    <>
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  mail: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="m4 4 8 8 8-8" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
};

function InfoRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[13.5px]">
      <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-4 w-4 shrink-0">
        {ICONS[icon]}
      </svg>
      <div>
        <span className="block font-mono text-[9.5px] uppercase tracking-wide text-ink-faint">{label}</span>
        {value}
      </div>
    </div>
  );
}
