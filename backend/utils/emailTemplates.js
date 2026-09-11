function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const BRAND_GRADIENT =
  "linear-gradient(110deg,#7b4dff 0%,#4f7bff 40%,#14e0e0 100%)";
const OWNER_MAIL = "rohitkumarrawani6@gmail.com";

function emailShell({ headerLabel, bodyHtml, footerHtml }) {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f1f6;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(20,10,60,0.10);">
        <tr>
          <td style="background:${BRAND_GRADIENT};padding:26px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:40px;">
                  <table cellpadding="0" cellspacing="0" style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:10px;">
                    <tr><td align="center" style="color:#ffffff;font-size:15px;font-weight:bold;line-height:36px;">RK</td></tr>
                  </table>
                </td>
                <td style="padding-left:12px;">
                  <span style="color:#ffffff;font-size:16px;font-weight:bold;">Rohit Kumar</span><br/>
                  <span style="color:rgba(255,255,255,0.85);font-size:12px;">${headerLabel}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">${bodyHtml}</td>
        </tr>
        <tr>
          <td style="padding:18px 32px;background:#faf9fd;border-top:1px solid #eeeef4;">${footerHtml}</td>
        </tr>
      </table>
      <p style="font-size:11px;color:#a0a0b5;margin:16px 0 0;">Sent from rohitkumar.dev's contact form</p>
    </td>
  </tr>
</table>`;
}

export function confirmationEmail({ name, message }) {
  name = escapeHtml(name);
  message = escapeHtml(message);

  const body = `
    <p style="margin:0 0 6px;font-size:18px;color:#1a1a2e;font-weight:bold;">Message received ✅</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5a5a72;">
      Hi ${name}, thanks for reaching out! I've got your message and will reply within a day or two.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6fc;border-left:3px solid #7b4dff;border-radius:8px;">
      <tr>
        <td style="padding:16px 18px;font-size:14px;line-height:1.6;color:#4a4a5e;white-space:pre-wrap;">${message}</td>
      </tr>
    </table>
    <p style="margin:22px 0 0;font-size:14px;color:#8a8a9e;">Talk soon,<br/><strong style="color:#1a1a2e;">Rohit</strong></p>`;

  const footer = `
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:12px;color:#9a9ab0;">This is an automated confirmation — no need to reply here.</td>
      <td align="right"><a href="mailto:${OWNER_MAIL}" style="font-size:12px;color:#7b4dff;text-decoration:none;">${OWNER_MAIL}</a></td>
    </tr></table>`;

  return {
    subject: "Thanks for reaching out!",
    html: emailShell({
      headerLabel: "Message confirmed",
      bodyHtml: body,
      footerHtml: footer,
    }),
  };
}

export function ownerNotificationEmail({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const when = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const row = (label, value) => `
    <tr>
      <td style="padding:6px 0;font-size:12px;color:#9a9ab0;width:70px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:14px;color:#1a1a2e;">${value}</td>
    </tr>`;

  const body = `
    <p style="margin:0 0 18px;font-size:18px;color:#1a1a2e;font-weight:bold;">📬 New portfolio message</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
      ${row("From", safeName)}
      ${row("Email", `<a href="mailto:${email}" style="color:#4f7bff;text-decoration:none;">${safeEmail}</a>`)}
      ${row("When", when)}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6fc;border-left:3px solid #14e0e0;border-radius:8px;">
      <tr>
        <td style="padding:16px 18px;font-size:14px;line-height:1.6;color:#4a4a5e;white-space:pre-wrap;">${safeMessage}</td>
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr>
        <td style="background:${BRAND_GRADIENT};border-radius:8px;">
          <a href="mailto:${email}?subject=Re: your message" style="display:inline-block;padding:11px 22px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">Reply to ${safeName}</a>
        </td>
      </tr>
    </table>`;

  const footer = `<span style="font-size:12px;color:#9a9ab0;">Saved to the portfolio's message inbox in MongoDB.</span>`;

  return {
    subject: `New portfolio message from ${name}`,
    html: emailShell({
      headerLabel: "Owner notification",
      bodyHtml: body,
      footerHtml: footer,
    }),
  };
}
