import { resume } from '@/lib/data';

export default function Skills() {
  const categories = Object.entries(resume.skills);

  return (
    <section className="animate-in delay-4">
      <SectionHeading>Technical Skills</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {categories.map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="inline-block text-xs px-2.5 py-1 rounded-md bg-surface-subtle text-ink-muted border border-border-faint"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-[140] tracking-tight shrink-0">
        {children}
      </h2>
      <div className="h-px grow bg-border" />
    </div>
  );
}
