# Launch Backlog (Tracking Until Public Launch)

Last updated: February 25, 2026
Launch target: February 28, 2026

## How to Use

- Keep this file as the single source of truth for unfinished items.
- Update `Status`, `Owner`, and `Next Action` during each work session.
- Move completed items to the `Completed` section with completion date.

## Active Backlog

| ID | Item | Status | Owner | Why Not Done Yet | Next Action |
| --- | --- | --- | --- | --- | --- |
| BL-002 | Deploy updated Apps Script `apps_script/waitlist.gs` web app version | Blocked (Apps Script access) | You | Live endpoint responds, but success payload is `{ \"ok\": true }` (missing `email_notified`), which indicates the older web app version is still deployed. | Publish a new web app deployment from latest `apps_script/waitlist.gs` and confirm endpoint URL remains stable + response includes `email_notified` |
| BL-005 | Finalize Gemini-inspired theme direction | Awaiting inputs | You | Theme system now supports variants, but Gemini references are not yet documented | Share Gemini ideas/screenshots; map to final palette and typography decisions |
| BL-006 | Configure community channel env vars for production (`VITE_WHATSAPP_GROUP_URL`, `VITE_TELEGRAM_CHANNEL_URL`) | Ready | You | Verified missing in Vercel `production` + `preview` env on Feb 25, so community CTA links are disabled by design | Set env vars on hosting platform and smoke test CTA behavior |
| BL-013 | Replace incorrect PostHog env key with project API key (if analytics should remain enabled) | Ready | You | Verified Vercel `VITE_POSTHOG_KEY` is still a non-project key (`phx_...`) in `production` + `preview` on Feb 25; runtime mitigation prevents errors but analytics remains disabled | Set a valid PostHog project API key (`phc_...`) and verify event flow |

## Completed

| ID | Item | Completed On | Notes |
| --- | --- | --- | --- |
| BL-007 | Add robust lead capture fallback chain (endpoint -> Supabase -> truthful failure) | February 21, 2026 | Implemented in shared utility and waitlist/newsletter flows |
| BL-008 | Add admin-only protection for GEO routes and remove public GEO footer links | February 21, 2026 | Implemented with localized `AdminRoute` |
| BL-009 | Add theme switcher foundation for iterative visual direction | February 21, 2026 | Added multi-theme tokens + persisted selector |
| BL-010 | Add launch readiness script (`check:launch`, strict mode) | February 21, 2026 | Script verifies files, scripts, sitemap host, and env readiness |
| BL-012 | Fix PostHog runtime errors on live pages (`config.js` 404, flags 401, MIME mismatch) | February 22, 2026 | Mitigated in `/src/lib/analytics.ts` by disabling PostHog init for invalid/non-project keys; live smoke verified clean console |
| BL-003 | Validate GEO route access with real admin + non-admin sessions in production-like environment | February 25, 2026 | Automated Playwright QA passed: guest + non-admin redirected to `/auth`; temporary admin user could access `/geo-tracker` and `/geo-tracking-playbook` |
| BL-001 | Apply Supabase migration `waitlist_fallback_submissions` on live project | February 25, 2026 | Verified live after SQL Editor update: anon insert succeeds with app-like `return=minimal`, service-role read succeeds, and fallback rows were created/cleaned during QA |
| BL-004 | Execute live waitlist scenario matrix against real endpoint (ok/ok:false/down/fallback-fail) | February 25, 2026 | Full matrix validated across production endpoint + fallback. `down` path succeeds via Supabase fallback after BL-001 fix; note: `return=representation` can false-fail for anon due no SELECT policy, but app path uses insert without `.select()` |
| BL-011 | Set strict-launch env vars (`VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_WAITLIST_ENDPOINT`) | February 25, 2026 | Hosting vars verified in Vercel and malformed `VITE_SITE_URL` fixed in production/preview. Added `check:launch:strict:vercel-prod` / `check:launch:strict:vercel-preview` helpers and validated both strict checks pass using pulled env files |
