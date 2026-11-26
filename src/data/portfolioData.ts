export type Lang = "en" | "ar";

export type ClientStatus = "active" | "new" | "leaving_soon" | "ended";

export type CaseStudyCategoryId =
  | "all"
  | "brand_growth"
  | "retail_hospitality"
  | "corporate_tech"
  | "beauty_lifestyle"
  | "ai_systems";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface OrganizationLogo {
  src: string;
  alt: LocalizedText;
  bg?: string;
  wide?: boolean;
}

export interface ChronicleEntry {
  id: string;
  period: LocalizedText;
  role: LocalizedText;
  organization: LocalizedText;
  location: LocalizedText;
  logos?: OrganizationLogo[];
  summary: LocalizedText;
  highlights: {
    en: string[];
    ar: string[];
  };
}

export interface ClientLink {
  label: LocalizedText;
  url: string;
}

export interface CaseStudy {
  id: string;
  title: LocalizedText;
  status: ClientStatus;
  period: LocalizedText;
  category: Exclude<CaseStudyCategoryId, "all">;
  discipline: LocalizedText;
  image?: string;
  isWhitePlate?: boolean;
  isMedallion?: boolean;
  isPortraitMedallion?: boolean;
  monogram?: string;
  summary: LocalizedText;
  deliverables: {
    en: string[];
    ar: string[];
  };
  campaigns: {
    en: string[];
    ar: string[];
  };
  links: ClientLink[];
}

export interface StackTool {
  name: LocalizedText;
  domain: LocalizedText;
  role: LocalizedText;
}

export interface ScrollSectionMeta {
  id: string;
  index: string;
  label: LocalizedText;
}

export const SCROLL_SECTIONS: ScrollSectionMeta[] = [
  { id: "hero", index: "01", label: { en: "Overview", ar: "المقدمة" } },
  { id: "perspective", index: "02", label: { en: "Ethos", ar: "المنهجية" } },
  { id: "chronicle", index: "03", label: { en: "Chronicle", ar: "المسيرة" } },
  { id: "works", index: "04", label: { en: "Works", ar: "الأعمال" } },
  { id: "systems", index: "05", label: { en: "Systems", ar: "الأنظمة" } },
  { id: "contact", index: "06", label: { en: "Contact", ar: "التواصل" } },
];

export const PORTFOLIO_IDENTITY = {
  brandMark: { en: "BELAL GAMAL", ar: "بلال جمال" },
  pageTitle: {
    en: "Belal Gamal | Creative Director & AI Production Architect",
    ar: "بلال جمال | مدير إبداعي ومهندس أنظمة إنتاج بالذكاء الاصطناعي",
  },
  name: { en: "Belal Gamal", ar: "بلال جمال" },
  primaryTitle: { en: "Creative Director", ar: "مدير إبداعي" },
  heroSubtitle: {
    en: "Creative Direction & AI Systems",
    ar: "الإدارة الإبداعية وأنظمة الذكاء الاصطناعي",
  },
  heroEyebrow: {
    en: "Creative Director · Digital Strategist · AI Architect",
    ar: "مدير إبداعي · مخطط تسويق رقمي · مهندس أنظمة إنتاج",
  },
  heroSubtext: {
    en: "Creative Director, Digital Marketing Strategist, and AI Production Architect. Self-started in digital marketing back in 2016 running paid Facebook ad campaigns independently before leading commercial direction, corporate teams (Vodafone, Majorel, Chubb Life), and automated media systems.",
    ar: "مدير إبداعي، ومخطط استراتيجيات تسويق رقمي، ومهندس أنظمة إنتاج بالذكاء الاصطناعي. بدأت رحلتي في التسويق الإلكتروني بجهد ذاتي منذ عام 2016 بإطلاق حملات إعلانات فيسبوك لنفسي، قبل التدرج إلى القيادة المؤسسية (فودافون، ماجوريل، تشب) والتوجيه التجاري ومنظومات الإنتاج المؤتمتة.",
  },
  bornLabel: { en: "Born July 20, 1995", ar: "مواليد 20 يوليو 1995" },
  bornCompact: "20.07.1995",
  educationTitle: {
    en: "B.Sc. in Commerce (2013 - 2017)",
    ar: "بكالوريوس التجارة (2013 - 2017)",
  },
  educationSub: {
    en: "Business Administration (English Section), Beni Suef University",
    ar: "شعبة اللغة الإنجليزية · إدارة الأعمال · جامعة بني سويف",
  },
  trackTitle: {
    en: "10 Years · Multi-Sector Execution",
    ar: "عشر سنوات · تنفيذ عبر قطاعات متعددة",
  },
  trackSub: {
    en: "Telecom, Firmware QA, Insurance, TV & Film, Retail, QSR, Beauty, EdTech & AI Media",
    ar: "الاتصالات · اختبار البرمجيات · التأمين · التلفزيون · التجزئة · المطاعم · التجميل · التعليم · وميديا الذكاء الاصطناعي",
  },
  pointOfView: {
    en: "Clarity beats noise. Every brand, campaign, and film I direct starts with a sharp point of view and disciplined execution.",
    ar: "الفكرة الواضحة تغلب الزحمة. كل براند أو حملة أو عمل مرئي يبدأ برؤية مستقلة، قراءة حقيقية للسوق، وتنفيذ منضبط.",
  },
  inspirationLabel: { en: "Creative Influence", ar: "الإلهام الإبداعي" },
  inspirationText: {
    en: "Influenced in advertising direction by Egyptian director Tameem Youness for sharp, unconventional storytelling.",
    ar: "تأثّرت في الإخراج الإعلاني بأسلوب تميم يونس المختلف وقدرته على تقديم فكرة حادة وبسيطة بعيداً عن القوالب المستهلكة.",
  },
  lensLabel: { en: "Analytical Lens", ar: "العدسة التحليلية" },
  lensText: {
    en: "Combines frontline commercial leadership with critical analysis of economic history, buyer behavior, and media systems across brands and documentary channels.",
    ar: "دمج القيادة التجارية الميدانية مع التحليل النقدي للتاريخ الاقتصادي وسلوك المشتري وبنية المنظومات الإعلامية عبر العلامات التجارية والقنوات الوثائقية.",
  },
  portraitPath: "/assets/portrait.jpg",
  showreelPosterPath: "/assets/showreel-poster.jpg",
  liveDomain: "https://begamal.pages.dev",
  email: "begamal38@gmail.com",
  vimeoUrl: "https://vimeo.com/begamal",
  facebookUrl: "https://www.facebook.com/begamal",
  instagramUrl: "https://www.instagram.com/begamal",
  whatsappUrl: "https://wa.me/201000788628",
};

