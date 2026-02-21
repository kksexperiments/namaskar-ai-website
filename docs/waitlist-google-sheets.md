# Waitlist Storage via Google Sheets (Apps Script Web App)

This setup stores course waitlist submissions from `https://www.namaskarai.in` into Google Sheets.

## 1) Create the Google Sheet

1. Create a new Google Sheet.
2. Rename the first tab to `waitlist`.
3. Add this exact header row (A1:J1) if you are using an existing sheet:

`timestamp,locale,page,name,email,phone_raw,phone_e164,consent,user_agent,referrer`

4. Copy the Sheet ID from the URL:

`https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`

## 2) Create Apps Script project

1. Open the sheet, then `Extensions -> Apps Script`.
2. Replace the default code with `/Users/KBBusiness/Documents/Web App Projects/Antigravity Test Apps/Namaskar AI/namaskar-ai-website/apps_script/waitlist.gs`.
3. Update:
   - `SPREADSHEET_ID` (optional; leave blank to auto-create a sheet on first lead)
   - `SHEET_NAME` (keep `waitlist` unless you changed it)
   - `ALLOWED_ORIGIN` (default is `https://www.namaskarai.in`)
   - `NOTIFY_EMAILS` (default includes `brickbuilderai@gmail.com`)
4. Save the script.

## 3) Deploy as Web App

1. Click `Deploy -> New deployment`.
2. Deployment type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and authorize.
6. Copy the Web App URL.

The script now sends one email notification per successful lead to every address in `NOTIFY_EMAILS`.
If `SPREADSHEET_ID` is blank, the script auto-creates a spreadsheet and stores its id in Script Properties.

## 4) Configure website env var

Set in Vercel (Production and Preview):

- `VITE_WAITLIST_ENDPOINT=<YOUR_APPS_SCRIPT_WEB_APP_URL>`

Because this is a Vite app, env vars are injected at build time. Rebuild/redeploy after setting.

## 5) Payload sent by website

The frontend sends JSON with:

- `timestamp`
- `locale`
- `page`
- `name`
- `email`
- `phone_raw`
- `phone_e164`
- `consent`
- `user_agent`
- `referrer`

## 6) Validation and anti-spam on website

- Requires at least one of email or phone.
- Email format validation.
- India mobile validation + normalization to `+91XXXXXXXXXX`.
- Honeypot field check.
- Minimum time-to-submit check (`>= 3 seconds`).
- Client-side rate limit (`1 submission / 60 seconds` per session/localStorage key).
