import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { transporter } from "../config/mailer.js";
import { resetPasswordEmail } from "../utils/emailTemplates.js";

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email?.trim() || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
  const ok = admin && (await bcrypt.compare(password, admin.passwordHash));
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
}

export async function forgotPassword(req, res) {
  const { email } = req.body || {};
  const admin = email && (await Admin.findOne({ email: email.trim().toLowerCase() }));

  if (admin && transporter) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    admin.resetTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    admin.resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 min
    await admin.save();
    const resetLink = `${process.env.CLIENT_ORIGIN}/admin/reset-password?token=${rawToken}`;
    transporter
      .sendMail({ from: process.env.EMAIL_USER, to: admin.email, ...resetPasswordEmail({ resetLink }) })
      .catch((err) => console.error("Reset email failed:", err.message));
  }

  // Same response either way — don't reveal whether the email is registered.
  res.json({ message: "If that email exists, a reset link has been sent." });
}

export async function resetPassword(req, res) {
  const { token, newPassword, confirmPassword } = req.body || {};
  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "token, newPassword and confirmPassword are required" });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const admin = await Admin.findOne({ resetTokenHash: tokenHash, resetTokenExpiry: { $gt: Date.now() } });
  if (!admin) return res.status(400).json({ error: "Reset link is invalid or expired" });

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  admin.resetTokenHash = undefined;
  admin.resetTokenExpiry = undefined;
  await admin.save();
  res.json({ message: "Password updated" });
}
