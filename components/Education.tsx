import { resume } from '@/lib/data';

export default function Education() {
  return (
    <section className="animate-in delay-5">
      <SectionHeading>Education</SectionHeading>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-[120] tracking-tight">
          {resume.education.school}
        </h3>
        <p className="text-sm text-ink-muted mt-1">{resume.education.degree}</p>
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
