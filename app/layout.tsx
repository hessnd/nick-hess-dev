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
  title: 'Nick Hess — Staff Engineering Leader',
  description:
    'Staff Engineering Leader with 11 years of experience architecting large-scale web platforms. Currently leading web platform and e-commerce at Peloton.',
  openGraph: {
    title: 'Nick Hess — Staff Engineering Leader',
    description:
      'Staff Engineering Leader with 11 years of experience. Currently leading web platform and e-commerce at Peloton.',
    url: 'https://nickhess.dev',
    siteName: 'Nick Hess',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Nick Hess — Staff Engineering Leader',
    description:
      'Staff Engineering Leader with 11 years of experience. Currently leading web platform and e-commerce at Peloton.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-[family-name:var(--font-body)]">{children}</body>
      <Analytics />
    </html>
  );
}
