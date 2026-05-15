import { createError, defineEventHandler, readBody, sendError } from "h3";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(160),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().max(1000).optional().default(""),
  uploaded_files: z.string().optional().default(""),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildEmailRows = ({
  name,
  phone,
  email,
  service,
  message,
}: z.infer<typeof requestSchema>) => `
  <tr>
    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Name</td>
    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(name)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Phone</td>
    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(phone)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Email</td>
    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(email)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Service</td>
    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(service)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Message</td>
    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(message || "(No message provided)")}</td>
  </tr>
`;

const buildUploadedFilesBlock = (uploadedFiles: string) => {
  const urls = uploadedFiles
    .split(/\r?\n/)
    .map((url) => url.trim())
    .filter(Boolean);

  if (urls.length === 0) {
    return `
      <tr>
        <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Uploaded Images</td>
        <td style="padding:12px 0;color:#4b5563;">None</td>
      </tr>
    `;
  }

  return `
    <tr>
      <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Uploaded Images</td>
      <td style="padding:12px 0;color:#4b5563;">
        <ul style="margin:0;padding-left:18px;">
          ${urls
            .map(
              (url, index) =>
                `<li style="margin-bottom:8px;"><a href="${escapeHtml(
                  url,
                )}" style="color:#1d4ed8;text-decoration:none;" target="_blank" rel="noopener noreferrer">Image ${
                  index + 1
                }</a></li>`,
            )
            .join("")}
        </ul>
      </td>
    </tr>
  `;
};

const buildEmailHtml = (data: z.infer<typeof requestSchema>) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Quote Request</title>
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(15,23,42,0.12);">
            <tr>
              <td style="background:#111827;padding:32px 28px;">
                <p style="margin:0;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;color:#d8c2a0;">BJ &amp; R Maintenance</p>
                <h1 style="margin:12px 0 0;font-size:28px;font-weight:700;line-height:1.1;color:#ffffff;">New Quote Request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 24px;color:#334155;font-size:16px;line-height:1.75;">
                  A new quote request was submitted through the website. Review the request details and follow up with the customer.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                  ${buildEmailRows(data)}
                  ${buildUploadedFilesBlock(data.uploaded_files)}
                </table>
                <p style="margin:28px 0 0;color:#64748b;font-size:14px;line-height:1.7;">
                  Submitted from <strong>bjrmaintenance.com</strong>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const buildEmailText = (data: z.infer<typeof requestSchema>) => {
  const lines = [
    "BJ & R Maintenance - New Quote Request",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    "",
    "Message:",
    data.message || "(No message provided)",
    "",
  ];

  if (data.uploaded_files) {
    lines.push("Uploaded Images:");
    lines.push(...data.uploaded_files.split(/\r?\n/).filter(Boolean));
  }

  return lines.join("\n");
};

export default defineEventHandler(async (event) => {
  if (event.req.method !== "POST") {
    return sendError(
      event,
      createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      }),
    );
  }

  const body = await readBody(event);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage:
          parsed.error.issues[0]?.message ||
          "Invalid form submission.",
      }),
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resendApiKey || !resendFrom || !contactEmail) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage:
          "Resend configuration is missing. Set RESEND_API_KEY, RESEND_FROM, and CONTACT_EMAIL.",
      }),
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [contactEmail],
      subject: "New Quote Request",
      html: buildEmailHtml(parsed.data),
      text: buildEmailText(parsed.data),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return sendError(
      event,
      createError({
        statusCode: 502,
        statusMessage: "Resend email delivery failed.",
        data: errorText,
      }),
    );
  }

  return {
    success: true,
    message: "Quote request sent successfully.",
  };
});
