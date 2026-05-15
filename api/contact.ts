import { Resend } from "resend";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(160),
  service: z.string().trim().min(1, "Select a service").max(120),
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

const buildUploadedFilesHtml = (uploadedFiles: string) => {
  const files = uploadedFiles
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (files.length === 0) {
    return `<tr><td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Uploaded Images</td><td style="padding:12px 0;color:#4b5563;">None</td></tr>`;
  }

  return `
    <tr>
      <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Uploaded Images</td>
      <td style="padding:12px 0;color:#4b5563;">
        <ul style="margin:0;padding-left:18px;">
          ${files
            .map(
              (url, index) =>
                `<li style="margin-bottom:10px;"><a href="${escapeHtml(
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

const buildHtmlEmail = (data: z.infer<typeof requestSchema>) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Quote Request</title>
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;padding:24px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(15,23,42,0.12);">
            <tr>
              <td style="background:#111827;padding:32px;">
                <p style="margin:0;color:#d8c2a0;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;">BJ &amp; R Maintenance</p>
                <h1 style="margin:12px 0 0;color:#ffffff;font-size:32px;line-height:1.1;font-weight:700;">New Quote Request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.75;">A new quote request has been submitted through your website. The details are below.</p>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Name</td>
                    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(data.name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Phone</td>
                    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(data.phone)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Email</td>
                    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(data.email)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Service</td>
                    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(data.service)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;font-weight:700;color:#111;vertical-align:top;width:30%;">Message</td>
                    <td style="padding:12px 0;color:#4b5563;">${escapeHtml(data.message || "(No message provided)")}</td>
                  </tr>
                  ${buildUploadedFilesHtml(data.uploaded_files)}
                </table>
                <p style="margin:32px 0 0;color:#64748b;font-size:14px;line-height:1.7;">Submitted from <strong>bjrmaintenance.com</strong>.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const buildTextEmail = (data: z.infer<typeof requestSchema>) => {
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
  ];

  if (data.uploaded_files) {
    lines.push("", "Uploaded Images:");
    lines.push(...data.uploaded_files.split(/\r?\n/).filter(Boolean));
  }

  return lines.join("\n");
};

const parseJsonBody = async (req: any) => {
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: Buffer | string) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body.length ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  if (!req.headers["content-type"]?.includes("application/json")) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Expected application/json request body." }));
    return;
  }

  let payload: Record<string, unknown>;

  try {
    payload = await parseJsonBody(req);
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid JSON payload." }));
    return;
  }

  const parsed = requestSchema.safeParse(payload);

  if (!parsed.success) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: parsed.error.issues[0]?.message || "Validation failed.",
      }),
    );
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resendApiKey || !resendFrom || !contactEmail) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error:
          "Resend configuration is missing. Set RESEND_API_KEY, RESEND_FROM, and CONTACT_EMAIL.",
      }),
    );
    return;
  }

  const resendClient = new Resend(resendApiKey);

  try {
    await resendClient.emails.send({
      from: resendFrom,
      to: [contactEmail],
      subject: "New Quote Request",
      html: buildHtmlEmail(parsed.data),
      text: buildTextEmail(parsed.data),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to send email through Resend.";

    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: message }));
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: true, message: "Quote request sent." }));
}
