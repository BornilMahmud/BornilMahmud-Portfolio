import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const OWNER_EMAIL = 'bornilprof@gmail.com';
const PORTFOLIO_URL = 'https://bornilmhd.replit.app';

function createTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn('[Mailer] Gmail credentials not set. Emails will not be sent.');
    return null;
  }
  console.log('[Mailer] Creating transporter for:', GMAIL_USER);
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    tls: { rejectUnauthorized: false },
  });
}

const transporter = createTransporter();

/* ──────────────────────────────────────────────
   NOTIFICATION EMAIL  →  sent to Bornil
────────────────────────────────────────────── */
function notificationTemplate(name: string, email: string, subject: string, message: string) {
  const now = new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#09090f;font-family:'Segoe UI',system-ui,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">New message from ${name}: ${message.slice(0,80)}…</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090f;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- HEADER -->
    <tr><td style="background:linear-gradient(135deg,#ea580c 0%,#f97316 50%,#fb923c 100%);padding:32px;border-radius:16px 16px 0 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <div style="display:inline-block;background:rgba(0,0,0,0.18);border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:3px 12px;margin-bottom:12px;">
              <span style="color:rgba(255,255,255,0.9);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">📬 Portfolio Notification</span>
            </div>
            <h1 style="margin:0 0 3px;color:#fff;font-size:28px;font-weight:900;letter-spacing:-.02em;">Bornil Mahmud</h1>
            <p style="margin:0;color:rgba(255,255,255,0.75);font-size:13px;">Video Editor &amp; Developer · Bangladesh</p>
          </td>
          <td align="right" valign="top">
            <div style="width:50px;height:50px;background:rgba(0,0,0,0.2);border-radius:50%;border:2px solid rgba(255,255,255,0.25);text-align:center;line-height:50px;">
              <span style="color:#fff;font-size:22px;font-weight:900;">B</span>
            </div>
          </td>
        </tr>
      </table>
      <div style="margin-top:20px;background:rgba(0,0,0,0.18);border-radius:8px;padding:12px 16px;">
        <span style="color:#fff;font-size:15px;font-weight:600;">🔔 You have a new message from your portfolio!</span>
      </div>
    </td></tr>

    <!-- BODY -->
    <tr><td style="background:#0f0f1a;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);padding:32px;">

      <!-- Sender card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#16162a;border:1px solid rgba(249,115,22,.12);border-radius:12px;margin-bottom:24px;">
        <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="width:90px;"><span style="font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">From</span></td>
            <td><span style="font-size:15px;color:#f1f1f1;font-weight:600;">${name}</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="width:90px;"><span style="font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Email</span></td>
            <td><a href="mailto:${email}" style="color:#fb923c;text-decoration:none;font-size:14px;">${email}</a></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.05);">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="width:90px;"><span style="font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Subject</span></td>
            <td><span style="font-size:14px;color:#e0e0e0;">${subject}</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:14px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="width:90px;"><span style="font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Received</span></td>
            <td><span style="font-size:12px;color:#888;">${now}</span></td>
          </tr></table>
        </td></tr>
      </table>

      <!-- Message -->
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Message</p>
      <div style="background:#16162a;border:1px solid rgba(249,115,22,.15);border-left:3px solid #f97316;padding:20px 24px;border-radius:0 10px 10px 0;margin-bottom:28px;">
        <p style="margin:0;color:#d4d4d4;font-size:15px;line-height:1.8;white-space:pre-wrap;">${message}</p>
      </div>

      <!-- Reply button -->
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
        <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:linear-gradient(135deg,#ea580c,#f97316);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 32px;border-radius:8px;">↩ Reply to ${name}</a>
      </td></tr></table>

    </td></tr>

    <!-- FOOTER -->
    <tr><td style="background:#0a0a14;padding:18px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(249,115,22,.1);border-top:none;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td><p style="margin:0;font-size:12px;color:rgba(255,255,255,.3);">Sent via your portfolio contact form.</p></td>
        <td align="right"><a href="${PORTFOLIO_URL}" style="font-size:11px;color:#f97316;text-decoration:none;font-weight:600;">View Portfolio →</a></td>
      </tr></table>
    </td></tr>

  </table>
  </td></tr>
  </table>
</body>
</html>`;
}

/* ──────────────────────────────────────────────
   CONFIRMATION EMAIL  →  sent to the sender
────────────────────────────────────────────── */
function confirmationTemplate(name: string, subject: string, message: string) {
  const snippet = message.length > 200 ? message.slice(0, 200) + '...' : message;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Message Received – Bornil Mahmud</title>
</head>
<body style="margin:0;padding:0;background:#09090f;font-family:'Segoe UI',system-ui,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Hi ${name}, your message has been received! I'll get back to you very soon.</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090f;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- TOP ACCENT BAR -->
    <tr><td style="background:linear-gradient(90deg,#ea580c,#f97316,#fb923c);height:4px;border-radius:16px 16px 0 0;"></td></tr>

    <!-- HEADER -->
    <tr><td style="background:#0f0f1a;padding:40px 32px 32px;text-align:center;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);">
      <div style="width:68px;height:68px;background:linear-gradient(135deg,#ea580c,#f97316);border-radius:50%;margin:0 auto 16px;line-height:68px;text-align:center;">
        <span style="color:#fff;font-size:30px;font-weight:900;">B</span>
      </div>
      <h1 style="margin:0 0 4px;color:#fff;font-size:26px;font-weight:900;letter-spacing:-.02em;">Bornil Mahmud</h1>
      <p style="margin:0 0 20px;color:#f97316;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;">Creative Video Editor &amp; Developer</p>
      <div style="display:inline-block;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);border-radius:100px;padding:8px 20px;">
        <span style="color:#4ade80;font-size:13px;font-weight:700;">✓ Message Received!</span>
      </div>
    </td></tr>

    <!-- BODY -->
    <tr><td style="background:#0f0f1a;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);padding:32px;">

      <h2 style="margin:0 0 14px;color:#fff;font-size:20px;font-weight:700;">Hey ${name}! 👋</h2>
      <p style="margin:0 0 24px;color:#a0a0b0;font-size:15px;line-height:1.8;">
        Thanks for reaching out! I've received your message and will review it personally.
        Expect a reply at <strong style="color:#f97316;">${OWNER_EMAIL}</strong> within <strong style="color:#fff;">24–48 hours</strong>.
      </p>

      <!-- Message recap -->
      <div style="background:#16162a;border:1px solid rgba(249,115,22,.12);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">Your Message</p>
        <p style="margin:0 0 10px;font-size:12px;color:#555;">${subject ? `Subject: ${subject}` : 'No subject'}</p>
        <p style="margin:0;color:#c0c0cc;font-size:14px;line-height:1.7;font-style:italic;border-left:2px solid #f97316;padding-left:14px;">"${snippet}"</p>
      </div>

      <!-- What's next -->
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.1em;">What happens next</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
          <td valign="top" style="width:32px;padding:10px 10px 10px 0;">
            <div style="width:24px;height:24px;background:rgba(249,115,22,.15);border-radius:50%;text-align:center;line-height:24px;">
              <span style="color:#f97316;font-size:11px;font-weight:700;">1</span>
            </div>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);">
            <p style="margin:0;color:#d4d4d4;font-size:14px;"><strong style="color:#fff;">I'll read your message</strong> and understand exactly what you need</p>
          </td>
        </tr>
        <tr>
          <td valign="top" style="width:32px;padding:10px 10px 10px 0;">
            <div style="width:24px;height:24px;background:rgba(249,115,22,.15);border-radius:50%;text-align:center;line-height:24px;">
              <span style="color:#f97316;font-size:11px;font-weight:700;">2</span>
            </div>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);">
            <p style="margin:0;color:#d4d4d4;font-size:14px;"><strong style="color:#fff;">I'll reply within 24–48 hours</strong> with a personalised response</p>
          </td>
        </tr>
        <tr>
          <td valign="top" style="width:32px;padding:10px 10px 10px 0;">
            <div style="width:24px;height:24px;background:rgba(249,115,22,.15);border-radius:50%;text-align:center;line-height:24px;">
              <span style="color:#f97316;font-size:11px;font-weight:700;">3</span>
            </div>
          </td>
          <td style="padding:10px 0;">
            <p style="margin:0;color:#d4d4d4;font-size:14px;"><strong style="color:#fff;">We create something amazing</strong> together 🚀</p>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
        <a href="${PORTFOLIO_URL}" style="display:inline-block;background:linear-gradient(135deg,#ea580c,#f97316);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 32px;border-radius:8px;">View My Portfolio →</a>
      </td></tr></table>

    </td></tr>

    <!-- LINKS STRIP -->
    <tr><td style="background:#16162a;border-left:1px solid rgba(249,115,22,.15);border-right:1px solid rgba(249,115,22,.15);padding:14px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td align="center" style="padding:0 8px;"><a href="mailto:${OWNER_EMAIL}" style="color:#f97316;text-decoration:none;font-size:12px;">📧 Email</a></td>
        <td align="center" style="padding:0 8px;border-left:1px solid rgba(255,255,255,.08);"><a href="https://github.com/bornilm" style="color:#888;text-decoration:none;font-size:12px;">GitHub</a></td>
        <td align="center" style="padding:0 8px;border-left:1px solid rgba(255,255,255,.08);"><a href="https://www.linkedin.com/in/bornilmahmud/" style="color:#888;text-decoration:none;font-size:12px;">LinkedIn</a></td>
        <td align="center" style="padding:0 8px;border-left:1px solid rgba(255,255,255,.08);"><a href="https://www.facebook.com/BornilMahmudOfficialPage" style="color:#888;text-decoration:none;font-size:12px;">Facebook</a></td>
      </tr></table>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="background:#0a0a14;padding:18px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(249,115,22,.1);border-top:none;text-align:center;">
      <p style="margin:0 0 3px;font-size:13px;font-weight:600;color:rgba(255,255,255,.4);">Bornil Mahmud</p>
      <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,.2);">Daffodil Smart City, Dhaka, Bangladesh</p>
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,.15);">You received this because you submitted a message on Bornil's portfolio.</p>
    </td></tr>

  </table>
  </td></tr>
  </table>
</body>
</html>`;
}

