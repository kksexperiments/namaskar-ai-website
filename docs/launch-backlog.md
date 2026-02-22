# Launch Backlog (Tracking Until Public Launch)

Last updated: February 21, 2026
Launch target: February 28, 2026

## How to Use

- Keep this file as the single source of truth for unfinished items.
- Update `Status`, `Owner`, and `Next Action` during each work session.
- Move completed items to the `Completed` section with completion date.

## Active Backlog

| ID | Item | Status | Owner | Why Not Done Yet | Next Action |
| --- | --- | --- | --- | --- | --- |
| BL-001 | Apply Supabase migration `waitlist_fallback_submissions` on live project | Ready | You | Migration file exists locally but is not deployed from this repo session | Run migration in target Supabase project and verify table + RLS |
| BL-002 | Deploy updated Apps Script `apps_script/waitlist.gs` web app version | Ready | You | Code is updated locally but Apps Script deployment is external | Publish new web app version and confirm endpoint URL remains stable |
| BL-003 | Validate GEO route access with real admin + non-admin sessions in production-like environment | Pending QA | Joint | Requires real auth accounts and browser session checks | Run manual QA for `/geo-tracker` and `/geo-tracking-playbook` (guest denied, admin allowed) |
| BL-004 | Execute live waitlist scenario matrix against real endpoint (ok/ok:false/down/fallback-fail) | Pending QA | Joint | Needs controllable endpoint states + live Supabase writes | Run four-case test matrix and log outcomes in this file |
| BL-005 | Finalize Gemini-inspired theme direction | Awaiting inputs | You | Theme system now supports variants, but Gemini references are not yet documented | Share Gemini ideas/screenshots; map to final palette and typography decisions |
| BL-006 | Configure community channel env vars for production (`VITE_WHATSAPP_GROUP_URL`, `VITE_TELEGRAM_CHANNEL_URL`) | Ready | You | App now intentionally disables missing links | Set env vars on hosting platform and smoke test CTA behavior |
| BL-011 | Set strict-launch env vars (`VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_WAITLIST_ENDPOINT`) | Ready | You | `npm run check:launch:strict` currently fails in local environment | Add env vars in hosting + local CI context and rerun strict check |
| BL-013 | Replace incorrect PostHog env key with project API key (if analytics should remain enabled) | Ready | You | Runtime errors are mitigated in code, but analytics is currently skipped when `VITE_POSTHOG_KEY` is a non-project key (e.g. `phx_...`) | Set a valid PostHog project API key (`phc_...`) and verify event flow |

## Completed

| ID | Item | Completed On | Notes |
| --- | --- | --- | --- |
| BL-007 | Add robust lead capture fallback chain (endpoint -> Supabase -> truthful failure) | February 21, 2026 | Implemented in shared utility and waitlist/newsletter flows |
| BL-008 | Add admin-only protection for GEO routes and remove public GEO footer links | February 21, 2026 | Implemented with localized `AdminRoute` |
| BL-009 | Add theme switcher foundation for iterative visual direction | February 21, 2026 | Added multi-theme tokens + persisted selector |
| BL-010 | Add launch readiness script (`check:launch`, strict mode) | February 21, 2026 | Script verifies files, scripts, sitemap host, and env readiness |
| BL-012 | Fix PostHog runtime errors on live pages (`config.js` 404, flags 401, MIME mismatch) | February 22, 2026 | Mitigated in `/src/lib/analytics.ts` by disabling PostHog init for invalid/non-project keys; live smoke verified clean console |
