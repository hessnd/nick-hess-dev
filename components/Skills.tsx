import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  skills: string;
};

export default function Skills({ skills }: Props) {
  return (
    <section className="skills">
      <h2 className="header border-bottom">Skills</h2>
      {/* @ts-ignore */}
      <MDXRemote source={skills} />
    </section>
  );
};
