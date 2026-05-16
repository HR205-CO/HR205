import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const payload = await req.json();
    const r = payload?.record;
    if (!r) return new Response("no record", { status: 400 });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "HR205 Notifications <notifications@hr205.org>",
        to: ["admin@hr205.org"],
        subject: `New consultation request — ${r.name ?? "Customer"}`,
        text: `New consultation booking\n\nName: ${r.name ?? "—"}\nPhone: ${r.phone ?? "—"}\nState: ${r.state ?? "—"}\nService: ${Array.isArray(r.interests) ? r.interests.join(", ") : r.interests ?? "—"}\nReferral: ${r.referral_source ?? "—"}\nSource: ${r.referred_by ?? "organic"}\nStatus: ${r.status ?? "pending"}\nTime: ${r.created_at ?? new Date().toISOString()}`,
      }),
    });

    const body = await res.text();
    return new Response(body, { status: res.status });
  } catch (err) {
    console.error(err);
    return new Response(String(err), { status: 500 });
  }
});
