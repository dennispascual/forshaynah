import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to receive answers and dispatch email
app.post('/api/send-responses', async (req, res) => {
  try {
    const {
      forgiveness = 'Not answered',
      love = 'Not answered',
      address = 'Not provided',
      phone = 'Not provided',
      freeTime = 'Not answered',
      hangout = 'Not answered',
      timestamp = new Date().toISOString(),
    } = req.body || {};

    const recipientEmail = 'densiopascual@gmail.com';
    const emailApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY || process.env.VITE_RESEND_API_KEY;

    console.log('--- [Received Shaynah Birthday Responses] ---', {
      forgiveness,
      love,
      address,
      phone,
      freeTime,
      hangout,
      timestamp,
    });

    if (!emailApiKey) {
      console.warn('⚠️ No RESEND_API_KEY or EMAIL_API_KEY configured yet. Responses logged successfully.');
      return res.status(200).json({
        success: true,
        message: 'Responses logged on server. Please configure your RESEND_API_KEY to send the email notification.',
        data: { forgiveness, love, address, phone, freeTime, hangout, timestamp },
      });
    }

    const resend = new Resend(emailApiKey);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a0814; color: #fff; border-radius: 16px; padding: 24px; border: 2px solid #f43f5e;">
        <h2 style="color: #fde047; text-align: center; margin-bottom: 20px; font-size: 24px;">
          🎉 Shaynah's Birthday Responses 💌
        </h2>
        
        <p style="color: #fda4af; font-size: 14px; text-align: center; margin-bottom: 24px;">
          Received on: <strong>${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Manila' })} (PH Time)</strong>
        </p>

        <div style="background-color: rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 16px; border: 1px solid rgba(244,63,94,0.3);">
          <h3 style="color: #fb7185; margin-top: 0; font-size: 16px;">1. Forgiveness (Page 7)</h3>
          <p style="font-size: 16px; color: #fff; font-weight: bold; margin: 4px 0;">👉 ${forgiveness}</p>
        </div>

        <div style="background-color: rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 16px; border: 1px solid rgba(244,63,94,0.3);">
          <h3 style="color: #fb7185; margin-top: 0; font-size: 16px;">2. Do You Still Love Me? (Page 8)</h3>
          <p style="font-size: 16px; color: #fff; font-weight: bold; margin: 4px 0;">👉 ${love}</p>
        </div>

        <div style="background-color: rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 16px; border: 1px solid rgba(244,63,94,0.3);">
          <h3 style="color: #fb7185; margin-top: 0; font-size: 16px;">3. Gift Delivery Address & Contact (Page 9)</h3>
          <p style="margin: 4px 0; color: #fecdd3;"><strong>Address:</strong></p>
          <p style="font-size: 15px; color: #fff; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; margin: 4px 0 10px 0;">${address}</p>
          <p style="margin: 4px 0; color: #fecdd3;"><strong>Contact Number:</strong></p>
          <p style="font-size: 15px; color: #fde047; font-weight: bold; margin: 4px 0;">📞 ${phone}</p>
        </div>

        <div style="background-color: rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 16px; border: 1px solid rgba(244,63,94,0.3);">
          <h3 style="color: #fb7185; margin-top: 0; font-size: 16px;">4. Free Time Today? (Page 10)</h3>
          <p style="font-size: 16px; color: #fff; font-weight: bold; margin: 4px 0;">👉 ${freeTime}</p>
        </div>

        <div style="background-color: rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 20px; border: 1px solid rgba(244,63,94,0.3);">
          <h3 style="color: #fb7185; margin-top: 0; font-size: 16px;">5. Tara gala tayo? (Page 11)</h3>
          <p style="font-size: 16px; color: #fff; font-weight: bold; margin: 4px 0;">👉 ${hangout}</p>
        </div>

        <div style="text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px;">
          Sent automatically from Shaynah's Birthday Surprise Web Applet ❤️
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Birthday Surprise <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `💌 Shaynah's Birthday Response (Tara Gala: ${hangout})`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error dispatching email with Resend:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to dispatch email.',
        logged: true,
      });
    }

    console.log('✅ Email successfully dispatched via Resend:', data);
    return res.status(200).json({
      success: true,
      data,
      message: 'Email sent successfully!',
    });
  } catch (err: any) {
    console.error('Server error handling /api/send-responses:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Server error',
    });
  }
});

// Vite & Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
