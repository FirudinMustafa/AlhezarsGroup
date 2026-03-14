import type { Translations } from './types';

const az: Translations = {
  dir: 'ltr',

  nav: {
    packages: 'Paketlər',
    socialMedia: 'Sosial Media',
    webDesign: 'Web Dizayn',
    services: 'Xidmətlər',
    process: 'Proses',
    about: 'Haqqımızda',
    getStarted: 'Başlayaq',
    closeMenu: 'Menyu bağla',
    openMenu: 'Menyu aç',
  },

  loading: {
    tagline: 'Rəqəmsal brendiniz üçün',
  },

  hero: {
    badge: 'Bakıda bütün xidmətləri özündə cəmləşdirən agentlik',
    title1: 'Brendinizi Rəqəmsal',
    title2: 'Dünyada Zirvəyə',
    title3: 'Çatdırırıq',
    subtitle1: 'Kontent istehsalından SEO-ya, web dizayndan reklam idarəçiliyinə —',
    subtitle2: 'brendinizin rəqəmsal uğuru üçün tam həll paketləri.',
    ctaPrimary: 'Paketlərə bax',
    ctaSecondary: 'Bizimlə əlaqə',
    stats: [
      { suffix: '+', label: 'Paket növü' },
      { suffix: '', label: 'Max kontent/ay' },
      { suffix: '', label: 'Xidmət sahəsi' },
      { suffix: '°', label: 'Rəqəmsal həll' },
    ],
  },

  marquee2: [
    'Web Dizayn', 'SEO', 'Brend Kimliyi', 'Video Prodakşn',
    'Motion Dizayn', 'Targetinq', 'E-ticarət', 'Mobiloqraf', 'AI Video',
  ],

  services: {
    badge: 'Xidmətlər',
    title1: 'Rəqəmsal Uğurun',
    title2: 'Dörd Sütunu',
    desc: 'Brendinizin rəqəmsal ekosistemini inşa etmək üçün lazım olan hər şey bir çatı altında.',
    items: [
      { title: 'Kontent İstehsalı', desc: 'Mobiloqraf, videoqraf, motion dizayn, professional foto — brendinizin hekayəsini vizual dillə anladırıq.' },
      { title: 'Sosial Media', desc: 'Strateji kontent planlaması, targeting reklam, hesab idarəçiliyi — hədəf kütlənizə çatmaq üçün hər şey.' },
      { title: 'Web & Brend', desc: 'Xüsusi UI/UX dizayn, e-ticarət sistemləri, logo yaradılması və tam korporativ brend kimliyi.' },
      { title: 'SEO & Reklam', desc: 'Google Ads, Meta Ads, texniki SEO, backlink strategiyası — rəqəmsal görünürlüyünüzü maksimuma çatdırırıq.' },
    ],
  },

  process: {
    badge: 'Necə İşləyirik',
    title1: 'Sadə & Effektiv',
    title2: 'İş Prosesi',
    steps: [
      { title: 'Kəşf & Müzakirə', desc: 'Brendinizi, hədəflərinizi və bazarınızı dərindən analiz edirik.' },
      { title: 'Strategiya & Plan', desc: 'Rəqiblər analizi, hədəf kütlə tədqiqatı və fərdi kontent kalendarı.' },
      { title: 'İstehsal & İcra', desc: 'Professional avadanlıq, kreativ komanda — hər kontent standartların üstündə.' },
      { title: 'Ölçmə & Böyümə', desc: 'Analitika, hesabat, optimizasiya — davamlı inkişaf.' },
    ],
  },

  testimonials: {
    badge: 'Müştəri Rəyləri',
    title1: 'Onlar Danışır,',
    title2: 'Nəticə Sübut Edir',
    desc: 'Brendlər üçün dəyər yaradan hər layihə arxasında real nəticələr var.',
    items: [
      { name: 'Leyla H.', role: 'Butik mağaza sahibəsi', initials: 'LH', text: 'M paketinə keçdikdən sonra 3 ay içərisində Instagram səhifəmizin izləyici sayı 3 dəfə artdı. Kontent keyfiyyəti gözləntilərimi üstələdi.' },
      { name: 'Rauf M.', role: 'Restoran sahibi', initials: 'RM', text: 'Hər ay 90 kontent vəd etdilər, verdilər də. Targeting ilə doğru auditoriyaya çatdıq — rezervasiyalar əhəmiyyətli dərəcədə artdı.' },
      { name: 'Nigar S.', role: 'Estetik klinika meneceri', initials: 'NS', text: 'Web dizayn layihəmiz 10 gün ərzində tamamlandı. Sayt həm görünüş, həm sürət baxımından əla — müştərilərimiz mütəmadi olaraq bəyənir.' },
      { name: 'Tural B.', role: 'İnşaat şirkəti direktoru', initials: 'TB', text: 'SEO xidməti sayəsində 4 ay içərisində Google-da üst sıralara çıxdıq. Organik müştəri sayımız 3 dəfə artdı.' },
    ],
  },

  faq: {
    badge: 'Tez-tez Soruşulan',
    title1: 'Suallarınıza',
    title2: 'Cavablarımız',
    moreQuestions: 'Başqa sualınız var?',
    contactUs: 'Bizimlə əlaqə saxlayın',
    items: [
      { q: 'Minimum müqavilə müddəti neçədir?', a: 'Heç bir minimum öhdəlik yoxdur. Bütün paketlər aylıq ödənişlidir — istəsəniz istənilən vaxt dayandıra bilərsiniz.' },
      { q: 'Reklam büdcəsi paketə daxildirmi?', a: 'Xeyr. Paket qiymətinə idarəetmə, kontent istehsalı və targeting xidməti daxildir. Reklam büdcəsi müştəri tərəfindən ayrıca qarşılanır.' },
      { q: 'Xidmətə nə tez başlaya bilərik?', a: 'İlk müzakirə görüşündən sonra 48 saat ərzində başlayırıq.' },
      { q: 'Nəticələri nə vaxt görəcəyik?', a: 'Sosial mediada 1-2 ay ərzində əhəmiyyətli artım müşahidə edilir. SEO xidmətlərində isə 3-6 ay ərzində nəticə görünür.' },
      { q: 'Paket ortasında dəyişdirmək mümkündür?', a: 'Bəli, istənilən vaxt paketi yuxarı və ya aşağı dəyişdirə bilərsiniz. Dəyişiklik növbəti ay üçün qüvvəyə minir.' },
      { q: 'Aylıq hesabat verirsinizmi?', a: 'Bəli. Hər ayın sonunda izləyici artımı, reach, engagement rate və əsas KPI-ları əks etdirən detallı analitika hesabatı göndərilir.' },
    ],
  },

  about: {
    badge: 'Haqqımızda',
    title1: 'Bakıdan Dünyaya',
    title2: 'Rəqəmsal Körpü',
    desc1: ' 2026-cı ildə Bakıda quruldu. Komandamızda mobiloqraf, videoqraf, dizayner, developer və targetoloq var — bütün işi özümüz görürük, xarici tərəfdara vermədən.',
    desc2: 'Brendin rəqəmsal böyüməsi sifarişçi-icraçı münasibəti deyil — bu, ortaqlıqdır. Hər layihəyə fərdi baxış, hər ay ölçülə bilən nəticə. Rəqəmlər danışır, söz yox.',
    tags: ['Kontent İstehsalı', 'Sosial Media', 'Web Dizayn', 'SEO & Reklam', 'Brend Kimliyi', 'Event Təşkili'],
    stats: [
      { suffix: '+', label: 'Paket Növü' },
      { suffix: '', label: 'Max Kontent/ay' },
      { suffix: '%', label: 'Müştəri Məmnunluğu' },
      { suffix: '', label: 'Xidmət Sahəsi' },
    ],
    highlights: [
      { icon: '📸', title: 'Mobiloqraf & Videoqraf', desc: 'Ayda 2-dən 20-yə qədər çəkiliş — brendinizin vizual dilini biz qururuq' },
      { icon: '🤖', title: 'AI Video', desc: 'Süni intellektlə hazırlanan kontent — rəqiblərinizdən bir addım öndə' },
      { icon: '🎯', title: 'Targeting & Reklam', desc: 'Google, Meta — doğru adam, doğru vaxt, doğru mesaj' },
      { icon: '🌐', title: 'Tam Brend Kimliyi', desc: 'Logo, sayt, rəng paleti — brendinizin hər tərəfi bir əldə' },
      { icon: '🌟', title: 'İnfluencer Marketinq', desc: 'Brendinizi doğru blogerlərlə birləşdiririk — hədəf auditoriyaya daha sürətli çatırsınız' },
    ],
  },

  contact: {
    badge: 'Başlayaq',
    title1: 'Brendiniz üçün',
    title2: 'doğru paket sizi gözləyir',
    desc: 'Aşağıdakı formu doldurun və ya birbaşa əlaqə saxlayın.',
    whatsapp: 'WhatsApp ilə yazın',
    emailBtn: 'E-poçt göndərin',
    divider: 'və ya form doldurun',
    nameLabel: 'Ad Soyad *',
    namePlaceholder: 'Adınız Soyadınız',
    emailLabel: 'Email *',
    phone: 'Telefon',
    phonePlaceholder: '+994 XX XXX XX XX',
    packageLabel: 'Maraq duyulan paket',
    packagePlaceholder: 'Seçin (istəyə bağlı)',
    messageLabel: 'Mesaj *',
    messagePlaceholder: 'Brendiniz, hədəfləriniz və ya suallarınız haqqında qısa məlumat verin...',
    required: '* Mütləq sahələr',
    submit: 'Müraciət et',
    sending: 'Göndərilir...',
    customOffer: 'Fərdi təklif',
    successTitle: 'Müraciətiniz alındı!',
    successDesc: 'Ən qısa zamanda sizinlə əlaqə saxlayacağıq. WhatsApp-dan da yaza bilərsiniz.',
    successAgain: 'Yenidən müraciət et',
    errorDefault: 'Xəta baş verdi.',
    address: 'CV46+XHM, 5 Nadir Əliyev, Bakı 1075, Azerbaycan',
  },

  map: {
    office: 'Ofisimiz burada yerləşir',
  },

  footer: {
    desc: 'Bakıda bütün xidmətləri özündə cəmləşdirən agentlik. Brendinizin rəqəmsal gələcəyini birlikdə inşa edirik.',
    servicesTitle: 'Xidmətlər',
    servicesList: ['Kontent İstehsalı', 'Sosial Media', 'Web Dizayn', 'SEO & Reklam'],
    companyTitle: 'Şirkət',
    companyLinks: [
      { label: 'Haqqımızda', href: '#haqqimizda' },
      { label: 'Paketlər', href: '/paketler/sosial-media' },
      { label: 'Proses', href: '#proses' },
      { label: 'Əlaqə', href: '#elaqe' },
    ],
    rights: 'Bütün hüquqlar qorunur.',
  },

  packagePage: {
    socialMedia: {
      badge: 'Sosial Media Paketləri',
      title: 'Brendinizi sosial mediada',
      titleHighlight: 'böyüdürük.',
      desc: 'Mobiloqraf, videoqraf, motion dizayn, targeting — brendinizin sosial media hekayəsini biz yazırıq.',
      ctaPrimary: 'Paketlərə bax',
      ctaSecondary: 'Bizimlə əlaqə',
      selectTitle: 'Sizə uyğun',
      selectHighlight: 'paketi seçin',
      selectDesc: 'Brendinizin ölçüsünə uyğun aylıq kontent istehsalı və targeting xidmətləri.',
      note: 'Bütün paketlər aylıq ödənişli. Reklam büdcəsi ayrıca qarşılanır.',
      bottomTitle: 'Paketinizi seçin,',
      bottomHighlight: 'böyüməyə başlayın.',
      bottomDesc: 'Brendinizə uyğun paketi seçin, bizimlə əlaqə saxlayın.',
      whatsapp: 'WhatsApp ilə yazın',
      emailBtn: 'E-poçt göndərin',
    },
    webDesign: {
      badge: 'Web Dizayn Paketləri',
      title: 'Brendinizin rəqəmsal',
      titleHighlight: 'evini inşa edək.',
      desc: 'Sadə saytdan tam rəqəmsal ekosisteməqədər — brendinizin ehtiyacına uyğun xüsusi web həllər.',
      ctaPrimary: 'Paketlərə bax',
      ctaSecondary: 'Qiymət soruşun',
      selectTitle: 'Sizə uyğun',
      selectHighlight: 'paketi seçin',
      selectDesc: 'Ehtiyacınıza uyğun paketi seçin, qiymət üçün bizimlə əlaqə saxlayın.',
      note: 'Bütün paketlər üçün qiymət sorğusu göndərin. Layihə mürəkkəbliyinə görə qiymətlər dəyişə bilər.',
      bottomTitle: 'Proyektinizi',
      bottomHighlight: 'müzakirə edək.',
      bottomDesc: 'Qiymət və detallar üçün bizimlə əlaqə saxlayın.',
      whatsapp: 'WhatsApp ilə yazın',
      emailBtn: 'E-poçt göndərin',
    },
  },

  socialPackages: {
    subtitles: ['Başlanğıc', 'Böyümə', 'Ən Populyar', 'Professional', 'Korporativ'],
    features: [
      ['2 mobilograf çəkilişi', '10 story (manual)', '1 videoqraf çəkilişi', '2 qrafik dizayn post', '5 professional foto', 'Targeting xidməti', 'Sosial portfoliya nəzarət'],
      ['5 mobilograf çəkilişi', '5 motion post', '13 story', '2 videoqraf xidməti', 'Targeting', '5 qrafik dizayn post', '10 kamera ilə foto', 'Kontent plan', 'Logo dizayn', 'Bioqrafiya & Highlights'],
      ['10 mobilograf çəkilişi', '10 motion post', '33 story', '4 videoqraf xidməti', '2 AI video (Süni intellekt)', '1 Bloger çəkilişi', 'Targeting', '10 qrafik dizayn post', 'Kontent plan', 'Logo dizayn', 'Bioqrafiya & Highlights'],
      ['15 mobilograf çəkilişi', '15 motion post', '47 story', '7 videoqraf xidməti', '3 AI video', '3 Bloger çəkilişi', 'Targeting', '20 qrafik dizayn post', 'Website dizayn', 'Logo dizayn', 'Bioqrafiya & Highlights'],
      ['20 mobilograf çəkilişi', '15 motion post', '60 story', '10 videoqraf çəkilişi', '5 AI video', '4 Bloger çəkilişi', 'Targeting', '30 qrafik dizayn post', '40 professional foto', 'Website + SEO', 'Event təşkili (50 nəfər)', 'Bioqrafiya & Highlights'],
    ],
    goldenFeatures: [
      [],
      [],
      ['2 AI video (Süni intellekt)', '1 Bloger çəkilişi'],
      ['3 AI video', '3 Bloger çəkilişi', 'Website dizayn'],
      ['5 AI video', '4 Bloger çəkilişi', 'Website + SEO', 'Event təşkili (50 nəfər)'],
    ],
  },

  webPackages: {
    names: ['Basic', 'Orta', 'Premium', 'Premium Plus'],
    subtitles: ['Rəqəmsal Başlanğıc', 'Görünürlük & Etibar', 'Rəqəmsal Böyümə', 'Rəqəmsal Ekosistem'],
    features: [
      ['5 səhifəlik korporativ sayt', 'Mobil uyğun dizayn', '2 dil dəstəyi', 'Domain + Hosting (1 il)', 'SSL sertifikatı', 'WhatsApp & Google Maps', 'Əsas SEO qurulumu', 'Google Analytics 4', '1 ay texniki dəstək'],
      ['Basic + hər şey', '10 səhifəlik xüsusi dizayn', '3 dil dəstəyi', 'Admin panel & Blog', 'Logo + rəng + tipoqrafiya', 'On-Page SEO', '4 SEO blog məqaləsi', 'Google & Meta Ads', '1 aylıq reklam idarəçiliyi', '2 ay texniki dəstək'],
      ['Orta + hər şey', '20 səhifə UI/UX dizayn', '5 dil dəstəyi', 'Chatbot inteqrasiyası', '50 məhsullu e-ticarət', 'Tam brend kimliyi', '8 SEO məqaləsi', 'CRO & Funnel sistemi', 'CRM inteqrasiyası', '3 ay texniki dəstək'],
      ['Premium + hər şey', 'Xüsusi yazılım & veb', 'ERP/CRM inteqrasiyası', 'Brand book & guideline', '360° SEO strategiyası', 'Multi-kanal reklam', 'A/B test sistemi', 'Satış dashboard', 'Aylıq C-Level hesabat', '6 ay texniki dəstək'],
    ],
    goldenFeatures: [
      [],
      ['Logo + rəng + tipoqrafiya', 'Google & Meta Ads', '1 aylıq reklam idarəçiliyi'],
      ['Chatbot inteqrasiyası', 'CRO & Funnel sistemi', 'CRM inteqrasiyası'],
      ['Brand book & guideline', '360° SEO strategiyası', 'A/B test sistemi', 'Aylıq C-Level hesabat'],
    ],
  },

  carousel: {
    contentPerMonth: 'kontent/ay',
    perMonth: '/AY',
    popular: 'Populyar',
    prev: 'Əvvəlki',
    next: 'Növbəti',
    getPrice: 'Qiymət al',
    getStarted: 'Başlayaq',
  },
};

export default az;
