import React from 'react';
import Head from 'next/head';
import Contact from '../components/Contact';
import Slider from '../components/Slider';
import Profile from '../components/Profile';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';

const IndexPage: React.FC = () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>Nick Hess</title>
      <meta name="description" content="Nick Hess Resume" />
      {/* <-- Global site tag (gtag.js) - Google Analytics --> */}
      {/* <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-137790663-1"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'UA-137790663-1');
    </script> */}
      <link
        rel="icon"
        type="image/png"
        href="/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-16x16.png"
        sizes="16x16"
      />
      {/* Facebook */}
      <meta property="og:url" content="https://nickhess.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Nick Hess" />
      <meta property="og:image" content="" />
      <meta property="og:description" content="my resume site" />
      <meta property="og:locale" content="en_US" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@nickdhess" />
      <meta name="twitter:creator" content="@nickdhess" />
      <meta name="twitter:url" content="https://nickhess.dev" />
      <meta name="twitter:title" content="Nick Hess" />
      <meta name="twitter:description" content="my resume site" />
      <meta name="twitter:image" content="" />
    </Head>
    <body>
      <main className="main">
        <Slider />
        <Contact />
        <Profile />
        <Experience />
        <Education />
        <Skills />
      </main>
    </body>
  </>
);

export default IndexPage;
