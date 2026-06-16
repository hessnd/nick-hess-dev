import type { ResolvedSong } from '@/lib/songs';

const TIME_ZONE = 'America/Denver';

function formatLongDate(date: string): string {
  // Parse as UTC noon to avoid the date shifting under timezone formatting.
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00Z`));
}

export default function SongCard({ resolved }: { resolved: ResolvedSong }) {
  const { song, isFallback, forDate } = resolved;

  return (
    <section className="animate-in delay-1">
      <p className="text-sm text-ink-muted mb-4">
        {isFallback ? (
          <>
            No pick yet for {formatLongDate(forDate)} — here&rsquo;s a throwback
            from {formatLongDate(song.date)}.
          </>
        ) : (
          <>Song of the day · {formatLongDate(forDate)}</>
        )}
      </p>

      <div className="border border-border rounded-lg p-5 bg-highlight/40">
        <div className="flex flex-col sm:flex-row gap-5">
          {song.artwork_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={song.artwork_url}
              alt={`${song.title} by ${song.artist} album artwork`}
              width={160}
              height={160}
              className="w-40 h-40 rounded-lg shrink-0 shadow-sm object-cover"
            />
          )}

          <div className="min-w-0 flex flex-col">
            {isFallback && (
              <span className="self-start mb-2 inline-block rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent">
                Throwback
              </span>
            )}

            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-[160] tracking-tight leading-tight">
              {song.title}
            </h2>
            <p className="text-base text-ink-muted mt-1">{song.artist}</p>

            {song.album && (
              <p className="text-sm text-ink-faint mt-0.5">{song.album}</p>
            )}
            {song.genre && (
              <p className="text-sm text-ink-faint mt-0.5">{song.genre}</p>
            )}

            {song.apple_music_url && (
              <a
                href={song.apple_music_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center self-start mt-4 text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                Listen on Apple Music &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
