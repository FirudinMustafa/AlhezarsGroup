'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { LOCALES } from '../lib/i18n';

export default function LanguageSwitcher({
  className = '',
  variant = 'dropdown',
}: {
  className?: string;
  variant?: 'dropdown' | 'inline';
}) {
  const { locale, setLocale, loading } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === locale)!;

  useEffect(() => {
    if (variant === 'inline') return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [variant]);

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {LOCALES.map((l) => (
          <button
            key={l.code}
            onClick={() => setLocale(l.code)}
            disabled={loading}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              locale === l.code
                ? 'bg-purple-600 text-white'
                : 'bg-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.1]'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1.5 text-[12px] font-medium text-white/50 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
        disabled={loading}
      >
        {current.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-28 bg-black/90 backdrop-blur-2xl border border-white/[0.07] rounded-xl overflow-hidden p-1 shadow-xl shadow-black/50 z-[100]">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-[13px] transition-colors ${
                locale === l.code
                  ? 'text-white font-medium bg-white/[0.06]'
                  : 'text-white/45 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
