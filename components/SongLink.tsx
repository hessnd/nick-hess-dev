'use client';

import { track } from '@vercel/analytics';

export default function SongLink() {
  return (
    <a
      href="/song"
      aria-label="Song of the Day"
      title="Song of the Day"
      onClick={() => track('Link Clicked', { type: 'internal', label: 'Song of the Day' })}
      className="no-print w-8 h-8 flex items-center justify-center rounded-md text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </a>
  );
}
