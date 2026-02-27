import { resume } from '@/lib/data';

export default function Summary() {
  return (
    <section className="animate-in delay-1">
      <p className="text-base sm:text-lg leading-relaxed text-ink-muted max-w-[72ch]">
        {resume.summary}
      </p>
    </section>
  );
}
