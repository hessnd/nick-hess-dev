import React from 'react';
import { Job } from '../typings';

type Props = {
  job: Job;
};

const Job: React.FC<Props> = ({
  job: { name, title, startDate, endDate, currentPosition },
}) => (
  <div className="job">
    <h3 className="header company">{name}</h3>
    <div className="positions">
      <h4>
        {`${title}: ${startDate}`}
        {' -> '}
        {currentPosition ? 'Current' : `${endDate}`}
      </h4>
    </div>
    <style jsx>
      {`
        .company {
          margin-bottom: 15px;
        }
        .positions h4 {
          margin-top: 5px;
          margin-bottom: 0;
        }
      `}
    </style>
  </div>
);

export default Job;
