import React from 'react';
import type { NextPage } from 'next';
import Head from '../components/Head';
import Contact from '../components/Contact';
import Slider from '../components/Slider';
import Profile from '../components/Profile';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import { getResume } from '../lib/api';
import type { Resume } from '../typings';

type Props = {
  resume: Resume;
};

const IndexPage: NextPage<Props> = ({ resume }) => {
  return (
    <>
      <Head />
      <main className="main">
        <Slider />
        <Contact />
        <Profile profile={resume.profile} />
        <Experience experience={resume.experienceCollection.items} />
        <Education />
        <Skills />
      </main>
    </>
  );
};

export async function getStaticProps({ preview = true }) {
  const resume = await getResume(preview);
  return {
    props: { preview, resume },
  };
}

export default IndexPage;
