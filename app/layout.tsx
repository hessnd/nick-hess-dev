import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
// import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>{children}</body>
      {/* <Analytics /> */}
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nick Hess',
    description: 'Nick Hess Resume',
    openGraph: {
      title: 'Nick Hess',
      description: 'my resume site',
      url: 'https://nickhess.dev',
      siteName: 'Nick Hess',
      locale: 'en_US',
      type: 'website',
      // images: [],
    },
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
    },
    twitter: {
      card: 'summary',
      title: 'Nick Hess',
      description: 'my resume site',
      site: '@nickdhess',
      creator: '@nickdhess',
      // images: [],
    },
  };
}
