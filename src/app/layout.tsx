import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import Loader from '@/components/Loader';
import AudioEngine from '@/components/AudioEngine';
import ThemeToggle from '@/components/ThemeToggle';
import Background from '@/components/Background';
import CursorLight from '@/components/ui/CursorLight';
import LiquidCursor from '@/components/ui/LiquidCursor';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://divyam-mishra-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Divyam Mishra | Engineering Portfolio',
  description:
    'Personal portfolio of Divyam Mishra — B.Tech CSE student, GATE 2027 aspirant, and aspiring AI research engineer. An interactive, liquid-metal digital experience.',
  keywords: [
    'Divyam Mishra',
    'GATE 2027 Aspirant',
    'B.Tech CSE',
    'DSA',
    'Next.js Portfolio',
    'Three.js React Three Fiber',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Divyam Mishra' }],
  creator: 'Divyam Mishra',
  openGraph: {
    title: 'Divyam Mishra | Engineering Portfolio',
    description: 'An interactive, liquid-metal digital portfolio by Divyam Mishra.',
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divyam Mishra | Engineering Portfolio',
    description: 'An interactive, liquid-metal digital portfolio by Divyam Mishra.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col relative"
        style={{ backgroundColor: 'var(--cyber-bg)', color: 'var(--cyber-text)' }}
      >
        <Providers>
          {/* Persistent liquid-void environment layer */}
          <Background />

          {/* Cursor-reactive ambient light — the background "noticing" you */}
          <CursorLight />

          {/* Custom cursor — desktop only, respects prefers-reduced-motion */}
          <LiquidCursor />

          {/* Preloader reveal */}
          <Loader />

          {/* Procedural ambient sound, manual toggle only */}
          <AudioEngine />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* overflow-hidden here would break position:sticky for every
              descendant (the Projects stack relies on it) — body already
              sets overflow-x:hidden globally, so this doesn't need its own. */}
          <main className="relative flex-1 flex flex-col z-10 w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
