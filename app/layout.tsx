import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Time Until Breakfast',
  description: 'An elegant countdown timer until breakfast at 6:00 AM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
        <head>
          <link rel="icon" href="/cooking.png" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="color-scheme" content="light" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="AI Story Generator" />
          <meta name="format-detection" content="telephone=no" />
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}