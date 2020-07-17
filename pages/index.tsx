import React from 'react';
import Head from 'next/head';

const IndexPage: React.FC = () => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>Nick Hess</title>
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
      <h1>Hello from Nick</h1>
    </body>
  </div>
);

export default IndexPage;
