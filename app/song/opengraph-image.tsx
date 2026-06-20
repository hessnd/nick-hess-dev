import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { resolveDisplaySong } from '@/lib/songs';

// The card depends on per-day DB content, so keep it dynamic (don't try to
// resolve a song at build time, where no DB credentials exist) and run on the
// Node.js runtime so we can read the self-hosted font from the filesystem.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const alt = 'Nick Hess — Song of the Day';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ACCENT = '#60a5fa';

/** Roughly fit the title to the available column by trimming the font size. */
function titleFontSize(title: string): number {
  const len = title.length;
  if (len > 40) return 48;
  if (len > 30) return 58;
  if (len > 20) return 68;
  return 80;
}

/** Fetch the artwork once and inline it so both layers reuse a single request. */
async function loadArtwork(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const buf = await fetch(url).then((r) => r.arrayBuffer());
    return `data:image/jpeg;base64,${Buffer.from(buf).toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  let resolved = null;
  try {
    resolved = await resolveDisplaySong();
  } catch {
    resolved = null;
  }

  const marvin = await readFile(
    join(process.cwd(), 'public/fonts/MarvinVisionsBig-Bold.woff')
  );

  const fonts = [
    {
      name: 'Marvin Visions',
      data: marvin,
      style: 'normal' as const,
      weight: 400 as const,
    },
  ];

  const root = {
    display: 'flex',
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    fontFamily: 'Marvin Visions',
    backgroundColor: '#0e0e10',
    color: '#ffffff',
    overflow: 'hidden',
  };

  // ── Empty state: nothing has been posted yet ──
  if (!resolved) {
    return new ImageResponse(
      (
        <div style={{ ...root, flexDirection: 'column', justifyContent: 'center', padding: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: ACCENT, marginRight: 16 }} />
            <div style={{ fontSize: 30, letterSpacing: 5, color: ACCENT }}>SONG OF THE DAY</div>
          </div>
          <div style={{ fontSize: 88, lineHeight: 1.02 }}>Nothing playing yet</div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.6)', marginTop: 24 }}>
            Check back soon — nickhess.dev
          </div>
        </div>
      ),
      { ...size, fonts }
    );
  }

  const { song, isFallback } = resolved;
  const artwork = await loadArtwork(song.artwork_url);
  const eyebrow = isFallback ? 'SONG OF THE DAY · THROWBACK' : 'SONG OF THE DAY';

  return new ImageResponse(
    (
      <div style={root}>
        {/* Atmospheric backdrop: the artwork, covered and darkened. */}
        {artwork && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artwork}
            alt=""
            width={size.width}
            height={size.height}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage:
              'linear-gradient(105deg, rgba(8,8,11,0.95) 0%, rgba(8,8,11,0.86) 52%, rgba(8,8,11,0.64) 100%)',
          }}
        />

        {/* Foreground content */}
        <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%', padding: 72, alignItems: 'center' }}>
          {artwork && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artwork}
              alt=""
              width={400}
              height={400}
              style={{
                width: 400,
                height: 400,
                borderRadius: 28,
                objectFit: 'cover',
                marginRight: 60,
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
              }}
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: ACCENT, marginRight: 14 }} />
              <div style={{ fontSize: 26, letterSpacing: 4, color: ACCENT }}>{eyebrow}</div>
            </div>

            <div
              style={{
                fontSize: titleFontSize(song.title),
                lineHeight: 1.03,
                color: '#ffffff',
                textShadow: '0 2px 24px rgba(0,0,0,0.55)',
                overflow: 'hidden',
              }}
            >
              {song.title}
            </div>

            <div style={{ fontSize: 38, color: 'rgba(255,255,255,0.88)', marginTop: 18 }}>
              {song.artist}
            </div>

            {song.album && (
              <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.55)', marginTop: 8 }}>
                {song.album}
              </div>
            )}
          </div>
        </div>

        {/* Wordmark */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            right: 72,
            fontSize: 24,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          nickhess.dev
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
