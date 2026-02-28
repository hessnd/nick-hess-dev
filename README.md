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
  nick-hess-resume.md # Downloadable markdown resume
  nick-hess-resume.txt # Downloadable text resume
  profile.jpg          # Profile photo (512x512)
  og-image.jpg         # Social sharing image (1200x630)
  favicon-*.png        # Favicon in multiple sizes
  apple-touch-icon.png # iOS home screen icon
  fonts/               # Marvin Visions variable font
```

All resume content lives in `lib/data.ts`. The site is fully static (no API calls, no CMS) and ships 123 B of page JS.
