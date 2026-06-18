import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactRequestBody = {
  company?: unknown;
  email?: unknown;
  message?: unknown;
  name?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = getStringValue(body.name);
  const company = getStringValue(body.company);
  const email = getStringValue(body.email);
  const message = getStringValue(body.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }

  if (
    name.length > 120 ||
    company.length > 160 ||
    email.length > 254 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Submitted message is too long." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const emailBody = `Name: ${name}
Company: ${company}
Email: ${email}

Message:
${message}`;

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      replyTo: email,
      subject: "New Portfolio Contact",
      text: emailBody,
      to: "clavette.john@gmail.com",
    });

    if (error) {
      console.error("Resend contact email error:", error);
      return NextResponse.json(
        { error: "Unable to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email send failed:", error);
    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 502 },
    );
  }
}
