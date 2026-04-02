import type { Locale, Translations } from './types';
import az from './az';

const translationModules: Record<Locale, () => Promise<{ default: Translations }>> = {
  az: () => Promise.resolve({ default: az }),
  tr: () => import('./tr'),
  en: () => import('./en'),
  ar: () => import('./ar'),
  ru: () => import('./ru'),
};

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'az', label: 'AZ' },
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'عربي' },
  { code: 'ru', label: 'RU' },
];

export const DEFAULT_LOCALE: Locale = 'az';

export async function loadTranslations(locale: Locale): Promise<Translations> {
  const mod = await translationModules[locale]();
  return mod.default;
}

export type { Locale, Translations };
export { az };
