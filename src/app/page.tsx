'use client';

import {
  useState,
  useEffect,
  useRef,
} from 'react';
import Image from 'next/image';
import { useLanguage } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import LogoMark from './components/LogoMark';
import {
  ChevronRight,
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
  Video,
  Sparkles,
  Play,
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

const NAV_SECTION_IDS = ['hero', 'xidmetler', 'proses', 'portfolio', 'testimonials', 'faq', 'haqqimizda', 'elaqe'];

const HERO_STAT_VALUES = [5, 184, 4, 360];
const ABOUT_STAT_VALUES = [5, 184, 100, 4];

// Portfolio metadata — index-aligned with t.portfolio.items in each locale file.
// (image, category & accent color are visual/structural, not translatable copy.)
type PortfolioCategory =
  | 'realestate' | 'hospitality' | 'health' | 'fashion' | 'auto' | 'legal' | 'entertainment' | 'consumer';

// Order here is index-aligned with t.portfolio.items in every locale file —
// the first three (Sea Breeze, Unilever, Raffle Residences) are the ones
// shown in the collapsed "top 3" preview before "show more" is clicked.
const PORTFOLIO_META: { image: string; category: PortfolioCategory; hasVideo: boolean; video?: string; instagram?: string; accent: string }[] = [
  { image: '/portfolio/sea-breeze.webp', category: 'hospitality', hasVideo: false, instagram: 'https://www.instagram.com/seabreezeresortbaku/', accent: 'from-sky-600 to-blue-900' },
  { image: '/portfolio/unilever.webp', category: 'consumer', hasVideo: false, instagram: 'https://www.instagram.com/unilever/', accent: 'from-white to-slate-100' },
  { image: '/portfolio/raffle-residences.webp', category: 'hospitality', hasVideo: true, video: '/portfolio/videos/raffle-sea-breeze.mp4', instagram: 'https://www.instagram.com/raffle.group/', accent: 'from-amber-600 to-yellow-800' },
  { image: '/portfolio/rise-plaza.webp', category: 'realestate', hasVideo: true, video: '/portfolio/videos/rise-plaza.mp4', instagram: 'https://www.instagram.com/riseplaza/', accent: 'from-blue-600 to-indigo-900' },
  { image: '/portfolio/digital-residence.webp', category: 'realestate', hasVideo: true, video: '/portfolio/videos/digital-residence.mp4', instagram: 'https://www.instagram.com/digital.residence/', accent: 'from-sky-500 to-blue-800' },
  { image: '/portfolio/ganjlik-garden.webp', category: 'realestate', hasVideo: true, video: '/portfolio/videos/ganjlik-garden.mp4', instagram: 'https://www.instagram.com/ganjlik.garden/', accent: 'from-emerald-600 to-green-900' },
  { image: '/portfolio/munhen-doner.webp', category: 'hospitality', hasVideo: true, video: '/portfolio/videos/munhen-doner.mp4', instagram: 'https://www.instagram.com/munhendoneraz/', accent: 'from-red-600 to-orange-800' },
  { image: '/portfolio/microgreens.webp', category: 'hospitality', hasVideo: true, video: '/portfolio/videos/microgreens.mp4', instagram: 'https://www.instagram.com/microgreens_azerbaycan/', accent: 'from-lime-500 to-green-800' },
  { image: '/portfolio/my-doctor-logo.webp', category: 'health', hasVideo: true, video: '/portfolio/videos/my-doctor.mp4', instagram: 'https://www.instagram.com/mydoctormedical/', accent: 'from-teal-500 to-emerald-800' },
  { image: '/portfolio/afandy-parfum.webp', category: 'health', hasVideo: true, video: '/portfolio/videos/afandy-parfum.mp4', instagram: 'https://www.instagram.com/afandygallery_parfum/', accent: 'from-yellow-600 to-amber-900' },
  { image: '/portfolio/cravatte.webp', category: 'fashion', hasVideo: true, video: '/portfolio/videos/cravatte.mp4', instagram: 'https://www.instagram.com/cravatte.az/', accent: 'from-rose-700 to-red-950' },
  { image: '/portfolio/vlt-autopark.webp', category: 'auto', hasVideo: true, video: '/portfolio/videos/vlt-autopark.mp4', instagram: 'https://www.instagram.com/autopark_vlt/', accent: 'from-red-600 to-rose-900' },
  { image: '/portfolio/aga-service.webp', category: 'entertainment', hasVideo: false, instagram: 'https://www.instagram.com/agaplaystation/', accent: 'from-slate-500 to-slate-800' },
  { image: '/portfolio/kyb.webp', category: 'legal', hasVideo: true, video: '/portfolio/videos/kyb.mp4', accent: 'from-amber-500 to-yellow-800' },
  { image: '/portfolio/baku-karting.webp', category: 'entertainment', hasVideo: false, instagram: 'https://www.instagram.com/bakucitykarting/', accent: 'from-red-600 to-neutral-950' },
  { image: '/portfolio/diamond-residence.webp', category: 'realestate', hasVideo: true, video: '/portfolio/videos/diamond-residence.mp4', instagram: 'https://www.instagram.com/residence.diamond/', accent: 'from-emerald-700 to-green-950' },
  { image: '/portfolio/parfumcity.webp', category: 'health', hasVideo: true, video: '/portfolio/videos/parfumcity.mp4', instagram: 'https://www.instagram.com/parfumcity.az/', accent: 'from-neutral-800 to-black' },
];

const PORTFOLIO_FILTERS: PortfolioCategory[] = [
  'realestate', 'hospitality', 'health', 'fashion', 'auto', 'legal', 'entertainment', 'consumer',
];

// ─────────────────────────────────────────────────────────────────
// LOGO PARTICLES — canvas particle background (desktop only)
// ─────────────────────────────────────────────────────────────────

let _logoShapeCache: [number, number, number, number, number][] | null = null;

function loadLogoShape(): Promise<[number, number, number, number, number][]> {
  if (_logoShapeCache) return Promise.resolve(_logoShapeCache);
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = '/alhezarsLogo.png';
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
          const rr = d.data[i], gg = d.data[i + 1], bb = d.data[i + 2], aa = d.data[i + 3];
          // The logo art is a purple owl+A on a transparent background (no
          // background badge to exclude), so alpha alone marks the shape.
          // A small luminance floor drops the near-black outline pixels,
          // which would otherwise render as invisible dots on the dark hero bg.
          const lum = 0.299 * rr + 0.587 * gg + 0.114 * bb;
          if (aa > 100 && lum > 10) {
            const boost = 1.35;
            const R = Math.min(255, rr * boost);
            const G = Math.min(255, gg * boost);
            const B = Math.min(255, bb * boost);
            pts.push([(x / S) * 34 - 17, (y / S) * 34 - 17, R, G, B]);
          }
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
// PORTFOLIO
// ─────────────────────────────────────────────────────────────────

function Portfolio() {
  const { t } = useLanguage();
  const [active, setActive] = useState<PortfolioCategory | 'all'>('all');
  const items = PORTFOLIO_META.map((meta, i) => ({ ...meta, ...t.portfolio.items[i] }));
  const [videoModal, setVideoModal] = useState<(typeof items)[number] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const filterRowRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const filtered = active === 'all' ? items : items.filter((it) => it.category === active);
  const PREVIEW_COUNT = 3;
  const visible = expanded ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const hasMore = filtered.length > PREVIEW_COUNT;

  function selectCategory(cat: PortfolioCategory | 'all') {
    setActive(cat);
    setExpanded(false);
  }

  useEffect(() => {
    const el = filterRowRef.current;
    if (!el) return;
    const update = () => {
      setShowLeftFade(el.scrollLeft > 4);
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!videoModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoModal(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [videoModal]);

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {t.portfolio.badge}
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            {t.portfolio.title1}
            <br />
            <span className="text-white/20">{t.portfolio.title2}</span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto leading-relaxed">
            {t.portfolio.desc}
          </p>
        </div>

        {/* Category filters — nowrap+scroll on mobile (always starts at the first chip,
            so nothing is clipped/unreachable), wraps to multiple centered lines on
            larger screens where there's room (no scrolling needed, so nothing can
            get clipped by overflow + centering there either). Edge fades hint that
            there's more to scroll to on mobile. */}
        <div className="relative mb-10">
          <div
            ref={filterRowRef}
            className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible justify-start sm:justify-center pb-2 sm:pb-0 no-scrollbar"
          >
            <button
              onClick={() => selectCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                active === 'all'
                  ? 'bg-purple-700 text-white'
                  : 'bg-white/[0.04] text-white/40 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {t.portfolio.categoryAll}
            </button>
            {PORTFOLIO_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  active === cat
                    ? 'bg-purple-700 text-white'
                    : 'bg-white/[0.04] text-white/40 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {t.portfolio.categories[cat]}
              </button>
            ))}
          </div>
          {showLeftFade && (
            <div className="sm:hidden pointer-events-none absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-[#04040a] to-transparent" />
          )}
          {showRightFade && (
            <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#04040a] to-transparent" />
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((item) => (
            <div
              key={item.name}
              className="group rounded-2xl bg-white/[0.025] border border-white/[0.06] overflow-hidden hover:border-purple-500/25 hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${item.accent}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
                {item.hasVideo && item.video && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider pointer-events-none">
                    <Video className="w-3 h-3" />
                    {t.portfolio.videoBadge}
                  </div>
                )}

                {/* Bottom action row — video preview on the left, Instagram on the right */}
                {(item.hasVideo && item.video) || item.instagram ? (
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                    {item.hasVideo && item.video ? (
                      <button
                        onClick={() => setVideoModal(item)}
                        aria-label={`${t.portfolio.videoBadge}: ${item.name}`}
                        className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md hover:bg-purple-600 flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
                      >
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                      </button>
                    ) : <span />}
                    {item.instagram ? (
                      <a
                        href={item.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Instagram: ${item.name}`}
                        className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md hover:bg-gradient-to-br hover:from-fuchsia-500 hover:via-pink-500 hover:to-amber-400 flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    ) : <span />}
                  </div>
                ) : null}
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  {t.portfolio.categories[item.category]}
                </span>
                <h3 className="text-white font-bold text-base mt-1.5 mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-white/30 text-[13px] leading-relaxed mb-3">
                  {item.tagline}
                </p>
                <p className="text-white/20 text-[11px] font-semibold tracking-wide">
                  {item.services}
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 px-7 py-3 text-sm font-bold text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-colors duration-200"
            >
              {expanded ? t.portfolio.showLess : t.portfolio.showMore}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Video lightbox — video on the left, brand info + Instagram on the right */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setVideoModal(null)}
        >
          <button
            onClick={() => setVideoModal(null)}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a12] border border-white/[0.08] flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video — left */}
            <div className="sm:w-[46%] flex-shrink-0 bg-black flex items-center justify-center max-h-[42vh] sm:max-h-[90vh]">
              <video
                key={videoModal.video}
                src={videoModal.video}
                controls
                autoPlay
                playsInline
                className="w-full h-full max-h-[42vh] sm:max-h-[90vh] object-contain"
              />
            </div>

            {/* Brand info — right */}
            <div className="sm:w-[54%] p-6 sm:p-8 overflow-y-auto flex flex-col">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                {t.portfolio.categories[videoModal.category]}
              </span>
              <h3 className="text-white font-black text-2xl leading-tight mb-3">
                {videoModal.name}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4">
                {videoModal.tagline}
              </p>
              <p className="text-white/25 text-[11px] font-semibold tracking-wide uppercase mb-6">
                {videoModal.services}
              </p>

              {videoModal.instagram && (
                <a
                  href={videoModal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 text-white font-bold text-sm w-fit hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4 flex-shrink-0" />
                  {t.portfolio.instagramCta}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
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
                href="mailto:alhezarsgroup@gmail.com"
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
              Shahrazad Rent Home, 21 Zərifə Əliyeva, Bakı 1000, Azerbaycan
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
                Shahrazad Rent Home, 21 Zərifə Əliyeva, Bakı 1000, Azerbaycan
              </p>
              <p className="text-white/20 text-xs mt-0.5">{t.map.office}</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] h-[300px] sm:h-[380px]">
            <iframe
              src="https://maps.google.com/maps?q=Shahrazad%20Rent%20Home%2C%2021%20Z%C9%99rif%C9%99%20%C6%8Fliyeva%2C%20Baku%201000%2C%20Azerbaijan&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(1) invert(1) hue-rotate(180deg) brightness(0.75) contrast(0.88) saturate(0.9)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alhezars Group — Shahrazad Rent Home, Zərifə Əliyeva, Bakı"
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
          <p className="text-white/15 text-xs">Shahrazad Rent Home, 21 Zərifə Əliyeva, Bakı 1000, Azerbaycan</p>
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
        <Portfolio />
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
