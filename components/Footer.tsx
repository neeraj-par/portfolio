import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-black/[0.14] py-8">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-3.5 px-5 text-center md:flex-row md:px-7 md:text-left">
        <div className="flex items-center gap-1.5 font-sora text-sm font-bold">
          <svg viewBox="0 0 24 24" fill="none" stroke="#C15E3D" strokeWidth={2} className="h-3.5 w-3.5">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          {profile.name}
        </div>
        <div className="font-mono text-[11.5px] text-ink-faint">
          © 2026 {profile.name}. Built by hand, in Karachi.
        </div>
        <div className="flex gap-2.5">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="sketch-icon-btn float-icon flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/[0.14] bg-card text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M4 4h16v16H4z" />
              <path d="m4 4 8 8 8-8" />
            </svg>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="sketch-icon-btn float-icon float-icon-delay-1 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/[0.14] bg-card text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91.5S18.73.15 16 2a13.38 13.38 0 0 0-7 0C6.27.15 5.09.5 5.09.5A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="sketch-icon-btn float-icon float-icon-delay-2 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/[0.14] bg-card text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
              <path d="M10 9h4v2a4 4 0 0 1 8 0v9h-4v-8a2 2 0 0 0-4 0v8h-4z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
