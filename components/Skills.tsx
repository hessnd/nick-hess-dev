import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  skills: string;
};

export default function Skills({ skills }: Props) {
  return (
    <section>
      <h2>Skills</h2>
      {/* @ts-ignore */}
      <MDXRemote source={skills} />
    </section>
  );
}
