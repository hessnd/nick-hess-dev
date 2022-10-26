import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Job as JobType } from '../typings';

type Props = {
  job: JobType;
};

const Job: React.FC<Props> = ({
  job: { name, details, jobTitlesCollection },
}) => (
  <div className="job">
    <h3 className="header company">{name}</h3>
    <div className="positions">
      {jobTitlesCollection.items.map((item, idx) => (
        <h4 key={idx}>
          {`${item.title}: ${item.startDate}`}
          {' -> '}
          {item.currentPosition ? 'Current' : `${item.endDate}`}
        </h4>
      ))}
    </div>
    <ReactMarkdown>{details}</ReactMarkdown>
    <style jsx>
      {`
        .company {
          margin-bottom: 15px;
        }
        .positions h4 {
          margin-top: 5px;
          margin-bottom: 0;
          letter-spacing: 1.2px;
        }
      `}
    </style>
  </div>
);

export default Job;
