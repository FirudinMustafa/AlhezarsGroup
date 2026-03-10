'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Globe, Instagram, Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Xidmətlər', href: '/#xidmetler' },
  { label: 'Proses', href: '/#proses' },
  { label: 'Haqqımızda', href: '/#haqqimizda' },
];

export default function PackagesNavbar({ activePage }: { activePage: 'sosial-media' | 'web-dizayn' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);
  const pkgCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <nav className={`w-full max-w-[720px] rounded-2xl backdrop-blur-2xl transition-all duration-300 ${scrolled ? 'bg-black/[0.04]' : 'bg-black/[0.02]'}`}>
        <div className="px-5">
          <div className="flex items-center justify-between h-[48px]">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Alhezars" width={24} height={24} className="object-contain" priority />
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">Alhezars</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative"
                onMouseEnter={() => { if (pkgCloseTimer.current) clearTimeout(pkgCloseTimer.current); setPkgOpen(true); }}
                onMouseLeave={() => { pkgCloseTimer.current = setTimeout(() => setPkgOpen(false), 150); }}
              >
                <button className="flex items-center gap-1 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                  Paketlər <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${pkgOpen ? 'rotate-180' : ''}`} />
                </button>
                {pkgOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-xl overflow-hidden p-1 shadow-lg shadow-black/[0.08]">
                    <Link href="/paketler/sosial-media" className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] text-[13px] ${activePage === 'sosial-media' ? 'text-[#1d1d1f] font-medium' : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}>
                      <Instagram className="w-3.5 h-3.5 flex-shrink-0 opacity-40" /> Sosial Media
                    </Link>
                    <Link href="/paketler/web-dizayn" className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] text-[13px] ${activePage === 'web-dizayn' ? 'text-[#1d1d1f] font-medium' : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}>
                      <Globe className="w-3.5 h-3.5 flex-shrink-0 opacity-40" /> Web Dizayn
                    </Link>
                  </div>
                )}
              </div>
              {LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">{l.label}</Link>
              ))}
            </div>

            <Link href="/#elaqe" className="hidden md:inline-flex px-4 py-[6px] text-[12px] font-medium rounded-full bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-colors">
              Başlayaq
            </Link>

            <button onClick={() => setOpen(!open)} className="md:hidden p-1.5 text-[#6e6e73]">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden overflow-hidden">
            <div className="px-5 pb-4 flex flex-col gap-1">
              <div>
                <button onClick={() => setMobilePkgOpen(!mobilePkgOpen)} className="flex items-center justify-between w-full py-3 text-[15px] text-[#6e6e73]">
                  Paketlər <ChevronDown className={`w-4 h-4 transition-transform ${mobilePkgOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobilePkgOpen && (
                  <div className="overflow-hidden">
                    <Link href="/paketler/sosial-media" onClick={() => setOpen(false)} className={`block py-2.5 pl-4 text-[15px] ${activePage === 'sosial-media' ? 'text-[#1d1d1f] font-medium' : 'text-[#86868b]'}`}>Sosial Media</Link>
                    <Link href="/paketler/web-dizayn" onClick={() => setOpen(false)} className={`block py-2.5 pl-4 text-[15px] ${activePage === 'web-dizayn' ? 'text-[#1d1d1f] font-medium' : 'text-[#86868b]'}`}>Web Dizayn</Link>
                  </div>
                )}
              </div>
              {LINKS.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[15px] text-[#6e6e73]">{l.label}</Link>
              ))}
              <Link href="/#elaqe" onClick={() => setOpen(false)} className="mt-2 text-center py-2.5 text-[13px] font-medium bg-[#7c3aed] text-white rounded-full">Başlayaq</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
