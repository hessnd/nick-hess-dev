import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Job as JobType } from '../typings';

type Props = {
  job: JobType;
};

const Job = ({ job: { name, details, jobTitlesCollection } }: Props) => (
  <div>
    <h3 className="mb-2">{name}</h3>
    <div className="mb-5">
      {jobTitlesCollection.items.map((item, idx) => (
        <h4 key={idx} className="font-light mb-0 mt-1">
          {`${item.title}: ${item.startDate}`}
          {' -> '}
          {item.currentPosition ? 'Current' : `${item.endDate}`}
        </h4>
      ))}
    </div>
    <div className="text-xl">
      <MDXRemote source={details} />
    </div>
  </div>
);

export default Job;
