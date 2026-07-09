export type CurrencyKey = 'AZN' | 'TRY' | 'USD';

export type Prices = Record<CurrencyKey, number>;

export const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  AZN: '₼',
  TRY: '₺',
  USD: '$',
};

export type SocialPackage = {
  name: string;
  subtitle: string;
  contentCount?: number;
  price: number;
  prices: Prices;
  popular: boolean;
  goldenFeatures: string[];
  features: string[];
};

export type WebPackage = {
  name: string;
  subtitle: string;
  popular: boolean;
  goldenFeatures: string[];
  features: string[];
  prices?: Prices;
};

export const SOCIAL_PACKAGES: SocialPackage[] = [
  {
    name: 'Start',
    subtitle: 'Başlanğıc',
    price: 600,
    prices: { AZN: 600, TRY: 15696, USD: 353 },
    popular: false,
    goldenFeatures: [],
    features: [
      'Sosial Media Menecmenti',
      '8 Qrafik dizayn postu',
      '4 Mobiloqrafiya çəkilişi',
      'Aylıq kontent planı',
      'Aylıq hesabat',
    ],
  },
  {
    name: 'Ekonom',
    subtitle: 'Sərfəli',
    price: 800,
    prices: { AZN: 800, TRY: 20928, USD: 470 },
    popular: false,
    goldenFeatures: ['2 Videoqraf çəkilişi', 'Rəqib analizi'],
    features: [
      'Sosial Media Menecmenti',
      '12 Qrafik dizayn postu',
      '5 Mobiloqrafiya çəkilişi',
      '2 Videoqraf çəkilişi',
      'Aylıq kontent planı',
      'Rəqib analizi',
      'Aylıq hesabat və analiz',
      'Highlight dizaynı',
      'Bioqrafiya tənzimlənməsi',
    ],
  },
  {
    name: 'Professional',
    subtitle: 'Ən Populyar',
    price: 1100,
    prices: { AZN: 1100, TRY: 28776, USD: 647 },
    popular: true,
    goldenFeatures: ['Targetinq xidməti', '1 AI video hazırlanması'],
    features: [
      'Sosial Media Menecmenti',
      '14 Qrafik dizayn postu',
      '10 Story',
      '4 Mobiloqrafiya çəkilişi',
      '4 Videoqrafiya çəkilişi',
      'Targetinq xidməti',
      '1 AI video hazırlanması',
      'Kontent planı',
      'Rəqib analizi',
      'Aylıq hesabat və analiz',
      'Highlight dizaynı',
      'Bioqrafiya tənzimlənməsi',
    ],
  },
  {
    name: 'Premium',
    subtitle: 'Geniş',
    price: 2200,
    prices: { AZN: 2200, TRY: 57552, USD: 1294 },
    popular: false,
    goldenFeatures: [
      '2 Influencer menecment',
      '2 AI video hazırlanması',
      'Korporativ tədbir təşkilatçılıqı',
    ],
    features: [
      'Sosial Media Menecmenti',
      '16 Qrafik dizayn postu',
      '5 Motion dizayn postu',
      '10 Story',
      '6 Mobiloqrafiya çəkilişi',
      '4 Videoqrafiya çəkilişi',
      'Targetinq xidməti',
      '2 Influencer menecment',
      '2 AI video hazırlanması',
      'Korporativ tədbir təşkilatçılıqı',
      'Kontent planı',
      'Rəqib analizi',
      'Aylıq hesabat və analiz',
      'Highlight dizaynı',
      'Bioqrafiya tənzimlənməsi',
    ],
  },
  {
    name: 'Elite',
    subtitle: 'Korporativ',
    price: 3390,
    prices: { AZN: 3390, TRY: 88682, USD: 1993 },
    popular: false,
    goldenFeatures: [
      '4 Influencer menecment',
      '3 AI video hazırlanması',
      'Veb-sayt dizaynı',
      'Logo dizaynı',
    ],
    features: [
      'Sosial Media Menecmenti',
      '18 Qrafik dizayn postu',
      '8 Motion dizayn postu',
      '15 Story',
      '3 Mobiloqrafiya çəkilişi',
      '10 Videoqrafiya çəkilişi',
      'Targetinq xidməti',
      '4 Influencer menecment',
      '3 AI video hazırlanması',
      'Veb-sayt dizaynı',
      'Logo dizaynı',
      'Korporativ tədbir təşkilatçılıqı',
      'Kontent planı',
      'Rəqib analizi',
      'Aylıq hesabat və analiz',
      'Highlight dizaynı',
      'Bioqrafiya tənzimlənməsi',
    ],
  },
  {
    name: 'Premium Pro',
    subtitle: 'Tam Ekosistem',
    price: 5790,
    prices: { AZN: 5790, TRY: 151466, USD: 3405 },
    popular: false,
    goldenFeatures: [
      '6 Influencer menecment',
      '5 AI video hazırlanması',
      'Veb-sayt dizaynı',
      'Brendbook hazırlanması',
      'Premium dəstək xidməti',
      'Şəxsi brendinq konsultasiyası',
    ],
    features: [
      'Sosial Media Menecmenti',
      '22 Qrafik dizayn postu',
      '10 Motion dizayn postu',
      '30 Story',
      '5 Mobiloqrafiya çəkilişi',
      '12 Videoqrafiya çəkilişi',
      'Targetinq xidməti',
      '6 Influencer menecment',
      '5 AI video hazırlanması',
      'Veb-sayt dizaynı',
      'Logo dizaynı',
      'Korporativ tədbir təşkilatçılıqı',
      'Kontent planı',
      'Rəqib analizi',
      'Aylıq hesabat və analiz',
      'Highlight dizaynı',
      'Bioqrafiya tənzimlənməsi',
      'Brendbook hazırlanması',
      'Premium dəstək xidməti',
      'Şəxsi brendinq konsultasiyası',
    ],
  },
];

