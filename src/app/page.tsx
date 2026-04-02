'use client';

import {
  useState,
  useEffect,
  useRef,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './lib/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import {
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Camera,
  Globe,
  TrendingUp,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Sun,
  Moon,
  Star,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// CONSTANTS (non-translatable)
// ─────────────────────────────────────────────────────────────────

const SERVICE_META = [
  { icon: Camera, colorText: 'text-violet-400', colorBg: 'bg-violet-500/10' },
  { icon: Instagram, colorText: 'text-fuchsia-400', colorBg: 'bg-fuchsia-500/10' },
  { icon: Globe, colorText: 'text-blue-400', colorBg: 'bg-blue-500/10' },
  { icon: TrendingUp, colorText: 'text-emerald-400', colorBg: 'bg-emerald-500/10' },
];

const PROCESS_NUMS = ['01', '02', '03', '04'];

const MARQUEE_1 = [
  'Instagram', 'TikTok', 'YouTube', 'Google Ads',
  'Meta Ads', 'LinkedIn', 'Reels', 'Stories', 'Shorts',
];

const TESTIMONIAL_META = [
  { color: 'from-violet-600 to-purple-800', stars: 5 },
  { color: 'from-fuchsia-600 to-pink-800', stars: 5 },
  { color: 'from-blue-600 to-indigo-800', stars: 5 },
  { color: 'from-emerald-600 to-teal-800', stars: 5 },
];

const NAV_SECTION_IDS = ['hero', 'xidmetler', 'proses', 'testimonials', 'faq', 'haqqimizda', 'elaqe'];

const HERO_STAT_VALUES = [5, 184, 4, 360];
const ABOUT_STAT_VALUES = [5, 184, 100, 4];

// ─────────────────────────────────────────────────────────────────
// LOGO PARTICLES — canvas particle background (desktop only)
// ─────────────────────────────────────────────────────────────────

let _logoShapeCache: [number, number, number, number, number][] | null = null;

function loadLogoShape(): Promise<[number, number, number, number, number][]> {
  if (_logoShapeCache) return Promise.resolve(_logoShapeCache);
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/logo.png';
    img.onload = () => {
      const S = 200;
      const off = document.createElement('canvas');
      off.width = S; off.height = S;
      const c = off.getContext('2d')!;
      c.drawImage(img, 0, 0, S, S);
      const d = c.getImageData(0, 0, S, S);
      const pts: [number, number, number, number, number][] = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4;
          if (d.data[i + 3] > 100)
            pts.push([(x / S) * 34 - 17, (y / S) * 34 - 17, d.data[i], d.data[i + 1], d.data[i + 2]]);
        }
      }
      _logoShapeCache = pts;
      resolve(pts);
    };
  });
}

function LogoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setReady(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let cancelled = false;

    loadLogoShape().then((pts) => {
      if (cancelled) return;
      const isMobile = window.innerWidth < 768;
      const N = isMobile ? 700 : 1800;
      let W = 0, H = 0;
      const px = new Float32Array(N), py = new Float32Array(N);
      const vx = new Float32Array(N), vy = new Float32Array(N);
      const tx = new Float32Array(N), ty = new Float32Array(N);
      const sz = new Float32Array(N), sp = new Float32Array(N), dl = new Float32Array(N);
      const cr = new Uint8Array(N), cg = new Uint8Array(N), cb = new Uint8Array(N);
      let frame = 0;

      function resize() {
        const p = canvas!.parentElement;
        if (!p) return;
        const r = p.getBoundingClientRect();
        W = Math.round(r.width); H = Math.round(r.height);
        canvas!.width = W; canvas!.height = H;
      }

      function init() {
        resize();
        const s = Math.min(W, H) * 0.024;
        const cx = W / 2, cy = H / 2;
        for (let i = 0; i < N; i++) {
          const pt = pts[Math.floor(Math.random() * pts.length)];
          tx[i] = cx + pt[0] * s; ty[i] = cy + pt[1] * s;
          cr[i] = pt[2]; cg[i] = pt[3]; cb[i] = pt[4];
          const ang = Math.random() * Math.PI * 2;
          const dist = Math.max(W, H) * 0.55 + Math.random() * 150;
          px[i] = cx + Math.cos(ang) * dist; py[i] = cy + Math.sin(ang) * dist;
          vx[i] = 0; vy[i] = 0;
          sz[i] = 1.2 + Math.random() * 1.8;
          sp[i] = 0.003 + Math.random() * 0.004;
          const dfc = Math.sqrt((tx[i] - cx) ** 2 + (ty[i] - cy) ** 2);
          dl[i] = dfc * 0.2 + Math.random() * 15;
        }
      }

      init();
      const onResize = () => init();
      window.addEventListener('resize', onResize);

      let mouseX = -9999, mouseY = -9999;
      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas!.getBoundingClientRect();
        const scaleX = W / rect.width;
        const scaleY = H / rect.height;
        mouseX = (e.clientX - rect.left) * scaleX;
        mouseY = (e.clientY - rect.top) * scaleY;
      };
      const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };
      canvas!.parentElement!.addEventListener('mousemove', onMouseMove);
      canvas!.parentElement!.addEventListener('mouseleave', onMouseLeave);

      function animate() {
        if (cancelled) return;
        frame++;
        const beat = 1 + Math.abs(Math.sin(frame * 0.035)) * 0.025;
        const fade = 0.12;
        ctx!.fillStyle = `rgba(4,4,10,${fade})`;
        ctx!.fillRect(0, 0, W, H);

        const imgData = ctx!.getImageData(0, 0, W, H);
        const data = imgData.data;
        const cx = W / 2, cy = H / 2;

        for (let i = 0; i < N; i++) {
          if (frame < dl[i]) continue;
          const targetX = cx + (tx[i] - cx) * beat;
          const targetY = cy + (ty[i] - cy) * beat;
          vx[i] += (targetX - px[i]) * sp[i];
          vy[i] += (targetY - py[i]) * sp[i];
          vx[i] *= 0.93; vy[i] *= 0.93;
          px[i] += vx[i]; py[i] += vy[i];
          const mdx = px[i] - mouseX;
          const mdy = py[i] - mouseY;
          const md2 = mdx * mdx + mdy * mdy;
          if (md2 < 12000 && md2 > 0) {
            const md = Math.sqrt(md2);
            const f = ((110 - md) / 110) * 1.5;
            vx[i] += (mdx / md) * f;
            vy[i] += (mdy / md) * f;
          }
          const xi = ~~px[i], yi = ~~py[i];
          if (xi < 1 || xi >= W - 1 || yi < 1 || yi >= H - 1) continue;
          const r = cr[i], g = cg[i], b = cb[i];
          if (sz[i] < 0.6) {
            const idx = (yi * W + xi) * 4;
            data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
          } else {
            const ri = Math.ceil(sz[i]);
            for (let oy = -ri; oy <= ri; oy++) {
              for (let ox = -ri; ox <= ri; ox++) {
                if (ox * ox + oy * oy > sz[i] * sz[i] + 0.5) continue;
                const px2 = xi + ox, py2 = yi + oy;
                if (px2 < 0 || px2 >= W || py2 < 0 || py2 >= H) continue;
                const idx = (py2 * W + px2) * 4;
                data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
              }
            }
          }
        }
        ctx!.putImageData(imgData, 0, 0);
        animRef.current = requestAnimationFrame(animate);
      }

      animRef.current = requestAnimationFrame(animate);
      return () => {
        window.removeEventListener('resize', onResize);
        canvas!.parentElement?.removeEventListener('mousemove', onMouseMove);
        canvas!.parentElement?.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animRef.current);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', opacity: 0.6, mixBlendMode: 'screen' }}
    />
  );
}

function AllDevicesParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <LogoParticles />;
}

// ─────────────────────────────────────────────────────────────────
// COUNT-UP ANIMATION
// ─────────────────────────────────────────────────────────────────

