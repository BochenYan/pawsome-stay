import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Save to Google Sheets
    const sheets = await getSheet();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          phone,
        ]],
      },
    });

    // Send confirmation email
    await resend.emails.send({
      from: "PawsomeStay <noreply@pawsomestay.ca>",
      to: email,
      replyTo: "wuyy.1998@gmail.com",
      bcc: "wuyy.1998@gmail.com",
      subject: "Your booking request has been received!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem">
          <h1 style="color:#2d4a3e">Booking Received 🐾</h1>
          <p>Hi ${name}, thanks for reaching out!</p>
          <p>We've received your contact information and will be in touch shortly to discuss your pet's stay.</p>
          <table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
            <tr><td style="padding:0.5rem;color:#7a6e62">Name</td><td style="padding:0.5rem;font-weight:600">${name}</td></tr>
            <tr><td style="padding:0.5rem;color:#7a6e62">Email</td><td style="padding:0.5rem;font-weight:600">${email}</td></tr>
            <tr><td style="padding:0.5rem;color:#7a6e62">Phone</td><td style="padding:0.5rem;font-weight:600">${phone}</td></tr>
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