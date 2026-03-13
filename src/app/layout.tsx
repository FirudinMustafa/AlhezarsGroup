import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Alhezars Group',
  url: 'https://alhezars.com',
  email: 'info@alhezars.com',
  telephone: '+994552119406',
  description:
    'Bakıda bütün xidmətləri özündə cəmləşdirən agentlik. Kontent istehsalı, sosial media idarəçiliyi, web dizayn, SEO və reklam xidmətləri.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'CV46+XHM, 5 Nadir Əliyev',
    addressLocality: 'Bakı',
    addressRegion: 'Bakı',
    postalCode: '1075',
    addressCountry: 'AZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4072505,
    longitude: 49.8616858,
  },
  serviceArea: {
    '@type': 'GeoShape',
    name: 'Azərbaycan',
  },
  priceRange: '₼₼',
  foundingDate: '2026',
  sameAs: ['https://www.instagram.com/alhezars'],
};

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
    <html lang="az" style={{ background: '#04040a' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#04040a] text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
