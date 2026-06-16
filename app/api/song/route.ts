import { NextResponse } from 'next/server';
import { extractTrackId, lookupTrack } from '@/lib/appleMusic';
import {
  resolveDisplaySong,
  todayInDenver,
  upsertSong,
} from '@/lib/songs';

export const dynamic = 'force-dynamic';

function isAuthorized(request: Request): boolean {
  const secret = process.env.SONG_API_SECRET;
  if (!secret) return false;
  const header = request.headers.get('authorization');
  return header === `Bearer ${secret}`;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { url?: unknown; date?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body.url !== 'string' || body.url.trim() === '') {
    return NextResponse.json(
      { error: 'Missing required field: url' },
      { status: 400 }
    );
  }

  let date = todayInDenver();
  if (body.date !== undefined) {
    if (typeof body.date !== 'string' || !DATE_RE.test(body.date)) {
      return NextResponse.json(
        { error: 'date must be in YYYY-MM-DD format' },
        { status: 400 }
      );
    }
    date = body.date;
  }

  const trackId = extractTrackId(body.url);
  if (!trackId) {
    return NextResponse.json(
      { error: 'Could not parse an Apple Music track id from the url' },
      { status: 400 }
    );
  }

  const meta = await lookupTrack(trackId);
  if (!meta) {
    return NextResponse.json(
      { error: 'Could not resolve track metadata from Apple Music' },
      { status: 502 }
    );
  }

  try {
    const song = await upsertSong(date, meta, body.url.trim());
    return NextResponse.json({ song }, { status: 200 });
  } catch (err) {
    console.error('Failed to save song', err);
    return NextResponse.json({ error: 'Failed to save song' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const resolved = await resolveDisplaySong();
    return NextResponse.json(resolved ?? { song: null });
  } catch (err) {
    console.error('Failed to resolve song', err);
    return NextResponse.json({ error: 'Failed to resolve song' }, { status: 500 });
  }
}
