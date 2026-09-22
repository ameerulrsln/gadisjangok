# Supabase setup (gadisjangok.com)

The site reads published content from Postgres on Supabase and ships an admin
panel at **`/admin`** where admins publish reports, pictures, events, workshops,
gallery photos and collaborators.

## 1. Create the database

1. Create a project at https://supabase.com (free tier is fine).
2. Open **SQL Editor → New query**, paste the whole of
   [`schema.sql`](./schema.sql), and **Run**. This creates:
   - `admins`, `hero`, `workshops`, `events`, `gallery_items`,
     `collaborators`, `about`, `posts`, `contact_messages`
   - Row Level Security: public reads only `published` rows; only users listed
     in `admins` can write.
   - A public storage bucket **`site-images`** for all uploads.

## 2. Create the first admin

1. **Authentication → Users → Add user** → email + password (auto-confirm).
2. Copy that user's UUID, then run in the SQL editor:

   ```sql
   insert into admins (id, email)
   values ('PASTE-USER-UUID-HERE', 'admin@example.com');
   ```

## 3. Connect the website

Create `.env.local` in the project root (and add the same variables in Vercel →
Project → Settings → Environment Variables):

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-PUBLIC-ANON-KEY
```

Both values are in **Project Settings → API**. The anon key is safe to expose —
RLS protects all writes.

## 4. Use it

- `npm run dev` → visit `http://localhost:5173/admin`, sign in.
- Publish **Reports / Posts** — they appear in the new "Stories & Reports"
  section (`#reports`) between Events and Collaborators. Until the first post
  exists the section stays hidden, so nothing looks empty.
- Events marked **past** automatically move to the Past Events grid.
- Contact form messages now land in `contact_messages` (viewable via the
  Supabase table editor); the Google Sheets endpoint is kept as fallback when
  Supabase isn't configured.

## Content ideas (from @gadisjangok on Instagram)

Venues they collaborate with: PPAT, PAUT, BBW (Big Bad Wolf), Yan II, cokko,
moreh, latteso. Good seed content: photo reports from each workshop venue —
one post per venue with 1–2 photos and a short caption.
