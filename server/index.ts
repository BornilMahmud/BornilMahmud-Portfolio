import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { sendNotificationEmail, sendThankYouEmail } from './mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
if (!supabase) console.warn('[Server] Supabase not configured — messages will not be saved to DB.');

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long. Please keep it under 5000 characters.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = (subject || 'No subject').trim();
    const trimmedMessage = message.trim();

    if (supabase) {
      const { error: dbError } = await supabase.from('contact_messages').insert([
        { name: trimmedName, email: trimmedEmail, subject: trimmedSubject, message: trimmedMessage },
      ]);
      if (dbError) {
        console.error('Supabase insert error:', dbError.message);
      } else {
        console.log('Message saved to database from:', trimmedEmail);
      }
    }

    // Respond immediately — don't make the user wait for emails
    res.json({ success: true, message: 'Message received! I will get back to you soon.' });

    // Send emails in the background (non-blocking)
    sendNotificationEmail(trimmedName, trimmedEmail, trimmedSubject, trimmedMessage)
      .then(r => r.success ? console.log('Notification sent') : console.error('Notification failed:', r.error))
      .catch(e => console.error('Notification error:', e?.message));

    sendThankYouEmail(trimmedName, trimmedEmail, trimmedSubject, trimmedMessage)
      .then(r => r.success ? console.log('Confirmation sent to:', trimmedEmail) : console.error('Confirmation failed:', r.error))
      .catch(e => console.error('Confirmation error:', e?.message));
  } catch (error: any) {
    console.error('Contact API error:', error?.message || error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
