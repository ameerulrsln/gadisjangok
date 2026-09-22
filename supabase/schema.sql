-- ============================================================
-- Gadis Jangok · Supabase (Postgres) schema
-- Run in Supabase: SQL Editor → New query → paste → Run
-- ============================================================

create type publish_status as enum ('draft', 'published');
create type event_status   as enum ('upcoming', 'past');
create type section_kind   as enum ('workshop', 'event', 'gallery', 'collab', 'about', 'post', 'hero');

-- ---------- ADMINS (linked to Supabase Auth users) ----------
create table admins (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

-- ---------- HERO (single editable row) ----------
create table hero (
  id         int primary key default 1 check (id = 1),
  badge      text not null default 'Art community · Kuala Terengganu, Malaysia',
  title      text not null default 'Messy, happy',
  title_em   text not null default 'creative days',
  subtitle   text not null default '',
  updated_at timestamptz not null default now()
);
insert into hero (id) values (1) on conflict do nothing;

-- ---------- WORKSHOPS ----------
create table workshops (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  tag         text,
  image_url   text,
  image_alt   text not null default '',
  meta        text[] not null default '{}',
  sort_order  int not null default 0,
  status      publish_status not null default 'draft',
  created_by  uuid references admins (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- EVENTS (upcoming + past) ----------
create table events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  event_date  text not null default '',
  location    text not null default '',
  kind        event_status not null default 'upcoming',
  image_url   text,
  image_alt   text not null default '',
  sort_order  int not null default 0,
  status      publish_status not null default 'draft',
  created_by  uuid references admins (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- GALLERY ----------
create table gallery_items (
  id          uuid primary key default gen_random_uuid(),
  image_url   text,
  image_alt   text not null default '',
  modifier    text not null default '' check (modifier in ('', 'tall', 'wide')),
  sort_order  int not null default 0,
  status      publish_status not null default 'draft',
  created_by  uuid references admins (id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ---------- COLLABORATORS (carousel) ----------
create table collaborators (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  subtitle    text not null default '',
  image_url   text,
  image_alt   text not null default '',
  sort_order  int not null default 0,
  status      publish_status not null default 'draft',
  created_by  uuid references admins (id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ---------- ABOUT (single editable row) ----------
create table about (
  id         int primary key default 1 check (id = 1),
  image_url  text,
  image_alt  text not null default 'Gadis Jangok makers at a workshop',
  quote      text not null default '',
  body       text not null default '',
  updated_at timestamptz not null default now()
);
insert into about (id) values (1) on conflict do nothing;

-- ---------- POSTS / REPORTS ----------
create table posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  body         text not null default '',
  image_url    text,
  image_alt    text not null default '',
  section      section_kind not null default 'post',
  published_at timestamptz,
  status       publish_status not null default 'draft',
  created_by   uuid references admins (id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------- CONTACT MESSAGES ----------
create table contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);


-- ---------- updated_at trigger ----------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end $$ language plpgsql;

create trigger trg_workshops_updated before update on workshops for each row execute function set_updated_at();
create trigger trg_events_updated    before update on events    for each row execute function set_updated_at();
create trigger trg_posts_updated     before update on posts     for each row execute function set_updated_at();
create trigger trg_hero_updated      before update on hero      for each row execute function set_updated_at();
create trigger trg_about_updated     before update on about     for each row execute function set_updated_at();

-- ---------- ROW LEVEL SECURITY ----------
alter table admins           enable row level security;
alter table hero             enable row level security;
alter table workshops        enable row level security;
alter table events           enable row level security;
alter table gallery_items    enable row level security;
alter table collaborators    enable row level security;
alter table about            enable row level security;
alter table posts            enable row level security;
alter table contact_messages enable row level security;

create policy "public read workshops" on workshops     for select using (status = 'published');
create policy "public read events"    on events        for select using (status = 'published');
create policy "public read gallery"   on gallery_items for select using (status = 'published');
create policy "public read collabs"   on collaborators for select using (status = 'published');
create policy "public read posts"     on posts         for select using (status = 'published');
create policy "public read hero"      on hero          for select using (true);
create policy "public read about"     on about         for select using (true);
create policy "public send message"   on contact_messages for insert with check (true);

create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admins where id = auth.uid())
$$ language sql security definer stable;

create policy "admins read own row" on admins for select using (auth.uid() = id);
create policy "admins all hero"      on hero          for all using (is_admin()) with check (is_admin());
create policy "admins all about"     on about         for all using (is_admin()) with check (is_admin());
create policy "admins all workshops" on workshops     for all using (is_admin()) with check (is_admin());
create policy "admins all events"    on events        for all using (is_admin()) with check (is_admin());
create policy "admins all gallery"   on gallery_items for all using (is_admin()) with check (is_admin());
create policy "admins all collabs"   on collaborators for all using (is_admin()) with check (is_admin());
create policy "admins all posts"     on posts         for all using (is_admin()) with check (is_admin());
create policy "admins read messages"   on contact_messages for select using (is_admin());
create policy "admins update messages" on contact_messages for update using (is_admin());

-- ---------- STORAGE ----------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "public view images" on storage.objects
  for select using (bucket_id = 'site-images');
create policy "admins upload images" on storage.objects
  for insert with check (bucket_id = 'site-images' and is_admin());
create policy "admins update images" on storage.objects
  for update using (bucket_id = 'site-images' and is_admin());
create policy "admins delete images" on storage.objects
  for delete using (bucket_id = 'site-images' and is_admin());
