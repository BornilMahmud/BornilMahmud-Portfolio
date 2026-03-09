import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const OWNER_EMAIL = 'bornilprof@gmail.com';
const PORTFOLIO_URL = 'https://bornilmhd.replit.app';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function createTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
}

function notificationTemplate(name: string, email: string, subject: string, message: string) {
  const now = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><title>New Portfolio Message</title></head>
<body style="margin:0;padding:0;background:#09090f;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090f;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
    <tr><td style="background:linear-gradient(135deg,#ea580c,#f97316,#fb923c);padding:32px;border-radius:16px 16px 0 0;">
      <h1 style="margin:0 0 4px;color:#fff;font-size:26px;font-weight:900;">Bornil Mahmud</h1>
      <p style="margin:0 0 16px;color:rgba(255,255,255,.75);font-size:13px;">Video Editor &amp; Developer · Bangladesh</p>
      <div style="background:rgba(0,0,0,.18);border-radius:8px;padding:12px 16px;">
        <span style="color:#fff;font-size:15px;font-weight:600;">🔔 New message from your portfolio!</span>
      </div>
    </td></tr>
    <tr><td style="background:#0f0f1a;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);padding:32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#16162a;border:1px solid rgba(249,115,22,.12);border-radius:12px;margin-bottom:24px;">
        <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);">
          <table width="100%"><tr><td style="width:90px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">From</td><td style="color:#f1f1f1;font-size:15px;font-weight:600;">${name}</td></tr></table>
        </td></tr>
        <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);">
          <table width="100%"><tr><td style="width:90px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Email</td><td><a href="mailto:${email}" style="color:#fb923c;text-decoration:none;font-size:14px;">${email}</a></td></tr></table>
        </td></tr>
        <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);">
          <table width="100%"><tr><td style="width:90px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Subject</td><td style="color:#e0e0e0;font-size:14px;">${subject}</td></tr></table>
        </td></tr>
        <tr><td style="padding:14px 20px;">
          <table width="100%"><tr><td style="width:90px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Received</td><td style="color:#888;font-size:12px;">${now}</td></tr></table>
        </td></tr>
      </table>
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Message</p>
      <div style="background:#16162a;border-left:3px solid #f97316;padding:20px 24px;border-radius:0 10px 10px 0;margin-bottom:28px;">
        <p style="margin:0;color:#d4d4d4;font-size:15px;line-height:1.8;white-space:pre-wrap;">${message}</p>
      </div>
      <table width="100%"><tr><td align="center">
        <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:linear-gradient(135deg,#ea580c,#f97316);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 32px;border-radius:8px;">↩ Reply to ${name}</a>
      </td></tr></table>
    </td></tr>
    <tr><td style="background:#0a0a14;padding:18px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(249,115,22,.1);border-top:none;">
      <table width="100%"><tr>
        <td><p style="margin:0;font-size:12px;color:rgba(255,255,255,.3);">Sent via your portfolio contact form.</p></td>
        <td align="right"><a href="${PORTFOLIO_URL}" style="font-size:11px;color:#f97316;text-decoration:none;font-weight:600;">View Portfolio →</a></td>
      </tr></table>
    </td></tr>
  </table>
  </td></tr></table>
</body></html>`;
}

function confirmationTemplate(name: string, subject: string, message: string) {
  const snippet = message.length > 200 ? message.slice(0, 200) + '...' : message;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><title>Message Received – Bornil Mahmud</title></head>
<body style="margin:0;padding:0;background:#09090f;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090f;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
    <tr><td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;border-radius:16px 16px 0 0;"></td></tr>
    <tr><td style="background:#0f0f1a;padding:40px 32px 32px;text-align:center;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);">
      <div style="width:68px;height:68px;background:linear-gradient(135deg,#ea580c,#f97316);border-radius:50%;margin:0 auto 16px;line-height:68px;text-align:center;">
        <span style="color:#fff;font-size:30px;font-weight:900;">B</span>
      </div>
      <h1 style="margin:0 0 4px;color:#fff;font-size:26px;font-weight:900;">Bornil Mahmud</h1>
      <p style="margin:0 0 20px;color:#f97316;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;">Creative Video Editor &amp; Developer</p>
      <div style="display:inline-block;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);border-radius:100px;padding:8px 20px;">
        <span style="color:#4ade80;font-size:13px;font-weight:700;">✓ Message Received!</span>
      </div>
    </td></tr>
    <tr><td style="background:#0f0f1a;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);padding:32px;">
      <h2 style="margin:0 0 14px;color:#fff;font-size:20px;font-weight:700;">Hey ${name}! 👋</h2>
      <p style="margin:0 0 24px;color:#a0a0b0;font-size:15px;line-height:1.8;">
        Thanks for reaching out! I've received your message and will review it personally.
        Expect a reply at <strong style="color:#f97316;">${OWNER_EMAIL}</strong> within <strong style="color:#fff;">24–48 hours</strong>.
      </p>
      <div style="background:#16162a;border:1px solid rgba(249,115,22,.12);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Your Message</p>
        <p style="margin:0 0 10px;font-size:12px;color:#555;">${subject ? 'Subject: ' + subject : 'No subject'}</p>
        <p style="margin:0;color:#c0c0cc;font-size:14px;line-height:1.7;font-style:italic;border-left:2px solid #f97316;padding-left:14px;">"${snippet}"</p>
      </div>
      <table width="100%"><tr><td align="center">
        <a href="${PORTFOLIO_URL}" style="display:inline-block;background:linear-gradient(135deg,#ea580c,#f97316);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 32px;border-radius:8px;">View My Portfolio →</a>
      </td></tr></table>
    </td></tr>
    <tr><td style="background:#0a0a14;padding:18px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(249,115,22,.1);border-top:none;text-align:center;">
      <p style="margin:0 0 3px;font-size:13px;font-weight:600;color:rgba(255,255,255,.4);">Bornil Mahmud · Daffodil Smart City, Dhaka, Bangladesh</p>
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,.15);">You received this because you submitted a message on Bornil's portfolio.</p>
    </td></tr>
  </table>
  </td></tr></table>
</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const trimmedName    = name.trim();
    const trimmedEmail   = email.trim();
    const trimmedSubject = (subject || 'No subject').trim();
    const trimmedMessage = message.trim();

    if (supabase) {
      await supabase.from('contact_messages').insert([{
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
      }]);
    }

    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"Bornil Portfolio" <${GMAIL_USER}>`,
        to: OWNER_EMAIL,
        replyTo: trimmedEmail,
        subject: `📬 New Message: "${trimmedSubject}" — from ${trimmedName}`,
        html: notificationTemplate(trimmedName, trimmedEmail, trimmedSubject, trimmedMessage),
      });

      await transporter.sendMail({
        from: `"Bornil Mahmud" <${GMAIL_USER}>`,
        to: trimmedEmail,
        subject: `✅ Got your message, ${trimmedName}! — Bornil Mahmud`,
        html: confirmationTemplate(trimmedName, trimmedSubject, trimmedMessage),
      });
    }

    return res.status(200).json({ success: true, message: 'Message received! I will get back to you soon.' });
  } catch (error: any) {
    console.error('Contact API error:', error?.message || error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
