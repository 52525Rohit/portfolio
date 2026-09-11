import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PASS } = process.env;

// ponytail: Gmail-only transport, swap createTransport config if another provider is needed
export const transporter = EMAIL_USER && EMAIL_PASS
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    })
  : null;
