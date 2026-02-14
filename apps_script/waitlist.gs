/**
 * Namaskar AI waitlist collector for Google Sheets.
 * Deploy as a Web App (Execute as: Me, Who has access: Anyone).
 */

const ALLOWED_ORIGIN = "https://www.namaskarai.in";
const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SHEET_ID";
const SHEET_NAME = "waitlist";

function doOptions(e) {
  return jsonResponse_({ ok: true, preflight: true });
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    validatePayload_(payload);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet not found: ${SHEET_NAME}`);
    }

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

    return jsonResponse_({ ok: true });
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
