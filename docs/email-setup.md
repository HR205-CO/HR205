# HR205 Email Setup Guide
## Complete SMTP + Supabase Auth Configuration

---

## 1. Email Structure

| Address | Role | Used For |
|---|---|---|
| `admin@hr205.org` | Manager auth | Portal login, admin notifications |
| `support@hr205.org` | Support | Contact form submissions, customer replies |
| `dispatch@hr205.org` | Operations | Hiring, rep dispatch, scheduling |
| `info@hr205.org` | Public | Website display, general inquiries |
| `rep1@hr205.org` | Rep 1 | Field rep portal login |
| `rep2@hr205.org` | Rep 2 | Field rep portal login |
| `rep3@hr205.org` | Rep 3 | Field rep portal login |

---

## 2. Supabase Auth Template Updates

Log into Supabase → Project → **Authentication** → **Email Templates**

Update each template to use `noreply@hr205.org` as the sender:

### Confirmation Email
```
Subject: Confirm your HR205 account
From: HR205 <noreply@hr205.org>
Reply-To: support@hr205.org
```

### Password Reset
```
Subject: Reset your HR205 password
From: HR205 <noreply@hr205.org>
Reply-To: support@hr205.org

Body:
Hi,

You requested a password reset for your HR205 account.
Click the link below to reset your password:

{{ .ConfirmationURL }}

If you didn't request this, you can ignore this email.

— HR205 LLC Communications
support@hr205.org
```

### Magic Link (if enabled)
```
Subject: Your HR205 login link
From: HR205 <noreply@hr205.org>
Reply-To: support@hr205.org
```

---

## 3. Supabase SMTP Configuration

Go to Supabase → **Project Settings** → **Auth** → **SMTP Settings**

Enable custom SMTP and enter your provider's settings:

### Option A: Resend (recommended)
- Host: `smtp.resend.com`
- Port: `587`
- User: `resend`
- Password: `your_resend_api_key`
- Sender: `noreply@hr205.org`

### Option B: Zoho Mail
- Host: `smtp.zoho.com`
- Port: `587`
- User: `admin@hr205.org`
- Password: `your_zoho_password`
- Sender: `admin@hr205.org`

### Option C: Google Workspace
- Host: `smtp.gmail.com`
- Port: `587`
- User: `admin@hr205.org`
- Password: `your_app_password` (App Password, not your regular password)
- Sender: `admin@hr205.org`

---

## 4. Contact Form Notifications (Supabase Edge Function)

Currently, contact form submissions save to Supabase but do NOT send email
notifications to the team. To enable email alerts when someone submits a form:

### Step 1 — Create Edge Function
```bash
supabase functions new notify-contact
```

### Step 2 — Edge Function code (`supabase/functions/notify-contact/index.ts`)
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record } = await req.json()
  
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'notifications@hr205.org',
      to: 'support@hr205.org',
      subject: `New contact from ${record.first_name} ${record.last_name}`,
      text: `
Name: ${record.first_name} ${record.last_name}
Email: ${record.email}
Message: ${record.message}
      `.trim(),
    }),
  })
  
  return new Response('ok')
})
```

### Step 3 — Create Supabase Database Webhook
Go to Supabase → **Database** → **Webhooks** → New webhook:
- Table: `contacts`
- Events: `INSERT`
- URL: `https://rdqoibgxiuaenneyqfxn.supabase.co/functions/v1/notify-contact`

### Step 4 — Set Edge Function Secret
```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxx
```

---

## 5. Auth Callback URL

Go to Supabase → **Authentication** → **URL Configuration**

Set Site URL to your live domain:
```
https://hr205.co
```

Add Redirect URLs:
```
https://hr205.co/**
https://hr205.co/admin
```

---

## 6. Migrate Auth to Supabase (future upgrade)

The current auth system uses client-side password comparison (security risk).
To upgrade to real Supabase Auth:

1. Create users in Supabase Auth dashboard for each email
2. Add a `role` column to Supabase's `auth.users` metadata
3. Update `AdminLogin.jsx` to use `supabase.auth.signInWithPassword()`
4. Replace `MANAGER_AUTH` and `REPS` constants with Supabase session checks

This is the recommended path once the site goes to full production.
