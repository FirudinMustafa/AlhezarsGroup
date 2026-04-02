'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Phone, Mail, Instagram } from 'lucide-react';
import { WEB_PACKAGES } from '../../lib/packages';
import PackagesNavbar from '../../components/PackagesNavbar';
import PackageCarousel from '../../components/PackageCarousel';
import { useLanguage } from '../../lib/LanguageContext';

export default function WebDizaynPage() {
  const { t } = useLanguage();

  const packages = WEB_PACKAGES.map((pkg, i) => ({
    ...pkg,
    name: t.webPackages.names[i],
    subtitle: t.webPackages.subtitles[i],
    features: t.webPackages.features[i],
    goldenFeatures: t.webPackages.goldenFeatures[i],
  }));

  const p = t.packagePage.webDesign;

  return (
    <main className="bg-[#060b1a] min-h-screen overflow-x-hidden">
      <PackagesNavbar activePage="web-dizayn" />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[13px] text-violet-400 tracking-[0.06em] uppercase font-medium mb-5">
            {p.badge}
          </p>
          <h1 className="text-[clamp(34px,5vw,52px)] font-semibold tracking-[-0.03em] leading-[1.08] text-white mb-5">
            {p.title} <span className="gradient-text-blue">{p.titleHighlight}</span>
          </h1>
          <p className="text-white/50 text-[17px] leading-[1.6] max-w-lg mx-auto mb-10">
            {p.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#paketler"
              className="group inline-flex items-center gap-2 px-7 py-3 text-[15px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors"
            >
              {p.ctaPrimary} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://wa.me/994552119406"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-violet-400 hover:text-violet-300 transition-colors"
            >
              {p.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <section id="paketler" className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-white mb-3">
              {p.selectTitle} <span className="gradient-text-blue">{p.selectHighlight}</span>
            </h2>
            <p className="text-white/45 text-[15px] max-w-md mx-auto">
              {p.selectDesc}
            </p>
          </div>

          <PackageCarousel
            packages={packages}
            ctaLabel={t.carousel.getPrice}
          />

          <div className="text-center mt-10">
            <p className="text-white/25 text-[12px]">
              {p.note}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-white mb-4 leading-tight">
            {p.bottomTitle} <span className="gradient-text-blue">{p.bottomHighlight}</span>
          </h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto">
            {p.bottomDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/994552119406"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[14px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors"
            >
              <Phone className="w-4 h-4" /> {p.whatsapp}
            </a>
            <a
              href="mailto:info@alhezars.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[14px] font-medium text-white/60 bg-white/[0.06] rounded-full hover:bg-white/[0.1] transition-colors"
            >
              <Mail className="w-4 h-4" /> {p.emailBtn}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-white/[0.03] border-t border-white/[0.05] py-8 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Alhezars" width={22} height={22} className="object-contain" />
            <span className="text-[13px] font-semibold text-white">Alhezars</span>
          </Link>
          <p className="text-[12px] text-white/25">&copy; {new Date().getFullYear()} Alhezars Group</p>
          <Link
            href="/paketler/sosial-media"
            className="flex items-center gap-1.5 text-[13px] text-white/45 hover:text-white transition-colors group"
          >
            <Instagram className="w-3.5 h-3.5 opacity-50" /> {t.nav.socialMedia}{' '}
          </Link>
        </div>
      </footer>
    </main>
  );
}
