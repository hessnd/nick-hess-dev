import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

const Section: React.FC<Props> = ({ children, title = 'Title' }) => (
  <section>
    <h2 className="header border-bottom">{title}</h2>
    <p className="body">{children}</p>
  </section>
);

export default Section;
