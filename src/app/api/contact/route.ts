import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// @ts-ignore - types may not resolve in some turbopack contexts
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10).max(2000),
});

// Expect environment variables to be set
// EMAIL_FROM, EMAIL_TO, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = schema.parse(json);

    const { EMAIL_FROM, EMAIL_TO, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } =
      process.env;

    if (
      !EMAIL_FROM ||
      !EMAIL_TO ||
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS
    ) {
      return NextResponse.json(
        { error: "Email environment variables not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const mailResult = await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: parsed.email,
      subject: `[Portfolio] ${parsed.subject}`,
      text: `From: ${parsed.name} <${parsed.email}>\n\n${parsed.message}`,
      html: `<p><strong>From:</strong> ${parsed.name} &lt;${
        parsed.email
      }&gt;</p><p>${parsed.message.replace(/\n/g, "<br/>")}</p>`,
    });

    return NextResponse.json({ ok: true, id: mailResult.messageId });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
