import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  skills: string;
};

const Skills: React.FC<Props> = ({ skills }) => {
  return (
    <section className="skills">
      <h2 className="header border-bottom">Skills</h2>
      <ReactMarkdown>{skills}</ReactMarkdown>
    </section>
  );
};

export default Skills;
