import { resume } from '@/lib/data';

export default function Experience() {
  return (
    <section className="animate-in delay-3">
      <SectionHeading>Experience</SectionHeading>
      <div className="space-y-10">
        {resume.experience.map((job) => (
          <article key={job.company}>
            <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-[120] tracking-tight">
              {job.company}
            </h3>
            <div className="mt-3">
              {job.roles.map((role, roleIdx) => {
                const hasBullets =
                  job.bullets[roleIdx] && job.bullets[roleIdx].length > 0;
                return (
                <div key={role.title} className={hasBullets ? 'mt-6 first:mt-0' : 'mt-1.5 first:mt-0'}>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h4 className="font-semibold text-sm text-ink">
                      {role.title}
                    </h4>
                    <span className="text-xs text-ink-faint tracking-wide">
                      {role.start} &mdash;{' '}
                      {role.current ? (
                        <span className="text-accent font-medium">Present</span>
                      ) : (
                        role.end
                      )}
                    </span>
                  </div>
                  {job.bullets[roleIdx] && job.bullets[roleIdx].length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-muted leading-relaxed list-none">
                      {job.bullets[roleIdx].map((bullet, i) => (
                        <li
                          key={i}
                          className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                );
              })}
              {job.companyBullets && job.companyBullets.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm text-ink-muted leading-relaxed list-none">
                  {job.companyBullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
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
