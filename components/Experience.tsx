import React from 'react';
import Job from './Job';

const jobs = [
  {
    name: 'Peloton Interactive',
    title: 'Software Engineer',
    isCurrent: true,
    startMonth: 5,
    startYear: 2020,
    endMonth: 0,
    endYear: 0,
  },
  {
    name: 'LoftSmart',
    title: 'Full Stack Engineer',
    isCurrent: false,
    startMonth: 4,
    startYear: 2019,
    endMonth: 3,
    endYear: 2020,
  },
  {
    name: 'Big Spaceship',
    title: 'Senior Technologist',
    isCurrent: false,
    startMonth: 7,
    startYear: 2015,
    endMonth: 4,
    endYear: 2019,
  },
];

const Experience: React.FC = () => (
  <section className="experience">
    <h2 className="header border-bottom">Experience</h2>
    {jobs.map((job) => (
      <Job key={job.name} {...job} />
    ))}
  </section>
);

export default Experience;
