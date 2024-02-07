import React from 'react';
import Head from '../components/Head';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import { getResume } from '../lib/api';

export default async function Page () {
  const resume = await getResume();

  return (
    <>
      <Head />
      <main className="main">
        <Contact />
        <Experience experience={resume.experienceCollection.items} />
        <Education />
        <Skills skills={resume.skills.name} />
      </main>
    </>
  );
};
