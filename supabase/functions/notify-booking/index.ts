// Supabase Edge Function: notify-booking
// Triggered on INSERT to consultations table
// Notifies admin@hr205.org of new consultation requests
//
// Setup:
//   supabase secrets set ZOHO_SMTP_PASS=your_zoho_password
//   supabase functions deploy notify-booking
//   DB webhook: Table: consultations | Event: INSERT

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const FROM_NAME  = "HR205 LLC Communications";
const FROM_EMAIL = "admin@hr205.org";
const TO_EMAIL   = "admin@hr205.org";

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
      subject: `New consultation request — ${record.name ?? "Customer"}`,
      content: `
New consultation booking — HR205 Website

Name:     ${record.name ?? "—"}
Phone:    ${record.phone ?? "—"}
State:    ${record.state ?? "—"}
Service:  ${record.interests?.join(", ") ?? "—"}
Referral: ${record.referral_source ?? "—"}
Source:   ${record.referred_by ?? "organic"}
Status:   ${record.status ?? "pending"}
Time:     ${record.created_at ?? new Date().toISOString()}
      `.trim(),
    });

    await client.close();
    return new Response("ok", { status: 200 });

  } catch (err) {
    console.error("notify-booking error:", err);
    return new Response(String(err), { status: 500 });
  }
});