export const UI_COPY = {
  nav: {
    chronicle: { en: "Chronicle", ar: "المسيرة" },
    works: { en: "Works", ar: "الأعمال" },
    ethos: { en: "Ethos", ar: "المنهج" },
    systems: { en: "Systems", ar: "الأنظمة" },
    contact: { en: "Contact", ar: "التواصل" },
    showreel: { en: "Showreel", ar: "الأعمال المرئية" },
    cta: { en: "Connect", ar: "تواصل الآن" },
  },
  hero: {
    secondaryCta: { en: "Selected Works", ar: "استعراض الأعمال" },
    portraitAlt: {
      en: "Belal Gamal portrait in low-key monochrome studio light",
      ar: "صورة شخصية لبلال جمال بإضاءة استوديو أحادية اللون",
    },
  },
  statement: {
    origin: { en: "Origin", ar: "النشأة" },
    education: { en: "Academic Foundation", ar: "الأساس الأكاديمي" },
    scope: { en: "Field Reach", ar: "نطاق الخبرة" },
  },
  chronicle: {
    title: { en: "Career Chronicle", ar: "المسيرة المهنية" },
    subtitle: {
      en: "Started independently in 2016 running Facebook ad campaigns for myself alongside Business Administration studies and TECNO Camon C9 firmware QA, progressing through Vodafone Business Cairo, Chance Media, Al-Attar, Majorel Smart Village HR (through Aug 2021), Chubb Life leadership, and AI production systems.",
      ar: "مسيرة بدأت باهتمام ذاتي بالتسويق الإلكتروني وتشغيل حملات إعلانات فيسبوك لنفسي عام 2016 بالتوازي مع دراسة إدارة الأعمال واختبار برمجيات هواتف تكنو كامون C9، مروراً بفودافون بيزنس وتشانس ميديا والعطار، والقرية الذكية في ماجوريل (حتى أغسطس 2021)، وقيادة الفرق في تشب، وصولاً إلى أنظمة الإنتاج بالذكاء الاصطناعي.",
    },
  },
  works: {
    showreelEyebrow: { en: "Featured Cinema Reel", ar: "عرض الأعمال المرئية" },
    showreelTitle: {
      en: "Selected Commercials, Film & Direction",
      ar: "مختارات الإعلانات والأفلام والإخراج الإبداعي",
    },
    showreelSubtitle: {
      en: "Campaign films, commercial spots, and visual storytelling directed across hospitality, retail, corporate, and architecture accounts.",
      ar: "حملات مصورة وإعلانات تجارية وأفلام علامات تجارية عبر قطاعات الضيافة والتجزئة والشركات والمشاريع المعمارية.",
    },
    showreelCta: {
      en: "Watch Full Showreel on Vimeo",
      ar: "شاهد أعمال الفيديو على Vimeo",
    },
    eyebrow: { en: "Client Roster & Case Studies", ar: "قائمة الشركاء ودراسات الحالة" },
    title: { en: "Selected Works", ar: "أعمال مختارة" },
    openDossier: { en: "Project Brief", ar: "ملخص المشروع" },
    visitPage: { en: "Visit Client Page", ar: "زيارة صفحة العميل" },
    caseStudyCta: { en: "Case Study", ar: "دراسة الحالة" },
    scopeHeading: { en: "Scope & Execution", ar: "نطاق العمل والتنفيذ" },
    closeModal: { en: "Close project brief", ar: "إغلاق ملخص المشروع" },
  },
  systems: {
    title: { en: "AI Production Architecture", ar: "هندسة الإنتاج بالذكاء الاصطناعي" },
    subtitle: {
      en: "Since the 2023 wave, I have built full production engines combining strategic storytelling, programmatic motion systems, and grounded AI research to ship documentaries, commercials, and custom web experiences at scale.",
      ar: "منذ انطلاق موجة الذكاء الاصطناعي عام 2023، طورت محركات إنتاج متكاملة تجمع بين أدوات الأتمتة البرمجية وإدارة المعرفة لإنتاج الوثائقيات والحملات الإعلانية ومنصات الويب.",
    },
  },
  contact: {
    eyebrow: { en: "Direct Channel", ar: "القناة المباشرة" },
    title: { en: "Work With Belal", ar: "التعاون والعمل المباشر" },
    subtitle: {
      en: "For independent creative direction, commercial growth campaigns built on real buyer psychology, or automated AI media pipelines, initiate direct contact below.",
      ar: "لقيادة الإدارة الإبداعية، أو صياغة حملات النمو التجاري المرتكزة على سيكولوجية المشتري، أو بناء منظومات الإنتاج بالذكاء الاصطناعي، يمكنك بدء التواصل مباشرة.",
    },
    whatsappCta: { en: "WhatsApp Direct", ar: "واتساب مباشر" },
    facebookCta: { en: "Facebook", ar: "فيسبوك" },
    instagramCta: { en: "Instagram", ar: "إنستجرام" },
    vimeoCta: { en: "Watch Showreel on Vimeo", ar: "معرض الأعمال على فيميو" },
    copiedEmail: { en: "Copied begamal38@gmail.com", ar: "تم نسخ begamal38@gmail.com" },
  },
};

