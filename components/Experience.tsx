import React from 'react';
import Job from './Job';
import type { Job as JobType } from '../typings';

type Props = {
  experience: JobType[];
};

const Experience = ({ experience }: Props) => (
  <section className="experience">
    <h2 className="header border-bottom">Experience</h2>
    {experience.map((job) => (
      <Job key={job.name} job={job} />
    ))}
  </section>
);

export default Experience;
