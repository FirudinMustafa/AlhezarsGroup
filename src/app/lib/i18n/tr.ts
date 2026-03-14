import type { Translations } from './types';

const tr: Translations = {
  dir: 'ltr',

  nav: {
    packages: 'Paketler',
    socialMedia: 'Sosyal Medya',
    webDesign: 'Web Tasarım',
    services: 'Hizmetler',
    process: 'Süreç',
    about: 'Hakkımızda',
    getStarted: 'Başlayalım',
    closeMenu: 'Menüyü kapat',
    openMenu: 'Menüyü aç',
  },

  loading: {
    tagline: 'Dijital markanız için',
  },

  hero: {
    badge: "Bakü'de tüm hizmetleri bünyesinde barındıran ajans",
    title1: 'Markanızı Dijital',
    title2: 'Dünyada Zirveye',
    title3: 'Taşıyoruz',
    subtitle1: "İçerik üretiminden SEO'ya, web tasarımdan reklam yönetimine —",
    subtitle2: 'markanızın dijital başarısı için eksiksiz çözüm paketleri.',
    ctaPrimary: 'Paketlere bak',
    ctaSecondary: 'Bizimle iletişime geçin',
    stats: [
      { suffix: '+', label: 'Paket türü' },
      { suffix: '', label: 'Max içerik/ay' },
      { suffix: '', label: 'Hizmet alanı' },
      { suffix: '°', label: 'Dijital çözüm' },
    ],
  },

  marquee2: [
    'Web Tasarım', 'SEO', 'Marka Kimliği', 'Video Prodüksiyon',
    'Motion Tasarım', 'Targeting', 'E-ticaret', 'Mobilograf', 'AI Video',
  ],

  services: {
    badge: 'Hizmetler',
    title1: 'Dijital Başarının',
    title2: 'Dört Sütunu',
    desc: 'Markanızın dijital ekosistemini inşa etmek için gereken her şey tek çatı altında.',
    items: [
      { title: 'İçerik Üretimi', desc: 'Mobilograf, videocu, motion tasarım, profesyonel fotoğraf — markanızın hikayesini görsel dille anlatıyoruz.' },
      { title: 'Sosyal Medya', desc: 'Stratejik içerik planlaması, targeting reklam, hesap yönetimi — hedef kitlenize ulaşmak için her şey.' },
      { title: 'Web & Marka', desc: 'Özel UI/UX tasarım, e-ticaret sistemleri, logo oluşturma ve tam kurumsal marka kimliği.' },
      { title: 'SEO & Reklam', desc: 'Google Ads, Meta Ads, teknik SEO, backlink stratejisi — dijital görünürlüğünüzü maksimuma çıkarıyoruz.' },
    ],
  },

  process: {
    badge: 'Nasıl Çalışıyoruz',
    title1: 'Basit & Etkili',
    title2: 'İş Süreci',
    steps: [
      { title: 'Keşif & Görüşme', desc: 'Markanızı, hedeflerinizi ve pazarınızı derinlemesine analiz ediyoruz.' },
      { title: 'Strateji & Plan', desc: 'Rakip analizi, hedef kitle araştırması ve özel içerik takvimi.' },
      { title: 'Üretim & Uygulama', desc: 'Profesyonel ekipman, kreatif ekip — her içerik standartların üzerinde.' },
      { title: 'Ölçme & Büyüme', desc: 'Analitik, raporlama, optimizasyon — sürdürülebilir gelişim.' },
    ],
  },

  testimonials: {
    badge: 'Müşteri Yorumları',
    title1: 'Onlar Konuşuyor,',
    title2: 'Sonuç Kanıtlıyor',
    desc: 'Markalar için değer yaratan her projenin arkasında gerçek sonuçlar var.',
    items: [
      { name: 'Leyla H.', role: 'Butik mağaza sahibi', initials: 'LH', text: "M paketine geçtikten sonra 3 ay içinde Instagram sayfamızın takipçi sayısı 3 katına çıktı. İçerik kalitesi beklentilerimi aştı." },
      { name: 'Rauf M.', role: 'Restoran sahibi', initials: 'RM', text: 'Her ay 90 içerik vaat ettiler, verdiler de. Targeting ile doğru kitleye ulaştık — rezervasyonlar önemli ölçüde arttı.' },
      { name: 'Nigar S.', role: 'Estetik klinik yöneticisi', initials: 'NS', text: 'Web tasarım projemiz 10 gün içinde tamamlandı. Site hem görünüm hem hız açısından mükemmel — müşterilerimiz sürekli beğeniyor.' },
      { name: 'Tural B.', role: 'İnşaat şirketi müdürü', initials: 'TB', text: "SEO hizmeti sayesinde 4 ay içinde Google'da üst sıralara çıktık. Organik müşteri sayımız 3 katına çıktı." },
    ],
  },

  faq: {
    badge: 'Sıkça Sorulan',
    title1: 'Sorularınıza',
    title2: 'Yanıtlarımız',
    moreQuestions: 'Başka sorunuz mu var?',
    contactUs: 'Bizimle iletişime geçin',
    items: [
      { q: 'Minimum sözleşme süresi nedir?', a: 'Hiçbir minimum taahhüt yoktur. Tüm paketler aylık ödemeli — isterseniz istediğiniz zaman durdurabilirsiniz.' },
      { q: 'Reklam bütçesi pakete dahil mi?', a: 'Hayır. Paket fiyatına yönetim, içerik üretimi ve targeting hizmeti dahildir. Reklam bütçesi müşteri tarafından ayrıca karşılanır.' },
      { q: 'Hizmete ne kadar çabuk başlayabiliriz?', a: 'İlk görüşmeden sonra 48 saat içinde başlıyoruz.' },
      { q: 'Sonuçları ne zaman göreceğiz?', a: 'Sosyal medyada 1-2 ay içinde önemli bir artış gözlemlenir. SEO hizmetlerinde ise 3-6 ay içinde sonuç görülür.' },
      { q: 'Paket ortasında değişiklik yapmak mümkün mü?', a: 'Evet, istediğiniz zaman paketi yükseltebilir veya düşürebilirsiniz. Değişiklik bir sonraki ay için geçerli olur.' },
      { q: 'Aylık rapor veriyor musunuz?', a: "Evet. Her ayın sonunda takipçi artışı, erişim, etkileşim oranı ve temel KPI'ları içeren detaylı analitik raporu gönderilir." },
    ],
  },

  about: {
    badge: 'Hakkımızda',
    title1: "Bakü'den Dünyaya",
    title2: 'Dijital Köprü',
    desc1: " 2026 yılında Bakü'de kuruldu. Ekibimizde mobilograf, videocu, tasarımcı, geliştirici ve hedefleme uzmanı var — tüm işi kendimiz yapıyoruz, dış kaynak kullanmadan.",
    desc2: 'Markanın dijital büyümesi müşteri-yüklenici ilişkisi değil — bu bir ortaklıktır. Her projeye bireysel bakış, her ay ölçülebilir sonuç. Rakamlar konuşur, söz değil.',
    tags: ['İçerik Üretimi', 'Sosyal Medya', 'Web Tasarım', 'SEO & Reklam', 'Marka Kimliği', 'Etkinlik Organizasyonu'],
    stats: [
      { suffix: '+', label: 'Paket Türü' },
      { suffix: '', label: 'Max İçerik/ay' },
      { suffix: '%', label: 'Müşteri Memnuniyeti' },
      { suffix: '', label: 'Hizmet Alanı' },
    ],
    highlights: [
      { icon: '📸', title: 'Mobilograf & Videocu', desc: "Ayda 2'den 20'ye kadar çekim — markanızın görsel dilini biz oluşturuyoruz" },
      { icon: '🤖', title: 'AI Video', desc: 'Yapay zeka ile hazırlanan içerik — rakiplerinizden bir adım önde' },
      { icon: '🎯', title: 'Targeting & Reklam', desc: 'Google, Meta — doğru kişi, doğru zaman, doğru mesaj' },
      { icon: '🌐', title: 'Tam Marka Kimliği', desc: 'Logo, site, renk paleti — markanızın her yönü tek elde' },
      { icon: '🌟', title: 'Influencer Pazarlama', desc: 'Markanızı doğru fenomenlerle buluşturuyoruz — hedef kitleye daha hızlı ulaşırsınız' },
    ],
  },

  contact: {
    badge: 'Başlayalım',
    title1: 'Markanız için',
    title2: 'doğru paket sizi bekliyor',
    desc: 'Aşağıdaki formu doldurun veya doğrudan iletişime geçin.',
    whatsapp: "WhatsApp'tan yazın",
    emailBtn: 'E-posta gönderin',
    divider: 'veya form doldurun',
    nameLabel: 'Ad Soyad *',
    namePlaceholder: 'Adınız Soyadınız',
    emailLabel: 'Email *',
    phone: 'Telefon',
    phonePlaceholder: '+994 XX XXX XX XX',
    packageLabel: 'İlgilendiğiniz paket',
    packagePlaceholder: 'Seçin (isteğe bağlı)',
    messageLabel: 'Mesaj *',
    messagePlaceholder: 'Markanız, hedefleriniz veya sorularınız hakkında kısa bilgi verin...',
    required: '* Zorunlu alanlar',
    submit: 'Başvuru yap',
    sending: 'Gönderiliyor...',
    customOffer: 'Özel teklif',
    successTitle: 'Başvurunuz alındı!',
    successDesc: "En kısa sürede sizinle iletişime geçeceğiz. WhatsApp'tan da yazabilirsiniz.",
    successAgain: 'Tekrar başvuru yap',
    errorDefault: 'Bir hata oluştu.',
    address: 'CV46+XHM, 5 Nadir Əliyev, Bakı 1075, Azerbaycan',
  },

  map: {
    office: 'Ofisimiz burada bulunuyor',
  },

  footer: {
    desc: "Bakü'de tüm hizmetleri bünyesinde barındıran ajans. Markanızın dijital geleceğini birlikte inşa ediyoruz.",
    servicesTitle: 'Hizmetler',
    servicesList: ['İçerik Üretimi', 'Sosyal Medya', 'Web Tasarım', 'SEO & Reklam'],
    companyTitle: 'Şirket',
    companyLinks: [
      { label: 'Hakkımızda', href: '#haqqimizda' },
      { label: 'Paketler', href: '/paketler/sosial-media' },
      { label: 'Süreç', href: '#proses' },
      { label: 'İletişim', href: '#elaqe' },
    ],
    rights: 'Tüm hakları saklıdır.',
  },

  packagePage: {
    socialMedia: {
      badge: 'Sosyal Medya Paketleri',
      title: 'Markanızı sosyal medyada',
      titleHighlight: 'büyütüyoruz.',
      desc: 'Mobilograf, videocu, motion tasarım, targeting — markanızın sosyal medya hikayesini biz yazıyoruz.',
      ctaPrimary: 'Paketlere bak',
      ctaSecondary: 'Bizimle iletişime geçin',
      selectTitle: 'Size uygun',
      selectHighlight: 'paketi seçin',
      selectDesc: 'Markanızın büyüklüğüne uygun aylık içerik üretimi ve targeting hizmetleri.',
      note: 'Tüm paketler aylık ödemeli. Reklam bütçesi ayrıca karşılanır.',
      bottomTitle: 'Paketinizi seçin,',
      bottomHighlight: 'büyümeye başlayın.',
      bottomDesc: 'Markanıza uygun paketi seçin, bizimle iletişime geçin.',
      whatsapp: "WhatsApp'tan yazın",
      emailBtn: 'E-posta gönderin',
    },
    webDesign: {
      badge: 'Web Tasarım Paketleri',
      title: 'Markanızın dijital',
      titleHighlight: 'evini inşa edelim.',
      desc: 'Basit siteden tam dijital ekosisteme kadar — markanızın ihtiyacına uygun özel web çözümleri.',
      ctaPrimary: 'Paketlere bak',
      ctaSecondary: 'Fiyat sorun',
      selectTitle: 'Size uygun',
      selectHighlight: 'paketi seçin',
      selectDesc: 'İhtiyacınıza uygun paketi seçin, fiyat için bizimle iletişime geçin.',
      note: 'Tüm paketler için fiyat talebi gönderin. Proje karmaşıklığına göre fiyatlar değişebilir.',
      bottomTitle: 'Projenizi',
      bottomHighlight: 'görüşelim.',
      bottomDesc: 'Fiyat ve detaylar için bizimle iletişime geçin.',
      whatsapp: "WhatsApp'tan yazın",
      emailBtn: 'E-posta gönderin',
    },
  },

  socialPackages: {
    subtitles: ['Başlangıç', 'Büyüme', 'En Popüler', 'Profesyonel', 'Kurumsal'],
    features: [
      ['2 mobilograf çekimi', '10 story (manuel)', '1 videocu çekimi', '2 grafik tasarım gönderi', '5 profesyonel fotoğraf', 'Targeting hizmeti', 'Sosyal portfolyo takibi'],
      ['5 mobilograf çekimi', '5 motion gönderi', '13 story', '2 videocu hizmeti', 'Targeting', '5 grafik tasarım gönderi', '10 kamera ile fotoğraf', 'İçerik planı', 'Logo tasarım', 'Biyografi & Highlights'],
      ['10 mobilograf çekimi', '10 motion gönderi', '33 story', '4 videocu hizmeti', '2 AI video (Yapay zeka)', '1 Fenomen çekimi', 'Targeting', '10 grafik tasarım gönderi', 'İçerik planı', 'Logo tasarım', 'Biyografi & Highlights'],
      ['15 mobilograf çekimi', '15 motion gönderi', '47 story', '7 videocu hizmeti', '3 AI video', '3 Fenomen çekimi', 'Targeting', '20 grafik tasarım gönderi', 'Website tasarım', 'Logo tasarım', 'Biyografi & Highlights'],
      ['20 mobilograf çekimi', '15 motion gönderi', '60 story', '10 videocu çekimi', '5 AI video', '4 Fenomen çekimi', 'Targeting', '30 grafik tasarım gönderi', '40 profesyonel fotoğraf', 'Website + SEO', 'Etkinlik organizasyonu (50 kişi)', 'Biyografi & Highlights'],
    ],
    goldenFeatures: [
      [],
      [],
      ['2 AI video (Yapay zeka)', '1 Fenomen çekimi'],
      ['3 AI video', '3 Fenomen çekimi', 'Website tasarım'],
      ['5 AI video', '4 Fenomen çekimi', 'Website + SEO', 'Etkinlik organizasyonu (50 kişi)'],
    ],
  },

  webPackages: {
    names: ['Basic', 'Orta', 'Premium', 'Premium Plus'],
    subtitles: ['Dijital Başlangıç', 'Görünürlük & Güven', 'Dijital Büyüme', 'Dijital Ekosistem'],
    features: [
      ['5 sayfalık kurumsal site', 'Mobil uyumlu tasarım', '2 dil desteği', 'Domain + Hosting (1 yıl)', 'SSL sertifikası', 'WhatsApp & Google Maps', 'Temel SEO kurulumu', 'Google Analytics 4', '1 ay teknik destek'],
      ['Basic + her şey', '10 sayfalık özel tasarım', '3 dil desteği', 'Admin panel & Blog', 'Logo + renk + tipografi', 'On-Page SEO', '4 SEO blog makalesi', 'Google & Meta Ads', '1 aylık reklam yönetimi', '2 ay teknik destek'],
      ['Orta + her şey', '20 sayfa UI/UX tasarım', '5 dil desteği', 'Chatbot entegrasyonu', '50 ürünlü e-ticaret', 'Tam marka kimliği', '8 SEO makalesi', 'CRO & Funnel sistemi', 'CRM entegrasyonu', '3 ay teknik destek'],
      ['Premium + her şey', 'Özel yazılım & web', 'ERP/CRM entegrasyonu', 'Brand book & guideline', '360° SEO stratejisi', 'Çoklu kanal reklam', 'A/B test sistemi', 'Satış dashboard', 'Aylık C-Level raporu', '6 ay teknik destek'],
    ],
    goldenFeatures: [
      [],
      ['Logo + renk + tipografi', 'Google & Meta Ads', '1 aylık reklam yönetimi'],
      ['Chatbot entegrasyonu', 'CRO & Funnel sistemi', 'CRM entegrasyonu'],
      ['Brand book & guideline', '360° SEO stratejisi', 'A/B test sistemi', 'Aylık C-Level raporu'],
    ],
  },

  carousel: {
    contentPerMonth: 'içerik/ay',
    perMonth: '/AY',
    popular: 'Popüler',
    prev: 'Önceki',
    next: 'Sonraki',
    getPrice: 'Fiyat al',
    getStarted: 'Başlayalım',
  },
};

export default tr;
