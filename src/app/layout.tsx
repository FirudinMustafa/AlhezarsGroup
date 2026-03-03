import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Alhezars Group',
  url: 'https://alhezars.com',
  email: 'info@alhezars.com',
  telephone: '+994104219406',
  description:
    'Bakıda bütün xidmətləri özündə cəmləşdirən agentlik. Kontent istehsalı, sosial media idarəçiliyi, web dizayn, SEO və reklam xidmətləri.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nadir Əliyev 5',
    addressLocality: 'Bakı',
    addressRegion: 'Bakı',
    addressCountry: 'AZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4093,
    longitude: 49.8671,
  },
  serviceArea: {
    '@type': 'GeoShape',
    name: 'Azərbaycan',
  },
  priceRange: '₼₼',
  foundingDate: '2026',
  sameAs: [
    'https://www.instagram.com/alhezars',
  ],
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alhezars Group — Rəqəmsal Agentlik | Bakı',
  description:
    'Bakıda bütün xidmətləri özündə cəmləşdirən agentlik. Kontent istehsalı, sosial media idarəçiliyi, web dizayn, SEO və reklam xidmətləri.',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#030307] text-white">{children}</body>
    </html>
  );
}
