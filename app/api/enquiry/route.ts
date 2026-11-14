import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const TARGET_SPREADSHEET_ID =
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1CrvoG0smYI1YEJOvlQ1nvXeQxrUfua20iHbIPrD_WyE";
const TARGET_TAB_NAME = "Website Leads";
const WHATSAPP_PHONE = "919600151377";

interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  course: string;
  mode?: string;
  message?: string;
  sourcePage?: string;
}

/**
 * Generate Google OAuth2 Access Token using Service Account Private Key via native crypto
 */
async function getGoogleAccessToken(
  clientEmail: string,
  rawPrivateKey: string
): Promise<string> {
  // Format private key (handles both escaped \n and raw newlines)
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  ).toString("base64url");

  const now = Math.floor(Date.now() / 1000);
  const claim = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(privateKey, "base64url");
  const jwt = `${header}.${claim}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.text();
    throw new Error(`Google token exchange failed: ${tokenRes.status} ${errorBody}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

/**
 * Ensure the "Website Leads" tab exists with header row in the Google Spreadsheet
 */
async function ensureWorksheetExists(
  spreadsheetId: string,
  accessToken: string
): Promise<void> {
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`;
  const metaRes = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!metaRes.ok) {
    const errText = await metaRes.text();
    throw new Error(`Failed to fetch spreadsheet metadata: ${metaRes.status} ${errText}`);
  }

  const metaData = await metaRes.json();
  const sheets = metaData.sheets || [];
  const tabExists = sheets.some(
    (s: { properties: { title: string } }) =>
      s.properties.title.toLowerCase() === TARGET_TAB_NAME.toLowerCase()
  );

  if (!tabExists) {
    // Create new tab "Website Leads"
    const addSheetRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              addSheet: {
                properties: {
                  title: TARGET_TAB_NAME,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
              },
            },
          ],
        }),
      }
    );

    if (!addSheetRes.ok) {
      const errText = await addSheetRes.text();
      console.warn(`Could not add sheet ${TARGET_TAB_NAME}:`, errText);
    }

    // Set Header Row
    const headerRange = encodeURIComponent(`'${TARGET_TAB_NAME}'!A1:J1`);
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${headerRange}?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [
            [
              "Lead ID",
              "Date",
              "Time",
              "Name",
              "Phone",
              "Email",
              "Interested Course",
              "Message",
              "Source Page",
              "Status",
            ],
          ],
        }),
      }
    );
  }
}

/**
 * Append row to Google Spreadsheet using Sheets API v4
 */
async function appendLeadToGoogleSheets(
  rowValues: (string | number)[],
  spreadsheetId: string,
  accessToken: string
): Promise<{ updatedRows: number }> {
  await ensureWorksheetExists(spreadsheetId, accessToken);

  const appendRange = encodeURIComponent(`'${TARGET_TAB_NAME}'!A:J`);
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${appendRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const appendRes = await fetch(appendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!appendRes.ok) {
    const errText = await appendRes.text();
    throw new Error(`Sheets API append failed: ${appendRes.status} ${errText}`);
  }

  const resJson = await appendRes.json();
  return { updatedRows: resJson.updates?.updatedRows || 1 };
}

/**
 * Backup lead to local server JSON store to ensure zero data loss
 */
function backupLeadLocally(leadRecord: Record<string, unknown>) {
  try {
    const backupDir = path.join(process.cwd(), "data");
    const backupFile = path.join(backupDir, "leads_backup.json");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    let existing: Record<string, unknown>[] = [];
    if (fs.existsSync(backupFile)) {
      try {
        existing = JSON.parse(fs.readFileSync(backupFile, "utf-8"));
      } catch {
        existing = [];
      }
    }
    existing.unshift(leadRecord);
    fs.writeFileSync(backupFile, JSON.stringify(existing.slice(0, 500), null, 2), "utf-8");
  } catch (err) {
    console.error("Local lead backup failed:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body: EnquiryPayload = await req.json();
    const { name, phone, email, course, mode, message, sourcePage } = body;

    // Validate Required Fields
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    // Generate Lead Metadata
    const timestamp = Date.now();
    const leadId = `SCF-LEAD-${timestamp.toString().slice(-6)}`;
    const now = new Date();

    // Indian Standard Time (IST) Date and Time
    const dateStr = now.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const timeStr = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const cleanCourse = course?.trim() || "Montessori Teacher Training";
    const cleanMode = mode?.trim() ? ` [${mode.trim()}]` : "";
    const cleanMessage = message?.trim() || "Admissions Guidance Requested";
    const cleanSourcePage = sourcePage?.trim() || "/";
    const status = "NEW";

    // Row layout: Lead ID | Date | Time | Name | Phone | Email | Interested Course | Message | Source Page | Status
    const rowValues = [
      leadId,
      dateStr,
      timeStr,
      name.trim(),
      phone.trim(),
      email.trim(),
      `${cleanCourse}${cleanMode}`,
      cleanMessage,
      cleanSourcePage,
      status,
    ];

    // Build Pre-filled WhatsApp enquiry message
    const waText =
      `*NEW ENQUIRY — SUPER CROWN FOUNDATION*\n\n` +
      `*Lead ID:* ${leadId}\n` +
      `*Date:* ${dateStr} at ${timeStr}\n` +
      `*Name:* ${name.trim()}\n` +
      `*Phone:* ${phone.trim()}\n` +
      `*Email:* ${email.trim()}\n` +
      `*Course:* ${cleanCourse}${cleanMode}\n` +
      (cleanMessage !== "Admissions Guidance Requested"
        ? `*Message:* ${cleanMessage}\n`
        : "") +
      `*Source Page:* ${cleanSourcePage}\n\n` +
      `Please provide details regarding admissions, fee structure, and upcoming batch timings.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;

    // Persistent Local Backup
    backupLeadLocally({
      leadId,
      date: dateStr,
      time: timeStr,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      course: `${cleanCourse}${cleanMode}`,
      message: cleanMessage,
      sourcePage: cleanSourcePage,
      status,
      timestamp,
    });

    // Attempt Google Sheets Delivery
    let sheetSaved = false;
    let sheetNote = "";

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (clientEmail && privateKey) {
      try {
        const token = await getGoogleAccessToken(clientEmail, privateKey);
        await appendLeadToGoogleSheets(rowValues, TARGET_SPREADSHEET_ID, token);
        sheetSaved = true;
        sheetNote = "Saved directly to Google Sheets via Sheets API v4";
      } catch (err: unknown) {
        console.error("Sheets API error:", err);
        sheetNote = err instanceof Error ? err.message : "Sheets API append error";
      }
    } else if (webhookUrl) {
      try {
        const hookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          body: JSON.stringify({
            leadId,
            date: dateStr,
            time: timeStr,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            course: `${cleanCourse}${cleanMode}`,
            message: cleanMessage,
            sourcePage: cleanSourcePage,
            status,
          }),
        });
        if (hookRes.ok) {
          sheetSaved = true;
          sheetNote = "Saved via Google Apps Script Web App";
        } else {
          sheetNote = `Webhook responded with status ${hookRes.status}`;
        }
      } catch (err: unknown) {
        console.error("Webhook error:", err);
        sheetNote = err instanceof Error ? err.message : "Webhook delivery error";
      }
    } else {
      sheetNote =
        "Google Sheets credentials pending in environment variables (.env.local). Lead preserved in local fallback.";
    }

    return NextResponse.json({
      success: true,
      leadId,
      date: dateStr,
      time: timeStr,
      sheetSaved,
      sheetNote,
      whatsappUrl,
      whatsappNumber: WHATSAPP_PHONE,
    });
  } catch (error: unknown) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing enquiry" },
      { status: 500 }
    );
  }
}

