import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alhezars Group — Rəqəmsal Agentlik | Bakı',
  description:
    'Bakı əsaslı tam spektrli rəqəmsal agentlik. Kontent istehsalı, sosial media idarəçiliyi, web dizayn, SEO və reklam xidmətləri.',
  keywords: [
    'rəqəmsal agentlik',
    'sosial media',
    'web dizayn',
    'seo',
    'kontent istehsalı',
    'bakı',
    'azerbaycan',
    'alhezars',
  ],
  openGraph: {
    title: 'Alhezars Group — Rəqəmsal Agentlik',
    description: 'Brendinizi rəqəmsal dünyada zirvəyə çatdırırıq.',
    url: 'https://alhezars.com',
    siteName: 'Alhezars Group',
    locale: 'az_AZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={inter.variable}>
      <body className="font-sans bg-[#030307] text-white">{children}</body>
    </html>
  );
}
