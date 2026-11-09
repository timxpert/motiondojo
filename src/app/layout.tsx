import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_METADATA } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: 'Motion Dojo',
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1280,
        height: 720,
        alt: 'Motion Dojo — a community for smartphone motion designers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.ogImage],
  },
  icons: {
    icon: '/assets/favicon-128.png',
    apple: '/assets/favicon-128.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0a1a' },
  ],
};

// Light is the default. The page only goes dark if the visitor chose dark before.
const themeInitializerScript = `
(function() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