export const WEB_PACKAGES: WebPackage[] = [
  {
    name: 'Basic',
    subtitle: 'Rəqəmsal Başlanğıc',
    popular: false,
    goldenFeatures: [],
    features: [
      '5 səhifəlik korporativ sayt',
      'Mobil uyğun dizayn',
      '2 dil dəstəyi',
      'Domain + Hosting (1 il)',
      'SSL sertifikatı',
      'WhatsApp & Google Maps',
      'Əsas SEO qurulumu',
      'Google Analytics 4',
      '1 ay texniki dəstək',
    ],
  },
  {
    name: 'Orta',
    subtitle: 'Görünürlük & Etibar',
    popular: true,
    goldenFeatures: [
      'Logo + rəng + tipoqrafiya',
      'Google & Meta Ads',
      '1 aylıq reklam idarəçiliyi',
    ],
    features: [
      'Basic + hər şey',
      '10 səhifəlik xüsusi dizayn',
      '3 dil dəstəyi',
      'Admin panel & Blog',
      'Logo + rəng + tipoqrafiya',
      'On-Page SEO',
      '4 SEO blog məqaləsi',
      'Google & Meta Ads',
      '1 aylıq reklam idarəçiliyi',
      '2 ay texniki dəstək',
    ],
  },
  {
    name: 'Premium',
    subtitle: 'Rəqəmsal Böyümə',
    popular: false,
    goldenFeatures: [
      'Chatbot inteqrasiyası',
      'CRO & Funnel sistemi',
      'CRM inteqrasiyası',
    ],
    features: [
      'Orta + hər şey',
      '20 səhifə UI/UX dizayn',
      '5 dil dəstəyi',
      'Chatbot inteqrasiyası',
      '50 məhsullu e-ticarət',
      'Tam brend kimliyi',
      '8 SEO məqaləsi',
      'CRO & Funnel sistemi',
      'CRM inteqrasiyası',
      '3 ay texniki dəstək',
    ],
  },
  {
    name: 'Premium Plus',
    subtitle: 'Rəqəmsal Ekosistem',
    popular: false,
    goldenFeatures: [
      'Brand book & guideline',
      '360° SEO strategiyası',
      'A/B test sistemi',
      'Aylıq C-Level hesabat',
    ],
    features: [
      'Premium + hər şey',
      'Xüsusi yazılım & veb',
      'ERP/CRM inteqrasiyası',
      'Brand book & guideline',
      '360° SEO strategiyası',
      'Multi-kanal reklam',
      'A/B test sistemi',
      'Satış dashboard',
      'Aylıq C-Level hesabat',
      '6 ay texniki dəstək',
    ],
  },
];
