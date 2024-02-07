import Job from './Job';
import type { Job as JobType } from 'typings';

type Props = {
  experience: JobType[];
};

export default function Experience({ experience }: Props) {
  return (
    <section>
      <h2>Experience</h2>
      {experience.map((job) => (
        <Job key={job.name} job={job} />
      ))}
    </section>
  );
}