function CountUp({ to, suffix = '', duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        obs.disconnect();
        const start = performance.now();
        const frame = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────
// SMALL UTILITIES
// ─────────────────────────────────────────────────────────────────

function LogoMark({ width = 36, height = 36, className = '' }: { width?: number; height?: number; className?: string }) {
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

// Marquee row — CSS animation (GPU-friendly, no JS overhead)
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max"
        style={{ animation: `marquee${reverse ? '-reverse' : ''} 40s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-5 text-[10px] uppercase tracking-[0.25em] text-white font-semibold whitespace-nowrap"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-purple-600/35 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// SECTION INDICATOR (side nav dots)
// ─────────────────────────────────────────────────────────────────

function SectionIndicator() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[80] hidden lg:flex flex-col items-end gap-3">
      {NAV_SECTION_IDS.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="w-1.5 h-1.5 rounded-full cursor-pointer"
          style={{
            transform: active === id ? 'scale(1.6)' : 'scale(1)',
            backgroundColor: active === id ? 'rgba(139,92,246,1)' : 'rgba(255,255,255,0.15)',
            transition: 'transform 0.25s, background-color 0.25s',
          }}
          aria-label={id}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────────────────────────

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="fixed bottom-6 right-6 z-[90] w-11 h-11 rounded-full flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-md transition-colors duration-500"
      style={{
        background: isDark
          ? 'rgba(28, 18, 60, 0.85)'
          : 'rgba(245, 243, 255, 0.9)',
      }}
    >
      {isDark ? (
        <Sun className="w-[18px] h-[18px] text-amber-300" />
      ) : (
        <Moon className="w-[18px] h-[18px] text-purple-800" />
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage();
  const [fading, setFading] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const name = 'ALHEZARS GROUP';

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800);
    const t2 = setTimeout(() => onDoneRef.current(), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#04040a] flex flex-col items-center justify-center"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }}
    >
      {/* Logo */}
      <div
        className="mb-9"
        style={{ animation: 'ls-logo 0.6s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}
      >
        <LogoMark width={76} height={76} />
      </div>

      {/* Divider */}
      <div
        className="w-[200px] h-px bg-gradient-to-r from-transparent via-purple-500/55 to-transparent mb-8"
        style={{ animation: 'ls-line 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s forwards', opacity: 0, transform: 'scaleX(0)' }}
      />

      {/* Letters */}
      <div className="flex items-center" style={{ gap: '0.06em' }}>
        {name.split('').map((char, i) => (
          <span
            key={i}
            className="text-[13px] font-black text-white/75 tracking-[0.38em]"
            style={{
              display: 'inline-block',
              minWidth: char === ' ' ? '0.75em' : undefined,
              animation: char === ' ' ? 'none' : `ls-letter 0.38s cubic-bezier(0.16,1,0.3,1) ${0.52 + i * 0.045}s forwards`,
              opacity: char === ' ' ? 0 : 0,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <p
        className="mt-4 text-[8px] text-white/20 uppercase tracking-[0.55em]"
        style={{ animation: 'ls-tagline 0.7s ease 1.5s forwards', opacity: 0 }}
      >
        {t.loading.tagline}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────

function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);
  const pkgCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const NAV_LINKS = [
    { label: t.nav.services, href: '#xidmetler' },
    { label: t.nav.process, href: '#proses' },
    { label: t.nav.about, href: '#haqqimizda' },
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
          <a href="#hero" className="flex items-center gap-2.5 group">
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
              href="#elaqe"
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
              href="#elaqe"
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

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Logo particle animation background */}
      <AllDevicesParticles />

      {/* Static ambient orbs */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-purple-700/12 rounded-full blur-[60px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[0%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-violet-600/10 rounded-full blur-[50px] md:blur-[140px] pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          {t.hero.badge}
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(42px,8vw,88px)] font-black tracking-tight leading-[1.0] mb-3">
          <span className="block text-white">
            {t.hero.title1}
          </span>
          <span className="block bg-gradient-to-r from-purple-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t.hero.title2}
          </span>
          <span className="block text-white/85">
            {t.hero.title3}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-[clamp(16px,2vw,20px)] text-white/35 mt-8 mb-10 leading-relaxed">
          {t.hero.subtitle1}{' '}
          <span className="text-white/55">
            {t.hero.subtitle2}
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <a
            href="/paketler/sosial-media"
            className="group flex items-center gap-2 px-8 py-4 text-sm font-black bg-purple-700 hover:bg-purple-600 text-white rounded-full shadow-2xl shadow-purple-900/40 transition-colors"
          >
            {t.hero.ctaPrimary}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#elaqe"
            className="flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-full transition-all"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-10 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl mx-auto">
          {t.hero.stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="text-[clamp(28px,4vw,40px)] font-black text-white">
                <CountUp to={HERO_STAT_VALUES[i]} suffix={s.suffix} />
              </div>
              <div className="text-[11px] text-white/25 mt-1.5 tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE BAND
// ─────────────────────────────────────────────────────────────────

function MarqueeBand() {
  const { t } = useLanguage();
  return (
    <div className="py-5 border-y border-white/[0.05] space-y-2.5 overflow-hidden">
      <MarqueeRow items={MARQUEE_1} />
      <MarqueeRow items={t.marquee2} reverse />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────

function Services() {
  const { t } = useLanguage();
  return (
    <section id="xidmetler" className="py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {t.services.badge}
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            {t.services.title1}
            <br />
            <span className="text-white/20">{t.services.title2}</span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto leading-relaxed">
            {t.services.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_META.map((svc, i) => (
            <div key={i}>
              <div
                className="group h-full p-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-purple-500/25 hover:bg-white/[0.04] transition-colors duration-300 cursor-default"
              >
                <div
                  className={`w-11 h-11 ${svc.colorBg} rounded-xl flex items-center justify-center mb-5`}
                >
                  <svc.icon className={`w-5 h-5 ${svc.colorText}`} />
                </div>
                <h3 className="text-white font-bold text-base mb-2.5">
                  {t.services.items[i].title}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed">
                  {t.services.items[i].desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────────────────────────────

function Process() {
  const { t } = useLanguage();
  return (
    <section id="proses" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {t.process.badge}
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            {t.process.title1}
            <br />
            <span className="text-white/20">{t.process.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-purple-700/25 to-transparent pointer-events-none" />

          {PROCESS_NUMS.map((num, i) => (
            <div key={num}>
              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full border border-purple-500/20 bg-purple-500/5 flex items-center justify-center">
                    <span className="text-2xl font-black text-purple-400/50 select-none">
                      {num}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-base mb-2.5">
                  {t.process.steps[i].title}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed">
                  {t.process.steps[i].desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────

function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {t.testimonials.badge}
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            {t.testimonials.title1}
            <br />
            <span className="text-white/20">{t.testimonials.title2}</span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto leading-relaxed">
            {t.testimonials.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.testimonials.items.map((item, i) => (
            <div key={item.name}>
              <div
                className="flex flex-col p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] cursor-default h-full"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: TESTIMONIAL_META[i].stars }).map((_, si) => (
                    <div key={si}>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-[13px] leading-relaxed flex-1 mb-5">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${TESTIMONIAL_META[i].color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[11px] font-black text-white">{item.initials}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold leading-none">{item.name}</div>
                    <div className="text-white/25 text-[11px] mt-0.5">{item.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────

function FAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {t.faq.badge}
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            {t.faq.title1}
            <br />
            <span className="text-white/20">{t.faq.title2}</span>
          </h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i}>
                <div
                  className="rounded-2xl border overflow-hidden transition-colors duration-200"
                  style={{
                    borderColor: isOpen ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)',
                    backgroundColor: isOpen ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.025)',
                  }}
                >
                  {/* Header */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-white/80 font-semibold text-sm pr-4">
                      {item.q}
                    </span>
                    <div
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <ChevronDown className="w-4 h-4 text-purple-400" />
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    className="faq-content"
                    style={{
                      maxHeight: isOpen ? '300px' : '0',
                      opacity: isOpen ? 1 : 0,
                      transition: 'max-height 0.3s ease, opacity 0.25s ease',
                    }}
                  >
                    <div className="px-5 pb-5">
                      <div className="w-full h-px bg-white/[0.06] mb-4" />
                      <p className="text-white/35 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-white/20 text-sm">
            {t.faq.moreQuestions}{' '}
            <a href="#elaqe" className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
              {t.faq.contactUs}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About() {
  const { t } = useLanguage();
  return (
    <section id="haqqimizda" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">
              {t.about.badge}
            </p>
            <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-7 leading-tight">
              {t.about.title1}
              <br />
              <span className="text-white/15">{t.about.title2}</span>
            </h2>

            <p className="text-white/40 leading-relaxed mb-5">
              <span className="text-white font-semibold">Alhezars Group</span>{' '}
              {t.about.desc1}
            </p>
            <p className="text-white/30 leading-relaxed mb-8">
              {t.about.desc2}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {t.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[11px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {t.about.stats.map((s, i) => (
                <div key={s.label}>
                  <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                    <div className="text-2xl font-black text-white">
                      <CountUp to={ABOUT_STAT_VALUES[i]} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] text-white/25 mt-1">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {t.about.highlights.map((item, i) => (
                <div
                  key={item.title}
                  className={`p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] cursor-default ${
                    i === t.about.highlights.length - 1 && t.about.highlights.length % 2 !== 0 ? 'col-span-2' : ''
                  }`}
                >
                    <div className="text-2xl mb-3">
                      {item.icon}
                    </div>
                    <div className="text-white font-bold text-sm mb-1">
                      {item.title}
                    </div>
                    <div className="text-white/30 text-xs leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// CONTACT / CTA
// ─────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', pkg: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.contact.errorDefault);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', pkg: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t.contact.errorDefault);
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  const inputCls =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200';

  return (
    <section id="elaqe" className="py-28 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">
            {t.contact.badge}
          </p>
          <h2 className="text-[clamp(32px,6vw,64px)] font-black text-white mb-6 leading-[1.05]">
            {t.contact.title1}
            <br />
            <span
              className="bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent"
            >
              {t.contact.title2}
            </span>
          </h2>
          <p className="text-white/30 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t.contact.desc}
          </p>

          {/* Quick contact buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                          <a
                href="https://wa.me/994552119406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-9 py-4 text-sm font-black bg-purple-700 hover:bg-purple-600 text-white rounded-full shadow-2xl shadow-purple-900/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t.contact.whatsapp}
              </a>
                                      <a
                href="mailto:info@alhezars.com"
                className="flex items-center justify-center gap-2.5 px-9 py-4 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-full transition-all"
              >
                <Mail className="w-4 h-4" />
                {t.contact.emailBtn}
              </a>
                      </div>
        </div>

        {/* Divider */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-white/20 text-xs uppercase tracking-widest font-semibold">{t.contact.divider}</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                  className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-5"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-white font-black text-2xl mb-2">{t.contact.successTitle}</h3>
                <p className="text-white/35 text-sm max-w-sm">
                  {t.contact.successDesc}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-purple-400 text-sm hover:text-purple-300 transition-colors underline underline-offset-2"
                >
                  {t.contact.successAgain}
                </button>
              </div>
          ) : (
              <form onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {t.contact.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder={t.contact.phonePlaceholder}
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {t.contact.packageLabel}
                  </label>
                  <select
                    value={form.pkg}
                    onChange={(e) => setForm((f) => ({ ...f, pkg: e.target.value }))}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" className="bg-[#0a0a14]">{t.contact.packagePlaceholder}</option>
                    <optgroup label="Sosial Media" className="bg-[#0a0a14]">
                      <option value="XS">XS — 700 ₼/ay</option>
                      <option value="S">S — 1.290 ₼/ay</option>
                      <option value="M">M — 1.890 ₼/ay (Populyar)</option>
                      <option value="L">L — 3.300 ₼/ay</option>
                      <option value="XL">XL — 5.790 ₼/ay</option>
                    </optgroup>
                    <optgroup label="Web Dizayn" className="bg-[#0a0a14]">
                      <option value="Web Basic">Web Basic</option>
                      <option value="Web Orta">Web Orta</option>
                      <option value="Web Premium">Web Premium</option>
                      <option value="Web Premium Plus">Web Premium Plus</option>
                    </optgroup>
                    <option value="Fərdi" className="bg-[#0a0a14]">{t.contact.customOffer}</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="sm:col-span-2 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                  <p className="text-white/15 text-xs">
                    {t.contact.required}
                  </p>
                                      <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex items-center gap-2 px-8 py-3.5 text-sm font-black bg-purple-700 hover:bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full shadow-xl shadow-purple-900/30 transition-colors"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.contact.submit}
                        </>
                      )}
                    </button>
                                  </div>
              </form>
            )}
        </div>

        {/* Address */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-6 text-white/20 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600/50" />
              CV46+XHM, 5 Nadir Əliyev, Bakı 1075, Azerbaycan
            </span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>www.alhezars.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAP SECTION
// ─────────────────────────────────────────────────────────────────

function MapSection() {
  const { t } = useLanguage();
  return (
    <section className="pb-16 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div>
              <p className="text-white/55 text-sm font-semibold">
                CV46+XHM, 5 Nadir Əliyev, Bakı 1075, Azerbaycan
              </p>
              <p className="text-white/20 text-xs mt-0.5">{t.map.office}</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] h-[300px] sm:h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.519469305576!2d49.8613062!3d40.4074623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d00606cd875%3A0x63faa7de0ab3bbe3!2sAlhezars%20Group!5e0!3m2!1str!2saz!4v1730820000000!5m2!1str!2saz"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(1) invert(1) hue-rotate(180deg) brightness(0.75) contrast(0.88) saturate(0.9)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alhezars Group - Bakı, Nərimanov rayonu"
            />

            {/* Fade to page bg at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, #04040a)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <LogoMark width={32} height={32} />
              <span className="text-[17px] font-black">
                <span className="text-white">Alhezars</span>
                <span className="text-purple-400"> Group</span>
              </span>
            </div>
            <p className="text-white/22 text-sm leading-relaxed max-w-xs">
              {t.footer.desc}
            </p>
            <p className="text-white/12 text-xs mt-4">www.alhezars.com</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-sm font-bold mb-5">{t.footer.servicesTitle}</h4>
            <ul className="space-y-3">
              {t.footer.servicesList.map((l) => (
                <li key={l}>
                  <a
                    href="#xidmetler"
                    className="text-white/25 hover:text-white/55 text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-sm font-bold mb-5">{t.footer.companyTitle}</h4>
            <ul className="space-y-3">
              {t.footer.companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/25 hover:text-white/55 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/15 text-xs">
            © {new Date().getFullYear()} Alhezars Group. {t.footer.rights}
          </p>
          <p className="text-white/15 text-xs">CV46+XHM, 5 Nadir Əliyev, Bakı 1075, Azerbaycan</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ag_loaded') === '1') {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loaded]);

  return (
    <>
      {!loaded && (
        <LoadingScreen
          onDone={() => { sessionStorage.setItem('ag_loaded', '1'); setLoaded(true); }}
        />
      )}

      <main
        className="bg-[#04040a] min-h-screen"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s' }}
      >
        <Navbar />
        <Hero />
        <MarqueeBand />
        <Services />
        <Process />
        <Testimonials />
        <FAQ />
        <About />
        <Contact />
        <MapSection />
        <Footer />
        {loaded && <ThemeToggle />}
        {loaded && <SectionIndicator />}
      </main>
    </>
  );
}
