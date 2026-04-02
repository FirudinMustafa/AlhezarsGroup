'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import type { CurrencyKey } from '../lib/packages';
import { CURRENCY_SYMBOLS } from '../lib/packages';
import { useLanguage } from '../lib/LanguageContext';

/* ── Types ── */
type Prices = Record<CurrencyKey, number>;
type CardData = {
  name: string;
  subtitle: string;
  popular: boolean;
  goldenFeatures: string[];
  features: string[];
  prices?: Prices;
  contentCount?: number;
};
type Props = {
  packages: CardData[];
  showPrice?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
};

const CURRENCIES: CurrencyKey[] = ['AZN', 'TRY', 'USD'];
const AUTO_SPEED = 0.15;
const EASE = 0.08;

export default function PackageCarousel({
  packages,
  showPrice = false,
  ctaLabel = 'Başlayaq',
  ctaLink = 'https://wa.me/994552119406',
}: Props) {
  const count = packages.length;
  const anglePerItem = 360 / count;
  const popularIdx = packages.findIndex((p) => p.popular);
  const initialIdx = popularIdx !== -1 ? popularIdx : 0;

  const { t } = useLanguage();
  const [active, setActive] = useState(initialIdx);
  const [currency, setCurrency] = useState<CurrencyKey>('AZN');

  /* ── Refs ── */
  const carouselRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentAngle = useRef(-(initialIdx * anglePerItem));
  const targetAngle = useRef(-(initialIdx * anglePerItem));
  const activeIdx = useRef(initialIdx);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const isPaused = useRef(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const rafId = useRef(0);

  /* ── CSS variable radius ── */
  const getRadius = useCallback(() => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--carousel-radius')
      .trim();
    return parseFloat(raw) || 440;
  }, []);

  /* ── Price formatting ── */
  const fmtPrice = (prices: Prices) => ({
    val: prices[currency].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    sym: CURRENCY_SYMBOLS[currency],
  });

  /* ── Snap to nearest card ── */
  const snapToNearest = useCallback(() => {
    const cur = currentAngle.current;
    const norm = ((-cur % 360) + 360) % 360;
    const nearest = Math.round(norm / anglePerItem) * anglePerItem;
    const base = Math.floor(-cur / 360) * 360;
    targetAngle.current = -(base + nearest);
  }, [anglePerItem]);

  /* ── Rotate to specific index (pause 5s then resume) ── */
  const rotateTo = useCallback(
    (index: number) => {
      const target = -(index * anglePerItem);
      const cur = currentAngle.current;
      let diff = target - cur;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      targetAngle.current = cur + diff;
      activeIdx.current = ((index % count) + count) % count;
      setActive(activeIdx.current);

      isPaused.current = true;
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => {
        isPaused.current = false;
      }, 5000);
    },
    [anglePerItem, count],
  );

  /* ── Animation loop ── */
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const render = () => {
      const radius = getRadius();

      if (!isDragging.current) {
        /* Always auto-spin — pause on hover or after button click */
        if (!isHovering.current && !isPaused.current) {
          targetAngle.current -= AUTO_SPEED;
        }
        currentAngle.current += (targetAngle.current - currentAngle.current) * EASE;
      }

      carousel.style.transform = `rotateY(${currentAngle.current}deg)`;

      /* Active index */
      const norm = (((-currentAngle.current) % 360) + 360) % 360;
      const idx = Math.round(norm / anglePerItem) % count;
      if (idx !== activeIdx.current) {
        activeIdx.current = idx;
        setActive(idx);
      }

      /* Per-item brightness + scale */
      for (let i = 0; i < count; i++) {
        const item = itemRefs.current[i];
        if (!item) continue;
        const itemAngle = ((anglePerItem * i + currentAngle.current) % 360 + 360) % 360;
        const diff = Math.min(itemAngle, 360 - itemAngle);
        const brightness = 0.45 + 0.55 * (1 - diff / 180);
        const scale = 0.82 + 0.18 * (1 - diff / 180);
        item.style.transform = `rotateY(${anglePerItem * i}deg) translateZ(${radius}px) scale(${scale.toFixed(3)})`;
        item.style.filter = `brightness(${brightness.toFixed(3)})`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId.current);
  }, [count, anglePerItem, getRadius]);

  /* ── Mouse & touch ── */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartAngle.current = currentAngle.current;
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStartX.current;
      currentAngle.current = dragStartAngle.current + dx * 0.4;
      targetAngle.current = currentAngle.current;
    };
    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      snapToNearest();
    };
    const onMouseEnter = () => {
      isHovering.current = true;
    };
    const onMouseLeave = () => {
      isHovering.current = false;
      if (isDragging.current) {
        isDragging.current = false;
      }
      snapToNearest();
    };

    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      dragStartAngle.current = currentAngle.current;
      isDragging.current = true;
      isHovering.current = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - touchStartX;
      currentAngle.current = dragStartAngle.current + dx * 0.4;
      targetAngle.current = currentAngle.current;
    };
    const onTouchEnd = () => {
      isDragging.current = false;
      isHovering.current = false;
      snapToNearest();
    };

    scene.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    scene.addEventListener('mouseenter', onMouseEnter);
    scene.addEventListener('mouseleave', onMouseLeave);
    scene.addEventListener('touchstart', onTouchStart, { passive: true });
    scene.addEventListener('touchmove', onTouchMove, { passive: true });
    scene.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      scene.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      scene.removeEventListener('mouseenter', onMouseEnter);
      scene.removeEventListener('mouseleave', onMouseLeave);
      scene.removeEventListener('touchstart', onTouchStart);
      scene.removeEventListener('touchmove', onTouchMove);
      scene.removeEventListener('touchend', onTouchEnd);
    };
  }, [snapToNearest]);

  /* ── Initial style (no FOUC) ── */
  const getInitialStyle = (i: number) => {
    const initAngle = -(initialIdx * anglePerItem);
    const itemAngle = ((anglePerItem * i + initAngle) % 360 + 360) % 360;
    const diff = Math.min(itemAngle, 360 - itemAngle);
    const brightness = 0.45 + 0.55 * (1 - diff / 180);
    const scale = 0.82 + 0.18 * (1 - diff / 180);
    return {
      transform: `rotateY(${anglePerItem * i}deg) translateZ(var(--carousel-radius, 440px)) scale(${scale.toFixed(3)})`,
      filter: `brightness(${brightness.toFixed(3)})`,
    };
  };

  /* ── Card renderer ── */
  const renderCard = (pkg: CardData, i: number) => {
    const isPop = pkg.popular;
    return (
      <div
        key={pkg.name}
        className="carousel-item"
        ref={(el) => { itemRefs.current[i] = el; }}
        style={getInitialStyle(i)}
      >
        <div className={`card ${isPop ? 'card-purple' : 'card-dark'}`}>
          {isPop && (
            <div className="featured-badge">
              <Sparkles className="w-3 h-3" /> {t.carousel.popular}
            </div>
          )}
          <h2 className={`card-title ${isPop ? 'white-title' : 'blue-title'}`}>
            {pkg.name}
          </h2>
          <p className="card-subtitle">{pkg.subtitle}</p>
          {pkg.contentCount !== undefined && (
            <p className="card-content-count">{pkg.contentCount} {t.carousel.contentPerMonth}</p>
          )}
          <ul className={`features-list ${isPop ? 'features-bold' : ''}`}>
            {pkg.features.map((f) => {
              const gold = pkg.goldenFeatures.includes(f);
              return (
                <li key={f} className={gold ? 'feature-gold' : ''}>
                  {f}
                </li>
              );
            })}
          </ul>
          {showPrice && pkg.prices ? (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`price-btn ${isPop ? 'white-btn' : 'dark-btn'}`}
            >
              <span className={isPop ? 'purple-currency' : 'currency'}>
                {fmtPrice(pkg.prices).sym}
              </span>
              <span className={isPop ? 'purple-price' : 'price-num'}>
                {fmtPrice(pkg.prices).val}
              </span>
              <span className={isPop ? 'purple-period' : 'period'}>{t.carousel.perMonth}</span>
            </a>
          ) : (
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`price-btn ${isPop ? 'white-btn' : 'dark-btn'}`}
            >
              <span className={isPop ? 'purple-price' : 'price-num'}>
                {ctaLabel}
              </span>
            </a>
          )}
          <div className={`card-glow ${isPop ? 'glow-purple' : 'glow-blue'}`} />
        </div>
      </div>
    );
  };

  /* ── Currency Switcher ── */
  const currencySwitcher = showPrice && (
    <div className="currency-switcher">
      <div className="currency-pill">
        {CURRENCIES.map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`curr-btn ${currency === c ? 'curr-btn--active' : ''}`}
          >
            {CURRENCY_SYMBOLS[c]} {c}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pricing-section">
      {/* Background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {currencySwitcher}

      <div className="carousel-wrapper">
        {/* 3D Scene */}
        <div className="carousel-scene" ref={sceneRef}>
          <div
            className="carousel"
            ref={carouselRef}
            style={{ transform: `rotateY(${-(initialIdx * anglePerItem)}deg)` }}
          >
            {packages.map((pkg, i) => renderCard(pkg, i))}
          </div>
        </div>

        {/* Arrows */}
        <button
          className="arrow-btn arrow-prev"
          onClick={() => rotateTo((active - 1 + count) % count)}
          aria-label={t.carousel.prev}
        >
          &#8592;
        </button>
        <button
          className="arrow-btn arrow-next"
          onClick={() => rotateTo((active + 1) % count)}
          aria-label={t.carousel.next}
        >
          &#8594;
        </button>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {packages.map((_, i) => (
          <button
            key={i}
            onClick={() => rotateTo(i)}
            className={`dot ${i === active ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Name pills */}
      <div className="carousel-pills">
        {packages.map((p, i) => (
          <button
            key={p.name}
            onClick={() => rotateTo(i)}
            className={`pill ${i === active ? 'pill--active' : ''}`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
