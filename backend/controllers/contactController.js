import Message from "../models/Message.js";
import { transporter } from "../config/mailer.js";
import { confirmationEmail, ownerNotificationEmail } from "../utils/emailTemplates.js";

export async function createContact(req, res) {
  const { name, email, message } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  const saved = await Message.create({ name, email, message });
  res.status(201).json({ id: saved._id });

  if (!transporter) return;
  const from = process.env.EMAIL_USER;
  const owner = process.env.OWNER_EMAIL || from;
  Promise.all([
    transporter.sendMail({ from, to: email, ...confirmationEmail({ name, message }) }),
    transporter.sendMail({ from, to: owner, ...ownerNotificationEmail({ name, email, message }) }),
  ]).catch((err) => console.error("Email send failed:", err.message));
}
