# Namaskar AI Website

Assamese-first AI learning platform built with Vite + React + TypeScript.

## Stack

- Vite
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (data)

## Local Development

```sh
npm install
npm run dev
```

Local dev runs on `http://localhost:5173`.

## Build and Output (Vercel Compatible)

This app is Vite-based and Vercel zero-config compatible:

- Build command: `npm run build`
- Output directory: `dist`
- Preview local production build: `npm run preview`

The build uses a prebuild step (`npm run sync:seo`) to generate SEO assets in `public/`.

## Environment Variables

Use `.env.example` as reference:

- `VITE_SITE_URL` (required in production): canonical site URL. Use `https://www.namaskarai.in`.
- `VITE_X_DEFAULT_PATH` (optional): custom path for `hreflang="x-default"` (example: `/start`).
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_POSTHOG_KEY` (optional)
- `VITE_ENABLE_VERCEL_ANALYTICS` (optional)
- `VITE_WAITLIST_ENDPOINT` (required for course waitlist form)

Important for Vite builds: `VITE_*` variables are injected at build-time.  
Set `VITE_SITE_URL` in Vercel **before** the production build runs, or deployed canonical/OG defaults may not match your production domain.

For Google Sheets waitlist setup, follow `/Users/KBBusiness/Documents/Web App Projects/Antigravity Test Apps/Namaskar AI/namaskar-ai-website/docs/waitlist-google-sheets.md`.
That setup now supports automatic lead-notification emails via `NOTIFY_EMAILS` in `apps_script/waitlist.gs`.

## Canonical-Safe Site URL Handling

`VITE_SITE_URL` is the single source for absolute SEO URLs.

- Runtime SEO tags (`canonical`, `og:url`, `twitter:url`, OG image URLs) are generated from `VITE_SITE_URL`.
- Sitemap and robots are generated from `VITE_SITE_URL` via `scripts/generate-seo-assets.mjs`.
- Local fallback when `VITE_SITE_URL` is missing: `http://localhost:5173`.
- Production fallback host: `https://www.namaskarai.in`.

## Deploy to Vercel + Connect Domain from Namecheap

### 1) Vercel Project Settings

- Framework Preset: `Vite`
- Output Directory: `dist`
- Env vars in Vercel:
  - `VITE_SITE_URL=https://www.namaskarai.in`
  - `VITE_X_DEFAULT_PATH` (optional, default points to EN URL)
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_POSTHOG_KEY`
  - `VITE_WAITLIST_ENDPOINT`

### 2) Add Domains in Vercel

In Vercel `Project -> Settings -> Domains`:

- Add `namaskarai.in` (apex)
- Add `www.namaskarai.in` (www)
- Set `www.namaskarai.in` as **Primary**
- Enable redirect `namaskarai.in -> www.namaskarai.in` with path forwarding

Preferred redirect strategy: manage apex -> www in the Vercel Domains UI (not `vercel.json`) to avoid duplicate redirect rules.

### 3) Configure Namecheap DNS

Use Vercel-provided values in the Domains UI. Typical setup:

- `A` record for `@` -> `76.76.21.21`
- `CNAME` record for `www` -> `cname.vercel-dns.com`

Wait for DNS propagation, then re-check domain status in Vercel.

## Production Checklist

- `npm run lint` passes (except accepted existing warnings, if any).
- `npm run build` succeeds and outputs `dist/`.
- `public/sitemap.xml` and `public/robots.txt` contain `https://www.namaskarai.in`.
- Canonical + OG URLs on key pages resolve to `https://www.namaskarai.in/...`.
- Vercel Domains:
  - `www.namaskarai.in` is Primary
  - apex redirects to `www` (301/permanent)
- Smoke test:
  - `/`
  - `/prompt-packs`
  - `/ai-tools`
  - `/learning-roadmaps`
  - `/news`

## Launch Ops Commands

- Standard readiness check: `npm run check:launch`
- Strict readiness check (fails on missing env vars): `npm run check:launch:strict`
- Strict readiness check using pulled Vercel production env file: `npm run check:launch:strict:vercel-prod`
- Strict readiness check using pulled Vercel preview env file: `npm run check:launch:strict:vercel-preview`
- Production smoke check (key pages + canonical/chunk sanity): `npm run check:smoke:prod`
- Production smoke check including waitlist endpoint response shape (expects `email_notified`, use after BL-002): `npm run check:smoke:prod:endpoint`

If needed, refresh local env snapshots first:

- `vercel env pull /tmp/namaskar-env-production --environment=production`
- `vercel env pull /tmp/namaskar-env-preview --environment=preview`

Persistent backlog file for unfinished launch items:

- `/Users/KBBusiness/Documents/Web App Projects/Antigravity Test Apps/Namaskar AI/namaskar-ai-website/docs/launch-backlog.md`

## Theme Variants

The site now supports three switchable visual themes in the header:

- `Saffron Dawn`
- `Tea Garden`
- `River Sky`

Selection is persisted in browser storage (`namaskar-site-theme`), making it easy to test and compare design directions quickly.

## Update Homepage Facebook Videos

Homepage embeds the first 6 items from:

- `src/content/facebookVideos.json`

How to update:

- Paste new Facebook reel/video post URLs into `url` (keep them **public**).
- Keep newest items at the top. Only the first 6 are embedded.
- If a URL is private/unavailable, the site will show a fallback card with a "Watch on Facebook" link.

### Weekly Auto-Update (Last 3 Only)

This repo includes a weekly updater that:

- Keeps the first 3 videos in `src/content/facebookVideos.json` pinned
- Auto-refreshes the remaining 3 by scraping the public Facebook reels tab

Script:

- `node scripts/update-facebook-videos.mjs`

GitHub Action (weekly):

- `.github/workflows/update-facebook-videos.yml`

Optional secret (only if you want to override the default profile URL):

- `FACEBOOK_PROFILE_REELS_URL`
