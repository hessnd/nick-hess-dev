import 'server-only';
import { getSupabase } from './supabase';
import type { TrackMetadata } from './appleMusic';

const TABLE = 'songs_of_the_day';
const TIME_ZONE = 'America/Denver';

export type Song = {
  date: string;
  apple_music_url: string | null;
  track_id: string | null;
  title: string | null;
  artist: string | null;
  album: string | null;
  artwork_url: string | null;
  preview_url: string | null;
  genre: string | null;
  is_null_entry: boolean;
  created_at: string;
  updated_at: string;
};

/** A row that actually has a song (title present, not a null entry). */
export type SetSong = Song & { title: string; artist: string };

export function isSetSong(song: Song | null | undefined): song is SetSong {
  return Boolean(song && !song.is_null_entry && song.title && song.artist);
}

/** Current calendar date in America/Denver, formatted as YYYY-MM-DD. */
export function todayInDenver(): string {
  return formatDenverDate(new Date());
}

function formatDenverDate(date: Date): string {
  // en-CA renders as YYYY-MM-DD, which is exactly the shape Postgres `date` wants.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export type ResolvedSong = {
  song: SetSong;
  isFallback: boolean;
  /** The date the page is for (today, MT) — may differ from song.date on fallback. */
  forDate: string;
};

/**
 * Resolves what to show on the page for today:
 *   - today's song if one is set, otherwise
 *   - a random past song flagged as a fallback ("throwback"), otherwise
 *   - null when nothing has ever been posted.
 *
 * Today is intentionally left without a row when unset so it can still receive a
 * song later; the backfill cron records null entries for past missed dates.
 */
export async function resolveDisplaySong(): Promise<ResolvedSong | null> {
  const forDate = todayInDenver();
  const todayRow = await getSongForDate(forDate);

  if (isSetSong(todayRow)) {
    return { song: todayRow, isFallback: false, forDate };
  }

  const fallback = await getRandomSetSong();
  if (fallback) {
    return { song: fallback, isFallback: true, forDate };
  }

  return null;
}

export async function getSongForDate(date: string): Promise<Song | null> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select('*')
    .eq('date', date)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * Returns a random previously-set song, used as a "throwback" fallback when the
 * current day has no song yet. The dataset is one row per day, so fetching the
 * set rows and picking in memory is cheap and avoids a custom RPC.
 */
export async function getRandomSetSong(): Promise<SetSong | null> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select('*')
    .eq('is_null_entry', false)
    .not('title', 'is', null);

  if (error) throw error;
  if (!data || data.length === 0) return null;

  const pick = data[Math.floor(Math.random() * data.length)];
  return isSetSong(pick) ? pick : null;
}

/** Inserts or updates the song for a given day. */
export async function upsertSong(
  date: string,
  meta: TrackMetadata,
  appleMusicUrl: string
): Promise<Song> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .upsert(
      {
        date,
        apple_music_url: appleMusicUrl,
        track_id: meta.trackId,
        title: meta.title,
        artist: meta.artist,
        album: meta.album,
        artwork_url: meta.artworkUrl,
        preview_url: meta.previewUrl,
        genre: meta.genre,
        is_null_entry: false,
      },
      { onConflict: 'date' }
    )
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

/**
 * Walks from the earliest recorded date up to (and including) yesterday and
 * inserts a null entry for any date with no row. No-op until the first song
 * has been posted.
 */
export async function backfillNullEntries(): Promise<number> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select('date')
    .order('date', { ascending: true });

  if (error) throw error;
  if (!data || data.length === 0) return 0;

  const existing = new Set(data.map((row) => row.date));
  const start = new Date(`${data[0].date}T00:00:00Z`);
  const today = todayInDenver();

  const missing: { date: string; is_null_entry: true }[] = [];
  for (
    let d = new Date(start);
    formatUtcDate(d) < today; // stop before today; today may still get a song
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    const iso = formatUtcDate(d);
    if (!existing.has(iso)) {
      missing.push({ date: iso, is_null_entry: true });
    }
  }

  if (missing.length === 0) return 0;

  const { error: insertError } = await getSupabase().from(TABLE).insert(missing);
  if (insertError) throw insertError;
  return missing.length;
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