/* ──────────────────────────────────────────────
   SEND FUNCTIONS
────────────────────────────────────────────── */
export async function sendNotificationEmail(name: string, email: string, subject: string, message: string) {
  if (!transporter) {
    console.warn('[Mailer] Skipping notification — Gmail not configured');
    return { success: false, error: 'Mailer not configured' };
  }
  try {
    const info = await transporter.sendMail({
      from: `"Bornil Portfolio" <${GMAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `📬 New Message: "${subject}" — from ${name}`,
      html: notificationTemplate(name, email, subject, message),
    });
    console.log('[Mailer] Notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[Mailer] Notification error:', err.message);
    return { success: false, error: err.message };
  }
}

export async function sendThankYouEmail(name: string, email: string, subject: string, message: string) {
  if (!transporter) {
    console.warn('[Mailer] Skipping confirmation — Gmail not configured');
    return { success: false, error: 'Mailer not configured' };
  }
  try {
    const info = await transporter.sendMail({
      from: `"Bornil Mahmud" <${GMAIL_USER}>`,
      to: email,
      subject: `✅ Got your message, ${name}! — Bornil Mahmud`,
      html: confirmationTemplate(name, subject, message),
    });
    console.log('[Mailer] Confirmation sent to:', email, '|', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[Mailer] Confirmation error:', err.message);
    return { success: false, error: err.message };
  }
}
