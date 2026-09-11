import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PASS } = process.env;

export const transporter = EMAIL_USER && EMAIL_PASS
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    })
  : null;
