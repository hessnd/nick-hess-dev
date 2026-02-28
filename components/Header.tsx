import { resume } from '@/lib/data';

export default function Header() {
  return (
    <header className="animate-in">
      <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-[160] tracking-tight leading-none mb-3">
        {resume.name}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mt-4">
        <a
          href={`mailto:${resume.email}`}
          className="text-accent hover:underline underline-offset-4 transition-colors"
        >
          {resume.email}
        </a>
        {resume.links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline underline-offset-4 transition-colors"
          >
            {label}
          </a>
        ))}
        <span className="inline-flex items-center gap-1.5 text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Resume
          <span className="text-ink-faint">(</span>
          <a
            href="/nick-hess-resume.md"
            download
            className="hover:underline underline-offset-4 transition-colors"
          >
            .md
          </a>
          <span className="text-ink-faint">/</span>
          <a
            href="/nick-hess-resume.txt"
            download
            className="hover:underline underline-offset-4 transition-colors"
          >
            .txt
          </a>
          <span className="text-ink-faint">)</span>
        </span>
      </div>
    </header>
  );
}
