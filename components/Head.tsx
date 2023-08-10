import React from 'react';
import NextHead from 'next/head';

const Head: React.FC = () => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>Nick Hess</title>
    <meta name="description" content="Nick Hess Resume" />
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
  </NextHead>
);

export default Head;
