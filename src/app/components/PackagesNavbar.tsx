'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Globe, Instagram, Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function PackagesNavbar({ activePage }: { activePage: 'sosial-media' | 'web-dizayn' }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);
  const pkgCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const LINKS = [
    { label: t.nav.services, href: '/#xidmetler' },
    { label: t.nav.process, href: '/#proses' },
    { label: t.nav.about, href: '/#haqqimizda' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <nav className={`w-full max-w-[720px] rounded-2xl backdrop-blur-2xl transition-all duration-300 border ${scrolled ? 'bg-black/75 border-white/[0.07]' : 'bg-black/40 border-white/[0.05]'}`}>
        <div className="px-5">
          <div className="flex items-center justify-between h-[48px]">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Alhezars" width={24} height={24} className="object-contain" priority />
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-white">Alhezars</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative"
                onMouseEnter={() => { if (pkgCloseTimer.current) clearTimeout(pkgCloseTimer.current); setPkgOpen(true); }}
                onMouseLeave={() => { pkgCloseTimer.current = setTimeout(() => setPkgOpen(false), 150); }}
              >
                <button className="flex items-center gap-1 text-[13px] text-white/45 hover:text-white transition-colors">
                  {t.nav.packages} <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${pkgOpen ? 'rotate-180' : ''}`} />
                </button>
                {pkgOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-black/90 backdrop-blur-2xl border border-white/[0.07] rounded-xl overflow-hidden p-1 shadow-lg shadow-black/50">
                    <Link href="/paketler/sosial-media" className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/[0.06] text-[13px] ${activePage === 'sosial-media' ? 'text-white font-medium' : 'text-white/45 hover:text-white'}`}>
                      <Instagram className="w-3.5 h-3.5 flex-shrink-0 text-fuchsia-400" /> {t.nav.socialMedia}
                    </Link>
                    <Link href="/paketler/web-dizayn" className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/[0.06] text-[13px] ${activePage === 'web-dizayn' ? 'text-white font-medium' : 'text-white/45 hover:text-white'}`}>
                      <Globe className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" /> {t.nav.webDesign}
                    </Link>
                  </div>
                )}
              </div>
              {LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="text-[13px] text-white/45 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Link href="/#elaqe" className="px-4 py-[6px] text-[12px] font-medium rounded-full bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors">
                {t.nav.getStarted}
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="flex md:hidden items-center justify-center p-2 text-white/50 hover:text-white transition-colors"
              aria-expanded={open}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-white/[0.05]">
            <div className="px-5 py-4 flex flex-col">
              <div>
                <button
                  onClick={() => setMobilePkgOpen(!mobilePkgOpen)}
                  className="flex items-center justify-between w-full py-3 text-sm text-white/55 hover:text-white border-b border-white/[0.04] transition-colors"
                >
                  {t.nav.packages}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobilePkgOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobilePkgOpen && (
                  <div className="overflow-hidden">
                    <Link
                      href="/paketler/sosial-media"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 py-2.5 pl-4 text-sm border-b border-white/[0.04] transition-colors ${activePage === 'sosial-media' ? 'text-white font-medium' : 'text-white/40 hover:text-white'}`}
                    >
                      <Instagram className="w-3.5 h-3.5 text-fuchsia-400" />
                      {t.nav.socialMedia}
                    </Link>
                    <Link
                      href="/paketler/web-dizayn"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 py-2.5 pl-4 text-sm border-b border-white/[0.04] transition-colors ${activePage === 'web-dizayn' ? 'text-white font-medium' : 'text-white/40 hover:text-white'}`}
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      {t.nav.webDesign}
                    </Link>
                  </div>
                )}
              </div>
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm text-white/55 hover:text-white border-b border-white/[0.04] last:border-0 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <LanguageSwitcher variant="inline" className="py-3 border-b border-white/[0.04]" />
              <Link
                href="/#elaqe"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center py-3 text-sm font-bold bg-purple-700 text-white rounded-full"
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
