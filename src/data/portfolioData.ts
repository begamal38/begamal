export type Lang = "en" | "ar";

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
  invert?: boolean;
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
  period: LocalizedText;
  category: Exclude<CaseStudyCategoryId, "all">;
  discipline: LocalizedText;
  image?: string;
  invertLogo?: boolean;
  isWideLogo?: boolean;
  isMedallion?: boolean;
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
    en: "Creative Director, Digital Marketing Strategist, and AI Production Architect. Ten years across commercial direction, corporate leadership (Chubb Life & Majorel), and automated media systems since 2016.",
    ar: "مدير إبداعي، ومخطط استراتيجيات تسويق رقمي، ومهندس أنظمة إنتاج بالذكاء الاصطناعي. عشر سنوات من التوجيه التجاري، والقيادة المؤسسية في تشب وماجوريل، وبناء منظومات الإنتاج الإعلامي المؤتمتة منذ عام 2016.",
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
      en: "From Business Administration studies and TECNO Camon C9 firmware testing to Vodafone Business Cairo, Majorel HR, Chubb Life Insurance leadership, Chance Media, and AI production systems.",
      ar: "مسيرة متدرجة من دراسة إدارة الأعمال واختبار برمجيات هواتف تكنو، مروراً بعمليات فودافون بيزنس وماجوريل العالمية، وقيادة الفرق في تشب لتأمينات الحياة، وتشانس ميديا، وصولاً إلى أنظمة الإنتاج بالذكاء الاصطناعي.",
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
    facebookCta: { en: "Message on Facebook", ar: "التواصل عبر فيسبوك" },
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
    id: "tecno-digital-2016-2017",
    period: { en: "2016 - 2017", ar: "2016 - 2017" },
    role: {
      en: "Pre-Release Software Beta Tester & Digital Marketing Start",
      ar: "مختبر برمجيات قبل الإطلاق وبداية التسويق الرقمي",
    },
    organization: {
      en: "TECNO Mobile (Camon C9 Firmware QA & Forum Moderation)",
      ar: "شركة تكنو موبايل · اختبار سوفت وير كامون C9 وإدارة المنتدى الرسمي",
    },
    location: { en: "Egypt", ar: "مصر" },
    summary: {
      en: "Tested pre-release TECNO Mobile firmware per device model, contributing directly to improving the TECNO Camon C9 software build alongside official forum moderation, while entering digital marketing in 2016.",
      ar: "اختبار نسخ السوفت وير التجريبية لهواتف تكنو موبايل قبل الإطلاق الرسمي لكل طراز، مع المساهمة المباشرة في تطوير إصدار هاتف تكنو كامون C9 (حملة \"السيلفي حكاية\") بالتوازي مع إدارة المنتدى الرسمي وانطلاقة التسويق الرقمي عام 2016.",
    },
    highlights: {
      en: [
        "Tested pre-release TECNO firmware builds per hardware model prior to rollout",
        "Directly contributed to refining the flagship TECNO Camon C9 software release",
        "Moderated official TECNO Mobile community while launching digital marketing practice in 2016",
      ],
      ar: [
        "فحص واختبار البرمجيات التجريبية لهواتف تكنو حسب كل طراز قبل الطرح للجمهور",
        "الإسهام الفعلي في تطوير واستقرار نسخة السوفت وير لهاتف تكنو كامون C9",
        "إدارة المجتمع الرسمي لتكنو بالتوازي مع دخول سوق التسويق الرقمي عام 2016",
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
        src: "/assets/clients/vodafone-dark.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
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
        src: "/assets/clients/chance-media-black.png",
        alt: { en: "Chance Media", ar: "شعار تشانس ميديا" },
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
    id: "majorel-vodafone-2019-2022",
    period: { en: "2019 - 2022", ar: "2019 - 2022" },
    role: {
      en: "HR Recruitment Specialist (3 Years · Top Achiever)",
      ar: "أخصائي توظيف وموارد بشرية (3 سنوات · الأعلى تحقيقاً)",
    },
    organization: {
      en: "Majorel Egypt (Global CX & BPO) · Smart Village, Beni Suef",
      ar: "ماجوريل مصر (تعهيد الأعمال وتجربة العملاء) · القرية الذكية، بني سويف",
    },
    location: { en: "Smart Village, Beni Suef", ar: "القرية الذكية، بني سويف" },
    logos: [
      {
        src: "/assets/clients/majorel-dark.png",
        alt: { en: "Majorel", ar: "شعار ماجوريل" },
        wide: true,
      },
      {
        src: "/assets/clients/vodafone-dark.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
        wide: true,
      },
      {
        src: "/assets/clients/uber.png",
        alt: { en: "Uber", ar: "شعار أوبر" },
      },
    ],
    summary: {
      en: "Joined Vodafone Smart Village in Beni Suef in 2019 on the 888 queue, then earned promotion to HR Recruitment Specialist at global BPO leader Majorel for 3 years recruiting for Vodafone and Uber, hiring ~550 employees in 2020 as Top Achiever.",
      ar: "التحقت بالقرية الذكية في بني سويف عام 2019 ضمن صف 888 في فودافون، ثم تمت ترقيتي إلى أخصائي توظيف وموارد بشرية في شركة ماجوريل العالمية لمدة 3 سنوات لحسابات فودافون وأوبر، حيث عينت نحو 550 موظفاً في عام 2020 كالأعلى تحقيقاً في الفريق.",
    },
    highlights: {
      en: [
        "Started in 2019 at Smart Village (Beni Suef) on Vodafone 888 before promotion to Majorel HR Recruitment",
        "Managed recruitment for Uber enterprise accounts: Uber Rider, Uber Driver, and Uber Eats",
        "Managed recruitment across Vodafone queues: 888, Vodafone Cash, CVM, and ADSL",
        "Hired ~550 employees in 2020 and recognized as Top Achiever (Beni Suef Recruitment Team)",
      ],
      ar: [
        "الانطلاق عام 2019 في القرية الذكية ببني سويف على خط 888 قبل الترقية لقسم التوظيف في ماجوريل",
        "إدارة ملفات التوظيف لحسابات أوبر: أوبر للركاب، وأوبر للسائقين، وأوبر إيتس",
        "إدارة التوظيف لصفوف فودافون: 888، وفودافون كاش، والاحتفاظ بالعملاء، والإنترنت الأرضي",
        "تعيين نحو 550 موظفاً في عام 2020 والحصول على تكريم الأعلى تحقيقاً في فريق توظيف بني سويف",
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
        invert: true,
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
    id: "independent-director-2022",
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    role: {
      en: "Independent Creative Director & Growth Partner",
      ar: "مدير إبداعي مستقل وشريك نمو تجاري",
    },
    organization: {
      en: "Al-Qersh Mobile · Mohamed Samy · EL3SAL · Hossam Fikry · Sanhok · Yasmine Salah · Khatwa",
      ar: "القرش موبايل · محمد سامي · العسال · منصة حسام فكري · سانهوك · ياسمين صلاح · خطوة",
    },
    location: { en: "Multi-Sector", ar: "قطاعات متعددة" },
    summary: {
      en: "Partnering independently with leading businesses across mobile retail, interior architecture, QSR hospitality, EdTech, gaming lounges, and beauty, driving brand clarity and direct sales.",
      ar: "شراكات تنفيذية مستقلة مع علامات بارزة في تجارة الهواتف، والديكور المعماري، والمطاعم، وتقنية التعليم، وصالات الألعاب، والتجميل، لترسيخ وضوح الهوية وتحقيق المبيعات المباشرة.",
    },
    highlights: {
      en: [
        "Long-term creative direction for Al-Qersh Mobile (3 branches), Mohamed Samy Works, and EL3SAL (140+ item menu & Meta funnels)",
        "Multi-sector execution across Hossam Fikry Platform, Sanhok, Yasmine Salah, and Khatwa Academy",
      ],
      ar: [
        "إدارة إبداعية طويلة الأمد لعلامة القرش موبايل (3 فروع)، ومحمد سامي، ومطعم العسال (قائمة 140+ صنف)",
        "تنفيذ ميداني عبر منصة حسام فكري، وسانهوك، وياسمين صلاح، وأكاديمية خطوة",
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

export const CASE_STUDY_CATEGORIES: { id: CaseStudyCategoryId; label: LocalizedText }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "retail_hospitality", label: { en: "Retail & Hospitality", ar: "التجزئة والضيافة" } },
  { id: "brand_growth", label: { en: "Brand & Campaigns", ar: "العلامات والحملات" } },
  { id: "corporate_tech", label: { en: "Corporate & Tech", ar: "الشركات والتعليم والتقنية" } },
  { id: "beauty_lifestyle", label: { en: "Beauty & Lifestyle", ar: "التجميل وأسلوب الحياة" } },
  { id: "ai_systems", label: { en: "AI Media", ar: "ميديا الذكاء الاصطناعي" } },
];

/**
 * Sorted with active flagship clients FIRST (Al-Qersh, Mohamed Samy, EL3SAL,
 * Hossam Fikry, Obolus), followed by corporate & historical milestones.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "al-qersh-mobile",
    title: { en: "Al-Qersh Mobile", ar: "القرش موبايل" },
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    category: "retail_hospitality",
    discipline: {
      en: "Creative Direction · Commercial Reels · Retail Growth",
      ar: "إدارة إبداعية · مقاطع تجارية · توسع الفروع",
    },
    image: "/assets/clients/alqersh.jpg",
    isMedallion: true,
    summary: {
      en: "Directing brand discipline and commercial campaigns across 3 branches in Beni Suef since 2022, turning product launches, seasonal promotions, and after-sales trust into steady retail growth.",
      ar: "توجيه انضباط العلامة التجارية والحملات الإعلانية عبر 3 فروع في بني سويف منذ عام 2022، مع تحويل إطلاقات المنتجات والمواسم الترويجية وخدمة ما بعد البيع إلى نمو تجاري مستقر.",
    },
    deliverables: {
      en: [
        "Unified brand positioning across 3 physical retail branches",
        "8th Anniversary and Black Friday high-volume promotional campaigns",
        "Commercial audio product reels (itel BudsGo / Ace / N63) and after-sales trust",
      ],
      ar: [
        "توحيد التموضع البصري وصوت العلامة عبر 3 فروع بيع بالتجزئة",
        "حملات الذكرى الثامنة والجمعة البيضاء واسعة الانتشار والتفاعل",
        "إنتاج مقاطع تجارية لمنتجات الصوت وترسيخ الثقة بخدمات ما بعد البيع",
      ],
    },
    campaigns: {
      en: ["8th Anniversary", "Black Friday", "Product Reels", "After-Sales Trust"],
      ar: ["الذكرى الثامنة", "الجمعة البيضاء", "مقاطع المنتجات", "موثوقية ما بعد البيع"],
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
    period: { en: "2022 - Present · Active", ar: "2022 - حتى الآن · عميل حالي" },
    category: "brand_growth",
    discipline: {
      en: "Creative Direction · Architecture Positioning · Film",
      ar: "إدارة إبداعية · تموضع معماري · أفلام المشاريع",
    },
    image: "/assets/clients/mohamed-samy-dark.png",
    isWideLogo: true,
    summary: {
      en: "Creative direction, high-ticket digital positioning, and architectural film production across Mohamed Samy's commercial and residential interior portfolio (including After 8 Cafe).",
      ar: "الإدارة الإبداعية، والتموضع الرقمي للمشاريع عالية القيمة، وإخراج الأفلام التعريفية لمحفظة أعمال محمد سامي في الديكور والمقاولات الداخلية (بما فيها مشروع After 8 Cafe).",
    },
    deliverables: {
      en: [
        "Digital positioning targeting commercial venues and residential villas",
        "Dedicated digital showroom presence and architectural campaign direction",
        "Flagship showcase reels including After 8 Cafe promotional film",
      ],
      ar: [
        "تموضع رقمي يخاطب مشاريع المنشآت التجارية والفيلات السكنية",
        "إطلاق المعرض الرقمي الرسمي والإشراف الإبداعي على الحملات",
        "إخراج الأفلام التعريفية لأبرز مشاريع التشطيبات الداخلية ومنها After 8 Cafe",
      ],
    },
    campaigns: {
      en: ["Interior Positioning", "After 8 Cafe Film", "Digital Showroom"],
      ar: ["التموضع المعماري", "فيلم After 8 Cafe", "المعرض الرقمي"],
    },
    links: [
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "http://mohamedsamyworks.com",
      },
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/mohamedsamyworks/",
      },
    ],
  },
  {
    id: "el3sal",
    title: { en: "EL3SAL Crepe & Pizza", ar: "مطعم العسال" },
    period: { en: "ACTIVE CLIENT", ar: "عميل حالي" },
    category: "retail_hospitality",
    discipline: {
      en: "Menu Architecture · QSR Campaigns · Meta Funnels",
      ar: "هندسة القائمة · حملات المطاعم · مسارات الطلب",
    },
    image: "/assets/clients/el3sal.jpg",
    isMedallion: true,
    summary: {
      en: "Complete 140+ item menu redesign paired with high-tempo food craft reels and Meta CTR Messages conversion funnels engineered to turn views into direct orders.",
      ar: "إعادة تصميم شاملة لقائمة طعام تضم أكثر من 140 صنفاً لتعزيز وضوح الاختيار ورفع متوسط قيمة الطلب، مقترنة بمقاطع مرئية سريعة الإيقاع ومسارات تحويل عبر رسائل ميتا للطلب المباشر.",
    },
    deliverables: {
      en: [
        "Full 140+ item menu restructuring for clarity and higher ticket value",
        "Signature QSR campaigns built around bold seasonal launches",
        "Craft food reels paired with direct Meta CTR Messages conversion funnels",
      ],
      ar: [
        "إعادة هيكلة قائمة طعام تضم أكثر من 140 صنفاً بوضوح يرفع متوسط الفاتورة",
        "حملات إطلاق رئيسية تركز على المنتجات المميزة والنكهات الجديدة",
        "مقاطع مرئية احترافية مرتبطة بمسارات رسائل مباشرة لتحقيق الطلبات",
      ],
    },
    campaigns: {
      en: ["THE CRAVING STANDARD", "RANCH TAKES OVER", "140+ Item Menu"],
      ar: ["معيار المذاق الرفيع", "حملة صوص الرانش", "قائمة 140+ صنف"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/EL3salFoods/",
      },
    ],
  },
  {
    id: "hossam-fikry",
    title: { en: "Hossam Fikry Platform", ar: "منصة حسام فكري التعليمية" },
    period: { en: "Active · EdTech Platform", ar: "مستمر · منصة تعليمية" },
    category: "corporate_tech",
    discipline: {
      en: "Academic Identity · Platform Engineering · Campaigns",
      ar: "الهوية الأكاديمية · هندسة المنصة · الحملات الطلابية",
    },
    image: "/assets/clients/hossam-fekry.png",
    isWideLogo: true,
    summary: {
      en: "Visual direction, nationwide enrollment campaigns, and ongoing web experience engineering for the Hossam Fikry educational platform.",
      ar: "التوجيه البصري، وحملات التسجيل الطلابي على مستوى الجمهورية، والهندسة المستمرة لتجربة المستخدم عبر منصة حسام فكري التعليمية.",
    },
    deliverables: {
      en: [
        "Cohesive academic visual identity and campaign storytelling",
        "Active web platform experience engineering and maintenance",
        "Student-focused reels and seasonal enrollment campaigns",
      ],
      ar: [
        "توحيد الهوية البصرية الأكاديمية وصياغة الرسائل الإعلانية للحملات",
        "تطوير وصيانة تجربة المستخدم عبر المنصة الإلكترونية",
        "إنتاج مقاطع تعليمية وترويجية وحملات تسجيل موسمية للطلاب",
      ],
    },
    campaigns: {
      en: ["Academic Identity", "Web Engineering", "Student Enrollment"],
      ar: ["الهوية الأكاديمية", "هندسة المنصة", "حملات الطلاب"],
    },
    links: [
      {
        label: { en: "Official Platform", ar: "المنصة الرسمية" },
        url: "https://hossamfekry.com",
      },
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/mr.hossamfekry/",
      },
    ],
  },
  {
    id: "obolus",
    title: { en: "Obolus (@obolus.explains)", ar: "Obolus (@obolus.explains)" },
    period: { en: "Active · AI Media Studio", ar: "مستمر · استوديو إنتاج ذكي" },
    category: "ai_systems",
    discipline: {
      en: "English 2D Documentary · Automated Production Stack",
      ar: "وثائقيات إنجليزية ثنائية الأبعاد · خط إنتاج مؤتمت",
    },
    image: "/assets/clients/obolus-mark.jpg",
    isMedallion: true,
    summary: {
      en: "English faceless 2D animated documentary channel covering Economic History and Money Systems, built end-to-end with a custom local AI production studio.",
      ar: "قناة Obolus الوثائقية الإنجليزية بالرسوم المتحركة الثنائية الأبعاد، تتناول التاريخ الاقتصادي والأنظمة النقدية، ومبنية بالكامل عبر منظومة إنتاج محلية مخصصة بالذكاء الاصطناعي.",
    },
    deliverables: {
      en: [
        "Custom local AI production pipeline from research to final render",
        "Long-form 2D animated documentaries on Economic History & Money",
        "Deterministic vector animation, voiceover alignment, and sound design",
      ],
      ar: [
        "بناء خط إنتاج محلي متكامل يبدأ من البحث وينتهي بالتصدير النهائي",
        "أفلام وثائقية طويلة بالرسوم المتحركة حول تاريخ الاقتصاد والمال",
        "تحريك متجهي منضبط ومزامنة دقيقة للتعليق الصوتي والمؤثرات",
      ],
    },
    campaigns: {
      en: ["1971 Monetary Shift", "1602 Stock Market Origins", "2D Documentary Engine"],
      ar: ["التحول النقدي 1971", "نشأة البورصة 1602", "محرك الوثائقيات"],
    },
    links: [
      {
        label: { en: "YouTube Channel", ar: "قناة يوتيوب" },
        url: "https://www.youtube.com/@obolus.explains",
      },
    ],
  },
  {
    id: "chubb-life",
    title: { en: "Chubb Life Insurance Egypt", ar: "تشب لتأمينات الحياة · مصر" },
    period: { en: "Sep 2022 - Jul 2023", ar: "سبتمبر 2022 - يوليو 2023" },
    category: "corporate_tech",
    discipline: {
      en: "Team Leadership · Commercial Sales · Advisory Coaching",
      ar: "قيادة الفرق · المبيعات التجارية · التوجيه الاستشاري",
    },
    image: "/assets/clients/chubb-life.png",
    invertLogo: true,
    isWideLogo: true,
    summary: {
      en: "Led commercial team operations, coaching, and target execution as Team Leader at Chubb Life Insurance Egypt from September 2022 to July 2023.",
      ar: "قيادة العمليات التجارية للفريق، والتوجيه والتدريب، وتحقيق المستهدفات البيعية في شركة تشب لتأمينات الحياة مصر خلال الفترة من سبتمبر 2022 حتى يوليو 2023.",
    },
    deliverables: {
      en: [
        "Commercial sales team leadership across life and financial protection portfolios",
        "Ongoing coaching, pipeline management, and target accountability",
        "Structured client advisory standards grounded in enterprise discipline",
      ],
      ar: [
        "قيادة الفريق التجاري عبر محافظ الحماية المالية والتأمين على الحياة",
        "التدريب المستمر وإدارة مسار المبيعات وتحقيق المستهدفات الدورية",
        "تطبيق معايير الاستشارة المالية المنضبطة مع العملاء",
      ],
    },
    campaigns: {
      en: ["Team Leadership", "Commercial Strategy", "Coaching"],
      ar: ["قيادة الفرق", "الاستراتيجية التجارية", "التدريب والتوجيه"],
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
    period: { en: "2018 - 2021", ar: "2018 - 2021" },
    category: "brand_growth",
    discipline: {
      en: "Digital Marketing · Commercial Advertising",
      ar: "التسويق الرقمي · الإعلانات التجارية",
    },
    image: "/assets/clients/attar-group-dark.png",
    isWideLogo: true,
    summary: {
      en: "Full-scale digital marketing, content creation, and commercial advertising campaigns executed for Al-Attar Group across 2018 through 2021.",
      ar: "إدارة متكاملة للتسويق الرقمي وصناعة المحتوى وتنفيذ الحملات الإعلانية التجارية لمجموعة العطار خلال الفترة من 2018 حتى 2021.",
    },
    deliverables: {
      en: [
        "Multi-year digital marketing and commercial content production",
        "High-volume paid advertising campaigns across product lines",
        "Sustained regional market visibility and customer acquisition",
      ],
      ar: [
        "تسويق رقمي ممتد لثلاث سنوات وإنتاج محتوى تجاري متخصص",
        "حملات إعلانية ممولة عالية الكثافة عبر مختلف خطوط المنتجات",
        "تعزيز الانتشار الإقليمي واستقطاب العملاء بصورة مستدامة",
      ],
    },
    campaigns: {
      en: ["Digital Marketing", "Commercial Campaigns", "2018 - 2021"],
      ar: ["التسويق الرقمي", "الحملات التجارية", "2018 - 2021"],
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
    period: { en: "2018", ar: "2018" },
    category: "brand_growth",
    discipline: {
      en: "Creative Direction · TV Ad Scripts · Real Estate & Medical",
      ar: "إدارة إبداعية · إعلانات تلفزيون · العقارات والمراكز الطبية",
    },
    image: "/assets/clients/chance-media-black.png",
    isWideLogo: true,
    summary: {
      en: "Creative Direction, TV ad scriptwriting, and campaign leadership for real-estate and medical brand accounts at Chance Media, founded by actor Ahmed Akl, alongside launching SECTOR 09.",
      ar: "تولي الإدارة الإبداعية، وكتابة نصوص الإعلانات التلفزيونية، وقيادة الحملات الإعلانية لحسابات العقارات والمراكز الطبية لدى وكالة تشانس ميديا التي أسسها الفنان أحمد عقل، بالتوازي مع إطلاق سيكتور 09.",
    },
    deliverables: {
      en: [
        "Creative direction across commercial agency accounts",
        "Television commercial scriptwriting and narrative concepts",
        "Real-estate and medical sector brand campaign execution",
      ],
      ar: [
        "الإدارة الإبداعية الشاملة لحسابات الوكالة التجارية",
        "كتابة سيناريوهات الإعلانات التلفزيونية وتطوير المفاهيم الإبداعية",
        "تنفيذ حملات العلامات التجارية في قطاعي العقارات والخدمات الطبية",
      ],
    },
    campaigns: {
      en: ["TV Ad Scripts", "Real Estate", "Medical Brands"],
      ar: ["الإعلانات التلفزيونية", "القطاع العقاري", "العلامات الطبية"],
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
    period: { en: "2016 - 2017 · QA", ar: "2016 - 2017 · اختبار البرمجيات" },
    category: "corporate_tech",
    discipline: {
      en: "Pre-Release Firmware QA · Beta Testing · Community",
      ar: "اختبار البرمجيات قبل الإطلاق · ضمان الجودة · إدارة المجتمع",
    },
    monogram: "C9",
    summary: {
      en: "Pre-release software beta tester for TECNO Mobile per device model, contributing directly to stabilizing and refining the flagship TECNO Camon C9 release alongside official forum moderation.",
      ar: "اختبار النسخ التجريبية لبرمجيات هواتف تكنو موبايل قبل الإطلاق لكل طراز، مع المساهمة المباشرة في تطوير وتحسين إصدار هاتف تكنو كامون C9 (حملة \"السيلفي حكاية\") وإدارة المنتدى الرسمي.",
    },
    deliverables: {
      en: [
        "Pre-release device firmware validation and structured bug reporting per model",
        "Direct software quality contributions to the flagship TECNO Camon C9 launch",
        "Official TECNO Mobile community moderation and launch feedback loops",
      ],
      ar: [
        "فحص برمجيات التشغيل التجريبية قبل الطرح الرسمي وتوثيق الأعطال لكل طراز",
        "إسهامات مباشرة في استقرار وتحسين برمجيات هاتف تكنو كامون C9",
        "إدارة المنتدى الرسمي لتكنو وتجميع الملاحظات الفنية للمستخدمين",
      ],
    },
    campaigns: {
      en: ["TECNO Camon C9", "Firmware Beta QA", "Community Moderation"],
      ar: ["تكنو كامون C9", "اختبار البرمجيات", "السيلفي حكاية"],
    },
    links: [],
  },
  {
    id: "architect-of-reality",
    title: { en: "THE ARCHITECT OF REALITY", ar: "THE ARCHITECT OF REALITY" },
    period: { en: "YouTube Channel", ar: "قناة يوتيوب" },
    category: "ai_systems",
    discipline: {
      en: "International English Channel · Long-Form Visual Systems",
      ar: "قناة إنجليزية عالمية · منظومات سرد بصري طويلة",
    },
    image: "/assets/clients/architect-dark.png",
    isWideLogo: true,
    summary: {
      en: "Flagship English YouTube channel built for international viewers, combining deep psychological and philosophical storytelling with a custom programmatic animation engine.",
      ar: "قناة THE ARCHITECT OF REALITY باللغة الإنجليزية للجمهور الدولي، تجمع بين السرد النفسي والفلسفي العميق ومحرك تحريك برمجي مخصص لإنتاج الحلقات الطويلة.",
    },
    deliverables: {
      en: [
        "Long-form 2D animated episode architecture focused on depth and retention",
        "Custom programmatic rendering pipeline with strict visual QA gates",
        "Packaging and hook strategy built for international audiences",
      ],
      ar: [
        "هندسة حلقات وثائقية طويلة تركز على العمق الفكري ومعدل الاحتفاظ بالمشاهد",
        "خط معالجة وتصدير برمجي مخصص يخضع لبوابات فحص بصري صارمة",
        "استراتيجية تغليف وافتتاحيات مصممة للجمهور الدولي",
      ],
    },
    campaigns: {
      en: ["THE MIND MANUAL", "Long-Form Retention", "Programmatic Animation"],
      ar: ["دليل العقل", "الاحتفاظ طويل المدى", "التحريك البرمجي"],
    },
    links: [
      {
        label: { en: "YouTube Channel", ar: "قناة يوتيوب" },
        url: "https://www.youtube.com/@thearchitectofreality963",
      },
    ],
  },
  {
    id: "khatwa-academy",
    title: { en: "Khatwa Academy & Nursery", ar: "أكاديمية وحضانة خطوة" },
    period: { en: "Education Partner", ar: "شريك قطاع التعليم" },
    category: "corporate_tech",
    discipline: {
      en: "Nursery Marketing · Reels Production · Parent Conversion",
      ar: "تسويق تعليمي · إنتاج مرئي · استقطاب أولياء الأمور",
    },
    image: "/assets/clients/khatwa.png",
    isWideLogo: true,
    summary: {
      en: "Marketing direction and real-activity video reels for Khatwa Academy and Nursery, structuring clear stage-by-stage parent messaging that drives qualified enrollment inquiries.",
      ar: "التوجيه التسويقي وإنتاج المقاطع التوثيقية للأنشطة الفعلية في أكاديمية وحضانة خطوة، عبر صياغة رسائل واضحة لكل مرحلة عمرية تستقطب استفسارات التسجيل الجادة من أولياء الأمور.",
    },
    deliverables: {
      en: [
        "Stage-structured parent positioning across nursery and KG programs",
        "Authentic activity reels built around real classroom moments",
        "Direct Messenger and WhatsApp qualification funnels for parents",
      ],
      ar: [
        "صياغة تموضع تعليمي واضح لكل مرحلة عمرية عبر برامج الحضانة ورياض الأطفال",
        "إنتاج مقاطع واقعية توثق الأنشطة الصفية والتطبيقية الفعلية",
        "بناء مسارات تواصل وتأهيل مباشر لاستفسارات أولياء الأمور",
      ],
    },
    campaigns: {
      en: ["Stage-by-Stage Clarity", "Real Activity Reels", "Parent Funnel"],
      ar: ["وضوح المراحل العمرية", "توثيق الأنشطة الواقعية", "مسار التسجيل"],
    },
    links: [
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "https://www.khatwa.site",
      },
    ],
  },
  {
    id: "sanhok",
    title: { en: "Sanhok PlayStation & Café", ar: "سانهوك للترفيه والكافيه" },
    period: { en: "Commercial Partner", ar: "شريك تجاري" },
    category: "retail_hospitality",
    discipline: {
      en: "Commercial Media · Entertainment Marketing",
      ar: "إنتاج تجاري · تسويق الوجهات الترفيهية",
    },
    image: "/assets/clients/sanhok.jpg",
    isMedallion: true,
    summary: {
      en: "Commercial entertainment marketing and youth-focused digital campaigns designed to keep gaming lounges and café seating consistently active.",
      ar: "تسويق ترفيهي وحملات رقمية موجهة لفئة الشباب، مصممة للحفاظ على الإقبال المستمر على صالات الألعاب الإلكترونية ومقاعد الكافيه طوال أيام الأسبوع.",
    },
    deliverables: {
      en: [
        "Youth-focused visual storytelling and promotional video hooks",
        "Targeted local social campaigns driving walk-in traffic",
        "Cohesive digital presence across entertainment offerings",
      ],
      ar: [
        "سرد بصري موجه للشباب وصياغة مشاهد افتتاحية جاذبة في الفيديو الإعلاني",
        "حملات جغرافية مستهدفة لتعزيز الإقبال المباشر على المكان",
        "حضور رقمي متماسك يعكس هوية الصالة والكافيه",
      ],
    },
    campaigns: {
      en: ["Gaming Lounge", "Local Traffic", "Commercial Media"],
      ar: ["صالة الألعاب", "الاستقطاب المحلي", "الإعلام التجاري"],
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
    period: { en: "Commercial Partner", ar: "شريك تجاري" },
    category: "beauty_lifestyle",
    discipline: {
      en: "Beauty Positioning · Social Growth · Bookings",
      ar: "تموضع قطاع التجميل · النمو الرقمي · الحجوزات",
    },
    monogram: "YS",
    summary: {
      en: "Strategic social positioning and digital growth for Makeup Artist Yasmine Salah, connecting high-craft beauty showcases directly with bridal and client bookings.",
      ar: "بناء تموضع استراتيجي وحضور رقمي رفيع المستوى لخبيرة التجميل ياسمين صلاح، يربط جودة الأعمال المقدمة مباشرة باستقطاب حجوزات العرائس والعميلات.",
    },
    deliverables: {
      en: [
        "Refined social presentation aligned with bridal and beauty clientele",
        "Targeted campaigns built for qualified booking inquiries",
        "Consistent visual storytelling across showcase deliverables",
      ],
      ar: [
        "تقديم بصري أنيق يلائم تطلعات قطاع التجميل والعرائس",
        "حملات موجهة لاستقطاب طلبات الحجز المؤهلة",
        "سرد بصري متسق عبر مختلف نماذج العرض",
      ],
    },
    campaigns: {
      en: ["Beauty Positioning", "Bridal Bookings", "Social Growth"],
      ar: ["تموضع قطاع التجميل", "حجوزات العرائس", "النمو الرقمي"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/profile.php?id=100057476078591",
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
