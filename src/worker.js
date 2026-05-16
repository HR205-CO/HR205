/**
 * HR205 Cloudflare Worker
 * Serves the static React app + handles email notification API route
 *
 * RESEND_API_KEY must be set in Cloudflare dashboard:
 * Workers & Pages → hr205 → Settings → Variables and Secrets → Add
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── Email notification route ──────────────────────────────────────────
    if (request.method === 'POST' && url.pathname === '/api/send-email') {
      return handleEmail(request, env);
    }

    // ── Everything else: serve the static React app ───────────────────────
    return env.ASSETS.fetch(request);
  },
};

async function handleEmail(request, env) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const { to, subject, text, replyTo } = await request.json();

    // If API key isn't configured yet, succeed silently so forms still work
    if (!env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — email skipped');
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HR205 Notifications <notifications@hr205.org>',
        to:   [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Email error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
