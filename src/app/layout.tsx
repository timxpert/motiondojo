import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://motiondojo.com'),
  title: 'Motion Dojo — Exclusive Community for Smartphone Motion Designers',
  description:
    'Motion dojo is an exclusive community where smartphone motion designers learn, practice, share, and grow together.',
  openGraph: {
    title: 'Motion Dojo — Exclusive Community for Smartphone Motion Designers',
    description:
      'Motion dojo is an exclusive community where smartphone motion designers learn, practice, share, and grow together.',
    url: 'https://motiondojo.com',
    siteName: 'Motion Dojo',
    images: [
      {
        url: 'https://motiondojo.com/images/hero-video-poster.webp',
        width: 1280,
        height: 720,
        alt: 'Motion Dojo — Exclusive Community for Smartphone Motion Designers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Dojo — Exclusive Community for Smartphone Motion Designers',
    description:
      'Motion dojo is an exclusive community where smartphone motion designers learn, practice, share, and grow together.',
    images: ['https://motiondojo.com/images/hero-video-poster.webp'],
  },
  icons: {
    icon: '/assets/favicon-128.png',
    apple: '/assets/favicon.png',
  },
};

const themeInitializerScript = `
(function() {
  try {
    var storedTheme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializerScript,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#C8FF3D] selection:text-[#14102A]">
        {children}
      </body>
    </html>
  );
}
