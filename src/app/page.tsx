'use client';

import {
  useState,
  useEffect,
  useRef,
  type MouseEvent as RMouseEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion';
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
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICES = [
  {
    icon: Camera,
    title: 'Kontent İstehsalı',
    desc: 'Mobiloqraf, videoqraf, motion dizayn, professional foto — brendinizin hekayəsini vizual dillə anladırıq.',
    colorText: 'text-violet-400',
    colorBg: 'bg-violet-500/10',
  },
  {
    icon: Instagram,
    title: 'Sosial Media',
    desc: 'Strateji kontent planlaması, targeting reklam, hesab idarəçiliyi — hədəf kütlənizə çatmaq üçün hər şey.',
    colorText: 'text-fuchsia-400',
    colorBg: 'bg-fuchsia-500/10',
  },
  {
    icon: Globe,
    title: 'Web & Brend',
    desc: 'Xüsusi UI/UX dizayn, e-ticarət sistemləri, logo yaradılması və tam korporativ brend kimliyi.',
    colorText: 'text-blue-400',
    colorBg: 'bg-blue-500/10',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Reklam',
    desc: 'Google Ads, Meta Ads, texniki SEO, backlink strategiyası — rəqəmsal görünürlüyünüzü maksimuma çatdırırıq.',
    colorText: 'text-emerald-400',
    colorBg: 'bg-emerald-500/10',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Kəşf & Müzakirə',
    desc: 'Brendinizi, hədəflərinizi və bazarınızı dərindən analiz edirik. Fərdi yanaşma formalaşdırırıq.',
  },
  {
    num: '02',
    title: 'Strategiya & Plan',
    desc: 'Rəqiblər analizi, hədəf kütlə tədqiqatı və fərdi kontent kalendarı hazırlayırıq.',
  },
  {
    num: '03',
    title: 'İstehsal & İcra',
    desc: 'Professional avadanlıq, kreativ komanda — hər kontent standartların üstündə hazırlanır.',
  },
  {
    num: '04',
    title: 'Ölçmə & Böyümə',
    desc: 'Analitika, hesabat, optimizasiya — brendiniz davamlı olaraq inkişaf edir.',
  },
];

const MARQUEE_1 = [
  'Instagram', 'TikTok', 'YouTube', 'Google Ads',
  'Meta Ads', 'LinkedIn', 'Reels', 'Stories', 'Shorts',
];
const MARQUEE_2 = [
  'Web Dizayn', 'SEO', 'Brend Kimliyi', 'Video Prodakşn',
  'Motion Dizayn', 'Targetinq', 'E-ticarət', 'Mobiloqraf', 'AI Video',
];

const TESTIMONIALS = [
  {
    name: 'Leyla H.',
    role: 'Butik mağaza sahibəsi',
    initials: 'LH',
    color: 'from-violet-600 to-purple-800',
    stars: 5,
    text: 'M paketinə keçdikdən sonra 3 ay içərisində Instagram səhifəmizin izləyici sayı 3 dəfə artdı. Kontent keyfiyyəti gözləntilərimi üstələdi.',
  },
  {
    name: 'Rauf M.',
    role: 'Restoran sahibi',
    initials: 'RM',
    color: 'from-fuchsia-600 to-pink-800',
    stars: 5,
    text: 'Hər ay 90 kontent vəd etdilər, verdilər də. Targeting ilə doğru auditoriyaya çatdıq — rezervasiyalar əhəmiyyətli dərəcədə artdı.',
  },
  {
    name: 'Nigar S.',
    role: 'Estetik klinika meneceri',
    initials: 'NS',
    color: 'from-blue-600 to-indigo-800',
    stars: 5,
    text: 'Web dizayn layihəmiz 10 gün ərzində tamamlandı. Sayt həm görünüş, həm sürət baxımından əla — müştərilərimiz mütəmadi olaraq bəyənir.',
  },
  {
    name: 'Tural B.',
    role: 'İnşaat şirkəti direktoru',
    initials: 'TB',
    color: 'from-emerald-600 to-teal-800',
    stars: 5,
    text: 'SEO xidməti sayəsində 4 ay içərisində Google-da üst sıralara çıxdıq. Organik müştəri sayımız 3 dəfə artdı. Nəticə danışır.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Minimum müqavilə müddəti neçədir?',
    a: 'Heç bir minimum öhdəlik yoxdur. Bütün paketlər aylıq ödənişlidir — istəsəniz istənilən vaxt dayandıra bilərsiniz. Biz nəticə ilə sizi saxlamağa çalışırıq, şərt ilə yox.',
  },
  {
    q: 'Reklam büdcəsi paketə daxildirmi?',
    a: 'Xeyr. Paket qiymətinə idarəetmə, kontent istehsalı və targeting xidməti daxildir. Reklam üçün ayrılacaq büdcə (Google Ads, Meta Ads) müştəri tərəfindən ayrıca qarşılanır.',
  },
  {
    q: 'Xidmətə nə tez başlaya bilərik?',
    a: 'İlk müzakirə görüşündən sonra 48 saat ərzində başlayırıq. Görüşdə brendinizi tanıyır, hədəfləri müəyyənləşdiririk və kontent planını formalaşdırırıq.',
  },
  {
    q: 'Nəticələri nə vaxt görəcəyik?',
    a: 'Sosial mediada 1-2 ay ərzində əhəmiyyətli artım müşahidə edilir. SEO xidmətlərində isə axtarış motorlarının indeksləmə sürətindən asılı olaraq 3-6 ay ərzində nəticə görünür.',
  },
  {
    q: 'Paket ortasında dəyişdirmək mümkündür?',
    a: 'Bəli, istənilən vaxt paketi yuxarı və ya aşağı dəyişdirə bilərsiniz. Dəyişiklik növbəti ay üçün qüvvəyə minir. Fərqli ehtiyaclarınız olarsa, bizi birbaşa məlumatlandırın.',
  },
  {
    q: 'Aylıq hesabat verirsinizmi?',
    a: 'Bəli. Hər ayın sonunda izləyici artımı, reach, engagement rate, reklam nəticələri və əsas KPI-ları əks etdirən detallı analitika hesabatı göndərilir.',
  },
];

const NAV_SECTIONS = [
  { id: 'hero',         label: 'Ana səhifə' },
  { id: 'xidmetler',   label: 'Xidmətlər' },
  { id: 'proses',      label: 'Proses' },
  { id: 'testimonials',label: 'Rəylər' },
  { id: 'faq',         label: 'FAQ' },
  { id: 'haqqimizda',  label: 'Haqqımızda' },
  { id: 'elaqe',       label: 'Əlaqə' },
];

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

// Animated counter that counts up when scrolled into view
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

// Scroll-triggered fade-up wrapper
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

// Marquee row — double items for seamless loop
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
            <span className="w-1 h-1 rounded-full bg-purple-600/35 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Scroll progress bar at the very top
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background:
          'linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// SECTION INDICATOR (side nav dots)
// ─────────────────────────────────────────────────────────────────

function SectionIndicator() {
  const [active, setActive] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[80] hidden lg:flex flex-col items-end gap-3">
      {NAV_SECTIONS.map(({ id, label }) => (
        <div key={id} className="relative flex items-center gap-2 group">
          {/* Tooltip label */}
          <AnimatePresence>
            {hovered === id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-6 whitespace-nowrap text-[10px] font-semibold text-white/50 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/[0.07] pointer-events-none"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <motion.button
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            animate={
              active === id
                ? { scale: 1.6, backgroundColor: 'rgba(139,92,246,1)' }
                : { scale: 1, backgroundColor: 'rgba(255,255,255,0.15)' }
            }
            transition={{ duration: 0.25 }}
            className="w-1.5 h-1.5 rounded-full cursor-pointer"
            aria-label={label}
          />
        </div>
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
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88, rotate: 15 }}
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
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const name = 'ALHEZARS GROUP';

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-0 z-[200] bg-[#04040a] flex flex-col items-center justify-center"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[560px] h-[560px] rounded-full bg-purple-950/35 blur-[130px]" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-9 relative z-10"
      >
        <LogoMark width={76} height={76} />
      </motion.div>

      {/* Divider line — expands from center */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
        className="w-[200px] h-px bg-gradient-to-r from-transparent via-purple-500/55 to-transparent mb-8 relative z-10"
        style={{ transformOrigin: 'center' }}
      />

      {/* Company name — letters appear with stagger */}
      <div className="flex items-center relative z-10" style={{ gap: '0.06em' }}>
        {name.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: char === ' ' ? 0 : 1, y: 0 }}
            transition={{ delay: 0.52 + i * 0.05, duration: 0.38, ease: EASE }}
            className="text-[13px] font-black text-white/75 tracking-[0.38em]"
            style={{ display: 'inline-block', minWidth: char === ' ' ? '0.75em' : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="mt-4 text-[8px] text-white/20 uppercase tracking-[0.55em] relative z-10"
      >
        Rəqəmsal brendiniz üçün
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Xidmətlər', href: '#xidmetler' },
    { label: 'Proses', href: '#proses' },
    { label: 'Haqqımızda', href: '#haqqimizda' },
  ];

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
              onMouseEnter={() => setPkgOpen(true)}
              onMouseLeave={() => setPkgOpen(false)}
            >
              <button className="relative flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors duration-200">
                Paketlər
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${pkgOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {pkgOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-black/90 backdrop-blur-2xl border border-white/[0.07] rounded-xl overflow-hidden p-1.5 shadow-xl shadow-black/50"
                  >
                    <Link
                      href="/paketler/sosial-media"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] text-white/55 hover:text-white transition-colors text-sm"
                    >
                      <Instagram className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0" />
                      Sosial Media
                    </Link>
                    <Link
                      href="/paketler/web-dizayn"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] text-white/55 hover:text-white transition-colors text-sm"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      Web Dizayn
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((l) => (
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
          <MagneticButton>
            <motion.a
              href="#elaqe"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold bg-purple-700 hover:bg-purple-600 text-white rounded-full transition-colors duration-200 shadow-lg shadow-purple-900/30"
            >
              Başlayaq <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </MagneticButton>

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
              {/* Paketlər accordion */}
              <div>
                <motion.button
                  onClick={() => setMobilePkgOpen(!mobilePkgOpen)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.2 }}
                  className="flex items-center justify-between w-full py-3 text-sm text-white/55 hover:text-white border-b border-white/[0.04] transition-colors"
                >
                  Paketlər
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobilePkgOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                <AnimatePresence>
                  {mobilePkgOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Link
                        href="/paketler/sosial-media"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 py-2.5 pl-4 text-sm text-white/40 hover:text-white border-b border-white/[0.04] transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5 text-fuchsia-400" />
                        Sosial Media
                      </Link>
                      <Link
                        href="/paketler/web-dizayn"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 py-2.5 pl-4 text-sm text-white/40 hover:text-white border-b border-white/[0.04] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        Web Dizayn
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 1) * 0.06, duration: 0.2 }}
                  className="py-3 text-sm text-white/55 hover:text-white border-b border-white/[0.04] last:border-0 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#elaqe"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 block text-center py-3 text-sm font-bold bg-purple-700 text-white rounded-full"
              >
                Başlayaq
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax: content moves up slightly on scroll
  const contentY = useTransform(scrollY, [0, 600], [0, -80]);
  const opacityOnScroll = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse-tracking glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 20 });
  const glowLeft = useTransform(smoothX, [0, 1], ['0%', '90%']);
  const glowTop = useTransform(smoothY, [0, 1], ['0%', '90%']);

  function onMouseMove(e: RMouseEvent<HTMLElement>) {
    if (!heroRef.current) return;
    const { width, height, left, top } =
      heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  }

  // Word-by-word reveal
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
              transition={{
                delay: baseDelay + i * 0.1,
                duration: 0.65,
                ease: EASE,
              }}
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
      id="hero"
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Static ambient orbs */}
      <div className="absolute top-[10%] left-[5%] w-[700px] h-[700px] bg-purple-700/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[0%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Mouse-tracking glow */}
      <motion.div
        className="absolute w-[480px] h-[480px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"
        style={{ left: glowLeft, top: glowTop, translateX: '-50%', translateY: '-50%' }}
      />

      {/* Content with parallax */}
      <motion.div
        style={{ y: contentY, opacity: opacityOnScroll }}
        className="relative max-w-6xl mx-auto px-5 sm:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full uppercase tracking-wider"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-purple-400"
          />
          Bakıda bütün xidmətləri özündə cəmləşdirən agentlik
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(42px,8vw,88px)] font-black tracking-tight leading-[1.0] mb-3">
          <span className="block text-white">
            <WordReveal words={['Brendinizi', 'Rəqəmsal']} baseDelay={0.1} />
          </span>
          <span className="block bg-gradient-to-r from-purple-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            <WordReveal words={['Dünyada', 'Zirvəyə']} baseDelay={0.3} />
          </span>
          <span className="block text-white/85">
            <WordReveal words={['Çatdırırıq']} baseDelay={0.6} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: EASE }}
          className="max-w-2xl mx-auto text-[clamp(16px,2vw,20px)] text-white/35 mt-8 mb-10 leading-relaxed"
        >
          Kontent istehsalından SEO-ya, web dizayndan reklam idarəçiliyinə —{' '}
          <span className="text-white/55">
            brendinizin rəqəmsal uğuru üçün tam həll paketləri.
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
              href="/paketler/sosial-media"
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
              href="#elaqe"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-full transition-all"
            >
              Bizimlə əlaqə
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Stats with counter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-20 pt-10 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl mx-auto"
        >
          {[
            { to: 5, suffix: '+', label: 'Paket növü' },
            { to: 184, suffix: '', label: 'Max kontent/ay' },
            { to: 4, suffix: '', label: 'Xidmət sahəsi' },
            { to: 360, suffix: '°', label: 'Rəqəmsal həll' },
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE BAND
// ─────────────────────────────────────────────────────────────────

function MarqueeBand() {
  return (
    <div className="py-5 border-y border-white/[0.05] space-y-2.5 overflow-hidden">
      <MarqueeRow items={MARQUEE_1} speed={40} />
      <MarqueeRow items={MARQUEE_2} reverse speed={45} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="xidmetler" className="py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Xidmətlər
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            Rəqəmsal Uğurun
            <br />
            <span className="text-white/20">Dörd Sütunu</span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto leading-relaxed">
            Brendinizin rəqəmsal ekosistemini inşa etmək üçün lazım olan hər
            şey bir çatı altında.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, rotateX: -3, rotateY: 3 }}
                transition={{ duration: 0.25 }}
                style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                className="group h-full p-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-purple-500/25 hover:bg-white/[0.04] transition-colors duration-300 cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.2 }}
                  className={`w-11 h-11 ${svc.colorBg} rounded-xl flex items-center justify-center mb-5`}
                >
                  <svc.icon className={`w-5 h-5 ${svc.colorText}`} />
                </motion.div>
                <h3 className="text-white font-bold text-base mb-2.5">
                  {svc.title}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            </FadeUp>
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
  return (
    <section id="proses" className="py-28 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/6 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Necə İşləyirik
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            Sadə & Effektiv
            <br />
            <span className="text-white/20">İş Prosesi</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-purple-700/25 to-transparent pointer-events-none" />

          {PROCESS.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.12}>
              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Pulsing circle */}
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full border border-purple-500/20 bg-purple-500/5 flex items-center justify-center">
                    <span className="text-2xl font-black text-purple-400/50 select-none">
                      {step.num}
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.25, 0, 0.25],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full border border-purple-500/30"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.15, 0, 0.15],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.7 + 0.5,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full border border-purple-500/15"
                  />
                </div>
                <h3 className="text-white font-bold text-base mb-2.5">
                  {step.title}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeUp>
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
  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/6 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Müştəri Rəyləri
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            Onlar Danışır,
            <br />
            <span className="text-white/20">Nəticə Sübut Edir</span>
          </h2>
          <p className="text-white/30 max-w-md mx-auto leading-relaxed">
            Brendlər üçün dəyər yaradan hər layihə arxasında real nəticələr var.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.2)' }}
                transition={{ duration: 0.25 }}
                className="flex flex-col p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] cursor-default h-full"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <motion.div
                      key={si}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + si * 0.07, ease: EASE }}
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/40 text-[13px] leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[11px] font-black text-white">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold leading-none">{t.name}</div>
                    <div className="text-white/25 text-[11px] mt-0.5">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
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
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Tez-tez Soruşulan
          </p>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-5 leading-tight">
            Suallarınıza
            <br />
            <span className="text-white/20">Cavablarımız</span>
          </h2>
        </FadeUp>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <FadeUp key={i} delay={i * 0.07}>
                <motion.div
                  animate={{
                    borderColor: isOpen
                      ? 'rgba(139,92,246,0.3)'
                      : 'rgba(255,255,255,0.06)',
                    backgroundColor: isOpen
                      ? 'rgba(139,92,246,0.06)'
                      : 'rgba(255,255,255,0.025)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-white/80 font-semibold text-sm pr-4">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="faq-content"
                      >
                        <div className="px-5 pb-5">
                          <div className="w-full h-px bg-white/[0.06] mb-4" />
                          <p className="text-white/35 text-sm leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.3} className="text-center mt-10">
          <p className="text-white/20 text-sm">
            Başqa sualınız var?{' '}
            <a href="#elaqe" className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
              Bizimlə əlaqə saxlayın
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About() {
  const highlights = [
    { icon: '📸', title: 'Mobiloqraf & Videoqraf', desc: 'Ayda 2-dən 20-yə qədər çəkiliş — brendinizin vizual dilini biz qururuq' },
    { icon: '🤖', title: 'AI Video', desc: 'Süni intellektlə hazırlanan kontent — rəqiblərinizdən bir addım öndə' },
    { icon: '🎯', title: 'Targeting & Reklam', desc: 'Google, Meta — doğru adam, doğru vaxt, doğru mesaj' },
    { icon: '🌐', title: 'Tam Brend Kimliyi', desc: 'Logo, sayt, rəng paleti — brendinizin hər tərəfi bir əldə' },
    { icon: '🌟', title: 'İnfluencer Marketinq', desc: 'Brendinizi doğru blogerlərlə birləşdiririk — hədəf auditoriyaya daha sürətli çatırsınız' },
  ];

  return (
    <section id="haqqimizda" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <FadeUp>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">
              Haqqımızda
            </p>
            <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mb-7 leading-tight">
              Bakıdan Dünyaya
              <br />
              <span className="text-white/15">Rəqəmsal Körpü</span>
            </h2>

            <p className="text-white/40 leading-relaxed mb-5">
              <span className="text-white font-semibold">Alhezars Group</span>{' '}
              2026-cı ildə Bakıda quruldu. Komandamızda mobiloqraf, videoqraf,
              dizayner, developer və targetoloq var — bütün işi özümüz görürük,
              xarici tərəfdara vermədən.
            </p>
            <p className="text-white/30 leading-relaxed mb-8">
              Brendin rəqəmsal böyüməsi sifarişçi-icraçı münasibəti deyil —
              bu, ortaqlıqdır. Hər layihəyə fərdi baxış, hər ay ölçülə bilən
              nəticə. Rəqəmlər danışır, söz yox.
            </p>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {[
                'Kontent İstehsalı',
                'Sosial Media',
                'Web Dizayn',
                'SEO & Reklam',
                'Brend Kimliyi',
                'Event Təşkili',
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, ease: EASE }}
                  whileHover={{ scale: 1.07 }}
                  className="px-3 py-1.5 text-[11px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: 5, suffix: '+', label: 'Paket Növü' },
                { to: 184, suffix: '', label: 'Max Kontent/ay' },
                { to: 100, suffix: '%', label: 'Müştəri Məmnunluğu' },
                { to: 4, suffix: '', label: 'Xidmət Sahəsi' },
              ].map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.08}>
                  <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                    <div className="text-2xl font-black text-white">
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] text-white/25 mt-1">
                      {s.label}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* Right grid */}
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.25)' }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] cursor-default ${
                    i === highlights.length - 1 && highlights.length % 2 !== 0 ? 'col-span-2' : ''
                  }`}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-2xl mb-3"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-white font-bold text-sm mb-1">
                    {item.title}
                  </div>
                  <div className="text-white/30 text-xs leading-relaxed">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>
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
      if (!res.ok) throw new Error(data.error || 'Xəta baş verdi.');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', pkg: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Xəta baş verdi.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  const inputCls =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200';

  return (
    <section id="elaqe" className="py-28 relative overflow-hidden">
      {/* Pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-700 rounded-full blur-[220px] pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">
            Başlayaq
          </p>
          <h2 className="text-[clamp(32px,6vw,64px)] font-black text-white mb-6 leading-[1.05]">
            Brendiniz üçün
            <br />
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              doğru paket sizi gözləyir
            </motion.span>
          </h2>
          <p className="text-white/30 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Aşağıdakı formu doldurun və ya birbaşa əlaqə saxlayın.
          </p>

          {/* Quick contact buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
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
        </FadeUp>

        {/* Divider */}
        <FadeUp delay={0.1}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-white/20 text-xs uppercase tracking-widest font-semibold">və ya form doldurun</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
        </FadeUp>

        {/* Contact Form */}
        <FadeUp delay={0.15}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-5"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h3 className="text-white font-black text-2xl mb-2">Müraciətiniz alındı!</h3>
                <p className="text-white/35 text-sm max-w-sm">
                  Ən qısa zamanda sizinlə əlaqə saxlayacağıq. WhatsApp-dan da yaza bilərsiniz.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-purple-400 text-sm hover:text-purple-300 transition-colors underline underline-offset-2"
                >
                  Yenidən müraciət et
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Email *
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
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+994 XX XXX XX XX"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Maraq duyulan paket
                  </label>
                  <select
                    value={form.pkg}
                    onChange={(e) => setForm((f) => ({ ...f, pkg: e.target.value }))}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" className="bg-[#0a0a14]">Seçin (istəyə bağlı)</option>
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
                    <option value="Fərdi" className="bg-[#0a0a14]">Fərdi təklif</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-white/40 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Mesaj *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Brendiniz, hədəfləriniz və ya suallarınız haqqında qısa məlumat verin..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="sm:col-span-2 flex items-center gap-2 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                  <p className="text-white/15 text-xs">
                    * Mütləq sahələr
                  </p>
                  <MagneticButton>
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { scale: 1.04 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                      className="flex items-center gap-2 px-8 py-3.5 text-sm font-black bg-purple-700 hover:bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full shadow-xl shadow-purple-900/30 transition-colors"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Göndərilir...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Müraciət et
                        </>
                      )}
                    </motion.button>
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>

        {/* Address */}
        <FadeUp delay={0.2} className="mt-12">
          <div className="flex items-center justify-center gap-6 text-white/20 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600/50" />
              Nərimanov r., Nadir Əliyev 5, Bakı
            </span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>www.alhezars.com</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAP SECTION
// ─────────────────────────────────────────────────────────────────

function MapSection() {
  return (
    <section className="pb-16 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp>
          <div className="flex items-center gap-3 mb-5">
            <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div>
              <p className="text-white/55 text-sm font-semibold">
                Bakı şəhəri, Nərimanov rayonu, Nadir Əliyev 5
              </p>
              <p className="text-white/20 text-xs mt-0.5">Ofisimiz burada yerləşir</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] h-[300px] sm:h-[380px]">
            <iframe
              src="https://maps.google.com/maps?q=Narimanov+district+Baku+Azerbaijan+Nadir+Aliyev&z=15&output=embed"
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
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

function Footer() {
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
              Bakıda bütün xidmətləri özündə cəmləşdirən agentlik. Brendinizin rəqəmsal
              gələcəyini birlikdə inşa edirik.
            </p>
            <p className="text-white/12 text-xs mt-4">www.alhezars.com</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-sm font-bold mb-5">Xidmətlər</h4>
            <ul className="space-y-3">
              {[
                'Kontent İstehsalı',
                'Sosial Media',
                'Web Dizayn',
                'SEO & Reklam',
              ].map((l) => (
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
            <h4 className="text-white text-sm font-bold mb-5">Şirkət</h4>
            <ul className="space-y-3">
              {[
                { l: 'Haqqımızda', h: '#haqqimizda' },
                { l: 'Paketlər', h: '/paketler/sosial-media' },
                { l: 'Proses', h: '#proses' },
                { l: 'Əlaqə', h: '#elaqe' },
              ].map((item) => (
                <li key={item.l}>
                  <a
                    href={item.h}
                    className="text-white/25 hover:text-white/55 text-sm transition-colors"
                  >
                    {item.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/15 text-xs">
            © {new Date().getFullYear()} Alhezars Group. Bütün hüquqlar
            qorunur.
          </p>
          <p className="text-white/15 text-xs">Nərimanov r., Nadir Əliyev 5, Bakı</p>
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

  // Lenis smooth scroll
  useEffect(() => {
    // Prevent scroll during loading
    if (!loaded) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = new (Lenis as any)({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen
            key="loading"
            onDone={() => setLoaded(true)}
          />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-[#04040a] min-h-screen"
      >
        <ProgressBar />
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
      </motion.main>
    </>
  );
}
