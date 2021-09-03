import React from 'react';
import Job from './Job';

const jobs = [
  {
    name: 'Peloton Interactive',
    title: 'Software Engineer',
    startMonth: 5,
    startYear: 2020,
    isCurrent: true,
  },
  {
    name: 'LoftSmart',
    title: 'Full Stack Engineer',
    startMonth: 4,
    startYear: 2019,
    endMonth: 3,
    endYear: 2020,
  },
  {
    name: 'Big Spaceship',
    title: 'Senior Technologist',
    startMonth: 7,
    startYear: 2015,
    endMonth: 4,
    endYear: 2019,
  },
];

const Experience: React.FC = () => {
  return (
    <section className="experience">
      <h2 className="header border-bottom">Experience</h2>
      {jobs.map((job) => (
        <Job {...job} />
      ))}
    </section>
  );
};

export default Experience;
