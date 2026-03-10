'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useInView,
} from 'framer-motion';
import {
  ArrowRight,
  Menu,
  X,
  Globe,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    image: '/service-1.webp',
    title: 'Kontent İstehsalı',
    desc: 'Mobiloqraf, videoqraf, motion dizayn, professional foto — brendinizin hekayəsini vizual dillə anladırıq.',
  },
  {
    image: '/service-2.webp',
    title: 'Sosial Media',
    desc: 'Strateji kontent planlaması, targeting reklam, hesab idarəçiliyi — hədəf kütlənizə çatmaq üçün hər şey.',
  },
  {
    image: '/service-3.webp',
    title: 'Web & Brend',
    desc: 'Xüsusi UI/UX dizayn, e-ticarət sistemləri, logo yaradılması və tam korporativ brend kimliyi.',
  },
  {
    image: '/service-4.webp',
    title: 'SEO & Reklam',
    desc: 'Google Ads, Meta Ads, texniki SEO, backlink strategiyası — rəqəmsal görünürlüyünüzü maksimuma çatdırırıq.',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Kəşf & Müzakirə',
    desc: 'Brendinizi, hədəflərinizi və bazarınızı dərindən analiz edirik.',
  },
  {
    num: '02',
    title: 'Strategiya & Plan',
    desc: 'Rəqiblər analizi, hədəf kütlə tədqiqatı və fərdi kontent kalendarı.',
  },
  {
    num: '03',
    title: 'İstehsal & İcra',
    desc: 'Professional avadanlıq, kreativ komanda — hər kontent standartların üstündə.',
  },
  {
    num: '04',
    title: 'Ölçmə & Böyümə',
    desc: 'Analitika, hesabat, optimizasiya — davamlı inkişaf.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Leyla H.',
    role: 'Butik mağaza sahibəsi',
    text: 'M paketinə keçdikdən sonra 3 ay içərisində Instagram səhifəmizin izləyici sayı 3 dəfə artdı. Kontent keyfiyyəti gözləntilərimi üstələdi.',
  },
  {
    name: 'Rauf M.',
    role: 'Restoran sahibi',
    text: 'Hər ay 90 kontent vəd etdilər, verdilər də. Targeting ilə doğru auditoriyaya çatdıq — rezervasiyalar əhəmiyyətli dərəcədə artdı.',
  },
  {
    name: 'Nigar S.',
    role: 'Estetik klinika meneceri',
    text: 'Web dizayn layihəmiz 10 gün ərzində tamamlandı. Sayt həm görünüş, həm sürət baxımından əla — müştərilərimiz mütəmadi olaraq bəyənir.',
  },
  {
    name: 'Tural B.',
    role: 'İnşaat şirkəti direktoru',
    text: 'SEO xidməti sayəsində 4 ay içərisində Google-da üst sıralara çıxdıq. Organik müştəri sayımız 3 dəfə artdı.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Minimum müqavilə müddəti neçədir?',
    a: 'Heç bir minimum öhdəlik yoxdur. Bütün paketlər aylıq ödənişlidir — istəsəniz istənilən vaxt dayandıra bilərsiniz.',
  },
  {
    q: 'Reklam büdcəsi paketə daxildirmi?',
    a: 'Xeyr. Paket qiymətinə idarəetmə, kontent istehsalı və targeting xidməti daxildir. Reklam büdcəsi müştəri tərəfindən ayrıca qarşılanır.',
  },
  {
    q: 'Xidmətə nə tez başlaya bilərik?',
    a: 'İlk müzakirə görüşündən sonra 48 saat ərzində başlayırıq.',
  },
  {
    q: 'Nəticələri nə vaxt görəcəyik?',
    a: 'Sosial mediada 1-2 ay ərzində əhəmiyyətli artım müşahidə edilir. SEO xidmətlərində isə 3-6 ay ərzində nəticə görünür.',
  },
  {
    q: 'Paket ortasında dəyişdirmək mümkündür?',
    a: 'Bəli, istənilən vaxt paketi yuxarı və ya aşağı dəyişdirə bilərsiniz. Dəyişiklik növbəti ay üçün qüvvəyə minir.',
  },
  {
    q: 'Aylıq hesabat verirsinizmi?',
    a: 'Bəli. Hər ayın sonunda izləyici artımı, reach, engagement rate və əsas KPI-ları əks etdirən detallı analitika hesabatı göndərilir.',
  },
];

