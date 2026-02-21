/**
 * Namaskar AI waitlist collector for Google Sheets.
 * Deploy as a Web App (Execute as: Me, Who has access: Anyone).
 */

const ALLOWED_ORIGIN = "https://www.namaskarai.in";
// Optional: set a fixed spreadsheet id if you want to control destination manually.
const SPREADSHEET_ID = "";
const SPREADSHEET_NAME = "Namaskar AI Waitlist";
const SHEET_NAME = "waitlist";
const NOTIFY_EMAILS = ["brickbuilderai@gmail.com"];
const MAIL_SUBJECT_PREFIX = "[Namaskar AI Waitlist]";
const SHEET_ID_PROPERTY_KEY = "WAITLIST_SPREADSHEET_ID";
const WAITLIST_HEADERS = [
  "timestamp",
  "locale",
  "page",
  "name",
  "email",
  "phone_raw",
  "phone_e164",
  "consent",
  "user_agent",
  "referrer",
];

function doOptions(e) {
  return jsonResponse_({ ok: true, preflight: true });
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    validatePayload_(payload);

    const sheet = getOrCreateWaitlistSheet_();

    sheet.appendRow([
      new Date(), // timestamp
      payload.locale || "",
      payload.page || "",
      payload.name || "",
      payload.email || "",
      payload.phone_raw || "",
      payload.phone_e164 || "",
      String(payload.consent === true),
      payload.user_agent || "",
      payload.referrer || "",
    ]);

    const emailResult = sendNotificationEmail_(payload);
    return jsonResponse_({ ok: true, email_notified: emailResult.notified });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

function parsePayload_(e) {
  const body = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
  return JSON.parse(body);
}

/**
 * Run once from Apps Script editor to grant required scopes
 * (Sheets + Mail) for web app execution as the deploying user.
 */
function authorizeSetup() {
  const spreadsheet = resolveSpreadsheet_();
  MailApp.getRemainingDailyQuota();
  return {
    ok: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
  };
}

function getOrCreateWaitlistSheet_() {
  const spreadsheet = resolveSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeaderRow_(sheet);
  return sheet;
}

function resolveSpreadsheet_() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "REPLACE_WITH_YOUR_SHEET_ID") {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty(SHEET_ID_PROPERTY_KEY);
  if (savedId) {
    try {
      return SpreadsheetApp.openById(savedId);
    } catch (error) {
      Logger.log(`stored sheet id missing/unavailable (${savedId}): ${error}`);
      props.deleteProperty(SHEET_ID_PROPERTY_KEY);
    }
  }

  const created = SpreadsheetApp.create(SPREADSHEET_NAME);
  props.setProperty(SHEET_ID_PROPERTY_KEY, created.getId());
  Logger.log(`Created waitlist spreadsheet: ${created.getUrl()}`);
  return created;
}

function ensureHeaderRow_(sheet) {
  const existing = sheet.getRange(1, 1, 1, WAITLIST_HEADERS.length).getValues()[0];
  const hasHeader = existing.some((cell) => typeof cell === "string" && cell.trim().length > 0);
  if (!hasHeader) {
    sheet.getRange(1, 1, 1, WAITLIST_HEADERS.length).setValues([WAITLIST_HEADERS]);
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload");
  }

  if (payload.consent !== true) {
    throw new Error("Consent is required");
  }

  const hasEmail = typeof payload.email === "string" && payload.email.trim().length > 0;
  const hasPhone = typeof payload.phone_e164 === "string" && payload.phone_e164.trim().length > 0;

  if (!hasEmail && !hasPhone) {
    throw new Error("Email or phone is required");
  }
}

function sendNotificationEmail_(payload) {
  const recipients = (NOTIFY_EMAILS || []).filter(Boolean).join(",");
  if (!recipients) {
    return { notified: false };
  }

  const subject = `${MAIL_SUBJECT_PREFIX} New lead`;
  const lines = [
    "A new course waitlist lead was submitted.",
    "",
    `Time (server): ${new Date().toISOString()}`,
    `Locale: ${safeString_(payload.locale)}`,
    `Page: ${safeString_(payload.page)}`,
    `Source: ${safeString_(payload.source)}`,
    `Name: ${safeString_(payload.name)}`,
    `Email: ${safeString_(payload.email)}`,
    `Phone (raw): ${safeString_(payload.phone_raw)}`,
    `Phone (E.164): ${safeString_(payload.phone_e164)}`,
    `Course interest: ${safeString_(payload.course_interest)}`,
    `Course label: ${safeString_(payload.course_interest_label)}`,
    `Consent: ${String(payload.consent === true)}`,
    `Referrer: ${safeString_(payload.referrer)}`,
    `User agent: ${safeString_(payload.user_agent)}`,
  ];

  try {
    MailApp.sendEmail(recipients, subject, lines.join("\n"));
    return { notified: true };
  } catch (error) {
    Logger.log(`waitlist email notification failed: ${error}`);
    return { notified: false };
  }
}

function safeString_(value) {
  return typeof value === "string" ? value : "";
}

function jsonResponse_(obj) {
  const output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

  // Apps Script runtime may not expose setHeader in all environments.
  // Keep dynamic checks so this script remains deployable.
  if (typeof output.setHeader === "function") {
    output.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    output.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    output.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  return output;
}