export const CAREER_CHRONICLE: ChronicleEntry[] = [
  {
    id: "bsc-commerce-2013-2017",
    period: { en: "2013 - 2017", ar: "2013 - 2017" },
    role: {
      en: "B.Sc. in Commerce · Business Administration",
      ar: "بكالوريوس التجارة · قسم إدارة الأعمال",
    },
    organization: {
      en: "Faculty of Commerce (English Section), Beni Suef University",
      ar: "كلية التجارة (شعبة اللغة الإنجليزية) · جامعة بني سويف",
    },
    location: { en: "Beni Suef, Egypt", ar: "بني سويف، مصر" },
    summary: {
      en: "Graduated in Business Administration (English Section), building the analytical and commercial foundation behind every brand strategy, sales team, and production system directed since.",
      ar: "التخرج في تخصص إدارة الأعمال باللغة الإنجليزية، مما أرسى القاعدة التجارية والتحليلية التي استندت إليها كافة استراتيجيات العلامات التجارية وقيادة الفرق والأنظمة الإنتاجية لاحقاً.",
    },
    highlights: {
      en: [
        "Business Administration major taught in English (2013 - 2017)",
        "Grounded in commercial economics, marketing management, and organizational operations",
      ],
      ar: [
        "دراسة تخصص إدارة الأعمال باللغة الإنجليزية خلال الفترة 2013 - 2017",
        "بناء الأساس العلمي في الإدارة التجارية والتسويق والعمليات المؤسسية",
      ],
    },
  },
  {
    id: "digital-marketing-origin-2016",
    period: { en: "2016", ar: "2016" },
    role: {
      en: "Self-Started Digital Marketer & Paid Media Buyer",
      ar: "بداية التسويق الإلكتروني · إطلاق حملات فيسبوك",
    },
    organization: {
      en: "Independent Personal Facebook Ad Campaigns",
      ar: "حملات إعلانية ممولة مستقلة على فيسبوك (التعلم الذاتي)",
    },
    location: { en: "Independent Practice", ar: "مبادرة ذاتية مستقلة" },
    summary: {
      en: "Entered digital marketing independently in 2016 during university, launching and managing my own Facebook advertising campaigns hands-on before joining any agency or enterprise team.",
      ar: "بدأت اهتمامي العملي بالتسويق الإلكتروني عام 2016 خلال سنوات الجامعة، عبر إطلاق وإدارة حملات إعلانات فيسبوك الممولة لنفسي بصورة مستقلة تماماً قبل الالتحاق بالوكالات والشركات.",
    },
    highlights: {
      en: [
        "Launched personal paid Facebook ad campaigns in 2016 through hands-on experimentation",
        "Mastered audience targeting, ad copy testing, and early digital buyer behavior independently",
        "Laid the real-world foundation that later shaped agency and client growth work",
      ],
      ar: [
        "بدء تجربة الإعلانات الممولة على فيسبوك وإدارة الحملات لنفسي عام 2016 بالتعلم التطبيقي المباشر",
        "إتقان أساسيات الاستهداف الإعلاني وصياغة المحتوى وفهم سلوك المشتري الرقمي مبكراً",
        "تأسيس القاعدة العملية المستقلة التي انطلقت منها لاحقاً نحو إدارة الوكالات ونمو العملاء",
      ],
    },
  },
  {
    id: "tecno-digital-2016-2017",
    period: { en: "2016 - 2017", ar: "2016 - 2017" },
    role: {
      en: "Pre-Release Software Beta Tester & Forum Moderator",
      ar: "مختبر برمجيات قبل الإطلاق وإدارة المنتدى الرسمي",
    },
    organization: {
      en: "TECNO Mobile (Camon C9 Firmware QA & Forum Moderation)",
      ar: "شركة تكنو موبايل · اختبار سوفت وير كامون C9 وإدارة المنتدى الرسمي",
    },
    location: { en: "Egypt", ar: "مصر" },
    logos: [
      {
        src: "/assets/clients/tecno.png",
        alt: { en: "TECNO Mobile", ar: "شعار تكنو موبايل" },
        bg: "#FFFFFF",
        wide: true,
      },
    ],
    summary: {
      en: "In parallel with launching independent Facebook campaigns in 2016, tested pre-release TECNO Mobile firmware per device model, contributing directly to improving the TECNO Camon C9 software build alongside moderating the official TECNO forum.",
      ar: "بالتوازي مع انطلاقتي في حملات التسويق الرقمي عام 2016، قمت باختبار نسخ السوفت وير التجريبية لهواتف تكنو موبايل قبل الإطلاق الرسمي لكل طراز، مع المساهمة المباشرة في تطوير إصدار هاتف تكنو كامون C9 (حملة \"السيلفي حكاية\") وإدارة المنتدى الرسمي.",
    },
    highlights: {
      en: [
        "Tested pre-release TECNO firmware builds per hardware model prior to rollout",
        "Directly contributed to refining the flagship TECNO Camon C9 software release",
        "Moderated the official TECNO Mobile community and structured launch feedback loops",
      ],
      ar: [
        "فحص واختبار البرمجيات التجريبية لهواتف تكنو حسب كل طراز قبل الطرح للجمهور",
        "الإسهام الفعلي في تطوير واستقرار نسخة السوفت وير لهاتف تكنو كامون C9",
        "إدارة المنتدى الرسمي لتكنو موبايل وتجميع تقارير الجودة الميدانية",
      ],
    },
  },
  {
    id: "vodafone-wasla-2017",
    period: { en: "2017", ar: "2017" },
    role: {
      en: "Enterprise Customer Operations",
      ar: "عمليات عملاء الشركات (قطاع الأعمال)",
    },
    organization: {
      en: "Vodafone Business Call Center, Wasla",
      ar: "مركز اتصال فودافون بيزنس · شركة وصلة",
    },
    location: {
      en: "Al-Korba, Heliopolis, Cairo",
      ar: "الكوربة، مصر الجديدة، القاهرة",
    },
    logos: [
      {
        src: "/assets/clients/vodafone.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
        bg: "#ED1E24",
      },
    ],
    summary: {
      en: "Frontline enterprise customer operations for Vodafone Business in Cairo, mastering high-stakes communication, objection handling, and commercial client psychology.",
      ar: "العمل في الخطوط الأمامية لعمليات عملاء الشركات في فودافون بيزنس بالقاهرة، وإتقان مهارات التواصل المهني تحت الضغط، ومعالجة الاعتراضات، وفهم سيكولوجية صناع القرار.",
    },
    highlights: {
      en: [
        "Al-Korba, Heliopolis operations floor",
        "Enterprise communication and objection handling",
        "Real-time commercial client psychology",
      ],
      ar: [
        "العمل الميداني بمركز عمليات الكوربة في مصر الجديدة",
        "إتقان التواصل المؤسسي ومعالجة اعتراضات العملاء بكفاءة",
        "فهم سيكولوجية العميل التجاري في المواقف التفاوضية المباشرة",
      ],
    },
  },
  {
    id: "chance-media-sector09-2018",
    period: { en: "2018", ar: "2018" },
    role: {
      en: "Creative Director & Agency Founder",
      ar: "مدير إبداعي ومؤسس وكالة مستقلة",
    },
    organization: {
      en: "Chance Media (Ahmed Akl) & SECTOR 09",
      ar: "تشانس ميديا (تأسيس الفنان أحمد عقل) ووكالة سيكتور 09",
    },
    location: { en: "Cairo / Beni Suef", ar: "القاهرة / بني سويف" },
    logos: [
      {
        src: "/assets/clients/chance-media.png",
        alt: { en: "Chance Media", ar: "شعار تشانس ميديا" },
        bg: "#0B0C0E",
        wide: true,
      },
    ],
    summary: {
      en: "Served as Creative Director at Chance Media (founded by renowned actor Ahmed Akl), leading commercial concepts, TV ad scripts, and campaign direction, alongside launching SECTOR 09 Advertising Agency and directing narrative short films.",
      ar: "توليت منصب المدير الإبداعي في وكالة تشانس ميديا (التي أسسها الفنان أحمد عقل)، حيث قدت صياغة المفاهيم الإعلانية وكتابة نصوص الإعلانات التلفزيونية والتوجيه الإبداعي للحملات، بالتوازي مع تأسيس وكالة سيكتور 09 وإخراج أفلام روائية قصيرة.",
    },
    highlights: {
      en: [
        "Creative Director at Chance Media (founded by actor Ahmed Akl)",
        "Commercial concepts, TV ad scripts, and real-estate / medical campaigns",
        "Founded SECTOR 09 Advertising Agency and directed narrative short films",
      ],
      ar: [
        "مدير إبداعي في وكالة تشانس ميديا (تأسيس الفنان أحمد عقل)",
        "تطوير المفاهيم التجارية وكتابة نصوص الإعلانات التلفزيونية وحملات العقارات والطب",
        "تأسيس وكالة سيكتور 09 للدعاية والإعلان وإخراج أفلام روائية قصيرة",
      ],
    },
  },
  {
    id: "al-attar-2018-2021",
    period: { en: "2018 - 2021", ar: "2018 - 2021" },
    role: {
      en: "Digital Marketing & Content Creation",
      ar: "التسويق الرقمي وصناعة المحتوى",
    },
    organization: { en: "Al-Attar Group", ar: "مجموعة العطار" },
    location: { en: "Commercial Retail", ar: "تجارة التجزئة" },
    logos: [
      {
        src: "/assets/clients/attar-group.jpg",
        alt: { en: "Al-Attar Group", ar: "شعار مجموعة العطار" },
        bg: "#FFFFFF",
      },
    ],
    summary: {
      en: "Led digital marketing, content creation, and high-volume commercial ad campaigns for Al-Attar Group through 2021.",
      ar: "قيادة استراتيجيات التسويق الرقمي، وصناعة المحتوى، وإدارة الحملات الإعلانية التجارية عالية الكثافة لمجموعة العطار حتى عام 2021.",
    },
    highlights: {
      en: [
        "Full-scale digital marketing and content production",
        "High-volume commercial advertising campaigns",
        "Multi-year brand growth through 2021",
      ],
      ar: [
        "إدارة متكاملة للتسويق الرقمي والإنتاج الإعلاني",
        "تنفيذ حملات إعلانية تجارية واسعة النطاق",
        "دعم نمو العلامة التجارية على مدار عدة سنوات حتى عام 2021",
      ],
    },
  },
  {
    id: "majorel-vodafone-2019-2021",
    period: { en: "2019 - Aug 2021", ar: "2019 - أغسطس 2021" },
    role: {
      en: "HR Recruitment Specialist (Through Aug 2021 · Top Achiever)",
      ar: "أخصائي توظيف وموارد بشرية (حتى أغسطس 2021 · الأعلى تحقيقاً)",
    },
    organization: {
      en: "Majorel Egypt (Global CX & BPO) · Smart Village, Beni Suef",
      ar: "ماجوريل مصر (تعهيد الأعمال وتجربة العملاء) · القرية الذكية، بني سويف",
    },
    location: { en: "Smart Village, Beni Suef", ar: "القرية الذكية، بني سويف" },
    logos: [
      {
        src: "/assets/clients/majorel.jpg",
        alt: { en: "Majorel", ar: "شعار ماجوريل" },
        bg: "#FFFFFF",
        wide: true,
      },
      {
        src: "/assets/clients/vodafone.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
        bg: "#ED1E24",
      },
      {
        src: "/assets/clients/uber.png",
        alt: { en: "Uber", ar: "شعار أوبر" },
        bg: "#000000",
        wide: true,
      },
    ],
    summary: {
      en: "Joined Smart Village in Beni Suef in 2019 on Vodafone's 888 queue before earning promotion to HR Recruitment Specialist at global BPO leader Majorel, recruiting for Vodafone and Uber through August 2021 and hiring ~550 employees in 2020 as Top Achiever.",
      ar: "التحقت بالقرية الذكية في بني سويف عام 2019 ضمن صف 888 في فودافون، ثم تمت ترقيتي إلى أخصائي توظيف وموارد بشرية في شركة ماجوريل العالمية لحسابات فودافون وأوبر حتى أغسطس 2021، حيث عينت نحو 550 موظفاً في عام 2020 كالأعلى تحقيقاً في الفريق.",
    },
    highlights: {
      en: [
        "Started in 2019 at Smart Village (Beni Suef) on Vodafone 888 before promotion to Majorel HR Recruitment",
        "Managed recruitment for Uber enterprise accounts (Rider, Driver, Uber Eats) & Vodafone queues (888, Cash, CVM, ADSL)",
        "Hired ~550 employees in 2020 as Top Achiever before concluding the Smart Village chapter in August 2021",
      ],
      ar: [
        "الانطلاق عام 2019 في القرية الذكية ببني سويف على خط 888 قبل الترقية لقسم التوظيف في ماجوريل",
        "إدارة ملفات التوظيف لحسابات أوبر (الركاب، السائقين، أوبر إيتس) وصفوف فودافون (888، كاش، الاحتفاظ، ADSL)",
        "تعيين نحو 550 موظفاً في عام 2020 والحصول على تكريم الأعلى تحقيقاً قبل ختام فترة القرية الذكية في أغسطس 2021",
      ],
    },
  },
  {
    id: "chubb-life-2022-2023",
    period: { en: "Sep 2022 - Jul 2023", ar: "سبتمبر 2022 - يوليو 2023" },
    role: {
      en: "Team Leader · Commercial Sales & Advisory",
      ar: "قائد فريق · المبيعات التجارية والاستشارات",
    },
    organization: {
      en: "Chubb Life Insurance Egypt",
      ar: "شركة تشب لتأمينات الحياة · مصر",
    },
    location: { en: "Egypt", ar: "مصر" },
    logos: [
      {
        src: "/assets/clients/chubb-life.png",
        alt: { en: "Chubb Life Insurance", ar: "شعار تشب لتأمينات الحياة" },
        bg: "#FFFFFF",
        wide: true,
      },
    ],
    summary: {
      en: "Led commercial team operations, coaching, and target execution at Chubb Life Insurance Egypt from September 2022 to July 2023, applying enterprise discipline built across Vodafone and Majorel.",
      ar: "قيادة العمليات التجارية للفريق، والتوجيه الميداني، وتحقيق المستهدفات البيعية في شركة تشب لتأمينات الحياة مصر خلال الفترة من سبتمبر 2022 حتى يوليو 2023.",
    },
    highlights: {
      en: [
        "Led commercial sales team execution and coaching across life protection offerings",
        "Tracked KPI discipline, daily pipeline conversions, and consultative advisory quality",
      ],
      ar: [
        "إدارة أداء الفريق التجاري والتدريب اليومي على مستهدفات حلول التأمين والحماية",
        "تطبيق انضباط مؤشرات الأداء وجودة الاستشارات البيعية الموجهة للعملاء",
      ],
    },
  },
  {
    id: "independent-director-2020",
    period: { en: "2020 - Present", ar: "2020 - حتى الآن" },
    role: {
      en: "Independent Creative Director & Growth Partner",
      ar: "مدير إبداعي مستقل وشريك نمو تجاري",
    },
    organization: {
      en: "Hossam Fekry (Since 2020) · Al-Qersh Mobile · Mohamed Samy · EL3SAL · Khatwa · Sanhok · Yasmine Salah",
      ar: "منصة حسام فكري (منذ 2020) · القرش موبايل · محمد سامي · العسال · خطوة · سانهوك · ياسمين صلاح",
    },
    location: { en: "Multi-Sector", ar: "قطاعات متعددة" },
    summary: {
      en: "Long-term independent partnerships across EdTech (beginning with Hossam Fekry Platform in 2020), mobile retail (3 branches), interior architecture, QSR hospitality, early education, gaming lounges, and beauty, driving market clarity and measurable client acquisition.",
      ar: "شراكات تنفيذية مستقلة طويلة الأمد بدأت في قطاع التعليم الإلكتروني مع منصة حسام فكري منذ عام 2020، وامتدت إلى تجارة الهواتف (3 فروع)، والديكور المعماري، والمطاعم، والحضانات، وصالات الألعاب، والتجميل لترسيخ الهوية وتحقيق المبيعات المباشرة.",
    },
    highlights: {
      en: [
        "EdTech growth partnership with Hossam Fekry Platform continuously active since 2020 alongside HossamFekry.com web systems",
        "Active brand direction across Al-Qersh Mobile (3 branches), Mohamed Samy Works, EL3SAL (140+ item menu), and Khatwa Nursery",
      ],
      ar: [
        "شراكة نمو وهوية ممتدة مع منصة حسام فكري منذ عام 2020 بالتوازي مع تجربة hossamfekry.com",
        "إدارة إبداعية وحملات نشطة للقرش موبايل (3 فروع)، ومحمد سامي، ومطعم العسال (140+ صنف)، وحضانة خطوة",
      ],
    },
  },
  {
    id: "ai-systems-2023",
    period: { en: "2023 - Present", ar: "2023 - حتى الآن" },
    role: {
      en: "AI Creative & Production Systems Architect",
      ar: "مهندس الإبداع وأنظمة الإنتاج بالذكاء الاصطناعي",
    },
    organization: {
      en: "Obolus (@obolus.explains) · THE ARCHITECT OF REALITY · AI Production Studio",
      ar: "Obolus · THE ARCHITECT OF REALITY · منظومة الإنتاج المحلية بالذكاء الاصطناعي",
    },
    location: { en: "Global Audiences", ar: "جمهور عالمي ومحلي" },
    summary: {
      en: "Deep hands-on mastery of AI production since the 2023 wave, architecting automated English documentary channels, programmatic motion pipelines, and custom interactive web systems.",
      ar: "إتقان عملي معمق لأنظمة الإنتاج بالذكاء الاصطناعي منذ موجة 2023، وتصميم قنوات وثائقية إنجليزية مؤتمتة وسير عمل برمجي متكامل لإنتاج الفيديو والمنصات الرقمية.",
    },
    highlights: {
      en: [
        "End-to-end English documentary systems (Obolus & THE ARCHITECT OF REALITY)",
        "Programmatic video, voice alignment, and custom web production engines built for speed and visual consistency",
      ],
      ar: [
        "بناء وإدارة قنوات وثائقية إنجليزية متكاملة (Obolus وTHE ARCHITECT OF REALITY)",
        "دمج أنظمة الأتمتة البرمجية وتوليد الفيديو والبحث الموثق في بيئة إنتاجية متكاملة",
      ],
    },
  },
];

