# Amplified Properties

A premium real estate brokerage and property development portal for **Amplified Properties**, showcasing verified luxury homes across Lagos and Abuja. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Features

- **Curated listings** — verified apartments, duplexes, penthouses, mansions, and terraces with full galleries and amenities.
- **Property match quiz** — a guided, five-step qualification flow that captures leads and surfaces matching homes.
- **Private inspections** — book in-person or virtual viewings, with requests persisted to Supabase.
- **Agent dashboard** — lead pipeline, viewing schedule, conversion analytics, and site settings.
- **WhatsApp-first conversions** — high-contrast "Book Inspection" and inquiry CTAs throughout.
- **Luxury design system** — obsidian, off-white, and refined gold/emerald accents with accessible contrast and mobile-first layouts.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment

Create `.env.local` with your Supabase credentials (optional — the app degrades gracefully without them):

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Scripts

```bash
npm run dev     # start the development server
npm run build   # create an optimized production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Deployment

The app builds cleanly on both **Vercel** and **Netlify** using the default Next.js build (`npm run build`). External images are served unoptimized so mock property assets never block a deployment.

### Netlify

The repository includes a production-ready `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node.js:** 22 (pinned in `.nvmrc`, `.node-version`, and `netlify.toml`)
- **Next.js runtime:** installed automatically by Netlify for detected Next.js projects. The dynamic `/properties/[slug]` route requires this runtime, so do not switch to `output: "export"`.

Add the optional Supabase variables under **Site configuration → Environment variables**. See `.env.example` for the full list; the app still builds and runs when they are unset.

## Tech stack

- [Next.js 16](https://nextjs.org)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Supabase](https://supabase.com)
- [lucide-react](https://lucide.dev)
