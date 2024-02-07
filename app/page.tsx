import React from 'react';
import Contact from 'components/Contact';
import Experience from 'components/Experience';
import Education from 'components/Education';
import Skills from 'components/Skills';
import { getResume } from 'lib/api';

export default async function Page() {
  const resume = await getResume();

  return (
    <main className="flex-[1_0_auto]">
      <Contact />
      <Experience experience={resume.experienceCollection.items} />
      <Education />
      <Skills skills={resume.skills.name} />
    </main>
  );
}
