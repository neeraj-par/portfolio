# Neeraj Kumar Portfolio

A personal portfolio site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Styled as an engineer's notebook: dot-grid paper background, hand-drawn squiggle underlines, a sticky-note portrait, and a scroll-linked timeline built from real project dates.

Live sections: Hero, Portfolio, The Engineer (about), The Toolkit (skills), The Story So Far (experience timeline), Study & Training (education), and a working Contact form.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All resume content (projects, skills, timeline, education, contact links) lives in one place: `lib/content.ts`. Edit that file and every section on the page updates, so nothing else needs touching for a text change.

The résumé PDF served from the "Download Resume" button lives at `public/resume.pdf`. Replace that file with an updated export whenever the résumé changes; the link in `lib/content.ts` (`profile.resumeUrl`) already points at `/resume.pdf`.

## Wiring up the contact form

The contact form posts to `app/api/contact/route.ts`, which sends the message to `neeraj.dsu@gmail.com` using [Resend](https://resend.com). Without an API key configured, the form will show a friendly error instead of silently failing. This is expected until you finish this one-time setup:

1. Sign up at [resend.com](https://resend.com) (free tier is enough for a portfolio's traffic).
2. Create an API key from the Resend dashboard.
3. Create a file named `.env.local` in the project root (git already ignores it) and add one line:
   ```
   RESEND_API_KEY=your_key_here
   ```
4. Restart `npm run dev`. On Vercel, open the project, then Settings, then Environment Variables, add `RESEND_API_KEY` for Production and Preview, and redeploy.

By default the route sends from Resend's shared `onboarding@resend.dev` address, which works immediately with no domain setup. If you want the email to come from your own domain (e.g. `hello@neerajkumar.dev`), verify that domain in the Resend dashboard, then set `CONTACT_FROM_EMAIL` (for example `Neeraj <hello@yourdomain.com>`) as an environment variable.

The route also has a hidden honeypot field, field length limits and a simple rate limit of 5 messages per 10 minutes per IP.

Every submission's reply-to is set to the sender's email, so hitting Reply in Gmail goes straight back to them.

## Scripts

- `npm run lint` runs ESLint.
- `npm run format:check` runs Prettier in check mode. `npm run format` fixes files.
- `npm test` runs the Vitest tests (`app/api/contact/route.test.ts`, `lib/content.test.ts`).
- `.github/workflows/ci.yml` runs lint, format check, tests and build on every push and pull request.

## Deploying

This is a standard Next.js app. The easiest path is [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add the `RESEND_API_KEY` environment variable in the Vercel project settings.
4. Deploy. The site URL for sharing tags comes from Vercel automatically. Set `NEXT_PUBLIC_SITE_URL` only if you add a custom domain.

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for layout and spacing, with a small set of custom classes in `app/globals.css` for the notebook-styled cards, tags, and tape elements
- **Framer Motion** for scroll reveals, the sliding nav indicator, and hover/tap micro-interactions
- **Resend** for the contact form's email delivery
- **next/font** (Sora, Caveat, IBM Plex Sans, IBM Plex Mono), with no external font requests at runtime

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
  ui/                       Reveal, Squiggle, Doodles, SectionHead shared primitives
lib/
  content.ts                Single source of truth for all resume content
public/
  resume.pdf                 Downloadable résumé
```
