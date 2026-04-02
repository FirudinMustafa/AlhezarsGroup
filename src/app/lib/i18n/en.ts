import type { Translations } from './types';

const en: Translations = {
  dir: 'ltr',

  nav: {
    packages: 'Packages',
    socialMedia: 'Social Media',
    webDesign: 'Web Design',
    services: 'Services',
    process: 'Process',
    about: 'About Us',
    getStarted: 'Get Started',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
  },

  loading: {
    tagline: 'For your digital brand',
  },

  hero: {
    badge: 'Full-service digital agency in Baku',
    title1: 'Take Your Brand to the',
    title2: 'Top of the Digital',
    title3: 'World',
    subtitle1: 'From content production to SEO, web design to ad management —',
    subtitle2: 'complete solution packages for your brand\'s digital success.',
    ctaPrimary: 'View packages',
    ctaSecondary: 'Contact us',
    stats: [
      { suffix: '+', label: 'Package types' },
      { suffix: '', label: 'Max content/mo' },
      { suffix: '', label: 'Service areas' },
      { suffix: '°', label: 'Digital solutions' },
    ],
  },

  marquee2: [
    'Web Design', 'SEO', 'Brand Identity', 'Video Production',
    'Motion Design', 'Targeting', 'E-commerce', 'Mobile Videography', 'AI Video',
  ],

  services: {
    badge: 'Services',
    title1: 'Four Pillars of',
    title2: 'Digital Success',
    desc: 'Everything you need to build your brand\'s digital ecosystem — all under one roof.',
    items: [
      { title: 'Content Production', desc: 'Mobile videography, videography, motion design, professional photography — we tell your brand\'s story through visual language.' },
      { title: 'Social Media', desc: 'Strategic content planning, targeted advertising, account management — everything to reach your target audience.' },
      { title: 'Web & Brand', desc: 'Custom UI/UX design, e-commerce systems, logo creation, and complete corporate brand identity.' },
      { title: 'SEO & Advertising', desc: 'Google Ads, Meta Ads, technical SEO, backlink strategy — we maximize your digital visibility.' },
    ],
  },

  process: {
    badge: 'How We Work',
    title1: 'Simple & Effective',
    title2: 'Workflow',
    steps: [
      { title: 'Discovery & Discussion', desc: 'We deeply analyze your brand, goals, and market.' },
      { title: 'Strategy & Planning', desc: 'Competitor analysis, target audience research, and a tailored content calendar.' },
      { title: 'Production & Execution', desc: 'Professional equipment, creative team — every piece of content exceeds standards.' },
      { title: 'Measurement & Growth', desc: 'Analytics, reporting, optimization — continuous improvement.' },
    ],
  },

  testimonials: {
    badge: 'Client Testimonials',
    title1: 'They Speak,',
    title2: 'Results Prove It',
    desc: 'Behind every project that creates value for brands, there are real results.',
    items: [
      { name: 'Leyla H.', role: 'Boutique store owner', initials: 'LH', text: 'After switching to the M package, our Instagram followers tripled within 3 months. The content quality exceeded my expectations.' },
      { name: 'Rauf M.', role: 'Restaurant owner', initials: 'RM', text: 'They promised 90 pieces of content per month and delivered. With targeting, we reached the right audience — reservations increased significantly.' },
      { name: 'Nigar S.', role: 'Aesthetic clinic manager', initials: 'NS', text: 'Our web design project was completed in 10 days. The site is excellent in both appearance and speed — our clients consistently love it.' },
      { name: 'Tural B.', role: 'Construction company director', initials: 'TB', text: 'Thanks to the SEO service, we reached the top positions on Google within 4 months. Our organic customer base tripled.' },
    ],
  },

  faq: {
    badge: 'FAQ',
    title1: 'Answers to',
    title2: 'Your Questions',
    moreQuestions: 'Have more questions?',
    contactUs: 'Contact us',
    items: [
      { q: 'What is the minimum contract period?', a: 'There is no minimum commitment. All packages are billed monthly — you can cancel at any time.' },
      { q: 'Is the advertising budget included in the package?', a: 'No. The package price includes management, content production, and targeting services. The advertising budget is covered separately by the client.' },
      { q: 'How quickly can we get started?', a: 'We start within 48 hours after the initial consultation.' },
      { q: 'When will we see results?', a: 'Significant growth is observed within 1–2 months on social media. For SEO services, results become visible within 3–6 months.' },
      { q: 'Can we change the package mid-cycle?', a: 'Yes, you can upgrade or downgrade your package at any time. The change takes effect the following month.' },
      { q: 'Do you provide monthly reports?', a: 'Yes. At the end of each month, we send a detailed analytics report reflecting follower growth, reach, engagement rate, and key KPIs.' },
    ],
  },

  about: {
    badge: 'About Us',
    title1: 'A Digital Bridge',
    title2: 'From Baku to the World',
    desc1: ' Founded in Baku in 2026. Our team includes mobile videographers, videographers, designers, developers, and targeting specialists — we handle everything in-house, without outsourcing.',
    desc2: 'A brand\'s digital growth isn\'t a client-contractor relationship — it\'s a partnership. An individual approach to every project, measurable results every month. Numbers speak, not words.',
    tags: ['Content Production', 'Social Media', 'Web Design', 'SEO & Advertising', 'Brand Identity', 'Event Management'],
    stats: [
      { suffix: '+', label: 'Package Types' },
      { suffix: '', label: 'Max Content/mo' },
      { suffix: '%', label: 'Client Satisfaction' },
      { suffix: '', label: 'Service Areas' },
    ],
    highlights: [
      { icon: '📸', title: 'Mobile & Video Production', desc: 'From 2 to 20 shoots per month — we craft your brand\'s visual language' },
      { icon: '🤖', title: 'AI Video', desc: 'Content powered by artificial intelligence — stay one step ahead of your competitors' },
      { icon: '🎯', title: 'Targeting & Advertising', desc: 'Google, Meta — the right person, the right time, the right message' },
      { icon: '🌐', title: 'Complete Brand Identity', desc: 'Logo, website, color palette — every aspect of your brand in one place' },
      { icon: '🌟', title: 'Influencer Marketing', desc: 'We connect your brand with the right influencers — reach your target audience faster' },
    ],
  },

  contact: {
    badge: 'Get Started',
    title1: 'The right package for',
    title2: 'your brand is waiting',
    desc: 'Fill out the form below or contact us directly.',
    whatsapp: 'Message us on WhatsApp',
    emailBtn: 'Send an email',
    divider: 'or fill out the form',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Your Full Name',
    emailLabel: 'Email *',
    phone: 'Phone',
    phonePlaceholder: '+994 XX XXX XX XX',
    packageLabel: 'Package of interest',
    packagePlaceholder: 'Select (optional)',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell us briefly about your brand, goals, or questions...',
    required: '* Required fields',
    submit: 'Submit inquiry',
    sending: 'Sending...',
    customOffer: 'Custom offer',
    successTitle: 'Your inquiry has been received!',
    successDesc: 'We will contact you as soon as possible. You can also reach us via WhatsApp.',
    successAgain: 'Submit another inquiry',
    errorDefault: 'An error occurred.',
    address: 'CV46+XHM, 5 Nadir Əliyev, Bakı 1075, Azerbaycan',
  },

  map: {
    office: 'Our office is located here',
  },

  footer: {
    desc: 'A full-service digital agency in Baku. We build your brand\'s digital future together.',
    servicesTitle: 'Services',
    servicesList: ['Content Production', 'Social Media', 'Web Design', 'SEO & Advertising'],
    companyTitle: 'Company',
    companyLinks: [
      { label: 'About Us', href: '#haqqimizda' },
      { label: 'Packages', href: '/paketler/sosial-media' },
      { label: 'Process', href: '#proses' },
      { label: 'Contact', href: '#elaqe' },
    ],
    rights: 'All rights reserved.',
  },

  packagePage: {
    socialMedia: {
      badge: 'Social Media Packages',
      title: 'We grow your brand on',
      titleHighlight: 'social media.',
      desc: 'Mobile videography, videography, motion design, targeting — we write your brand\'s social media story.',
      ctaPrimary: 'View packages',
      ctaSecondary: 'Contact us',
      selectTitle: 'Choose the package',
      selectHighlight: 'that fits you',
      selectDesc: 'Monthly content production and targeting services tailored to your brand\'s size.',
      note: 'All packages are billed monthly. Advertising budget is covered separately.',
      bottomTitle: 'Choose your package,',
      bottomHighlight: 'start growing.',
      bottomDesc: 'Select the package that fits your brand and contact us.',
      whatsapp: 'Message us on WhatsApp',
      emailBtn: 'Send an email',
    },
    webDesign: {
      badge: 'Web Design Packages',
      title: 'Let\'s build your brand\'s',
      titleHighlight: 'digital home.',
      desc: 'From simple websites to full digital ecosystems — custom web solutions tailored to your brand\'s needs.',
      ctaPrimary: 'View packages',
      ctaSecondary: 'Request a quote',
      selectTitle: 'Choose the package',
      selectHighlight: 'that fits you',
      selectDesc: 'Select the package that suits your needs and contact us for pricing.',
      note: 'Submit a price inquiry for all packages. Prices may vary depending on project complexity.',
      bottomTitle: 'Let\'s discuss',
      bottomHighlight: 'your project.',
      bottomDesc: 'Contact us for pricing and details.',
      whatsapp: 'Message us on WhatsApp',
      emailBtn: 'Send an email',
    },
  },

  socialPackages: {
    subtitles: ['Starter', 'Growth', 'Most Popular', 'Professional', 'Corporate'],
    features: [
      ['2 mobile videography shoots', '10 stories (manual)', '1 videography shoot', '2 graphic design posts', '5 professional photos', 'Targeting service', 'Social portfolio management'],
      ['5 mobile videography shoots', '5 motion posts', '13 stories', '2 videography services', 'Targeting', '5 graphic design posts', '10 camera photos', 'Content plan', 'Logo design', 'Bio & Highlights'],
      ['10 mobile videography shoots', '10 motion posts', '33 stories', '4 videography services', '2 AI videos (Artificial intelligence)', '1 Influencer shoot', 'Targeting', '10 graphic design posts', 'Content plan', 'Logo design', 'Bio & Highlights'],
      ['15 mobile videography shoots', '15 motion posts', '47 stories', '7 videography services', '3 AI videos', '3 Influencer shoots', 'Targeting', '20 graphic design posts', 'Website design', 'Logo design', 'Bio & Highlights'],
      ['20 mobile videography shoots', '15 motion posts', '60 stories', '10 videography shoots', '5 AI videos', '4 Influencer shoots', 'Targeting', '30 graphic design posts', '40 professional photos', 'Website + SEO', 'Event management (50 guests)', 'Bio & Highlights'],
    ],
    goldenFeatures: [
      [],
      [],
      ['2 AI videos (Artificial intelligence)', '1 Influencer shoot'],
      ['3 AI videos', '3 Influencer shoots', 'Website design'],
      ['5 AI videos', '4 Influencer shoots', 'Website + SEO', 'Event management (50 guests)'],
    ],
  },

  webPackages: {
    names: ['Basic', 'Standard', 'Premium', 'Premium Plus'],
    subtitles: ['Digital Starter', 'Visibility & Trust', 'Digital Growth', 'Digital Ecosystem'],
    features: [
      ['5-page corporate website', 'Mobile-responsive design', '2 language support', 'Domain + Hosting (1 year)', 'SSL certificate', 'WhatsApp & Google Maps', 'Basic SEO setup', 'Google Analytics 4', '1 month technical support'],
      ['Everything in Basic +', '10-page custom design', '3 language support', 'Admin panel & Blog', 'Logo + colors + typography', 'On-Page SEO', '4 SEO blog articles', 'Google & Meta Ads', '1 month ad management', '2 months technical support'],
      ['Everything in Standard +', '20-page UI/UX design', '5 language support', 'Chatbot integration', '50-product e-commerce', 'Complete brand identity', '8 SEO articles', 'CRO & Funnel system', 'CRM integration', '3 months technical support'],
      ['Everything in Premium +', 'Custom software & web', 'ERP/CRM integration', 'Brand book & guideline', '360° SEO strategy', 'Multi-channel advertising', 'A/B testing system', 'Sales dashboard', 'Monthly C-Level report', '6 months technical support'],
    ],
    goldenFeatures: [
      [],
      ['Logo + colors + typography', 'Google & Meta Ads', '1 month ad management'],
      ['Chatbot integration', 'CRO & Funnel system', 'CRM integration'],
      ['Brand book & guideline', '360° SEO strategy', 'A/B testing system', 'Monthly C-Level report'],
    ],
  },

  carousel: {
    contentPerMonth: 'content/mo',
    perMonth: '/MO',
    popular: 'Popular',
    prev: 'Previous',
    next: 'Next',
    getPrice: 'Get price',
    getStarted: 'Get Started',
  },
};

export default en;
