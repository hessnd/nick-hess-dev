'use client';

import { track } from '@vercel/analytics';
import { resume } from '@/lib/data';

export default function Notable() {
  const { notable } = resume;

  return (
    <section className="animate-in delay-2">
      <div className="border border-border rounded-lg px-5 py-4 bg-highlight/40">
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 text-lg" aria-hidden="true">
            &#9656;
          </span>
          <div>
            <p className="font-semibold text-sm text-ink">{notable.title}</p>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">
              {notable.description}
            </p>
            <a
              href={notable.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('Link Clicked', {
                  type: 'notable',
                  label: notable.linkText,
                })
              }
              className="inline-block mt-2 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              {notable.linkText} &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
