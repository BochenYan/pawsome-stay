import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

async function getSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
        ? process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n")
        : "",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function GET(req: NextRequest) {
  const auth = req.cookies.get("admin_auth");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sheets = await getSheet();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:E",
  });

  const rows = res.data.values || [];
  const bookings = rows.map((row, i) => ({
    id: i,
    date: row[0],
    name: row[1],
    email: row[2],
    phone: row[3],
    status: row[4] || "pending",
  }));

  return NextResponse.json({ bookings });
}

export async function PATCH(req: NextRequest) {
  const auth = req.cookies.get("admin_auth");
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rowIndex, status } = await req.json();
  const sheets = await getSheet();

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Sheet1!E${rowIndex + 1}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[status]] },
  });

  return NextResponse.json({ success: true });
}