import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import Loader from '@/components/Loader';
import AudioEngine from '@/components/AudioEngine';
import ThemeToggle from '@/components/ThemeToggle';
import MatrixRain from '@/components/ui/MatrixRain';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Divyam Mishra | Futuristic AI Research & Engineering Portfolio',
  description: 'Personal portfolio of Divyam Mishra - B.Tech CSE Student, GATE 2027 Aspirant, and Future AI Research Scientist. Features 3D holographic sphere and AI chat assistant.',
  keywords: [
    'Divyam Mishra', 'AI Research Scientist', 'GATE 2027 Aspirant', 'IIT Computer Science', 
    'B.Tech CSE', 'DSA', 'Next.js 15 Portfolio', 'Three.js React Three Fiber', 'Full Stack Developer'
  ],
  authors: [{ name: 'Divyam Mishra' }],
  creator: 'Divyam Mishra',
  openGraph: {
    title: 'Divyam Mishra | AI Research & CSE Portfolio',
    description: 'Explore the futuristic 3D portfolio and AI assistant of Divyam Mishra.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divyam Mishra | AI Research & CSE Portfolio',
    description: 'Explore the futuristic 3D portfolio and AI assistant of Divyam Mishra.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative bg-[#050508] text-[#e0e6ed]">
        <Providers>
          {/* Futuristic Visual Backdrops */}
          <MatrixRain />
          
          {/* Preloader boot sequence */}
          <Loader />

          {/* Procedural sound generator */}
          <AudioEngine />

          {/* Theme customizer button */}
          <ThemeToggle />

          {/* App Views */}
          <main className="relative flex-1 flex flex-col z-10 w-full overflow-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
