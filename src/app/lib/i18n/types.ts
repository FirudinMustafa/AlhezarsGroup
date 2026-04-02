export type Locale = 'az' | 'tr' | 'en' | 'ar' | 'ru';

export type Translations = {
  dir: 'ltr' | 'rtl';

  nav: {
    packages: string;
    socialMedia: string;
    webDesign: string;
    services: string;
    process: string;
    about: string;
    getStarted: string;
    closeMenu: string;
    openMenu: string;
  };

  loading: {
    tagline: string;
  };

  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle1: string;
    subtitle2: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { suffix: string; label: string }[];
  };

  marquee2: string[];

  services: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    items: { title: string; desc: string }[];
  };

  process: {
    badge: string;
    title1: string;
    title2: string;
    steps: { title: string; desc: string }[];
  };

  testimonials: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    items: { name: string; role: string; initials: string; text: string }[];
  };

  faq: {
    badge: string;
    title1: string;
    title2: string;
    moreQuestions: string;
    contactUs: string;
    items: { q: string; a: string }[];
  };

  about: {
    badge: string;
    title1: string;
    title2: string;
    desc1: string;
    desc2: string;
    tags: string[];
    stats: { suffix: string; label: string }[];
    highlights: { icon: string; title: string; desc: string }[];
  };

  contact: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    whatsapp: string;
    emailBtn: string;
    divider: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    phone: string;
    phonePlaceholder: string;
    packageLabel: string;
    packagePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    required: string;
    submit: string;
    sending: string;
    customOffer: string;
    successTitle: string;
    successDesc: string;
    successAgain: string;
    errorDefault: string;
    address: string;
  };

  map: {
    office: string;
  };

  footer: {
    desc: string;
    servicesTitle: string;
    servicesList: string[];
    companyTitle: string;
    companyLinks: { label: string; href: string }[];
    rights: string;
  };

  packagePage: {
    socialMedia: {
      badge: string;
      title: string;
      titleHighlight: string;
      desc: string;
      ctaPrimary: string;
      ctaSecondary: string;
      selectTitle: string;
      selectHighlight: string;
      selectDesc: string;
      note: string;
      bottomTitle: string;
      bottomHighlight: string;
      bottomDesc: string;
      whatsapp: string;
      emailBtn: string;
    };
    webDesign: {
      badge: string;
      title: string;
      titleHighlight: string;
      desc: string;
      ctaPrimary: string;
      ctaSecondary: string;
      selectTitle: string;
      selectHighlight: string;
      selectDesc: string;
      note: string;
      bottomTitle: string;
      bottomHighlight: string;
      bottomDesc: string;
      whatsapp: string;
      emailBtn: string;
    };
  };

  socialPackages: {
    subtitles: string[];
    features: string[][];
    goldenFeatures: string[][];
  };

  webPackages: {
    names: string[];
    subtitles: string[];
    features: string[][];
    goldenFeatures: string[][];
  };

  carousel: {
    contentPerMonth: string;
    perMonth: string;
    popular: string;
    prev: string;
    next: string;
    getPrice: string;
    getStarted: string;
  };
};
