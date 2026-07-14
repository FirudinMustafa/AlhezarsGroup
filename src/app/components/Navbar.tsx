'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Instagram, Globe, Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import LogoMark from './LogoMark';

// Single shared navbar used on every route (homepage + package pages) so the
// header looks and behaves identically everywhere. All section links are
// absolute ("/#section") so they work the same whether we're already on "/"
// (same-page anchor jump) or on a sub-page (navigate home, then jump).
export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);
  const pkgCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const NAV_LINKS = [
    { label: t.nav.services, href: '/#xidmetler' },
    { label: t.nav.process, href: '/#proses' },
    { label: t.nav.portfolio, href: '/#portfolio' },
    { label: t.nav.about, href: '/#haqqimizda' },
  ];

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/#hero" className="flex items-center gap-2.5 group">
            <LogoMark />
            <span className="text-[17px] font-bold tracking-tight">
              <span className="text-white">Alhezars</span>
              <span className="text-purple-400"> Group</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {/* Paketlər dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { if (pkgCloseTimer.current) clearTimeout(pkgCloseTimer.current); setPkgOpen(true); }}
              onMouseLeave={() => { pkgCloseTimer.current = setTimeout(() => setPkgOpen(false), 150); }}
            >
              <button className="relative flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors duration-200">
                {t.nav.packages}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${pkgOpen ? 'rotate-180' : ''}`} />
              </button>
              {pkgOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-black/90 backdrop-blur-2xl border border-white/[0.07] rounded-xl overflow-hidden p-1.5 shadow-xl shadow-black/50"
                  >
                    <Link
                      href="/paketler/sosial-media"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] text-white/55 hover:text-white transition-colors text-sm"
                    >
                      <Instagram className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0" />
                      {t.nav.socialMedia}
                    </Link>
                    <Link
                      href="/paketler/web-dizayn"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] text-white/55 hover:text-white transition-colors text-sm"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      {t.nav.webDesign}
                    </Link>
                  </div>
                )}
            </div>

            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-sm text-white/40 hover:text-white transition-colors duration-200 group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* CTA */}
                      <a
              href="/#elaqe"
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold bg-purple-700 hover:bg-purple-600 text-white rounded-full transition-colors duration-200 shadow-lg shadow-purple-900/30"
            >
              {t.nav.getStarted} <ArrowRight className="w-3.5 h-3.5" />
            </a>

          <LanguageSwitcher className="hidden md:block" />

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
            aria-expanded={open}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.05]">
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
                    className="flex items-center gap-2 py-2.5 pl-4 text-sm text-white/40 hover:text-white border-b border-white/[0.04] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-fuchsia-400" />
                    {t.nav.socialMedia}
                  </Link>
                  <Link
                    href="/paketler/web-dizayn"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2.5 pl-4 text-sm text-white/40 hover:text-white border-b border-white/[0.04] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    {t.nav.webDesign}
                  </Link>
                </div>
              )}
            </div>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-white/55 hover:text-white border-b border-white/[0.04] last:border-0 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <LanguageSwitcher variant="inline" className="py-3 border-b border-white/[0.04]" />
            <a
              href="/#elaqe"
              onClick={() => setOpen(false)}
              className="mt-2 block text-center py-3 text-sm font-bold bg-purple-700 text-white rounded-full"
            >
              {t.nav.getStarted}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
