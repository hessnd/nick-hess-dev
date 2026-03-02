# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js with Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint via next lint
pnpm type-check   # TypeScript compiler check (no emit)
```

There are no tests in this project.

## Architecture

Single-page personal resume site built with Next.js 16 (App Router), React 19, and Tailwind CSS v4.

**All resume content lives in one place:** `lib/data.ts` exports a single `resume` object with typed fields for name, summary, experience, skills, education, notable, and links. To update any resume content, edit only this file.

**Component structure** (`components/`): Each section of the page is its own Server Component — `Header`, `Summary`, `Notable`, `Experience`, `Skills`, `Education`. The only Client Component is `ThemeToggle`, which needs browser APIs.

**Styling system:** Tailwind v4 with CSS custom properties defined in `app/globals.css` under `@theme`. Colors use semantic tokens (`--color-surface`, `--color-ink`, `--color-ink-muted`, `--color-accent`, etc.). Dark mode applies via a `.dark` class on `<html>` that overrides the same tokens — do not use Tailwind's `dark:` variant, use the token system instead.

**Dark mode implementation:** An inline `<script>` in `layout.tsx` reads `localStorage` and applies `.dark` before first paint (no flash). `ThemeToggle` uses a `mounted` guard to avoid hydration mismatches. Theme preference is persisted to `localStorage` with key `'theme'`.

**Fonts:** `Marvin Visions` (display/heading, self-hosted in `public/fonts/`) and `DM Sans` (body, loaded via `next/font/google`). The display font is referenced as `--font-display` and body as `--font-body`.

**Deployment:** Vercel (project config in `.vercel/project.json`). Analytics via `@vercel/analytics`.

## Conventions

- Single quotes (`.prettierrc`)
- The `.env.local.example` contains Contentful vars that are unused — all data is hardcoded in `lib/data.ts`
- Print styles hide the theme toggle (`no-print` class) and reset body styles
- Staggered entrance animations use `.animate-in` + `.delay-1` through `.delay-7` classes defined in `globals.css`
