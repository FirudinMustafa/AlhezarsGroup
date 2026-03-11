'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import { SOCIAL_PACKAGES } from '../../lib/packages';
import PackagesNavbar from '../../components/PackagesNavbar';

export default function SocialMediaPage() {
  return (
    <main className="bg-[#04040a] min-h-screen">
      <PackagesNavbar activePage="sosial-media" />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[13px] text-violet-400 tracking-[0.06em] uppercase font-medium mb-5">
            Sosial Media Paketləri
          </p>
          <h1 className="text-[clamp(34px,5vw,52px)] font-semibold tracking-[-0.03em] leading-[1.08] text-white mb-5">
            Brendinizi sosial mediada <span className="gradient-text-blue">böyüdürük.</span>
          </h1>
          <p className="text-white/50 text-[17px] leading-[1.6] max-w-lg mx-auto mb-10">
            Mobiloqraf, videoqraf, motion dizayn, targeting — brendinizin sosial media hekayəsini biz yazırıq.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#paketler" className="group inline-flex items-center gap-2 px-7 py-3 text-[15px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors">
              Paketlərə bax <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="https://wa.me/994104219406" target="_blank" rel="noopener noreferrer" className="text-[15px] text-violet-400 hover:text-violet-300 transition-colors">
              Bizimlə əlaqə
            </a>
          </div>
        </div>
      </section>

      <section id="paketler" className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-white mb-3">
              Sizə uyğun <span className="gradient-text-blue">paketi seçin</span>
            </h2>
            <p className="text-white/45 text-[15px] max-w-md mx-auto">
              Brendinizin ölçüsünə uyğun aylıq kontent istehsalı və targeting xidmətləri.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {SOCIAL_PACKAGES.map((pkg) => (
              <div key={pkg.name} className="min-w-[260px] flex-shrink-0 snap-start lg:min-w-0">
                <div className={`flex flex-col h-full rounded-2xl transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#0f0821] shadow-2xl shadow-purple-900/25 ring-1 ring-[#7c3aed]/40 scale-[1.03] relative z-10'
                    : 'bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06]'
                }`}>
                  {pkg.popular && (
                    <div className="bg-[#7c3aed] text-white text-[11px] font-semibold text-center py-1.5 rounded-t-2xl tracking-wide">
                      Ən populyar
                    </div>
                  )}

                  <div className={`p-6 flex-1 flex flex-col ${!pkg.popular ? 'pt-6' : ''}`}>
                    <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-white mb-0.5">{pkg.name}</h3>
                    <p className="text-[12px] text-white/40 mb-1">{pkg.subtitle}</p>
                    <p className="text-[11px] text-white/25 mb-5">{pkg.contentCount} kontent/ay</p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-[32px] font-semibold tracking-[-0.03em] text-white">{pkg.price.toLocaleString()}</span>
                      <span className="text-[14px] text-white/40">₼/ay</span>
                    </div>

                    <a
                      href="https://wa.me/994104219406"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 w-full py-2.5 text-[13px] font-medium rounded-xl transition-colors mb-6 ${
                        pkg.popular
                          ? 'bg-[#7c3aed] text-white hover:bg-[#6d28d9]'
                          : 'text-violet-400 bg-violet-500/[0.08] hover:bg-violet-500/[0.15]'
                      }`}
                    >
                      Başlayaq <ChevronRight className="w-3.5 h-3.5" />
                    </a>

                    <div className="h-px bg-white/[0.06] mb-5" />

                    <ul className="space-y-2.5 flex-1">
                      {pkg.features.map((f) => {
                        const gold = pkg.goldenFeatures.includes(f);
                        return (
                          <li key={f} className="flex items-start gap-2 text-[12px]">
                            <Check className={`w-3.5 h-3.5 mt-[1px] flex-shrink-0 ${gold ? 'text-amber-400' : 'text-white/20'}`} />
                            <span className={gold ? 'text-amber-400 font-medium' : 'text-white/55'}>{f}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/25 text-[12px]">Bütün paketlər aylıq ödənişli. Reklam büdcəsi ayrıca qarşılanır.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-white mb-4 leading-tight">
            Paketinizi seçin, <span className="gradient-text-blue">böyüməyə başlayın.</span>
          </h2>
          <p className="text-white/45 text-[15px] mb-10 max-w-sm mx-auto">Brendinizə uyğun paketi seçin, bizimlə əlaqə saxlayın.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/994104219406" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[14px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors">
              <Phone className="w-4 h-4" /> WhatsApp ilə yazın
            </a>
            <a href="mailto:info@alhezars.com" className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[14px] font-medium text-white/60 bg-white/[0.06] rounded-full hover:bg-white/[0.1] transition-colors">
              <Mail className="w-4 h-4" /> E-poçt göndərin
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
          <Link href="/paketler/web-dizayn" className="flex items-center gap-1.5 text-[13px] text-white/45 hover:text-white transition-colors group">
            <Globe className="w-3.5 h-3.5 opacity-50" /> Web Dizayn <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
