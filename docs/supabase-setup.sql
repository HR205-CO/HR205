-- ─────────────────────────────────────────────────────────────
-- HR205 SITE TEMPLATE — Supabase Setup SQL
-- Run this in the SQL Editor of a new Supabase project
-- when deploying this template for a new client.
-- ─────────────────────────────────────────────────────────────

-- Consultations / bookings
create table if not exists consultations (
  id            uuid default gen_random_uuid() primary key,
  name          text not null,
  phone         text,
  state         text,
  services      text[],
  referral      text,
  status        text default 'pending',
  notes         text,
  referred_by   text,
  referral_tier integer,
  created_at    timestamp with time zone default now()
);
alter table consultations enable row level security;
create policy "Public insert" on consultations for insert with check (true);
create policy "Admin read"   on consultations for select using (true);
create policy "Admin update" on consultations for update using (true);

-- Contact form submissions
create table if not exists contacts (
  id         uuid default gen_random_uuid() primary key,
  name       text,
  email      text,
  message    text,
  created_at timestamp with time zone default now()
);
alter table contacts enable row level security;
create policy "Public insert" on contacts for insert with check (true);
create policy "Admin read"    on contacts for select using (true);

-- Affiliate signups
create table if not exists affiliates (
  id         uuid default gen_random_uuid() primary key,
  name       text,
  email      text,
  phone      text,
  state      text,
  created_at timestamp with time zone default now()
);
alter table affiliates enable row level security;
create policy "Public insert" on affiliates for insert with check (true);
create policy "Admin read"    on affiliates for select using (true);

-- Customer photo gallery
create table if not exists gallery_images (
  id          uuid default gen_random_uuid() primary key,
  public_id   text not null,
  secure_url  text not null,
  width       integer,
  height      integer,
  caption     text,
  uploaded_at timestamp with time zone default now()
);
alter table gallery_images enable row level security;
create policy "Public read"   on gallery_images for select using (true);
create policy "Public insert" on gallery_images for insert with check (true);

-- QR scan tracking
create table if not exists qr_scans (
  id         uuid default gen_random_uuid() primary key,
  tier       integer not null check (tier in (1, 2, 3)),
  source_id  text default 'general',
  converted  boolean default false,
  scanned_at timestamp with time zone default now()
);
alter table qr_scans enable row level security;
create policy "Public insert" on qr_scans for insert with check (true);
create policy "Admin read"    on qr_scans for select using (true);
create policy "Admin update"  on qr_scans for update using (true);

-- Job applications (hiring page)
create table if not exists applications (
  id         uuid default gen_random_uuid() primary key,
  name       text,
  email      text,
  phone      text,
  state      text,
  experience text,
  created_at timestamp with time zone default now()
);
alter table applications enable row level security;
create policy "Public insert" on applications for insert with check (true);
create policy "Admin read"    on applications for select using (true);
