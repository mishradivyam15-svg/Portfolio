import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    (req as any).ip ||
    '127.0.0.1';

  const { success } = rateLimit(ip, 3, 60000);

  // Rate limiting
  if (!success) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please wait a minute.',
      },
      { status: 429 }
    );
  }

  try {
    const { name, email, subject, message } = await req.json();

    /* ---------- VALIDATION ---------- */
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    /* ---------- EMAIL CONFIG ---------- */
    const smtpUser = process.env.EMAIL_USER || '';
    const smtpPass = process.env.EMAIL_PASS || '';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: 'Email credentials missing in .env.local' },
        { status: 500 }
      );
    }

    /* ---------- CREATE TRANSPORTER ---------- */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    /* ---------- SEND EMAIL ---------- */
    await transporter.sendMail({
      from: smtpUser,
      to: smtpUser, // sends to yourself
      subject: `📩 New Portfolio Message: ${subject}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    });

    /* ---------- SUCCESS ---------- */
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
    });

  } catch (error: any) {
    console.error('Contact API Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error.',
      },
      { status: 500 }
    );
  }
}