import { cache } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import SongCard from '@/components/SongCard';
import { resolveDisplaySong } from '@/lib/songs';

export const dynamic = 'force-dynamic';

// Cached per-request so generateMetadata and the page share one resolution
// (and the same random fallback pick).
const getResolved = cache(resolveDisplaySong);

const PAGE_URL = 'https://nickhess.dev/song';

export async function generateMetadata(): Promise<Metadata> {
  let resolved;
  try {
    resolved = await getResolved();
  } catch {
    resolved = null;
  }

  if (!resolved) {
    return {
      title: 'Song of the Day — Nick Hess',
      description: 'Nick Hess’s favorite song of the day.',
      alternates: { canonical: PAGE_URL },
    };
  }

  const { song } = resolved;
  const title = `${song.title} — ${song.artist}`;
  const description = song.album
    ? `${song.title} by ${song.artist} (${song.album}) — Nick Hess’s song of the day.`
    : `${song.title} by ${song.artist} — Nick Hess’s song of the day.`;

  const images = song.artwork_url
    ? [
        {
          url: song.artwork_url,
          width: 1200,
          height: 1200,
          alt: `${song.title} by ${song.artist}`,
        },
      ]
    : undefined;

  return {
    title: `${title} · Song of the Day`,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: 'Nick Hess',
      type: 'music.song',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: song.artwork_url ? [song.artwork_url] : undefined,
      creator: '@nickdhess',
      site: '@nickdhess',
    },
    other: {
      ...(song.artist ? { 'music:musician': song.artist } : {}),
      ...(song.album ? { 'music:album': song.album } : {}),
    },
  };
}

export default async function SongPage() {
  const resolved = await getResolved();

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-10 relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 no-print">
        <ThemeToggle />
      </div>

      <header className="animate-in">
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-[160] tracking-tight leading-none mb-3">
          Song of the Day
        </h1>
        <Link
          href="/"
          className="text-sm text-accent hover:underline underline-offset-4 transition-colors"
        >
          &larr; Back to Nick Hess
        </Link>
      </header>

      {resolved ? (
        <SongCard resolved={resolved} />
      ) : (
        <section className="animate-in delay-1">
          <div className="border border-border rounded-lg px-5 py-4 bg-highlight/40">
            <p className="text-sm text-ink-muted">
              No song has been posted yet. Check back soon.
            </p>
          </div>
        </section>
      )}

      <footer className="animate-in delay-2 pt-6 border-t border-border-faint">
        <p className="text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} Nick Hess
        </p>
      </footer>
    </main>
  );
}
