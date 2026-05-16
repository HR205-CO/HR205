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
        to: ["support@hr205.org"],
        reply_to: r.email || undefined,
        subject: `New contact — ${r.first_name ?? ""} ${r.last_name ?? ""}`.trim(),
        text: `New contact form submission\n\nName: ${r.first_name ?? ""} ${r.last_name ?? ""}\nEmail: ${r.email ?? "—"}\nMessage: ${r.message ?? "—"}\nTime: ${r.created_at ?? new Date().toISOString()}`,
      }),
    });

    const body = await res.text();
    return new Response(body, { status: res.status });
  } catch (err) {
    console.error(err);
    return new Response(String(err), { status: 500 });
  }
});
