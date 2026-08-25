# Neeraj Kumar — Portfolio

A personal portfolio site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Styled as an engineer's notebook: dot-grid paper background, hand-drawn squiggle underlines, a sticky-note portrait, and a scroll-linked timeline built from real project dates.

Live sections: Hero, Portfolio, The Engineer (about), The Toolkit (skills), The Story So Far (experience timeline), Study & Training (education), and a working Contact form.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All resume content (projects, skills, timeline, education, contact links) lives in one place: `lib/content.ts`. Edit that file and every section on the page updates — nothing else needs touching for a text change.

The résumé PDF served from the "Download Resume" button lives at `public/resume.pdf`. Replace that file with an updated export whenever the résumé changes; the link in `lib/content.ts` (`profile.resumeUrl`) already points at `/resume.pdf`.

## Wiring up the contact form

The contact form posts to `app/api/contact/route.ts`, which sends the message to `neeraj.dsu@gmail.com` using [Resend](https://resend.com). Without an API key configured, the form will show a friendly error instead of silently failing — this is expected until you finish this one-time setup:

1. Sign up at [resend.com](https://resend.com) (free tier is enough for a portfolio's traffic).
2. Create an API key from the Resend dashboard.
3. Copy `.env.example` to `.env` and paste the key in:
   ```bash
   cp .env.example .env
   ```
4. Restart `npm run dev`, or if deployed, add `RESEND_API_KEY` to your hosting provider's environment variables.

By default the route sends from Resend's shared `onboarding@resend.dev` address, which works immediately with no domain setup. If you want the email to come from your own domain (e.g. `hello@neerajkumar.dev`), verify that domain in the Resend dashboard and update the `from` field in `app/api/contact/route.ts`.

Every submission's reply-to is set to the sender's email, so hitting Reply in Gmail goes straight back to them.

## Deploying

This is a standard Next.js app — the easiest path is [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add the `RESEND_API_KEY` environment variable in the Vercel project settings.
4. Deploy.

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for layout and spacing, with a small set of custom classes in `app/globals.css` for the notebook-styled cards, tags, and tape elements
- **Framer Motion** for scroll reveals, the sliding nav indicator, and hover/tap micro-interactions
- **Resend** for the contact form's email delivery
- **next/font** (Sora, Caveat, IBM Plex Sans, IBM Plex Mono) — no external font requests at runtime

## Project structure

```
app/
  api/contact/route.ts   Contact form email handler
  layout.tsx              Fonts + page metadata
  page.tsx                 Assembles all sections
  globals.css              Design tokens + shared classes
components/
  Nav.tsx, Hero.tsx, Portfolio.tsx, Engineer.tsx,
  Toolkit.tsx, Story.tsx, Education.tsx, Contact.tsx, Footer.tsx
  ui/                       Reveal, Squiggle, Doodles, SectionHead — shared primitives
lib/
  content.ts                Single source of truth for all resume content
public/
  resume.pdf                 Downloadable résumé
```
