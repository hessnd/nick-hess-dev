# nickhess.dev

Personal resume site. Built with Next.js 16, React 19, and Tailwind CSS v4. Hosted on Vercel.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack stable)
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Typography:** Marvin Visions (display), DM Sans (body)
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack default) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler checks |

## Project Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Single-page resume
  globals.css         # Tailwind v4 theme, base styles, animations
components/
  Header.tsx          # Name, contact links, resume download
  Summary.tsx         # Professional summary
  Notable.tsx         # Next.js Conf 2024 callout
  Experience.tsx      # Work history with role-level bullets
  Skills.tsx          # Technical skills grid
  Education.tsx       # Education
lib/
  data.ts             # All resume content as typed data
public/
  nick-hess-resume.pdf # Downloadable PDF resume
  nick-hess-resume.md # Downloadable markdown resume
  nick-hess-resume.txt # Downloadable text resume
  profile.jpg          # Profile photo (512x512)
  og-image.jpg         # Social sharing image (1200x630)
  favicon-*.png        # Favicon in multiple sizes
  apple-touch-icon.png # iOS home screen icon
  fonts/               # Marvin Visions variable font
```

All resume content lives in `lib/data.ts`. The resume itself is fully static (no
CMS), with one piece of dynamic, database-backed content: the Song of the Day.

## Song of the Day

[`/song`](https://nickhess.dev/song) shows a track I picked for the day, stored
in Supabase and posted via an authenticated `POST /api/song`. Only I can post,
authenticated by a bearer token (`SONG_API_SECRET`). There are two ways to post:

| Path | Use it for | Setup |
| --- | --- | --- |
| **iOS Shortcut** | One-tap posting from the Apple Music share sheet | [docs/ios-shortcut-setup.md](docs/ios-shortcut-setup.md) |
| **`scripts/post-song.sh`** | Desktop posting and debugging a failed post | See below |

### Desktop posting

`scripts/post-song.sh` reads `SONG_API_SECRET` from 1Password at call time (never
stored on disk) and POSTs an Apple Music link to the API:

```bash
# Set today's song
./scripts/post-song.sh "https://music.apple.com/us/album/song/123?i=456"

# Backfill a past date
./scripts/post-song.sh "https://music.apple.com/us/album/song/123?i=456" 2026-06-15
```

Requires the [1Password CLI](https://developer.1password.com/docs/cli/) (`op`,
signed in), `curl`, and `jq`. Override the 1Password reference or endpoint via the
`SONG_OP_REF` / `SONG_ENDPOINT` env vars. Unlike the Shortcut, it prints the
server's exact error and HTTP status — handy when a share silently fails.
