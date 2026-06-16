import { NextResponse } from 'next/server';
import { backfillNullEntries } from '@/lib/songs';

export const dynamic = 'force-dynamic';

/**
 * Records null entries for any past date that never got a song. Invoked daily by
 * the Vercel cron defined in vercel.json. Vercel cron requests carry the
 * `Authorization: Bearer $CRON_SECRET` header automatically.
 */
function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const created = await backfillNullEntries();
    return NextResponse.json({ created });
  } catch (err) {
    console.error('Backfill failed', err);
    return NextResponse.json({ error: 'Backfill failed' }, { status: 500 });
  }
}
