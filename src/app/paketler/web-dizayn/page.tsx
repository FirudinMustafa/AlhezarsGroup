'use client';

import { useState, useEffect, useRef, type MouseEvent as RMouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import { WEB_PACKAGES } from '../../lib/packages';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MARQUEE_ITEMS = [
  'Web Dizayn', 'UI/UX', 'SEO', 'E-ticarət', 'Brend Kimliyi',
  'Logo Dizayn', 'Domain & Hosting', 'Admin Panel', 'Google Analytics',
];

// ─── LOGO MARK ────────────────────────────────────────────────────

function LogoMark({
  width = 36,
  height = 36,
  className = '',
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Alhezars Group"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  );
}

// ─── COUNTER ──────────────────────────────────────────────────────

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2000;
    function step(now: number) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── FADE UP ──────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MARQUEE ROW ──────────────────────────────────────────────────

function MarqueeRow({
  items,
  reverse = false,
  speed = 35,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ['0%', '25%'] : ['0%', '-25%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-5 text-[10px] uppercase tracking-[0.25em] text-white/18 font-semibold whitespace-nowrap"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-blue-600/35 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────

function MagneticButton({
  children,
  className = '',
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={`magnetic-btn inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── PAGE NAVBAR ──────────────────────────────────────────────────

function PageNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark />
            <span className="text-[17px] font-bold tracking-tight">
              <span className="text-white">Alhezars</span>
              <span className="text-purple-400"> Group</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: 'Sosial Media', href: '/paketler/sosial-media' },
              { label: 'Xidmətlər', href: '/#xidmetler' },
              { label: 'Haqqımızda', href: '/#haqqimizda' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="relative text-sm text-white/40 hover:text-white transition-colors duration-200 group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <MagneticButton>
            <motion.a
              href="https://wa.me/994104219406"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold bg-purple-700 hover:bg-purple-600 text-white rounded-full transition-colors duration-200 shadow-lg shadow-purple-900/30"
            >
              Qiymət al
            </motion.a>
          </MagneticButton>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.05]"
          >
            <div className="px-5 py-4 flex flex-col">
              {[
                { label: 'Sosial Media', href: '/paketler/sosial-media' },
                { label: 'Xidmətlər', href: '/#xidmetler' },
                { label: 'Haqqımızda', href: '/#haqqimizda' },
              ].map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm text-white/55 hover:text-white border-b border-white/[0.04] transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://wa.me/994104219406"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 block text-center py-3 text-sm font-bold bg-purple-700 text-white rounded-full"
              >
                Qiymət al
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────

function WebHero() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 20 });
  const glowLeft = useTransform(smoothX, [0, 1], ['0%', '90%']);
  const glowTop = useTransform(smoothY, [0, 1], ['0%', '90%']);

  function onMouseMove(e: RMouseEvent<HTMLElement>) {
    if (!heroRef.current) return;
    const { width, height, left, top } = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  }

  function WordReveal({
    words,
    baseDelay,
    className,
  }: {
    words: string[];
    baseDelay: number;
    className?: string;
  }) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden mr-[0.28em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ delay: baseDelay + i * 0.1, duration: 0.65, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Ambient orbs */}
      <div className="absolute top-[10%] left-[5%] w-[700px] h-[700px] bg-blue-700/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[0%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Mouse-tracking glow */}
      <motion.div
        className="absolute w-[480px] h-[480px] bg-blue-600/8 rounded-full blur-[130px] pointer-events-none"
        style={{ left: glowLeft, top: glowTop, translateX: '-50%', translateY: '-50%' }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-xs font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase tracking-wider"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
          Web Dizayn Paketləri
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(40px,7.5vw,84px)] font-black tracking-tight leading-[1.0] mb-3">
          <span className="block text-white">
            <WordReveal words={['Brendinizin', 'Rəqəmsal']} baseDelay={0.1} />
          </span>
          <span className="block bg-gradient-to-r from-blue-300 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            <WordReveal words={['Evini', 'Birlikdə']} baseDelay={0.3} />
          </span>
          <span className="block text-white/80">
            <WordReveal words={['İnşa', 'Edək']} baseDelay={0.5} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: EASE }}
          className="max-w-2xl mx-auto text-[clamp(15px,1.8vw,19px)] text-white/35 mt-8 mb-10 leading-relaxed"
        >
          Sadə saytdan tam rəqəmsal ekosisteməqədər —{' '}
          <span className="text-white/55">
            brendinizin ehtiyacına uyğun xüsusi web həllər.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.55, ease: EASE }}
          className="flex flex-col sm:flex-row gap-3.5 justify-center items-center"
        >
          <MagneticButton>
            <motion.a
              href="#paketler"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 px-8 py-4 text-sm font-black bg-purple-700 hover:bg-purple-600 text-white rounded-full shadow-2xl shadow-purple-900/40 transition-colors"
            >
              Paketlərə bax
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </MagneticButton>
          <MagneticButton>
            <motion.a
              href="https://wa.me/994104219406"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-full transition-all"
            >
              Qiymət soruşun
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-20 pt-10 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl mx-auto"
        >
          {[
            { to: 4, suffix: '', label: 'Paket seçimi' },
            { to: 10, suffix: '+', label: 'Gün çatdırılma' },
            { to: 5, suffix: '', label: 'Dil dəstəyi' },
            { to: 6, suffix: 'ay', label: 'Max texniki dəstək' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[clamp(28px,4vw,40px)] font-black text-white">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-[11px] text-white/25 mt-1.5 tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── MARQUEE BAND ─────────────────────────────────────────────────

function WebMarquee() {
  return (
    <div className="py-5 border-y border-white/[0.05] space-y-2.5 overflow-hidden">
      <MarqueeRow items={MARQUEE_ITEMS} speed={40} />
      <MarqueeRow items={[...MARQUEE_ITEMS].reverse()} reverse speed={45} />
    </div>
  );
}

// ─── PACKAGE GRID ─────────────────────────────────────────────────

function WebPackageGrid() {
  return (
    <section id="paketler" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/6 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Web Xidmətlər
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5">
            Web Dizayn Paketləri
          </h2>
          <p className="text-white/30 max-w-lg mx-auto leading-relaxed">
            Sadə saytdan tam rəqəmsal ekosisteməqədər — brendinizin ehtiyacına
            uyğun xüsusi web həllər.
          </p>
        </FadeUp>

        <div className="flex flex-wrap justify-center gap-5">
          {WEB_PACKAGES.map((pkg, i) => (
            <FadeUp key={pkg.name} delay={i * 0.08} className="w-full sm:max-w-[290px]">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className={`relative flex flex-col rounded-2xl overflow-hidden h-full border transition-colors ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-purple-900/30 to-black/60 shadow-2xl shadow-purple-900/15 border-purple-500/30'
                    : 'bg-[#04040a] border-white/[0.06] hover:border-purple-500/20'
                }`}
              >
                {/* Popular: pulsing top line */}
                {pkg.popular && (
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                  />
                )}
                {/* Popular: shimmer overlay */}
                {pkg.popular && (
                  <motion.div
                    animate={{ opacity: [0, 0.08, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute inset-0 shimmer pointer-events-none"
                  />
                )}

                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                    {pkg.popular && (
                      <motion.span
                        animate={{ opacity: [0.75, 1, 0.75] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/20"
                      >
                        Populyar
                      </motion.span>
                    )}
                  </div>
                  <p className="text-white/35 text-sm mb-5">{pkg.subtitle}</p>

                  {/* Price placeholder */}
                  <div className="mb-5 pb-5 border-b border-white/[0.05]">
                    <p className="text-white/40 text-sm font-semibold">Qiymət üçün</p>
                    <p className="text-white/20 text-xs mt-0.5">əlaqə saxlayın →</p>
                  </div>

                  <ul className="space-y-2.5 flex-1">
                    {pkg.features.map((f) => {
                      const isGold = pkg.goldenFeatures.includes(f);
                      return (
                        <li
                          key={f}
                          className={`flex items-start gap-2 text-[11.5px] ${
                            isGold ? 'text-amber-300/90' : 'text-white/60'
                          }`}
                        >
                          <Check
                            className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                              isGold ? 'text-amber-400' : 'text-white/25'
                            }`}
                          />
                          <span>{f}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <MagneticButton className="w-full">
                    <motion.a
                      href="https://wa.me/994104219406"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold rounded-xl transition-colors w-full ${
                        pkg.popular
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30'
                          : 'bg-white/[0.06] hover:bg-white/[0.1] text-white/55 hover:text-white border border-white/[0.08]'
                      }`}
                    >
                      Qiymət al
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                  </MagneticButton>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────

function WebCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 rounded-full blur-[220px] pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <FadeUp>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Əlaqə
          </p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black text-white mb-5 leading-tight">
            Proyektinizi Müzakirə Edək,
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Birlikdə İnşa Edək
            </span>
          </h2>
          <p className="text-white/30 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Qiymət və detallar üçün bizimlə əlaqə saxlayın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <MagneticButton>
              <motion.a
                href="https://wa.me/994104219406"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2.5 px-9 py-4 text-sm font-black bg-purple-700 hover:bg-purple-600 text-white rounded-full shadow-2xl shadow-purple-900/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp ilə yazın
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href="mailto:info@alhezars.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 px-9 py-4 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-full transition-all"
              >
                <Mail className="w-4 h-4" />
                E-poçt göndərin
              </motion.a>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/20 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600/50" />
              Nərimanov r., Nadir Əliyev 5, Bakı
            </span>
            <span className="hidden sm:block w-1 h-1 bg-white/10 rounded-full" />
            <span>info@alhezars.com</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── MINI FOOTER ──────────────────────────────────────────────────

function WebFooter() {
  return (
    <footer className="border-t border-white/[0.05] py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/paketler/sosial-media"
          className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white transition-colors group order-last sm:order-first"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <Instagram className="w-3.5 h-3.5 text-fuchsia-400/60 group-hover:text-fuchsia-400 transition-colors" />
          Sosial Media Paketləri
        </Link>

        <div className="flex items-center gap-2.5">
          <LogoMark width={28} height={28} />
          <span className="text-sm font-bold">
            <span className="text-white">Alhezars</span>
            <span className="text-purple-400"> Group</span>
          </span>
        </div>

        <p className="text-white/15 text-xs">
          © {new Date().getFullYear()} Alhezars Group. Bütün hüquqlar qorunur.
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE ROOT ────────────────────────────────────────────────────

export default function WebDizaynPage() {
  return (
    <main className="bg-[#04040a] min-h-screen">
      <PageNavbar />
      <WebHero />
      <WebMarquee />
      <WebPackageGrid />
      <WebCTA />
      <WebFooter />
    </main>
  );
}
