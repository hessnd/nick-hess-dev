# Song of the Day — Implementation Plan

A new page on the site that tracks Nick's favorite song of the day. Songs are
posted via an authenticated API endpoint using an Apple Music link, persisted to
a database, and rendered on a page with rich social-share meta tags.

## Decisions

- **Storage:** A new dedicated Supabase Postgres project, with one row per
  calendar day.
- **Page behavior:** Show today's song. If today has no song set yet, show a
  random past song as a "throwback" fallback until one is posted. Dates that are
  never set get a persisted `null` entry.
- **Metadata source:** The free iTunes Lookup API (no auth) resolves title,
  artist, album, artwork, and preview from an Apple Music link.
- **Timezone:** America/Denver — "today" is computed in Nick's local day, not
  UTC.
- **No embedded player** — artwork, text, and a "Listen on Apple Music" link
  only.

## Architecture overview

```
POST /api/song          ──▶ parse Apple Music URL ──▶ iTunes Lookup ──▶ upsert songs(date)
GET  /song              ──▶ resolve today's song (or random fallback) ──▶ render + OG/Twitter tags
GET  /api/song/backfill ──▶ (Vercel Cron, ~00:05 MT) insert null rows for any missed dates
```

## 0. New Supabase project

Create a fresh project in the existing **F1 Fantasy** org (`us-west-1`, to match
the existing project) named e.g. `nick-hess-dev-songs`. Creating a project is a
paid org resource, so the Supabase MCP will require a cost confirmation to be
approved at build time. Once provisioned, grab the project URL and service-role
key for env vars.

## 1. Database

Migration applied via the Supabase MCP `apply_migration`:

```sql
create table public.songs_of_the_day (
  date            date primary key,
  apple_music_url text,
  track_id        text,
  title           text,
  artist          text,
  album           text,
  artwork_url     text,        -- upscaled to 1200x1200
  preview_url     text,
  genre           text,
  is_null_entry   boolean not null default false,  -- true = "no song this day"
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table public.songs_of_the_day enable row level security;
-- No public policies: all access is server-side via the service-role key.
```

A "null entry" is a row with `is_null_entry = true` and null song fields.

## 2. Dependencies & env vars

- Add `@supabase/supabase-js`.
- New env vars (added to `.env.local.example` and the Vercel project):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only, never client-exposed)
  - `SONG_API_SECRET` — bearer token guarding the POST endpoint
  - `CRON_SECRET` — guards the backfill route

## 3. New files

- **`lib/supabase.ts`** — server-only Supabase client (service role).
- **`lib/appleMusic.ts`**
  - `extractTrackId(url)` — handles both `…/song/name/123` and
    `…/album/name/456?i=123` forms (the `i` param is the track id when present).
  - `lookupTrack(trackId)` — calls
    `https://itunes.apple.com/lookup?id=<id>`, maps `trackName`, `artistName`,
    `collectionName`, `artworkUrl100`, `previewUrl`, `primaryGenreName`;
    upscales artwork (`100x100` → `1200x1200bb`).
- **`lib/songs.ts`** — DB queries: `getSongForDate(date)`,
  `getRandomSetSong()`, `upsertSong(date, data)`, `ensureRowExists(date)`,
  `backfillNullEntries()`.
- **`app/api/song/route.ts`**
  - `POST`: checks `Authorization: Bearer $SONG_API_SECRET`; body
    `{ url: string, date?: string }` (defaults to today/MT). Parses URL →
    lookup → upsert. Returns the stored song as JSON (400 on bad URL, 401 on bad
    auth, 502 if lookup fails).
  - `GET` (optional): returns today's resolved song as JSON.
- **`app/api/song/backfill/route.ts`** — cron target (guarded by `CRON_SECRET`):
  inserts `is_null_entry` rows for any date between the first entry and yesterday
  that has no row. Belt-and-suspenders with lazy creation on read.
- **`app/song/page.tsx`** — Server Component, `export const dynamic = 'force-dynamic'`:
  - Resolve today (MT). If a real song exists → show it (canonical). If
    missing/null → render a random past song marked as a "throwback" fallback,
    and lazily ensure today's row exists.
  - `generateMetadata()` builds rich tags from the resolved song: `title`,
    `description` (`"<title> — <artist>"`), `openGraph` (`type: 'music.song'`,
    square artwork as the image with width + height, `music:musician` /
    `music:album` via the `other` field), and `twitter`
    (`summary_large_image`). One canonical URL (`/song`) whose tags reflect the
    current day, so any social network gets the right preview.
- **`app/song/SongCard.tsx`** (+ small subcomponents) — artwork, title, artist,
  album, "Listen on Apple Music" link, and a subtle "throwback" badge when
  showing a fallback. Uses existing semantic tokens (`--color-surface`,
  `--color-ink`, etc.) and `.animate-in` stagger classes — no `dark:` variants,
  matching CLAUDE.md conventions.
- **`vercel.json`** — daily cron hitting `/api/song/backfill`.

## 4. Posting a song

```bash
curl -X POST https://nickhess.dev/api/song \
  -H "Authorization: Bearer $SONG_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://music.apple.com/us/album/x/123?i=456"}'
```

(Easy to wire into an iOS Shortcut later for one-tap posting from the Music
app's share sheet.)

## 5. Verification

- `pnpm type-check` and `pnpm lint`.
- Local test: POST a real Apple Music link, load `/song`, confirm
  artwork/metadata and OG tags (via view-source / a card validator).
