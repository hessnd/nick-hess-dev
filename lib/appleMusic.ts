export type TrackMetadata = {
  trackId: string;
  title: string;
  artist: string;
  album: string | null;
  artworkUrl: string | null;
  previewUrl: string | null;
  genre: string | null;
};

/**
 * Extracts the numeric track id from an Apple Music URL.
 *
 * Handles the two common shapes:
 *   - Album/playlist link with a track: .../album/name/123456?i=789012  → 789012
 *   - Direct song link:                 .../song/name/123456           → 123456
 */
export function extractTrackId(rawUrl: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  if (!/(^|\.)music\.apple\.com$/.test(parsed.hostname)) {
    return null;
  }

  // A track inside an album/playlist link is carried by the `i` query param.
  const iParam = parsed.searchParams.get('i');
  if (iParam && /^\d+$/.test(iParam)) {
    return iParam;
  }

  // A direct /song/ link carries the id as the last path segment.
  if (parsed.pathname.includes('/song/')) {
    const lastSegment = parsed.pathname.split('/').filter(Boolean).pop();
    if (lastSegment && /^\d+$/.test(lastSegment)) {
      return lastSegment;
    }
  }

  return null;
}

type ItunesResult = {
  wrapperType?: string;
  kind?: string;
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  primaryGenreName?: string;
};

/** Upscales the default 100x100 iTunes artwork URL to a share-friendly size. */
function upscaleArtwork(url: string | undefined): string | null {
  if (!url) return null;
  return url.replace(/\/\d+x\d+(bb)?\.jpg$/, '/1200x1200bb.jpg');
}

/**
 * Looks up track metadata via the public iTunes Lookup API (no auth required).
 * Returns null if the id resolves to nothing or the request fails.
 */
export async function lookupTrack(
  trackId: string
): Promise<TrackMetadata | null> {
  const endpoint = `https://itunes.apple.com/lookup?id=${encodeURIComponent(
    trackId
  )}&entity=song`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch {
    return null;
  }

  if (!res.ok) return null;

  let data: { resultCount?: number; results?: ItunesResult[] };
  try {
    data = await res.json();
  } catch {
    return null;
  }

  const result = data.results?.find(
    (r) => r.kind === 'song' || r.wrapperType === 'track'
  );
  if (!result || !result.trackName || !result.artistName) {
    return null;
  }

  return {
    trackId,
    title: result.trackName,
    artist: result.artistName,
    album: result.collectionName ?? null,
    artworkUrl: upscaleArtwork(result.artworkUrl100),
    previewUrl: result.previewUrl ?? null,
    genre: result.primaryGenreName ?? null,
  };
}