const ABOUT_HIGHLIGHTS = [
  {
    image: '/about-1.webp',
    title: 'Mobiloqraf & Videoqraf',
    desc: 'Ayda 2-dən 20-yə qədər çəkiliş — brendinizin vizual dilini biz qururuq',
  },
  {
    image: '/about-2.webp',
    title: 'AI Video',
    desc: 'Süni intellektlə hazırlanan kontent — rəqiblərinizdən bir addım öndə',
  },
  {
    image: '/about-3.webp',
    title: 'Targeting & Reklam',
    desc: 'Google, Meta — doğru adam, doğru vaxt, doğru mesaj',
  },
  {
    image: '/about-4.webp',
    title: 'Tam Brend Kimliyi',
    desc: 'Logo, sayt, rəng paleti — brendinizin hər tərəfi bir əldə',
  },
];

// ─────────────────────────────────────────────────────────────────
// UTILITIES
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

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
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

// ─────────────────────────────────────────────────────────────────
// LOGO PARTICLES (orijinal partikul.tsx ayarları, şekil: logo.png)
// ─────────────────────────────────────────────────────────────────

let logoShapePoints: [number, number, number, number, number][] | null = null;

function loadLogoShape(): Promise<[number, number, number, number, number][]> {
  if (logoShapePoints) return Promise.resolve(logoShapePoints);
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/logo.png";
    img.onload = () => {
      const S = 200;
      const off = document.createElement("canvas");
      off.width = S;
      off.height = S;
      const c = off.getContext("2d")!;
      c.drawImage(img, 0, 0, S, S);
      const d = c.getImageData(0, 0, S, S);
      const pts: [number, number, number, number, number][] = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4;
          if (d.data[i + 3] > 100) {
            pts.push([
              (x / S) * 34 - 17,
              (y / S) * 34 - 17,
              d.data[i],
              d.data[i + 1],
              d.data[i + 2],
            ]);
          }
        }
      }
      logoShapePoints = pts;
      resolve(pts);
    };
  });
}

function randomLogoPoint(pts: [number, number, number, number, number][]): [number, number, number, number, number] {
  return pts[Math.floor(Math.random() * pts.length)];
}

function LogoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;

    loadLogoShape().then((pts) => {
      if (cancelled) return;

      let W = 0, H = 0;
      const N = 4000;
      const px = new Float32Array(N);
      const py = new Float32Array(N);
      const vx = new Float32Array(N);
      const vy = new Float32Array(N);
      const tx = new Float32Array(N);
      const ty = new Float32Array(N);
      const sz = new Float32Array(N);
      const sp = new Float32Array(N);
      const dl = new Float32Array(N);
      const cr = new Uint8Array(N);
      const cg = new Uint8Array(N);
      const cb = new Uint8Array(N);
      let frame = 0;
      let mouseX = -9999, mouseY = -9999;

      function resize() {
        const parent = canvas!.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        W = Math.round(rect.width);
        H = Math.round(rect.height);
        canvas!.width = W;
        canvas!.height = H;
      }

      function calcTargets() {
        const s = Math.min(W, H) * 0.022;
        const cx = W / 2;
        const cy = H / 2;
        for (let i = 0; i < N; i++) {
          const pt = randomLogoPoint(pts);
          tx[i] = cx + pt[0] * s;
          ty[i] = cy + pt[1] * s;
          cr[i] = pt[2];
          cg[i] = pt[3];
          cb[i] = pt[4];
        }
      }

      function init() {
        resize();
        calcTargets();
        const cx = W / 2;
        const cy = H / 2;

        for (let i = 0; i < N; i++) {
          const ang = Math.random() * Math.PI * 2;
          const dist = Math.max(W, H) * 0.6 + Math.random() * 200;
          px[i] = cx + Math.cos(ang) * dist;
          py[i] = cy + Math.sin(ang) * dist;
          vx[i] = 0;
          vy[i] = 0;
          sz[i] = 0.3 + Math.random() * 0.6;
          sp[i] = 0.003 + Math.random() * 0.005;

          const distFromCenter = Math.sqrt((tx[i] - cx) ** 2 + (ty[i] - cy) ** 2);
          dl[i] = distFromCenter * 0.25 + Math.random() * 20;
        }
      }

      init();

      const handleResize = () => { init(); };
      window.addEventListener("resize", handleResize);

      const container = canvas.parentElement;
      const handleMouse = (e: MouseEvent) => {
        const rect = canvas!.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };
      const handleLeave = () => { mouseX = -9999; mouseY = -9999; };
      container?.addEventListener("mousemove", handleMouse);
      container?.addEventListener("mouseleave", handleLeave);

      const beatSpeed = 0.04;
      const beatAmount = 0.03;

      function animate() {
        if (cancelled) return;
        if (W === 0 || H === 0) { animRef.current = requestAnimationFrame(animate); return; }
        frame++;
        const beatSin = Math.sin(frame * beatSpeed);
        const beat = 1 + Math.abs(beatSin) * beatAmount;
        const glow = Math.abs(beatSin);
        const fade = 0.1 + glow * 0.06;

        ctx!.fillStyle = `rgba(0,0,0,${fade})`;
        ctx!.fillRect(0, 0, W, H);

        const imgData = ctx!.getImageData(0, 0, W, H);
        const data = imgData.data;
        const cx = W / 2;
        const cy = H / 2;

        for (let i = 0; i < N; i++) {
          if (frame < dl[i]) continue;

          const targetX = cx + (tx[i] - cx) * beat;
          const targetY = cy + (ty[i] - cy) * beat;
          const ddx = targetX - px[i];
          const ddy = targetY - py[i];
          vx[i] += ddx * sp[i];
          vy[i] += ddy * sp[i];

          const mdx = px[i] - mouseX;
          const mdy = py[i] - mouseY;
          const md2 = mdx * mdx + mdy * mdy;
          if (md2 < 10000 && md2 > 0) {
            const md = Math.sqrt(md2);
            const f = (100 - md) / 100 * 1.2;
            vx[i] += (mdx / md) * f;
            vy[i] += (mdy / md) * f;
          }

          vx[i] *= 0.94;
          vy[i] *= 0.94;
          px[i] += vx[i];
          py[i] += vy[i];

          const xi = ~~px[i];
          const yi = ~~py[i];
          if (xi < 1 || xi >= W - 1 || yi < 1 || yi >= H - 1) continue;

          const s = sz[i];
          const r = cr[i], g = cg[i], b = cb[i];

          if (s < 0.6) {
            const idx = (yi * W + xi) * 4;
            data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
          } else {
            const ri = Math.ceil(s);
            for (let oy = -ri; oy <= ri; oy++) {
              for (let ox = -ri; ox <= ri; ox++) {
                if (ox * ox + oy * oy > s * s + 0.5) continue;
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cleanup = () => {
        cancelAnimationFrame(animRef.current);
        window.removeEventListener("resize", handleResize);
        container?.removeEventListener("mousemove", handleMouse);
        container?.removeEventListener("mouseleave", handleLeave);
      };

      (canvas as unknown as Record<string, () => void>).__cleanup = cleanup;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animRef.current);
      const c = (canvas as unknown as Record<string, () => void>).__cleanup;
      if (c) c();
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
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
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'xidmetler', 'proses', 'haqqimizda', 'elaqe'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const links = [
    { label: 'Xidmətlər', href: '#xidmetler', section: 'xidmetler' },
    { label: 'Proses', href: '#proses', section: 'proses' },
    { label: 'Haqqımızda', href: '#haqqimizda', section: 'haqqimizda' },
  ];

  function linkColor(section: string) {
    const isActive = activeSection === section;
    if (scrolled) {
      return isActive ? 'text-[#1d1d1f]' : 'text-[#6e6e73] hover:text-[#1d1d1f]';
    }
    return isActive ? 'text-white' : 'text-white/50 hover:text-white';
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4">
      <nav
        className={`w-full max-w-[720px] transition-all duration-300 rounded-2xl backdrop-blur-2xl ${
          scrolled
            ? 'bg-black/[0.04]'
            : 'bg-white/[0.04]'
        }`}
      >
        <div className="px-5">
          <div className="flex items-center justify-between h-[48px]">
            <a href="#hero" className="flex items-center gap-2">
              <LogoMark width={24} height={24} />
              <span className={`text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${scrolled ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Alhezars
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              <div
                className="relative"
                onMouseEnter={() => setPkgOpen(true)}
                onMouseLeave={() => setPkgOpen(false)}
              >
                <button className={`flex items-center gap-1 text-[13px] transition-colors duration-200 ${scrolled ? 'text-[#6e6e73] hover:text-[#1d1d1f]' : 'text-white/50 hover:text-white'}`}>
                  Paketlər
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${pkgOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {pkgOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className="absolute top-[calc(100%+8px)] left-0 w-52 bg-white rounded-xl p-1.5 shadow-xl shadow-black/[0.1]"
                    >
                      <Link
                        href="/paketler/sosial-media"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f5f5f7] text-[#1d1d1f] transition-colors text-[13px]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                          <Instagram className="w-3.5 h-3.5 text-[#7c3aed]" />
                        </div>
                        <div>
                          <div className="font-medium text-[13px]">Sosial Media</div>
                          <div className="text-[11px] text-[#86868b]">5 paket</div>
                        </div>
                      </Link>
                      <Link
                        href="/paketler/web-dizayn"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f5f5f7] text-[#1d1d1f] transition-colors text-[13px]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                          <Globe className="w-3.5 h-3.5 text-[#7c3aed]" />
                        </div>
                        <div>
                          <div className="font-medium text-[13px]">Web Dizayn</div>
                          <div className="text-[11px] text-[#86868b]">4 paket</div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className={`text-[13px] transition-colors duration-200 ${linkColor(l.section)}`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <a
              href="#elaqe"
              className={`hidden md:inline-flex items-center gap-1.5 px-4 py-[6px] text-[12px] font-medium rounded-full transition-colors duration-200 ${scrolled ? 'bg-[#7c3aed] text-white hover:bg-[#6d28d9]' : 'bg-white/15 text-white hover:bg-white/25'}`}
            >
              Başlayaq
            </a>

            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-1.5 transition-colors ${scrolled ? 'text-[#6e6e73] hover:text-[#1d1d1f]' : 'text-white/60 hover:text-white'}`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-black/[0.04]"
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                <div>
                  <button
                    onClick={() => setMobilePkgOpen(!mobilePkgOpen)}
                    className="flex items-center justify-between w-full py-3 text-[15px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                  >
                    Paketlər
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePkgOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobilePkgOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <Link
                          href="/paketler/sosial-media"
                          onClick={() => setOpen(false)}
                          className="block py-2.5 pl-4 text-[15px] text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                        >
                          Sosial Media
                        </Link>
                        <Link
                          href="/paketler/web-dizayn"
                          onClick={() => setOpen(false)}
                          className="block py-2.5 pl-4 text-[15px] text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                        >
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
                    onClick={() => setOpen(false)}
                    className={`py-3 text-[15px] transition-colors ${activeSection === l.section ? 'text-[#1d1d1f] font-medium' : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}
                  >
                    {l.label}
                  </a>
                ))}

                <a
                  href="#elaqe"
                  onClick={() => setOpen(false)}
                  className="mt-3 block text-center py-3 text-[15px] font-medium bg-[#7c3aed] text-white rounded-full"
                >
                  Başlayaq
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-[52px] bg-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <LogoParticles />
      </div>
      <div className="relative z-10 max-w-[1120px] mx-auto px-6 text-center pt-[28vh] pb-32 pointer-events-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[13px] text-white/40 tracking-[0.08em] uppercase font-medium mb-6"
        >
          Bakıda rəqəmsal agentlik
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(40px,7vw,80px)] font-semibold tracking-[-0.03em] leading-[1.05] mb-8"
        >
          <span className="block text-white">
            Brendinizi rəqəmsal
          </span>
          <span className="block gradient-text-blue">
            dünyada zirvəyə çatdırırıq.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-xl mx-auto text-[17px] text-white/50 leading-relaxed mb-12"
        >
          Kontent istehsalından SEO-ya, web dizayndan reklam idarəçiliyinə —
          brendinizin rəqəmsal uğuru üçün tam həll paketləri.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center pointer-events-auto"
        >
          <a
            href="/paketler/sosial-media"
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors"
          >
            Paketlərə bax
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#elaqe"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium text-white/60 hover:text-white transition-colors"
          >
            Bizimlə əlaqə
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="xidmetler" className="py-32 bg-white">
      <div className="max-w-[1120px] mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-[13px] text-[#7c3aed] tracking-[0.08em] uppercase font-medium mb-4">
            Xidmətlər
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            Rəqəmsal uğurun{' '}
            <span className="gradient-text-blue">dörd sütunu</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.08}>
              <div className="rounded-2xl overflow-hidden h-[420px] flex flex-col group hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300">
                <div className="relative flex-1 min-h-0">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#f5f5f7] p-5 h-[148px] flex flex-col justify-center shrink-0">
                  <h3 className="text-[#1d1d1f] font-medium text-[16px] tracking-[-0.01em] mb-1.5">
                    {svc.title}
                  </h3>
                  <p className="text-[#6e6e73] text-[13px] leading-[1.55]">
                    {svc.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
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
    <section id="proses" className="py-32 bg-[#fbfbfd]">
      <div className="max-w-[1120px] mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-[13px] text-[#7c3aed] tracking-[0.08em] uppercase font-medium mb-4">
            Necə işləyirik
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            Sadə və{' '}
            <span className="gradient-text-blue">effektiv proses</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {PROCESS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="relative">
                <div className="text-[56px] font-semibold tracking-[-0.04em] leading-none mb-4 gradient-text-blue opacity-20">
                  {step.num}
                </div>
                <h3 className="text-[#1d1d1f] font-medium text-[16px] tracking-[-0.01em] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#6e6e73] text-[14px] leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
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
    <section id="testimonials" className="py-32 bg-white">
      <div className="max-w-[1120px] mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-[13px] text-[#7c3aed] tracking-[0.08em] uppercase font-medium mb-4">
            Müştəri rəyləri
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            Onlar danışır,{' '}
            <span className="gradient-text-blue">nəticə sübut edir</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="p-8 rounded-2xl bg-[#f5f5f7] h-full flex flex-col">
                <p className="text-[#424245] text-[15px] leading-[1.7] flex-1 mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-semibold text-white">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-[#1d1d1f] text-[14px] font-medium">{t.name}</div>
                    <div className="text-[#86868b] text-[12px]">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
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
    <section id="faq" className="py-32 bg-[#fbfbfd]">
      <div className="max-w-[640px] mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-[13px] text-[#7c3aed] tracking-[0.08em] uppercase font-medium mb-4">
            Sual-Cavab
          </p>
          <h2 className="text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em] text-[#1d1d1f] leading-tight">
            Tez-tez soruşulan suallar
          </h2>
        </FadeIn>

        <div className="divide-y divide-black/[0.06]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <FadeIn key={i} delay={i * 0.05}>
                <div>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="text-[#1d1d1f] font-medium text-[15px] pr-8 group-hover:text-[#7c3aed] transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868b] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#6e6e73] text-[14px] leading-[1.7] pb-5">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2} className="text-center mt-10">
          <p className="text-[#86868b] text-[14px]">
            Başqa sualınız var?{' '}
            <a href="#elaqe" className="text-[#7c3aed] hover:underline transition-colors">
              Bizimlə əlaqə saxlayın
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="haqqimizda" className="py-32 bg-white">
      <div className="max-w-[1120px] mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-[13px] text-[#7c3aed] tracking-[0.08em] uppercase font-medium mb-4">
            Haqqımızda
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-tight mb-6">
            Bakıdan dünyaya <span className="gradient-text-blue">rəqəmsal körpü</span>
          </h2>
          <p className="text-[#6e6e73] text-[17px] leading-[1.7] max-w-2xl mx-auto">
            <span className="text-[#1d1d1f] font-medium">Alhezars Group</span>{' '}
            2026-cı ildə Bakıda quruldu. Komandamızda mobiloqraf, videoqraf,
            dizayner, developer və targetoloq var — bütün işi özümüz görürük.
            Hər layihəyə fərdi baxış, hər ay ölçülə bilən nəticə.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { to: 5, suffix: '+', label: 'Paket Növü' },
            { to: 184, suffix: '', label: 'Max Kontent/ay' },
            { to: 100, suffix: '%', label: 'Müştəri Məmnunluğu' },
            { to: 4, suffix: '', label: 'Xidmət Sahəsi' },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div className="text-center p-8 rounded-2xl bg-[#f5f5f7]">
                <div className="text-[36px] font-semibold tracking-[-0.03em] text-[#1d1d1f] mb-1">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[13px] text-[#86868b]">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ABOUT_HIGHLIGHTS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="rounded-2xl overflow-hidden h-[380px] flex flex-col hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300">
                <div className="relative flex-1 min-h-0">
                  <Image src={item.image} alt={item.title} fill loading="lazy" className={`object-cover ${i === 0 ? 'scale-125' : ''}`} />
                </div>
                <div className="bg-[#f5f5f7] p-5 h-[133px] flex flex-col justify-center shrink-0">
                  <div className="text-[#1d1d1f] font-medium text-[15px] mb-1.5">{item.title}</div>
                  <div className="text-[#6e6e73] text-[13px] leading-[1.55]">{item.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-2 mt-12">
          {[
            'Kontent İstehsalı',
            'Sosial Media',
            'Web Dizayn',
            'SEO & Reklam',
            'Brend Kimliyi',
          ].map((tag) => (
            <span key={tag} className="px-4 py-2 text-[12px] font-medium text-[#6e6e73] bg-[#f5f5f7] rounded-full">
              {tag}
            </span>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// CONTACT
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
    'w-full bg-[#f5f5f7] border border-black/[0.06] rounded-xl px-4 py-3 text-[14px] text-[#1d1d1f] placeholder-[#aeaeb2] focus:outline-none focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 transition-all duration-200';

  return (
    <section id="elaqe" className="py-32 bg-[#fbfbfd]">
      <div className="max-w-[720px] mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-[13px] text-[#7c3aed] tracking-[0.08em] uppercase font-medium mb-4">
            Əlaqə
          </p>
          <h2 className="text-[clamp(32px,6vw,48px)] font-semibold tracking-[-0.03em] text-[#1d1d1f] mb-5 leading-tight">
            Brendiniz üçün{' '}
            <span className="gradient-text-blue">doğru paket</span>
            <br />
            sizi gözləyir
          </h2>
          <p className="text-[#6e6e73] text-[16px] leading-relaxed max-w-md mx-auto">
            Aşağıdakı formu doldurun və ya birbaşa əlaqə saxlayın.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href="https://wa.me/994552119406"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[15px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp ilə yazın
            </a>
            <a
              href="mailto:info@alhezars.com"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[15px] font-medium text-[#7c3aed] hover:bg-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-full transition-all"
            >
              <Mail className="w-4 h-4" />
              E-poçt göndərin
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-black/[0.06]" />
            <span className="text-[#aeaeb2] text-[12px] uppercase tracking-widest font-medium">və ya form doldurun</span>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#30d158]/10 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-[#30d158]" />
                </div>
                <h3 className="text-[#1d1d1f] font-semibold text-[22px] tracking-[-0.02em] mb-2">Müraciətiniz alındı</h3>
                <p className="text-[#6e6e73] text-[14px] max-w-sm">
                  Ən qısa zamanda sizinlə əlaqə saxlayacağıq.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[#7c3aed] text-[14px] hover:underline transition-colors"
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
                  <label className="block text-[#6e6e73] text-[12px] font-medium mb-2 tracking-wide">
                    Ad Soyad
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
                  <label className="block text-[#6e6e73] text-[12px] font-medium mb-2 tracking-wide">
                    Email
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
                  <label className="block text-[#6e6e73] text-[12px] font-medium mb-2 tracking-wide">
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
                  <label className="block text-[#6e6e73] text-[12px] font-medium mb-2 tracking-wide">
                    Maraq duyulan paket
                  </label>
                  <select
                    value={form.pkg}
                    onChange={(e) => setForm((f) => ({ ...f, pkg: e.target.value }))}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="">Seçin (istəyə bağlı)</option>
                    <optgroup label="Sosial Media">
                      <option value="XS">XS — 700 ₼/ay</option>
                      <option value="S">S — 1.290 ₼/ay</option>
                      <option value="M">M — 1.890 ₼/ay</option>
                      <option value="L">L — 3.300 ₼/ay</option>
                      <option value="XL">XL — 5.790 ₼/ay</option>
                    </optgroup>
                    <optgroup label="Web Dizayn">
                      <option value="Web Basic">Web Basic</option>
                      <option value="Web Orta">Web Orta</option>
                      <option value="Web Premium">Web Premium</option>
                      <option value="Web Premium Plus">Web Premium Plus</option>
                    </optgroup>
                    <option value="Fərdi">Fərdi təklif</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#6e6e73] text-[12px] font-medium mb-2 tracking-wide">
                    Mesaj
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Brendiniz, hədəfləriniz və ya suallarınız haqqında..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="sm:col-span-2 flex items-center gap-2 text-[#ff3b30] text-[13px]"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="sm:col-span-2 flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-medium bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Göndərilir...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Müraciət et
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────────────────────────

function MapSection() {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-[1120px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-5">
            <MapPin className="w-4 h-4 text-[#86868b] flex-shrink-0" />
            <div>
              <p className="text-[#424245] text-[14px] font-medium">
                CV46+XHM, 5 Nadir Əliyev, Bakı 1075
              </p>
              <p className="text-[#aeaeb2] text-[12px] mt-0.5">Azerbaycan</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.519469305576!2d49.8613062!3d40.4074623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d00606cd875%3A0x63faa7de0ab3bbe3!2sAlhezars%20Group!5e0!3m2!1str!2saz!4v1730820000000!5m2!1str!2saz"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(0.3) brightness(1.02) contrast(0.95)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alhezars Group - Bakı"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#f5f5f7] pt-16 pb-10">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <LogoMark width={28} height={28} />
              <span className="text-[15px] font-semibold text-[#1d1d1f] tracking-[-0.01em]">
                Alhezars
              </span>
            </div>
            <p className="text-[#6e6e73] text-[14px] leading-[1.7] max-w-xs">
              Bakıda bütün xidmətləri özündə cəmləşdirən agentlik. Brendinizin
              rəqəmsal gələcəyini birlikdə inşa edirik.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[#1d1d1f] text-[13px] font-medium mb-5 tracking-wide">Xidmətlər</h4>
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
                    className="text-[#86868b] hover:text-[#1d1d1f] text-[13px] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[#1d1d1f] text-[13px] font-medium mb-5 tracking-wide">Şirkət</h4>
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
                    className="text-[#86868b] hover:text-[#1d1d1f] text-[13px] transition-colors"
                  >
                    {item.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#aeaeb2] text-[12px]">
            &copy; {new Date().getFullYear()} Alhezars Group
          </p>
          <p className="text-[#aeaeb2] text-[12px]">
            Bakı, Azerbaycan
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-[#fbfbfd] min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <About />
      <Contact />
      <MapSection />
      <Footer />
    </main>
  );
}
