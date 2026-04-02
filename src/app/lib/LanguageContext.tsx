'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Locale, Translations } from './i18n/types';
import { az } from './i18n';
import { DEFAULT_LOCALE, loadTranslations } from './i18n';

type LanguageContextType = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  loading: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  t: az,
  setLocale: () => {},
  loading: false,
});

const STORAGE_KEY = 'alhezars_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [t, setT] = useState<Translations>(az);
  const [loading, setLoading] = useState(false);

  // Load saved locale on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && saved !== DEFAULT_LOCALE) {
      setLoading(true);
      loadTranslations(saved).then((translations) => {
        setLocaleState(saved);
        setT(translations);
        document.documentElement.lang = saved;
        document.documentElement.dir = translations.dir;
        setLoading(false);
      });
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    setLoading(true);
    loadTranslations(newLocale).then((translations) => {
      setLocaleState(newLocale);
      setT(translations);
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = translations.dir;
      setLoading(false);
    });
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
