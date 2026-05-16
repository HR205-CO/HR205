// Supabase Edge Function: notify-hiring
// Triggered on INSERT to applications table
// Notifies dispatch@hr205.org of new job applicants
//
// Setup:
//   supabase secrets set ZOHO_SMTP_PASS=your_zoho_password
//   supabase functions deploy notify-hiring
//   DB webhook: Table: applications | Event: INSERT

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const FROM_NAME  = "HR205 LLC Communications";
const FROM_EMAIL = "admin@hr205.org";
const TO_EMAIL   = "dispatch@hr205.org";

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
      subject: `New job application — ${record.full_name ?? "Applicant"}`,
      content: `
New hiring application — HR205 Website

Name:       ${record.full_name ?? "—"}
Email:      ${record.email ?? "—"}
Phone:      ${record.phone ?? "—"}
State:      ${record.state ?? "—"}
Experience: ${record.experience ?? "—"}
Referred:   ${record.referred_by ?? "—"}
Time:       ${record.created_at ?? new Date().toISOString()}
      `.trim(),
    });

    await client.close();
    return new Response("ok", { status: 200 });

  } catch (err) {
    console.error("notify-hiring error:", err);
    return new Response(String(err), { status: 500 });
  }
});
