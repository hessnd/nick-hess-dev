import React from 'react';

const Education: React.FC = () => (
  <section className="education">
    <h2 className="header border-bottom">Education</h2>
    <h3 className="header">Michigan State University</h3>
    <ul className="body">
      <li>
        Bachelors Of Science: Media &amp; Information (Interactive media design
        concentration)
      </li>
    </ul>
    <style jsx>
      {`
        .education {
          > h3 {
            margin-bottom: 5px;
          }

          > ul {
            margin-top: 0;
          }
        }
      `}
    </style>
  </section>
);

export default Education;
