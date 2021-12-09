import React from 'react';

type Props = {
  name: string;
  title: string;
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
  isCurrent: boolean;
};

const Job: React.FC<Props> = ({
  name,
  title,
  startMonth,
  startYear,
  endMonth = 12,
  endYear = 2021,
  isCurrent = false,
}) => (
  <div className="job">
    <h3 className="header company">{name}</h3>
    <div className="positions">
      <h4>
        {`${title}: ${startMonth} ${startYear}`}
        {' -> '}
        {isCurrent ? 'Current' : `${endMonth} ${endYear}`}
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