export const CLIENT_STATUS_LABELS: Record<ClientStatus, LocalizedText> = {
  active: { en: "Active", ar: "نشط" },
  new: { en: "New", ar: "جديد" },
  leaving_soon: { en: "Leaving Soon", ar: "ينتهي قريباً" },
  ended: { en: "Ended", ar: "منتهٍ" },
};

export const CASE_STUDY_CATEGORIES: { id: CaseStudyCategoryId; label: LocalizedText }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "retail_hospitality", label: { en: "Retail & Hospitality", ar: "التجزئة والضيافة" } },
  { id: "brand_growth", label: { en: "Brand & Campaigns", ar: "العلامات والحملات" } },
  { id: "corporate_tech", label: { en: "Corporate & Tech", ar: "الشركات والتعليم والتقنية" } },
  { id: "beauty_lifestyle", label: { en: "Beauty & Lifestyle", ar: "التجميل وأسلوب الحياة" } },
  { id: "ai_systems", label: { en: "AI Media", ar: "ميديا الذكاء الاصطناعي" } },
];

/**
 * Sorted by lifecycle tier: Active partners first (Al-Qersh, Mohamed Samy, Hossam Fekry,
 * EL3SAL, Khatwa), followed by New & Leaving Soon studios (Obolus, THE ARCHITECT OF REALITY),
 * and Ended corporate/commercial engagements cleanly labeled.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "al-qersh-mobile",
    title: { en: "Al-Qersh Mobile", ar: "القرش موبايل" },
    status: "active",
    period: { en: "Since 2022", ar: "منذ 2022" },
    category: "retail_hospitality",
    discipline: {
      en: "Creative Direction · Motion Reels · Retail Growth",
      ar: "إدارة إبداعية · ريلز موشن · نمو الفروع",
    },
    image: "/assets/clients/alqersh.jpg",
    isMedallion: true,
    summary: {
      en: "Creative direction, scripted motion reels («Metro El-Qersh», «El-Basma», «1200 Build»), and Meta retail acquisition across 3 physical branches in Beni Suef since 2022 under the brand promise «Choose Right».",
      ar: "إدارة إبداعية كاملة، وإنتاج ريلز موشن سينمائية («مترو القرش»، «البصمة»، «القرش بيبني الـ1200»)، وحملات استحواذ عبر ميتا لـ 3 فروع في بني سويف منذ عام 2022 تحت شعار «موبايلك يستاهل أكتر… اختار صح».",
    },
    deliverables: {
      en: [
        "Unified creative positioning and «#Kallem_ElQersh» retail identity across 3 Beni Suef branches",
        "Scripted product & launch motion reels («Metro El-Qersh», «El-Basma», 8th Anniversary × Black Friday)",
        "Audio gear drops (itel BudsGo / Ace / N63) and verified after-sales warranty trust campaigns",
      ],
      ar: [
        "توحيد التموضع البصري ورسالة «#كلم_القرش» و«اختار صح» عبر 3 فروع بيع في بني سويف",
        "كتابة وإخراج ريلز موشن تجارية («مترو القرش»، «البصمة»، وحملات 8 سنين × الجمعة البيضاء)",
        "إطلاقات إكسسوارات الصوت (itel BudsGo / Ace / N63) وحملات ثقة الضمان وما بعد البيع",
      ],
    },
    campaigns: {
      en: ["Choose Right", "Metro Motion Reel", "8th Anniversary", "After-Sales Trust"],
      ar: ["اختار صح", "مترو القرش", "الذكرى الثامنة", "ثقة الضمان"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/elqrsh963",
      },
    ],
  },
  {
    id: "mohamed-samy",
    title: { en: "Mohamed Samy Works", ar: "محمد سامي للديكور والتشطيبات" },
    status: "active",
    period: { en: "Since 2022", ar: "منذ 2022" },
    category: "brand_growth",
    discipline: {
      en: "Engineering Positioning · Digital Showroom · Project Films",
      ar: "التموضع الهندسي · المعرض الرقمي · أفلام المشاريع",
    },
    image: "/assets/clients/mohamed-samy.png",
    isWhitePlate: true,
    summary: {
      en: "Engineering-first digital positioning, website direction (mohamedsamyworks.com), and on-site architectural storytelling across executed villas and commercial landmarks including After 8 Cafe, BUNO Cafe, Pyramids Heights, and Zahraa El-Maadi.",
      ar: "بناء تموضع هندسي رفيع المستوى، وتوجيه الموقع الإلكتروني (mohamedsamyworks.com)، وسرد بصري ميداني للمشاريع المنفذة من فيلات ومنشآت تجارية أبرزها After 8 Cafe، وBUNO Cafe، وبيراميدز هايتس، وزهراء المعادي.",
    },
    deliverables: {
      en: [
        "High-ticket positioning shifting buyer focus from price quotes to engineered build discipline («Bel-Qalam Wel Mastara»)",
        "Direction of mohamedsamyworks.com digital showroom featuring executed case documentation",
        "Commercial venue showcase films highlighting After 8 Cafe, BUNO Cafe, and Pyramids Heights",
      ],
      ar: [
        "تموضع هندسي ينقل قرار العميل من المقارنة السعرية إلى انضباط التنفيذ («بالقلم والمسطرة»)",
        "تصميم وتوجيه المعرض الرقمي الرسمي mohamedsamyworks.com لتوثيق المشاريع الميدانية",
        "أفلام عرض لمشاريع الديكور التجاري والسكني: After 8 Cafe وBUNO Cafe وبيراميدز هايتس",
      ],
    },
    campaigns: {
      en: ["Engineered Finishing", "After 8 Cafe & BUNO", "mohamedsamyworks.com"],
      ar: ["بالقلم والمسطرة", "After 8 Cafe وBUNO", "المعرض الرقمي"],
    },
    links: [
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "https://www.mohamedsamyworks.com",
      },
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/mohamedsamyworks/",
      },
    ],
  },
  {
    id: "hossam-fekry",
    title: { en: "Hossam Fekry Platform", ar: "منصة حسام فكري التعليمية" },
    status: "active",
    period: { en: "Since 2020", ar: "منذ 2020" },
    category: "corporate_tech",
    discipline: {
      en: "Since 2020 Growth Partner · EdTech UX · Student Reels",
      ar: "شريك نمو منذ 2020 · تجربة المنصة · ريلز الطلاب",
    },
    image: "/assets/clients/hossam-fekry.png",
    isWhitePlate: true,
    summary: {
      en: "Six-year continuous creative and digital partnership since 2020 building the nationwide chemistry brand, engineering hossamfekry.com experience Architecture, and producing weekly chemistry lesson reels that convert Thanawiya Amma students every academic cycle.",
      ar: "شراكة ممتدة منذ عام 2020 لبناء الحضور الرقمي والهوية التعليمية في الكيمياء على مستوى الجمهورية، وتطوير تجربة المنصة التفاعلية hossamfekry.com، وإنتاج ريلز الدروس الأسبوعية وحملات التسجيل الطلابي.",
    },
    deliverables: {
      en: [
        "Long-term creative direction & annual Thanawiya Amma enrollment strategy running continuously since 2020",
        "Custom scroll-driven web platform design & ongoing engineering on hossamfekry.com",
        "Weekly chemistry explanation reels paired with structured visual hook packaging and Arabic captions",
      ],
      ar: [
        "شراكة توجيه إبداعي واستراتيجية تسجيل سنوية لطلاب الثانوية العامة ممتدة منذ عام 2020",
        "هندسة وتطوير تجربة الويب التفاعلية الخاصة بالمنصة على نطاق hossamfekry.com",
        "إنتاج أسبوعي لريلز شروحات الكيمياء مع معالجة بصرية موحدة وحملات الاستقطاب الطلابي",
      ],
    },
    campaigns: {
      en: ["Partner Since 2020", "hossamfekry.com", "Chemistry Reels Engine"],
      ar: ["شريك منذ 2020", "منصة hossamfekry.com", "ريلز الكيمياء"],
    },
    links: [
      {
        label: { en: "Official Platform", ar: "المنصة الرسمية" },
        url: "https://www.hossamfekry.com",
      },
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/mr.hossamfekry/",
      },
    ],
  },
  {
    id: "el3sal",
    title: { en: "EL3SAL Crepe & Pizza", ar: "مطعم العسال" },
    status: "active",
    period: { en: "QSR Partner", ar: "شريك قطاع المطاعم" },
    category: "retail_hospitality",
    discipline: {
      en: "140+ Menu Architecture · Craft Reels · Direct Meta Orders",
      ar: "هندسة قائمة 140+ صنف · ريلز الطعام · مسارات الطلب المباشر",
    },
    image: "/assets/clients/el3sal.jpg",
    isMedallion: true,
    summary: {
      en: "Complete re-architecture of a 140+ item Beni Suef menu (crepe, pizza, pasta, and Syrian sandwiches) aligned with a custom visual identity, paired with high-tempo kitchen craft reels and Meta CTR Messages funnels turning scrollers into hot orders.",
      ar: "إعادة بناء شاملة لقائمة طعام تضم أكثر من 140 صنفاً (كريب، بيتزا، مكرونات، وساندويتشات سوري) مع هوية لونية موحدة في بني سويف، مقترنة بريلز مطبخ عالية الإيقاع («العسال × سيستم») ومسارات ميتا للطلب الفوري.",
    },
    deliverables: {
      en: [
        "Structured 140+ SKU digital & print menu engineering designed to maximize add-ons and average basket size",
        "High-tempo food craft & signature offer reels («EL3SAL × System», Chicken Ranch, Doner Crunchy)",
        "Performance Meta CTR Messages campaigns geo-targeted for rapid takeaway and delivery orders",
      ],
      ar: [
        "هيكلة قائمة تضم 140+ صنفاً رقمياً ومطبوعاً لرفع وضوح الاختيار وزيادة متوسط الفاتورة",
        "إنتاج ريلز تحضير الطعام والإطلاقات المميزة («العسال × سيستم»، تشيكن رانش، دونر كرانشي)",
        "حملات ميتا جغرافية موجهة إلى مسارات الرسائل لتحويل المشاهدات إلى طلبات توصيل سريعة",
      ],
    },
    campaigns: {
      en: ["140+ Item Menu", "EL3SAL × System", "Meta Order Funnels"],
      ar: ["قائمة 140+ صنف", "العسال × سيستم", "مسارات الطلب"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/EL3salFoods/",
      },
    ],
  },
  {
    id: "khatwa-academy",
    title: { en: "Khatwa Academy & Nursery", ar: "أكاديمية وحضانة خطوة" },
    status: "active",
    period: { en: "Education Partner", ar: "شريك قطاع التعليم" },
    category: "corporate_tech",
    discipline: {
      en: "3-Stage Curriculum Messaging · Real Reels · Parent Leads",
      ar: "رسائل المراحل التعليمية · ريلز واقعية · استقطاب أولياء الأمور",
    },
    image: "/assets/clients/khatwa.png",
    isWhitePlate: true,
    summary: {
      en: "Mother-first educational marketing, khatwa.site web direction, and real-classroom documentation reels for Khatwa Nursery in New Beni Suef, translating Post-Infancy, Noor Al-Bayan Foundation, and KG milestones into qualified parent enrollment leads.",
      ar: "استراتيجية تسويق تعليمي تخاطب الأمهات بوضوح في بني سويف الجديدة مع توجيه موقع khatwa.site وتوثيق الأنشطة الواقعية لثلاث مراحل تعليمية (ما بعد الرضاعة، والتأسيس بنور البيان، ومرحلة التمهيدي KG) لجذب طلبات التسجيل الجادة.",
    },
    deliverables: {
      en: [
        "Stage-by-stage parent messaging clarity across Post-Infancy, Foundation / Noor Al-Bayan, and KG tracks",
        "Unstaged real classroom activity reels grounded in mother psychology and safety reassurance («Step by Step»)",
        "Direct Meta Messenger & WhatsApp parent inquiry qualification workflows linked with khatwa.site",
      ],
      ar: [
        "صياغة واضحة للمنهجية عبر المراحل الثلاث: ما بعد الرضاعة، التأسيس ونور البيان، والتمهيدي KG",
        "إنتاج ريلز توثيقية واقعية من داخل الفصول تبني الطمأنينة والوضوح تحت شعار «بنبني الأساس.. خطوة بخطوة»",
        "تأهيل استفسارات أولياء الأمور عبر رسائل فيسبوك وواتساب المرتبطة بموقع khatwa.site",
      ],
    },
    campaigns: {
      en: ["3-Stage Track Clarity", "Real Activity Reels", "khatwa.site"],
      ar: ["وضوح المراحل الثلاث", "ريلز الفصول الواقعية", "موقع khatwa.site"],
    },
    links: [
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "https://khatwa.site",
      },
    ],
  },
  {
    id: "obolus",
    title: { en: "Obolus (@obolus.explains)", ar: "Obolus (@obolus.explains)" },
    status: "new",
    period: { en: "AI Media Studio", ar: "استوديو إنتاج ذكي" },
    category: "ai_systems",
    discipline: {
      en: "Tier-1 Economic History · Custom 2D Vector Engine",
      ar: "التاريخ الاقتصادي الإنجليزي · محرك رسوم متجهية 2D",
    },
    image: "/assets/clients/obolus-mark.jpg",
    isMedallion: true,
    summary: {
      en: "Tier-1 English economic history 2D animated documentary channel powered by the custom Obolus Visual Engine v2.1, producing forensic primary-source films covering the 1971 Bretton Woods collapse and the 1602 Dutch East India stock market.",
      ar: "قناة وثائقية إنجليزية بالرسوم المتحركة ثنائية الأبعاد تتناول التاريخ الاقتصادي والأنظمة النقدية عبر محرك Obolus Visual Engine v2.1، بدءاً بأفلام موثقة المصادر حول فك ارتباط الدولار بالذهب عام 1971 ونشأة أول سوق أسهم عام 1602.",
    },
    deliverables: {
      en: [
        "In-house Obolus Visual Engine v2.1 driving custom lineless editorial vectors and historical scene lighting",
        "Flagship documented scripts: «Why Money Stopped Being Real in 1971» and «1602 Stock Market Origins»",
        "Automated research verification, voice-aligned subtitle timing, and custom scored sound mastering",
      ],
      ar: [
        "تشغيل محرك Obolus Visual Engine v2.1 لتوليد مشاهد متجهية تحريرية بلا حواف وتلوين تاريخي منضبط",
        "كتابة وإخراج حلقات موثقة المصادر: أزمة التحول النقدي 1971 ونشأة شركة الهند الشرقية والبورصة 1602",
        "أتمتة مطابقة الحقائق ومزامنة التعليق الصوتي والهندسة الصوتية الكاملة لكل فيلم",
      ],
    },
    campaigns: {
      en: ["1971 Monetary Shift", "1602 Stock Market", "Visual Engine v2.1"],
      ar: ["أزمة 1971 النقدية", "بورصة 1602", "محرك الرسوم v2.1"],
    },
    links: [
      {
        label: { en: "YouTube Channel", ar: "قناة يوتيوب" },
        url: "https://www.youtube.com/@obolus.explains",
      },
    ],
  },
  {
    id: "architect-of-reality",
    title: { en: "THE ARCHITECT OF REALITY", ar: "THE ARCHITECT OF REALITY" },
    status: "leaving_soon",
    period: { en: "Final Run · Sunset", ar: "مرحلة الإغلاق القريب" },
    category: "ai_systems",
    discipline: {
      en: "International English Channel · Programmatic Visual System",
      ar: "قناة إنجليزية دولية · نظام عرض برمجي",
    },
    image: "/assets/clients/architect-of-reality.png",
    isWhitePlate: true,
    summary: {
      en: "International English psychology and philosophical cinema channel (featuring THE MIND MANUAL series), engineered on a custom programmatic Remotion rendering pipeline before winding down toward archive sunset as studio focus consolidates onto Obolus.",
      ar: "قناة إنجليزية عالمية في السرد النفسي والفلسفي (سلسلة THE MIND MANUAL) مبنية على محرك تحريك برمجي مخصص قبل دخولها مرحلة الإنهاء التدريجي القريب وتوجيه تركيز الاستوديو بالكامل نحو Obolus.",
    },
    deliverables: {
      en: [
        "Programmatic A-roll & B-roll scene architecture engineered for long-form audience retention",
        "Automated telemetry, typography HUD components, and strict multi-stage visual QA verification",
        "Series packaging including THE MIND MANUAL crafted prior to channel transition and sunset",
      ],
      ar: [
        "هندسة مشاهد طويلة المدى تجمع بين البطاقات التفسيرية والمقاطع التوضيحية لرفع معدل الاحتفاظ",
        "مراجعة جودة بصرية برمجية وتكامل وحدات البيانات والنصوص المصاحبة للسرد الإنجليزي",
        "تطوير وتغليف سلسلة THE MIND MANUAL قبيل مرحلة انتهاء القناة وإغلاق المشروع",
      ],
    },
    campaigns: {
      en: ["THE MIND MANUAL", "Final Chapters", "Programmatic Engine"],
      ar: ["دليل العقل", "المواسم الختامية", "محرك العرض البرمجي"],
    },
    links: [
      {
        label: { en: "YouTube Channel", ar: "قناة يوتيوب" },
        url: "https://www.youtube.com/@thearchitectofreality963",
      },
    ],
  },
  {
    id: "chubb-life",
    title: { en: "Chubb Life Insurance Egypt", ar: "تشب لتأمينات الحياة · مصر" },
    status: "ended",
    period: { en: "Sep 2022 - Jul 2023", ar: "سبتمبر 2022 - يوليو 2023" },
    category: "corporate_tech",
    discipline: {
      en: "Unit Team Leader · Consultative Sales · KPI Governance",
      ar: "قائد فريق · الاستشارات البيعية · حوكمة المؤشرات",
    },
    image: "/assets/clients/chubb-life.png",
    isWhitePlate: true,
    summary: {
      en: "Led commercial unit operations and daily field coaching as Team Leader at Chubb Life Insurance Egypt from September 2022 through July 2023, enforcing structured needs-analysis selling and monthly quota governance.",
      ar: "قيادة العمليات البيعية والتدريب الميداني اليومي بصفتي قائد فريق في تشب لتأمينات الحياة مصر (سبتمبر 2022 - يوليو 2023)، مع إرساء انضباط تحليل الاحتياج المالي وتحقيق مستهدفات المحافظ الشهرية.",
    },
    deliverables: {
      en: [
        "Hands-on onboarding, roleplay coaching, and daily field accompaniment for life protection advisors",
        "Daily pipeline conversion tracking, objection-handling playbooks, and monthly quota delivery",
        "Consultative long-term financial planning pitches aligned with corporate underwriting compliance",
      ],
      ar: [
        "تدريب الأعضاء الجدد وتنفيذ محاكاة البيع والمرافقة الميدانية لمستشاري الحماية المالية",
        "متابعة مؤشرات التحويل اليومية وبناء أدلة التعامل مع اعتراضات العملاء وتحقيق المستهدفات",
        "صياغة عروض التخطيط المالي طويل الأجل وفق المعايير الرقابية والاكتوارية للشركة",
      ],
    },
    campaigns: {
      en: ["Unit Coaching", "Pipeline Governance", "Advisory Sales"],
      ar: ["تدريب الفريق", "حوكمة المبيعات", "الاستشارات المالية"],
    },
    links: [
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "https://life.chubb.com/eg-en/",
      },
    ],
  },
  {
    id: "al-attar-group",
    title: { en: "Al-Attar Group", ar: "مجموعة العطار" },
    status: "ended",
    period: { en: "2018 - 2021", ar: "2018 - 2021" },
    category: "brand_growth",
    discipline: {
      en: "Performance Media · Content Direction · Catalog Growth",
      ar: "تسويق الأداء · توجيه المحتوى · حملات الكتالوج",
    },
    image: "/assets/clients/attar-group.jpg",
    isWhitePlate: true,
    summary: {
      en: "Directed performance social advertising, product showcase production, and multi-season demand campaigns for Al-Attar Group from 2018 through 2021, scaling regional awareness across wholesale and retail product lines.",
      ar: "إدارة الحملات الإعلانية الممولة، وإنتاج محتوى عرض المنتجات، وتنفيذ المواسم الترويجية لمجموعة العطار خلال الفترة من 2018 حتى 2021 لتوسيع الانتشار الإقليمي عبر خطوط البيع بالتجزئة والجملة.",
    },
    deliverables: {
      en: [
        "Multi-year paid Facebook & Instagram demand generation across diverse consumer SKUs",
        "Product photography direction and offer-driven commercial graphics scaled across seasonal peaks",
        "Continuous regional audience expansion connecting brick-and-mortar supply with digital buyers",
      ],
      ar: [
        "إدارة حملات فيسبوك وإنستجرام الممولة عبر مختلف خطوط المنتجات طوال 3 سنوات",
        "الإشراف على تصوير المنتجات وتصميم الحملات الموسمية عالية التفاعل",
        "توسيع قاعدة المشترين إقليمياً وربط نقاط البيع المباشر بحركة الطلب الرقمي",
      ],
    },
    campaigns: {
      en: ["Paid Demand Scale", "Seasonal Catalog", "2018 - 2021"],
      ar: ["توسع الإعلانات", "العروض الموسمية", "2018 - 2021"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/attargroup1999",
      },
    ],
  },
  {
    id: "chance-media",
    title: { en: "Chance Media (Ahmed Akl)", ar: "تشانس ميديا (أحمد عقل)" },
    status: "ended",
    period: { en: "2018", ar: "2018" },
    category: "brand_growth",
    discipline: {
      en: "Agency Creative Director · TV Scripts · SECTOR 09",
      ar: "المدير الإبداعي للوكالة · نصوص تلفزيونية · سيكتور 09",
    },
    image: "/assets/clients/chance-media.png",
    summary: {
      en: "Appointed Creative Director at Chance Media (founded by actor Ahmed Akl), authoring television commercial scripts and campaign treatments across real-estate developments and medical clinics alongside launching SECTOR 09.",
      ar: "شغلت منصب المدير الإبداعي بوكالة تشانس ميديا (التي أسسها الفنان أحمد عقل)، حيث كتبت نصوص إعلانات تلفزيونية وأدرت المعالجة الإعلانية لحملات عقارية وطبية، بالتوازي مع إطلاق وكالة SECTOR 09.",
    },
    deliverables: {
      en: [
        "Concept development & television commercial scriptwriting tailored for mass Egyptian viewership",
        "Creative direction for real-estate development launches and specialized medical center campaigns",
        "Agency production supervision alongside independent short film direction under SECTOR 09",
      ],
      ar: [
        "كتابة سيناريوهات الإعلانات التلفزيونية وصياغة الزوايا الإبداعية المخاطبة للجمهور العام",
        "توجيه حملات الإطلاق للمشاريع العقارية والمراكز الطبية المتخصصة",
        "الإشراف على التنفيذ الإنتاجي للوكالة بالتوازي مع إخراج أعمال مستقلة عبر سيكتور 09",
      ],
    },
    campaigns: {
      en: ["TV Scripts", "Real Estate & Medical", "SECTOR 09"],
      ar: ["نصوص التلفزيون", "العقارات والطب", "سيكتور 09"],
    },
    links: [
      {
        label: { en: "Agency Website", ar: "موقع الوكالة" },
        url: "https://chancemedia.com.eg/",
      },
    ],
  },
  {
    id: "tecno-camon-c9",
    title: { en: "TECNO Mobile · Camon C9", ar: "تكنو موبايل · كامون C9" },
    status: "ended",
    period: { en: "2016 - 2017 · QA", ar: "2016 - 2017 · اختبار البرمجيات" },
    category: "corporate_tech",
    discipline: {
      en: "Pre-Release Firmware QA · Bug Triage · Forum Moderation",
      ar: "اختبار السوفت وير التجريبي · توثيق الأعطال · إدارة المنتدى",
    },
    image: "/assets/clients/tecno.png",
    isWhitePlate: true,
    summary: {
      en: "Executed pre-release device firmware stress-testing per hardware model for TECNO Mobile, directly shaping software stability prior to the flagship TECNO Camon C9 release («El-Selfie Hekaya») while moderating the official brand forum.",
      ar: "تنفيذ اختبارات السوفت وير التجريبية قبل الطرح الرسمي لهواتف تكنو موبايل لكل طراز، مع إسهام مباشر في تحسين استقرار نظام هاتف تكنو كامون C9 (حملة «السيلفي حكاية») وإدارة المنتدى الرسمي للمستخدمين.",
    },
    deliverables: {
      en: [
        "Model-by-model beta ROM testing, camera ISP regression logging, and pre-OTA stability validation",
        "Direct software refinement contributions embedded into the retail TECNO Camon C9 firmware build",
        "Moderation of official TECNO Egypt online forum and user telemetry issue aggregation",
      ],
      ar: [
        "فحص نسخ النظام التجريبية لكل طراز هاتف وتسجيل تقارير الأخطاء قبل اعتماد التحديثات الهوائية",
        "إسهامات فنية مباشرة لتحسين أداء نظام التشغيل وكاميرا هاتف تكنو كامون C9",
        "إدارة المنتدى الرسمي لتكنو مصر وتصنيف ملاحظات المستخدمين الفنية لفرق التطوير",
      ],
    },
    campaigns: {
      en: ["TECNO Camon C9", "Firmware Beta QA", "El-Selfie Hekaya"],
      ar: ["تكنو كامون C9", "اختبار البرمجيات", "السيلفي حكاية"],
    },
    links: [],
  },
  {
    id: "sanhok",
    title: { en: "Sanhok PlayStation & Café", ar: "سانهوك للترفيه والكافيه" },
    status: "ended",
    period: { en: "Commercial Partner", ar: "شريك تجاري" },
    category: "retail_hospitality",
    discipline: {
      en: "Gen-Z Hook Reels · Hyper-Local Reach · Venue Positioning",
      ar: "ريلز الشباب · الاستهداف الجغرافي · هوية الوجهة الترفيهية",
    },
    image: "/assets/clients/sanhok.jpg",
    isMedallion: true,
    summary: {
      en: "Built youth-culture social positioning, fast-cut promotional video hooks, and hyper-local Meta footfall campaigns keeping PlayStation arenas and café seating filled across weekday and tournament hours.",
      ar: "بناء هوية اجتماعية تخاطب ثقافة الشباب عبر افتتاحيات فيديو سريعة الإيقاع وحملات استهداف جغرافي محلية عبر ميتا، لضمان امتلاء صالات البلايستيشن وطاولات الكافيه طوال أيام الأسبوع والبطولات.",
    },
    deliverables: {
      en: [
        "High-energy Gen-Z motion hooks & gaming tournament hype reels driving immediate shareability",
        "Hyper-local 3km-radius paid social reach campaigns maximizing weekday off-peak utilization",
        "Distinct visual brand language blending esports atmosphere with café hospitality",
      ],
      ar: [
        "تصميم مقاطع فيديو شبابية سريعة الإيقاع وإعلانات تحفيزية لبطولات الألعاب لرفع التفاعل والمشاركة",
        "حملات ميتا ممولة بنطاق جغرافي دقيق لتنشيط الإقبال اليومي خلال فترات ما قبل الذروة",
        "صياغة طابع بصري يدمج أجواء المنافسات الإلكترونية مع تجربة الكافيه العصرية",
      ],
    },
    campaigns: {
      en: ["Esports Lounges", "3km Geo Reach", "Youth Hook Reels"],
      ar: ["صالات الألعاب", "الاستهداف الجغرافي", "مقاطع الشباب"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/Sanhok963",
      },
    ],
  },
  {
    id: "yasmine-salah",
    title: { en: "Yasmine Salah Makeup Artist", ar: "ياسمين صلاح · خبيرة تجميل" },
    status: "ended",
    period: { en: "Commercial Partner", ar: "شريك تجاري" },
    category: "beauty_lifestyle",
    discipline: {
      en: "Bridal Portfolio Direction · Instagram Positioning · Bookings",
      ar: "توجيه بورتفوليو العرائس · تموضع إنستجرام · الحجوزات",
    },
    image: "/assets/clients/yasmine-salah.jpg",
    isPortraitMedallion: true,
    summary: {
      en: "Refined personal brand positioning and Instagram visual presentation for Makeup Artist Yasmine Salah, curating signature bridal transformation showcases engineered to attract qualified seasonal booking inquiries.",
      ar: "صقل الهوية الشخصية والعرض البصري على إنستجرام لخبيرة التجميل ياسمين صلاح، مع تنسيق عروض إطلالات العرائس وإبراز دقة التفاصيل لتوجيه المتابعين نحو طلبات الحجز الجادة.",
    },
    deliverables: {
      en: [
        "Cohesive bridal portfolio curation & studio lighting presentation standards on Instagram",
        "Seasonally timed social booking campaigns converting organic lookbook reach into appointments",
        "Elevated tone of voice distinguishing signature craft in competitive local beauty markets",
      ],
      ar: [
        "تنظيم المعرض البصري لإطلالات العرائس وتوحيد معايير العرض على منصة إنستجرام",
        "حملات مواسم الزفاف المحولة للتفاعل العضوي إلى طلبات حجز ومواعيد مؤكدة",
        "بناء صوت علامة أنيق يرسخ التميز الحرفي في قطاع التجميل المحلي",
      ],
    },
    campaigns: {
      en: ["Bridal Lookbook", "Booking Flow", "Instagram Direction"],
      ar: ["إطلالات العرائس", "مسار الحجوزات", "هوية إنستجرام"],
    },
    links: [
      {
        label: { en: "Instagram", ar: "إنستجرام" },
        url: "https://www.instagram.com/yasmin_salah_makeupartist?cnvx=MW11MnY4aHo3Z2lkOA==",
      },
    ],
  },
];

export const AI_PRODUCTION_STACK: StackTool[] = [
  {
    name: { en: "Creative System Orchestration", ar: "تخطيط وهندسة الأنظمة" },
    domain: { en: "Autonomous Web & Brand Systems", ar: "بناء المنصات والأنظمة" },
    role: {
      en: "Turning strategic briefs into fast, high-converting web experiences, automated visual quality gates, and structured brand architecture.",
      ar: "تحويل الموجزات الاستراتيجية إلى منصات ويب متكاملة، ومراجعات بصرية مؤتمتة، وهوية رقمية جاهزة للإطلاق.",
    },
  },
  {
    name: { en: "Programmatic Video Engines", ar: "محركات الفيديو المبرمجة" },
    domain: { en: "Remotion & Automated Motion", ar: "إنتاج الفيديو التجاري آلياً" },
    role: {
      en: "Frame-accurate commercial reels and modular video pipelines engineered for consistent visual identity at scale.",
      ar: "إنتاج مقاطع إعلانية بدقة الإطار الواحد ومنظومات فيديو معيارية تحافظ على اتساق الهوية البصرية لكل علامة.",
    },
  },
  {
    name: { en: "Grounded Documentary Pipelines", ar: "منظومة البحث والمعرفة الموثقة" },
    domain: { en: "Source-Verified Storytelling", ar: "بحث موثق وسرد بصري" },
    role: {
      en: "Fact-checked long-form scripts, editorial voice pacing, and animated documentary worlds built for international channels.",
      ar: "إعداد بحوث ونصوص طويلة مدققة الحقائق وبناء عوالم وثائقية متحركة لقنوات دولية.",
    },
  },
];
