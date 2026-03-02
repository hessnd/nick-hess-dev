import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nickhess.dev'),
  title: 'Nick Hess — Staff Engineering Leader',
  description:
    'Staff Engineering Leader with 11 years of experience architecting large-scale web platforms. Currently leading frontend platform and top-of-funnel web experiences at Peloton.',
  openGraph: {
    title: 'Nick Hess — Staff Engineering Leader',
    description:
      'Staff Engineering Leader with 11 years of experience. Currently leading frontend platform and top-of-funnel web experiences at Peloton.',
    url: 'https://nickhess.dev',
    siteName: 'Nick Hess',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nick Hess — Staff Engineering Leader',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nick Hess — Staff Engineering Leader',
    description:
      'Staff Engineering Leader with 11 years of experience. Currently leading frontend platform and top-of-funnel web experiences at Peloton.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t==null&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-body)]">{children}</body>
      <Analytics />
    </html>
  );
}
