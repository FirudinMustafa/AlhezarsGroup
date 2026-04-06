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
  contentCount: number;
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
    name: 'XS',
    subtitle: 'Başlanğıc',
    contentCount: 20,
    price: 1000,
    prices: { AZN: 1000, TRY: 26160, USD: 588 },
    popular: false,
    goldenFeatures: [],
    features: [
      '2 mobilograf çəkilişi',
      '10 story (manual)',
      '1 videoqraf çəkilişi',
      '2 qrafik dizayn post',
      '5 professional foto',
      'Targeting xidməti',
      'Sosial portfoliya nəzarət',
    ],
  },
  {
    name: 'S',
    subtitle: 'Böyümə',
    contentCount: 40,
    price: 1490,
    prices: { AZN: 1490, TRY: 39.000, USD: 876 },
    popular: false,
    goldenFeatures: [],
    features: [
      '5 mobilograf çəkilişi',
      '5 motion post',
      '13 story',
      '2 videoqraf xidməti',
      'Targeting',
      '5 qrafik dizayn post',
      '10 kamera ilə foto',
      'Kontent plan',
      'Logo dizayn',
      'Bioqrafiya & Highlights',
    ],
  },
  {
    name: 'M',
    subtitle: 'Ən Populyar',
    contentCount: 90,
    price: 1890,
    prices: { AZN: 1890, TRY: 49440, USD: 1112 },
    popular: true,
    goldenFeatures: ['2 AI video (Süni intellekt)', '1 Bloger çəkilişi'],
    features: [
      '10 mobilograf çəkilişi',
      '10 motion post',
      '33 story',
      '4 videoqraf xidməti',
      '2 AI video (Süni intellekt)',
      '1 Bloger çəkilişi',
      'Targeting',
      '10 qrafik dizayn post',
      'Kontent plan',
      'Logo dizayn',
      'Bioqrafiya & Highlights',
    ],
  },
  {
    name: 'L',
    subtitle: 'Professional',
    contentCount: 140,
    price: 3300,
    prices: { AZN: 3300, TRY: 86330, USD: 1941 },
    popular: false,
    goldenFeatures: ['3 AI video', '3 Bloger çəkilişi', 'Website dizayn'],
    features: [
      '15 mobilograf çəkilişi',
      '15 motion post',
      '47 story',
      '7 videoqraf xidməti',
      '3 AI video',
      '3 Bloger çəkilişi',
      'Targeting',
      '20 qrafik dizayn post',
      'Website dizayn',
      'Logo dizayn',
      'Bioqrafiya & Highlights',
    ],
  },
  {
    name: 'XL',
    subtitle: 'Korporativ',
    contentCount: 184,
    price: 5790,
    prices: { AZN: 5790, TRY: 151470, USD: 3406 },
    popular: false,
    goldenFeatures: [
      '5 AI video',
      '4 Bloger çəkilişi',
      'Website + SEO',
      'Event təşkili (50 nəfər)',
    ],
    features: [
      '20 mobilograf çəkilişi',
      '15 motion post',
      '60 story',
      '10 videoqraf çəkilişi',
      '5 AI video',
      '4 Bloger çəkilişi',
      'Targeting',
      '30 qrafik dizayn post',
      '40 professional foto',
      'Website + SEO',
      'Event təşkili (50 nəfər)',
      'Bioqrafiya & Highlights',
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
