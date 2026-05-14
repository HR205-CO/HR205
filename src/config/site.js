// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG  —  edit this file to rebrand for a new client
// Every business-specific value lives here. Components import from this file.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {

  // ── Business identity ──────────────────────────────────────────────────────
  name:        'HR205 LLC Communications',
  shortName:   'HR205',
  tagline:     'Your Trusted Telecom Consultants',
  description: 'Expert telecom consulting for homes and businesses nationwide. We find the best internet, cable, cellular, and security plans so you don\'t have to.',

  // ── Logo (Cloudinary URL recommended) ──────────────────────────────────────
  logo: 'https://res.cloudinary.com/dptzwxncr/image/upload/q_auto/f_auto/v1777878516/IMG_1193_ysom0i.png',

  // ── Intro video (Cloudinary). Forces H.264 mp4 for universal browser support. ──
  introVideo: 'https://res.cloudinary.com/hr205/video/upload/v1778751556/copy_EB4CE56E-B47F-4D0A-819B-FB83E9FED83A_vcg2kg.mp4',

  // ── Contact ────────────────────────────────────────────────────────────────
  email:  'hr205.co@hotmail.com',
  phone:  '',                       // add when available, e.g. '+1 (205) 555-0100'

  // ── Offices ────────────────────────────────────────────────────────────────
  offices: [
    { city: 'Birmingham', state: 'Alabama', street: '1711 Bessemer Rd.', zip: '35208', label: 'Headquarters' },
    { city: 'Houston',    state: 'Texas',   street: '',                  zip: '',      label: 'Second Office' },
  ],

  // ── Hero section ───────────────────────────────────────────────────────────
  hero: {
    headline:    'Save More on Your Telecom Services',
    subheadline: 'We compare every provider in your area and find the plan that actually fits your life — free of charge.',
    cta:         'Get a Free Consultation',
  },

  // ── SEO / meta ─────────────────────────────────────────────────────────────
  meta: {
    title:       'HR205 LLC — Free Telecom Consultation',
    description: 'Schedule your free telecom consultation with HR205 LLC. Expert advice for internet, cable, cellular, and security solutions — nationwide.',
  },

  // ── Brand colors (must match tailwind.config.js) ───────────────────────────
  // To change colors: update both here (for reference) AND tailwind.config.js
  colors: {
    navy:  '#1e3a8a',   // brand-navy  — primary dark
    blue:  '#2563eb',   // brand-blue  — primary accent
  },

  // ── Supabase ───────────────────────────────────────────────────────────────
  // Never put the service_role/secret key here — anon key only
  supabase: {
    url:     'https://rdqoibgxiuaenneyqfxn.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcW9pYmd4aXVhZW5uZXlxZnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NjczMzUsImV4cCI6MjA5MzQ0MzMzNX0.hVCU2lYrGk5oUW3BLqyXzdoXW6AZOPQIyjVXiKK2j2U',
  },

  // ── Cloudinary ─────────────────────────────────────────────────────────────
  cloudinary: {
    cloudName:    'hr205',
    uploadPreset: 'hr205_team_uploads',
  },

  // ── Team upload page ───────────────────────────────────────────────────────
  teamUploadPassword: 'HR205uploads',

};

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO CLONE THIS SITE FOR A NEW CLIENT
// ─────────────────────────────────────────────────────────────────────────────
// 1. Fork / duplicate the GitHub repo
// 2. Update every field in this file (SITE object above)
// 3. Update tailwind.config.js colors to match the new brand
// 4. Update src/constants/data.js — PROVIDERS list and REPS
// 5. Swap out customer photos in public/customer-photos/
// 6. Set up a new Supabase project, run the SQL in /docs/supabase-setup.sql
// 7. Set up a new Cloudflare Pages project pointing to the new repo
// 8. Done — everything else pulls from this config
// ─────────────────────────────────────────────────────────────────────────────
