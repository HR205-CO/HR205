// Supabase Edge Function: notify-contact
// Triggered by Supabase webhook on INSERT to contacts table
// Sends email notification to support@hr205.org via Zoho SMTP
//
// Setup:
//   supabase secrets set ZOHO_SMTP_PASS=your_zoho_password
//   supabase functions deploy notify-contact
//   Then create a DB webhook in Supabase dashboard:
//     Table: contacts | Event: INSERT | URL: [your-project]/functions/v1/notify-contact

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const FROM_NAME  = "HR205 LLC Communications";
const FROM_EMAIL = "admin@hr205.org";
const TO_EMAIL   = "support@hr205.org";

serve(async (req) => {
  try {
    const payload = await req.json();
    const record  = payload?.record;
    if (!record) return new Response("no record", { status: 400 });

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.zoho.com",
        port: 587,
        tls: false,
        auth: {
          username: FROM_EMAIL,
          password: Deno.env.get("ZOHO_SMTP_PASS") ?? "",
        },
      },
    });

    await client.send({
      from:    `${FROM_NAME} <${FROM_EMAIL}>`,
      to:      TO_EMAIL,
      subject: `New contact from ${record.first_name ?? ""} ${record.last_name ?? ""}`.trim(),
      content: `
New contact form submission — HR205 Website

Name:    ${record.first_name ?? ""} ${record.last_name ?? ""}
Email:   ${record.email ?? "—"}
Message: ${record.message ?? "—"}
Time:    ${record.created_at ?? new Date().toISOString()}

Reply to: ${record.email ?? "no email provided"}
      `.trim(),
    });

    await client.close();
    return new Response("ok", { status: 200 });

  } catch (err) {
    console.error("notify-contact error:", err);
    return new Response(String(err), { status: 500 });
  }
});
