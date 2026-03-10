'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, ChevronRight, ChevronDown, ArrowRight, Phone, Mail, Globe, Instagram, Menu, X } from 'lucide-react';
import { SOCIAL_PACKAGES } from '../../lib/packages';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Xidmətlər', href: '/#xidmetler' },
    { label: 'Proses', href: '/#proses' },
    { label: 'Haqqımızda', href: '/#haqqimizda' },
  ];

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
              <div className="relative" onMouseEnter={() => setPkgOpen(true)} onMouseLeave={() => setPkgOpen(false)}>
                <button className="flex items-center gap-1 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                  Paketlər <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${pkgOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {pkgOpen && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-xl overflow-hidden p-1 shadow-lg shadow-black/[0.08]">
                      <Link href="/paketler/sosial-media" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] text-[#1d1d1f] font-medium text-[13px]">
                        <Instagram className="w-3.5 h-3.5 flex-shrink-0 opacity-40" /> Sosial Media
                      </Link>
                      <Link href="/paketler/web-dizayn" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] text-[#6e6e73] hover:text-[#1d1d1f] text-[13px]">
                        <Globe className="w-3.5 h-3.5 flex-shrink-0 opacity-40" /> Web Dizayn
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {links.map((l) => (
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
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="md:hidden overflow-hidden">
              <div className="px-5 pb-4 flex flex-col gap-1">
                <div>
                  <button onClick={() => setMobilePkgOpen(!mobilePkgOpen)} className="flex items-center justify-between w-full py-3 text-[15px] text-[#6e6e73]">
                    Paketlər <ChevronDown className={`w-4 h-4 transition-transform ${mobilePkgOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobilePkgOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
                        <Link href="/paketler/sosial-media" onClick={() => setOpen(false)} className="block py-2.5 pl-4 text-[15px] text-[#1d1d1f] font-medium">Sosial Media</Link>
                        <Link href="/paketler/web-dizayn" onClick={() => setOpen(false)} className="block py-2.5 pl-4 text-[15px] text-[#86868b]">Web Dizayn</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {links.map((l) => (
                  <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[15px] text-[#6e6e73]">{l.label}</Link>
                ))}
                <Link href="/#elaqe" onClick={() => setOpen(false)} className="mt-2 text-center py-2.5 text-[13px] font-medium bg-[#7c3aed] text-white rounded-full">Başlayaq</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default function SocialMediaPage() {
  return (
    <main className="bg-[#fbfbfd] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-[13px] text-[#7c3aed] tracking-[0.06em] uppercase font-medium mb-5">
            Sosial Media Paketləri
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="text-[clamp(34px,5vw,52px)] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1d1d1f] mb-5">
            Brendinizi sosial mediada <span className="gradient-text-blue">böyüdürük.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }} className="text-[#6e6e73] text-[17px] leading-[1.6] max-w-lg mx-auto mb-10">
            Mobiloqraf, videoqraf, motion dizayn, targeting — brendinizin sosial media hekayəsini biz yazırıq.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#paketler" className="group inline-flex items-center gap-2 px-7 py-3 text-[15px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors">
              Paketlərə bax <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="https://wa.me/994552119406" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#7c3aed] hover:text-[#6d28d9] transition-colors">
              Bizimlə əlaqə
            </a>
          </motion.div>
        </div>
      </section>

      <section id="paketler" className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn className="text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-3">
              Sizə uyğun <span className="gradient-text-blue">paketi seçin</span>
            </h2>
            <p className="text-[#6e6e73] text-[15px] max-w-md mx-auto">
              Brendinizin ölçüsünə uyğun aylıq kontent istehsalı və targeting xidmətləri.
            </p>
          </FadeIn>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {SOCIAL_PACKAGES.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 0.05} className="min-w-[260px] flex-shrink-0 snap-start lg:min-w-0">
                <div className={`flex flex-col h-full rounded-2xl transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-white shadow-2xl shadow-black/[0.08] ring-1 ring-[#7c3aed]/15 scale-[1.03] relative z-10'
                    : 'bg-[#f5f5f7] hover:shadow-lg hover:shadow-black/[0.04]'
                }`}>
                  {pkg.popular && (
                    <div className="bg-[#7c3aed] text-white text-[11px] font-semibold text-center py-1.5 rounded-t-2xl tracking-wide">
                      Ən populyar
                    </div>
                  )}

                  <div className={`p-6 flex-1 flex flex-col ${!pkg.popular ? 'pt-6' : ''}`}>
                    <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-0.5">{pkg.name}</h3>
                    <p className="text-[12px] text-[#86868b] mb-1">{pkg.subtitle}</p>
                    <p className="text-[11px] text-[#aeaeb2] mb-5">{pkg.contentCount} kontent/ay</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-[32px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">{pkg.price.toLocaleString()}</span>
                      <span className="text-[14px] text-[#86868b]">₼/ay</span>
                    </div>

                    <a
                      href="https://wa.me/994552119406"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 w-full py-2.5 text-[13px] font-medium rounded-xl transition-colors mb-6 ${
                        pkg.popular
                          ? 'bg-[#7c3aed] text-white hover:bg-[#6d28d9]'
                          : 'text-[#7c3aed] bg-[#7c3aed]/[0.06] hover:bg-[#7c3aed]/[0.12]'
                      }`}
                    >
                      Başlayaq <ChevronRight className="w-3.5 h-3.5" />
                    </a>

                    <div className="h-px bg-black/[0.04] mb-5" />

                    <ul className="space-y-2.5 flex-1">
                      {pkg.features.map((f) => {
                        const gold = pkg.goldenFeatures.includes(f);
                        return (
                          <li key={f} className="flex items-start gap-2 text-[12px]">
                            <Check className={`w-3.5 h-3.5 mt-[1px] flex-shrink-0 ${gold ? 'text-[#7c3aed]' : 'text-[#d2d2d7]'}`} />
                            <span className={gold ? 'text-[#7c3aed] font-medium' : 'text-[#424245]'}>{f}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1} className="text-center mt-8">
            <p className="text-[#aeaeb2] text-[12px]">Bütün paketlər aylıq ödənişli. Reklam büdcəsi ayrıca qarşılanır.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-4 leading-tight">
              Paketinizi seçin, <span className="gradient-text-blue">böyüməyə başlayın.</span>
            </h2>
            <p className="text-[#6e6e73] text-[15px] mb-10 max-w-sm mx-auto">Brendinizə uyğun paketi seçin, bizimlə əlaqə saxlayın.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/994552119406" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[14px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors">
                <Phone className="w-4 h-4" /> WhatsApp ilə yazın
              </a>
              <a href="mailto:info@alhezars.com" className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[14px] font-medium text-[#424245] bg-[#f5f5f7] rounded-full hover:bg-[#e8e8ed] transition-colors">
                <Mail className="w-4 h-4" /> E-poçt göndərin
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-[#f5f5f7] py-8 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Alhezars" width={22} height={22} className="object-contain" />
            <span className="text-[13px] font-semibold text-[#1d1d1f]">Alhezars</span>
          </Link>
          <p className="text-[12px] text-[#aeaeb2]">&copy; {new Date().getFullYear()} Alhezars Group</p>
          <Link href="/paketler/web-dizayn" className="flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors group">
            <Globe className="w-3.5 h-3.5 opacity-50" /> Web Dizayn <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
