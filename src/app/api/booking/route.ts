import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

async function getSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, petName, petType, service, startDate, endDate, notes } = body;

    // Save to Google Sheets
    const sheets = await getSheet();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          phone,
          petName,
          petType,
          service,
          startDate,
          endDate,
          notes,
        ]],
      },
    });

    // Send confirmation email
    await resend.emails.send({
      from: "PawsomeStay <onboarding@resend.dev>",
      to: email,
      subject: "Your booking request has been received!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem">
          <h1 style="color:#2d4a3e">Booking Received 🐾</h1>
          <p>Hi ${name}, thanks for reaching out! Here's a summary of your request:</p>
          <table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
            <tr><td style="padding:0.5rem;color:#7a6e62">Pet Name</td><td style="padding:0.5rem;font-weight:600">${petName}</td></tr>
            <tr><td style="padding:0.5rem;color:#7a6e62">Pet Type</td><td style="padding:0.5rem;font-weight:600">${petType}</td></tr>
            <tr><td style="padding:0.5rem;color:#7a6e62">Service</td><td style="padding:0.5rem;font-weight:600">${service}</td></tr>
            <tr><td style="padding:0.5rem;color:#7a6e62">Start Date</td><td style="padding:0.5rem;font-weight:600">${startDate}</td></tr>
            <tr><td style="padding:0.5rem;color:#7a6e62">End Date</td><td style="padding:0.5rem;font-weight:600">${endDate}</td></tr>
          </table>
          <p>We'll be in touch shortly to confirm your booking.</p>
          <p style="color:#c4704f;font-weight:600">— PawsomeStay Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}