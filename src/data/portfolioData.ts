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

export interface ChronicleMentorship {
  eyebrow: LocalizedText;
  body: LocalizedText;
  entities: Array<{
    label: LocalizedText;
    url: string;
  }>;
}

export interface ChronicleEntry {
  id: string;
  railYear: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  organization: LocalizedText;
  location: LocalizedText;
  kpis?: {
    en: string[];
    ar: string[];
  };
  logos?: OrganizationLogo[];
  archivePhoto?: {
    src: string;
    alt: LocalizedText;
    caption: LocalizedText;
  };
  highlightProof?: {
    src: string;
    eyebrow: LocalizedText;
    alt: LocalizedText;
    caption: LocalizedText;
  };
  summary: LocalizedText;
  highlights: {
    en: string[];
    ar: string[];
  };
  mentorship?: ChronicleMentorship;
  links?: ClientLink[];
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
  { id: "perspective", index: "02", label: { en: "Ethos", ar: "المنهج" } },
  { id: "chronicle", index: "03", label: { en: "Chronicle", ar: "المسيرة" } },
  { id: "works", index: "04", label: { en: "Works", ar: "الأعمال" } },
  { id: "systems", index: "05", label: { en: "Systems", ar: "الأنظمة" } },
  { id: "contact", index: "06", label: { en: "Contact", ar: "التواصل" } },
];

export const PORTFOLIO_IDENTITY = {
  brandMark: { en: "BELAL GAMAL", ar: "بلال جمال" },
  pageTitle: {
    en: "Belal Gamal | Marketing Direction, Creative Director & AI Architect",
    ar: "بلال جمال | التوجيه التسويقي والإدارة الإبداعية وأنظمة الذكاء الاصطناعي",
  },
  name: { en: "Belal Gamal", ar: "بلال جمال" },
  primaryTitle: { en: "Creative Director", ar: "مدير إبداعي" },
  heroSubtitle: {
    en: "Marketing & Creative Direction · AI Systems",
    ar: "التوجيه التسويقي والإبداعي وأنظمة الذكاء الاصطناعي",
  },
  heroEyebrow: {
    en: "Beni Suef, Egypt · Since 2016",
    ar: "بني سويف، مصر • منذ 2016",
  },
  heroSubtext: {
    en: "Self-started in 2016 running my own Facebook ad campaigns, then corporate leadership across Vodafone, Majorel and Chubb Life. Today I build brand positioning and campaigns that drive measurable demand.",
    ar: "بدأت عام 2016 بحملات ممولة أديرها بنفسي، ثم مواقع قيادية داخل فودافون وماجوريل وتشب لايف، واليوم أبني للعلامات التجارية تموضعاً واضحاً وحملات تصنع طلباً حقيقياً يقاس بالأرقام.",
  },
  bornLabel: { en: "Born July 20, 1995", ar: "مواليد 20 يوليو 1995" },
  originLocation: { en: "Beni Suef, Egypt", ar: "بني سويف، مصر" },
  educationTitle: {
    en: "B.Sc. in Commerce & Business Administration",
    ar: "بكالوريوس تجارة وإدارة أعمال",
  },
  educationSub: {
    en: "Beni Suef University · 2013 - 2017",
    ar: "جامعة بني سويف • 2013 – 2017",
  },
  trackTitle: {
    en: "10 Years · Marketing Direction & Execution",
    ar: "10 سنوات في التوجيه التسويقي والتنفيذ",
  },
  trackSub: {
    en: "Telecom, Firmware QA, Insurance, TV & Film, Retail, F&B, Beauty, EdTech & AI Media",
    ar: "الاتصالات • اختبار البرمجيات • التأمين • التلفزيون • التجزئة • المطاعم • التجميل • التعليم • وميديا الذكاء الاصطناعي",
  },
  pointOfView: {
    en: "Most brands say the same thing in the same tone, and their voice gets lost in the crowd. I take a step back, see the whole market, then build each brand a message no one else can claim.",
    ar: "معظم العلامات التجارية تقول الكلام نفسه بالنبرة نفسها، فيضيع صوتها وسط الزحام. أنا أرجع خطوة للخلف، أرى السوق كاملاً، ثم أبني لكل علامة رسالة لا يملكها غيرها.",
  },
  inspirationLabel: { en: "Creative Influence", ar: "الإلهام الإبداعي" },
  inspirationUrl: "https://www.instagram.com/tameemyouness?hvrq=a2Q3NTkwcnBvdjcx",
  inspirationEntity: { en: "Tameem Youness", ar: "تميم يونس" },
  inspirationText: {
    en: "Resonates with Egyptian director Tameem Youness for tearing up safe advertising templates in favor of one unexpected, human idea.",
    ar: "أقرب ما يكون لذائقتي الإعلانية هو مدرسة تميم يونس في الإخراج: كسر القوالب المستهلكة بفكرة واحدة ذكية، صادقة، وغير متوقعة.",
  },
  lensLabel: { en: "Market Lens", ar: "عدسة السوق" },
  lensText: {
    en: "Reads the market calmly, from outside the noise: field sales experience, creative direction and production systems combined into one commercial path measured by results.",
    ar: "قراءة السوق بهدوء ومن خارج الضوضاء: دمج الخبرة البيعية الميدانية مع التوجيه الإبداعي وأنظمة الإنتاج في مسار تجاري واضح يقاس بالنتيجة.",
  },
  portraitPath: "/assets/portrait.jpg",
  showreelPosterPath: "/assets/showreel-poster.jpg",
  liveDomain: "https://begamal.pages.dev",
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
    secondaryCta: { en: "Selected Works", ar: "استعرض الأعمال" },
    portraitAlt: {
      en: "Belal Gamal portrait in low-key monochrome studio light",
      ar: "صورة شخصية لبلال جمال بإضاءة استوديو أحادية اللون",
    },
  },
  statement: {
    eyebrow: { en: "Ethos · Point of View", ar: "المنهج والرؤية" },
    origin: { en: "Point of Origin", ar: "نقطة الانطلاق" },
    education: { en: "Academic Foundation", ar: "الأساس الأكاديمي" },
    scope: { en: "Field Reach", ar: "مدى الخبرة" },
  },
  chronicle: {
    title: { en: "Chronicle of Eras", ar: "حِقب المسيرة" },
    subtitle: {
      en: "Ten years of hands-on progression—from independent Facebook ad campaigns and TECNO Camon C9 firmware QA in 2016 through Vodafone Business, Chance Media, Al-Attar, Majorel Smart Village HR, Chubb Life leadership, and AI production systems. Open any era to read its full log.",
      ar: "عشر سنوات من التدرج العملي: من الحملات الممولة المستقلة واختبار برمجيات هواتف تكنو عام 2016، مروراً بفودافون بيزنس وتشانس ميديا ومجموعة العطار وماجوريل بالقرية الذكية وقيادة المبيعات في تشب، وصولاً إلى أنظمة الإنتاج بالذكاء الاصطناعي. افتح أي حقبة لقراءة سجلها الكامل.",
    },
    openEra: { en: "Open Era", ar: "افتح الحقبة" },
    backToGrid: { en: "All Eras", ar: "كل الحِقب" },
    newerStage: { en: "Later Era", ar: "الحقبة اللاحقة" },
    olderStage: { en: "Earlier Era", ar: "الحقبة السابقة" },
    closeDossier: { en: "Close era log", ar: "إغلاق سجل الحقبة" },
    railAria: { en: "Era timeline", ar: "الخط الزمني للحِقب" },
    executiveLeadLabel: { en: "Mission Brief", ar: "موجز المهمة" },
    impactHighlightsLabel: { en: "Impact Log", ar: "سجل الأثر" },
  },
  works: {
    showreelEyebrow: { en: "Transmission · Showreel", ar: "البث المرئي" },
    showreelTitle: {
      en: "Selected Commercials, Film & Direction",
      ar: "مختارات الإعلانات والأفلام والإخراج الإبداعي",
    },
    showreelSubtitle: {
      en: "Campaign films, commercial spots, and visual storytelling directed across commercial retail, F&B, corporate, and architecture accounts.",
      ar: "إعلانات تجارية وأفلام علامات تجارية وحملات مصورة لقطاعات التجزئة والمطاعم والشركات والمشاريع المعمارية.",
    },
    showreelCta: {
      en: "Watch Full Showreel on Vimeo",
      ar: "شاهد الأعمال على Vimeo",
    },
    eyebrow: { en: "Client Orbit · Case Studies", ar: "مدار العملاء ودراسات الحالة" },
    title: { en: "Selected Works", ar: "أعمال مختارة" },
    openDossier: { en: "Open Dossier", ar: "افتح الملف" },
    visitPage: { en: "Visit Client Page", ar: "زيارة صفحة العميل" },
    caseStudyCta: { en: "Open Dossier", ar: "افتح الملف" },
    scopeHeading: { en: "Scope & Execution", ar: "نطاق العمل والتنفيذ" },
    closeModal: { en: "Close project dossier", ar: "إغلاق ملف المشروع" },
    backToWorks: { en: "Back to Works", ar: "العودة للأعمال" },
    prevWork: { en: "Previous Work", ar: "العمل السابق" },
    nextWork: { en: "Next Work", ar: "العمل التالي" },
  },
  systems: {
    title: { en: "AI Production Architecture", ar: "أنظمة الإنتاج بالذكاء الاصطناعي" },
    subtitle: {
      en: "Since the 2023 wave, I have built full production engines combining strategic storytelling, programmatic motion systems, and grounded AI research to ship documentaries, commercials, and custom web experiences at scale.",
      ar: "منذ موجة الذكاء الاصطناعي في 2023، طورت خطوط إنتاج متكاملة تجمع بين البرمجة والأتمتة لإنتاج الوثائقيات والإعلانات التجارية ومنصات الويب بسرعة وجودة ثابتة.",
    },
  },
  contact: {
    eyebrow: { en: "Open Channel", ar: "القناة مفتوحة" },
    title: { en: "Work With Belal", ar: "لنبدأ العمل" },
    subtitle: {
      en: "For marketing direction built on clear positioning and commercial growth, or AI media production systems, reach me directly below.",
      ar: "سواء لتوجيه علامتك التجارية وبناء حملات تحقق مبيعات حقيقية، أو لتطوير منظومة إنتاج بالذكاء الاصطناعي — تواصل معي مباشرة.",
    },
    whatsappCta: { en: "WhatsApp", ar: "واتساب" },
    facebookCta: { en: "Facebook", ar: "فيسبوك" },
    instagramCta: { en: "Instagram", ar: "إنستجرام" },
    vimeoCta: { en: "Vimeo", ar: "فيميو" },
  },
};

export const CAREER_CHRONICLE: ChronicleEntry[] = [
  {
    id: "ai-systems-2023",
    railYear: { en: "2023+", ar: "2023+" },
    period: { en: "2023 - Present", ar: "2023 - حتى الآن" },
    role: {
      en: "AI Creative & Production Systems Architect",
      ar: "الإبداع وأنظمة الإنتاج بالذكاء الاصطناعي",
    },
    organization: {
      en: "Obolus (@obolus.explains) · THE ARCHITECT OF REALITY · AI Production Studio",
      ar: "THE ARCHITECT OF REALITY • Obolus • منظومة الإنتاج المحلية",
    },
    location: { en: "Global Audiences", ar: "جمهور عالمي ومحلي" },
    kpis: {
      en: ["Obolus & Architect", "Programmatic Video", "Since 2023"],
      ar: ["Obolus وArchitect", "خطوط فيديو برمجية", "منذ 2023"],
    },
    summary: {
      en: "Deep hands-on mastery of AI production since the 2023 wave, architecting automated English documentary channels, programmatic motion pipelines, and custom interactive web systems.",
      ar: "إتقان عملي لأدوات الإنتاج بالذكاء الاصطناعي منذ 2023، وتصميم قنوات وثائقية إنجليزية مؤتمتة وخطوط إنتاج برمجية متكاملة للفيديو ومواقع الويب.",
    },
    highlights: {
      en: [
        "End-to-end English documentary systems (Obolus & THE ARCHITECT OF REALITY)",
        "Programmatic video, voice alignment, and custom web production engines built for speed and visual consistency",
      ],
      ar: [
        "بناء وإدارة قنوات وثائقية إنجليزية بالكامل (Obolus وTHE ARCHITECT OF REALITY)",
        "دمج الأتمتة البرمجية وتوليد الفيديو والبحث الموثق في خط إنتاج واحد",
      ],
    },
  },
  {
    id: "independent-director-2020",
    railYear: { en: "2020+", ar: "2020+" },
    period: { en: "2020 - Present", ar: "2020 - حتى الآن" },
    role: {
      en: "Marketing Direction Architect & Creative Partner",
      ar: "شريك نمو وتوجيه تسويقي",
    },
    organization: {
      en: "Hossam Fekry 2020 · Khatwa 2021 · Al-Qersh Mobile 2022 · Mohamed Samy 2022 · Yasmine Salah 2023 · El3sal Foods 2024 · Sanhok Ramadan 2025",
      ar: "حسام فكري 2020 • خطوة 2021 • القرش موبايل 2022 • محمد سامي 2022 • ياسمين صلاح 2023 • العسال فودز 2024 • سانهوك رمضان 2025",
    },
    location: { en: "Multi-Sector", ar: "قطاعات متعددة" },
    kpis: {
      en: ["Hossam Fekry · 2020", "Al-Qersh & Samy · 2022", "El3sal Foods · 2024"],
      ar: ["حسام فكري • 2020", "القرش ومحمد سامي • 2022", "العسال فودز • 2024"],
    },
    summary: {
      en: "An independent practice that grew one client at a time: Hossam Fekry Platform in 2020 (full platform management, center integration and rewards system), Khatwa in 2021, Al-Qersh Mobile and Mohamed Samy Works in 2022, Yasmine Salah in 2023, El3sal Foods in 2024, and a Ramadan 2025 campaign for Sanhok.",
      ar: "ممارسة مستقلة نمت عميلاً بعد عميل: منصة حسام فكري عام 2020 (إدارة المنصة بالكامل وربط طلاب السنتر ونظام المكافآت)، ثم خطوة عام 2021، ثم القرش موبايل ومحمد سامي للديكور عام 2022، ثم ياسمين صلاح عام 2023، ثم العسال فودز عام 2024، وحملة رمضان 2025 لسانهوك.",
    },
    highlights: {
      en: [
        "Full platform management & Marketing Direction for Hossam Fekry since 2020 (center QR integration & Rewards Store economy)",
        "Marketing Direction built from the ground up for Al-Qersh Mobile (3 branches) and Mohamed Samy Works since 2022, and El3sal Foods since 2024",
      ],
      ar: [
        "إدارة منصة حسام فكري بالكامل منذ 2020 مع ربط طلاب السنتر ونظام المكافآت",
        "تأسيس الهوية والحملات البيعية للقرش موبايل (3 فروع) ومحمد سامي للديكور منذ 2022، والعسال فودز منذ 2024",
      ],
    },
  },
  {
    id: "chubb-life-2022-2023",
    railYear: { en: "22–23", ar: "22–23" },
    period: { en: "Sep 2022 - Jul 2023", ar: "سبتمبر 2022 - يوليو 2023" },
    role: {
      en: "Team Leader · Commercial Sales & Advisory",
      ar: "قائد فريق • المبيعات التجارية والاستشارات",
    },
    organization: {
      en: "Chubb Life Insurance Egypt",
      ar: "تشب لتأمينات الحياة • مصر",
    },
    location: { en: "Egypt", ar: "مصر" },
    kpis: {
      en: ["Team Leader", "Sep 2022 – Jul 2023", "Sales & Advisory"],
      ar: ["قائد فريق", "سبتمبر 2022 – يوليو 2023", "مبيعات واستشارات"],
    },
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
      ar: "قيادة فريق المبيعات الميدانية والتدريب اليومي وتحقيق المستهدفات الشهرية في تشب لتأمينات الحياة مصر.",
    },
    highlights: {
      en: [
        "Led commercial sales team execution and coaching across life protection offerings",
        "Tracked KPI discipline, daily pipeline conversions, and consultative advisory quality",
        "Hands-on onboarding, roleplay coaching, and daily field accompaniment for life protection advisors",
      ],
      ar: [
        "قيادة وتدريب الفريق التجاري يومياً على بيع حلول التأمين والحماية المالية",
        "رفع جودة الاستشارات البيعية والالتزام بمؤشرات الأداء والمحافظ الشهرية",
        "تأهيل الأعضاء الجدد وتنفيذ محاكاة البيع والمرافقة الميدانية لمستشاري الحماية المالية",
      ],
    },
    links: [
      {
        label: { en: "Chubb Life Egypt", ar: "موقع تشب مصر" },
        url: "https://life.chubb.com/eg-en/",
      },
    ],
  },
  {
    id: "majorel-vodafone-2019-2021",
    railYear: { en: "19–21", ar: "19–21" },
    period: { en: "2019 - Aug 2021", ar: "2019 - أغسطس 2021" },
    role: {
      en: "HR Recruitment Specialist · High-Attrition BPO Hiring (Top Achiever)",
      ar: "أخصائي توظيف وموارد بشرية • الأعلى تحقيقاً",
    },
    organization: {
      en: "Majorel Egypt (Global CX & BPO) · Smart Village, Beni Suef",
      ar: "ماجوريل مصر • القرية الذكية، بني سويف",
    },
    location: { en: "Smart Village, Beni Suef", ar: "القرية الذكية، بني سويف" },
    kpis: {
      en: ["~550 Hires", "Top Achiever", "Smart Village"],
      ar: ["~550 تعييناً", "الأعلى تحقيقاً", "القرية الذكية"],
    },
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
      en: "Started at Smart Village in Beni Suef in 2019 on Vodafone's 888 queue, then promoted to HR Recruitment Specialist at global BPO leader Majorel through August 2021. Solved high-attrition and retention-challenged call center staffing for Vodafone and Uber, hiring ~550 employees in 2020 as Top Achiever, and even produced an employer-branding promo film showcasing the Smart Village work environment to attract and retain talent.",
      ar: "بدأت في القرية الذكية ببني سويف عام 2019 على خط 888 في فودافون، ثم ترقيت لأخصائي توظيف في ماجوريل العالمية حتى أغسطس 2021. قدت التعيينات لحسابات أوبر وفودافون وسط تحديات الدوران الوظيفي العالي، وحققت ~550 تعييناً في 2020 كالأعلى أداءً، كما أخرجت فيلماً ترويجياً لبيئة العمل بالقرية الذكية.",
    },
    highlights: {
      en: [
        "Engineered high-velocity talent pipelines inside a high-attrition call center environment, sustaining seat fill & retention targets through August 2021",
        "Hired ~550 employees in 2020 (Top Achiever) across Uber (Rider, Driver, Eats) and Vodafone (888, Cash, CVM, ADSL) enterprise queues",
        "Directed a promotional Smart Village workplace & atmosphere film in Beni Suef to elevate employer brand perception and candidate conversion",
      ],
      ar: [
        "بناء مسارات توظيف مستمرة في بيئة كول سنتر عالية الدوران لضمان استقرار التشغيل",
        "تحقيق نحو 550 تعييناً في 2020 (الأعلى تحقيقاً) لحسابات أوبر (Rider, Driver, Eats) وفودافون (Cash, CVM, ADSL, 888)",
        "إخراج وإنتاج فيلم ترويجي يبرز أجواء القرية الذكية في بني سويف لجذب الكفاءات",
      ],
    },
    mentorship: {
      eyebrow: {
        en: "TALENT ARCHITECTURE & MENTORSHIP",
        ar: "تأسيس الكوادر وصناعة الصف الثاني",
      },
      body: {
        en: "Beyond hitting hiring targets, I helped build the local HR foundation from the ground up—training and mentoring multiple HR trainees who earned official company certifications, including Mostafa Badr, who grew from trainee into a full-time hire at the company. I also championed and mentored Esraa Saad into the HR team; when the department later navigated a major team transition, she stepped up to lead the function and manage core company accounts solo—a lasting testament to building people, not just filling seats.",
        ar: "لم يقتصر دوري على تحقيق أرقام التوظيف، بل شاركت في تأسيس نواة فريق الموارد البشرية وتدريب وتأهيل عدد من المتدربين (HR Trainees) الذين نالوا شهادات معتمدة من الشركة—من بينهم مصطفى بدر الذي تدرّج وتطوّر حتى تم تعيينه رسمياً في الشركة. كما دعمت ووجّهت إسراء سعد منذ انضمامها للفريق؛ لتثبت لاحقاً كفاءة استثنائية وتقود القسم وتدير حسابات الشركة الرئيسية بمفردها خلال مرحلة انتقالية حاسمة—تجسيداً لقناعتي بأن الأثر الحقيقي يُقاس ببناء الأشخاص، لا بمجرد سد الشواغر.",
      },
      entities: [
        {
          label: { en: "Mostafa Badr", ar: "مصطفى بدر" },
          url: "https://sa.linkedin.com/in/mostafa-badr-6479461b9",
        },
        {
          label: { en: "Esraa Saad", ar: "إسراء سعد" },
          url: "https://eg.linkedin.com/in/esraa-saad-9246a214a",
        },
      ],
    },
    links: [
      {
        label: {
          en: "Smart Village Promo Film",
          ar: "فيلم القرية الذكية",
        },
        url: "https://vimeo.com/397536977",
      },
    ],
    archivePhoto: {
      src: "/assets/clients/majorel-smart-village-team.jpg",
      alt: {
        en: "Majorel Egypt Smart Village team photo published by @majorelegypt for International Workers' Day (#OneMajorel)",
        ar: "صورة فريق ماجوريل بالقرية الذكية المنشورة على حساب @majorelegypt بمناسبة يوم العمال العالمي (#OneMajorel)",
      },
      caption: {
        en: "@majorelegypt · International Workers' Day · Smart Village",
        ar: "@majorelegypt · يوم العمال العالمي · القرية الذكية",
      },
    },
    highlightProof: {
      src: "/assets/clients/majorel-top-achiever-2020-email.jpg",
      eyebrow: {
        en: "INTERNAL PERFORMANCE RECOGNITION · 2020",
        ar: "توثيق التقييم السنوي الداخلي · 2020",
      },
      alt: {
        en: "Majorel internal 2020 total performance email highlighting Belal Gamal as Top One for the Beni Suef Team",
        ar: "إيميل شركة ماجوريل الداخلي لأداء عام 2020 يوثّق اختيار بلال جمال كالأعلى أداءً (Top One) لفريق بني سويف",
      },
      caption: {
        en: "Internal email from On-Shore Recruitment Senior Supervisor naming Belal Gamal Top One — Beni Suef Team (2020).",
        ar: "رسالة البريد الداخلي الرسمية لعام 2020 من إدارة التوظيف بتكريم بلال جمال كالأول (Top One) على فريق بني سويف.",
      },
    },
  },
  {
    id: "al-attar-2018-2021",
    railYear: { en: "18–21", ar: "18–21" },
    period: { en: "2018 - Aug 2021", ar: "2018 - أغسطس 2021" },
    role: {
      en: "Marketing Direction & Commercial Campaigns",
      ar: "التوجيه التسويقي والحملات التجارية",
    },
    organization: { en: "Al-Attar Group", ar: "مجموعة العطار" },
    location: { en: "Commercial Retail", ar: "تجارة التجزئة" },
    kpis: {
      en: ["3-Year Direction", "Through Aug 2021", "Retail & Wholesale"],
      ar: ["إدارة 3 سنوات", "حتى أغسطس 2021", "تجزئة وجملة"],
    },
    logos: [
      {
        src: "/assets/clients/attar-group.jpg",
        alt: { en: "Al-Attar Group", ar: "شعار مجموعة العطار" },
        bg: "#FFFFFF",
      },
    ],
    summary: {
      en: "Led Marketing Direction, content production, and high-volume campaigns for Al-Attar Group through August 2021, closing the engagement with the flagship campaign \"Elly Magadedsh Mat\" (\"Whoever Doesn't Renew Dies Out\").",
      ar: "قيادة التوجيه التسويقي وصناعة المحتوى والحملات التجارية لمجموعة العطار لمدة ثلاث سنوات، اختُتمت في أغسطس 2021 بالحملة الشهيرة «اللي مجددش مات» الموثقة على Vimeo.",
    },
    highlights: {
      en: [
        "Led Marketing Direction and performance campaigns through August 2021",
        "Directed closing flagship campaign \"Elly Magadedsh Mat\" (\"Whoever Doesn't Renew Dies Out\") published on Vimeo",
        "Scaled multi-year regional demand across retail and wholesale lines",
      ],
      ar: [
        "قيادة التوجيه التسويقي والحملات الإعلانية لقطاعي التجزئة والجملة حتى أغسطس 2021",
        "توجيه الحملة الختامية «اللي مجددش مات» الموثقة على Vimeo",
        "توسيع الانتشار الإقليمي ورفع وتيرة المبيعات على مدار ثلاث سنوات",
      ],
    },
    links: [
      {
        label: {
          en: "Watch \"Elly Magadedsh Mat\" (Vimeo)",
          ar: "شاهد حملة «اللي مجددش مات» · Vimeo",
        },
        url: "https://vimeo.com/476741375",
      },
      {
        label: { en: "Al-Attar Facebook Page", ar: "صفحة العطار على فيسبوك" },
        url: "https://www.facebook.com/attargroup1999",
      },
    ],
  },
  {
    id: "chance-media-sector09-2018",
    railYear: { en: "2018", ar: "2018" },
    period: { en: "2018", ar: "2018" },
    role: {
      en: "Creative Director & Agency Founder",
      ar: "مدير إبداعي ومؤسس وكالة مستقلة",
    },
    organization: {
      en: "Chance Media (Ahmed Akl) & SECTOR 09",
      ar: "تشانس ميديا (الفنان أحمد عقل) ووكالة سيكتور 09",
    },
    location: { en: "Cairo / Beni Suef", ar: "القاهرة / بني سويف" },
    kpis: {
      en: ["Creative Director", "3-Version TV Ad", "SECTOR 09 Founder"],
      ar: ["مدير إبداعي", "حملة 3 نسخ TV", "مؤسس سيكتور 09"],
    },
    logos: [
      {
        src: "/assets/clients/chance-media.png",
        alt: { en: "Chance Media", ar: "شعار تشانس ميديا" },
        bg: "#FFFFFF",
        wide: true,
      },
    ],
    summary: {
      en: "Served as Creative Director at Chance Media (founded by actor Ahmed Akl), crafting TV scripts and Marketing Direction, notably writing and directing the 3-version ad campaign for Noorina LED bulbs factory built around the creative hook \"Before changing your clothes, change your lighting\", alongside launching SECTOR 09 Advertising Agency.",
      ar: "قيادة الإدارة الإبداعية في تشانس ميديا وكتابة وتوجيه حملات التلفزيون، أبرزها حملة من 3 نسخ لمصنع لمبات الليد Noorina بفكرة «قبل ما تغير لبسك، غير إضاءتك»، بالتوازي مع تأسيس وكالة سيكتور 09.",
    },
    highlights: {
      en: [
        "Written & directed 3-version ad campaign for Noorina LED factory: \"Before changing your clothes, change your lighting\"",
        "Creative Director at Chance Media (actor Ahmed Akl) spanning TV commercial scripts, real-estate, and medical campaigns",
        "Founded SECTOR 09 Advertising Agency and directed narrative short films",
      ],
      ar: [
        "كتابة وإدارة حملة Noorina من 3 نسخ إعلانية بفكرة «قبل ما تغير لبسك، غير إضاءتك»",
        "الإدارة الإبداعية وكتابة إعلانات التلفزيون لقطاعات العقارات والمراكز الطبية",
        "تأسيس وكالة سيكتور 09 للدعاية والإعلان وإخراج أفلام روائية قصيرة",
      ],
    },
    links: [
      {
        label: { en: "Chance Media Website", ar: "موقع تشانس ميديا" },
        url: "https://chancemedia.com.eg/",
      },
    ],
  },
  {
    id: "vodafone-wasla-2017",
    railYear: { en: "2017", ar: "2017" },
    period: { en: "2017", ar: "2017" },
    role: {
      en: "Corporate Authorized Customer Operations (Queue 247)",
      ar: "خدمة مفوضي الشركات (Authorized) • أكونت 247",
    },
    organization: {
      en: "Vodafone Business 247 · Authorized Corporate Accounts (Wasla)",
      ar: "فودافون بيزنس 247 • شركة وصلة",
    },
    location: {
      en: "Al-Korba, Heliopolis, Cairo",
      ar: "الكوربة، مصر الجديدة، القاهرة",
    },
    kpis: {
      en: ["Queue 247", "Corporate Authorized", "Heliopolis, Cairo"],
      ar: ["أكونت 247", "مفوضو الشركات", "الكوربة، القاهرة"],
    },
    logos: [
      {
        src: "/assets/clients/vodafone.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
        bg: "#ED1E24",
      },
    ],
    summary: {
      en: "Served on Vodafone Business Queue 247 in Cairo handling Corporate Authorized representatives exclusively, mastering high-stakes B2B account resolution, objection handling, and direct decision-maker communication.",
      ar: "العمل على أكونت 247 لقطاع الأعمال في فودافون بيزنس بالقاهرة، وإدارة التواصل المباشر وحل المشكلات مع مفوضي الشركات وصناع القرار.",
    },
    highlights: {
      en: [
        "Vodafone Business Queue 247 · Corporate Authorized Representatives desk at Al-Korba, Heliopolis",
        "High-stakes B2B account communication and direct objection resolution",
        "Real-world fluency with corporate decision-makers prior to leading agency and HR accounts",
      ],
      ar: [
        "إدارة حسابات وطلبات مفوضي الشركات (Authorized) بمقر الكوربة، مصر الجديدة",
        "التفاوض وحل الاعتراضات والتعامل المباشر مع مسؤولي قطاع الأعمال",
        "اكتساب انضباط التواصل المؤسسي قبل الانتقال لإدارة الوكالات والتوظيف",
      ],
    },
  },
  {
    id: "tecno-digital-2016-2017",
    railYear: { en: "16–17", ar: "16–17" },
    period: { en: "2016 - 2017", ar: "2016 - 2017" },
    role: {
      en: "Pre-Release Software Beta Tester & Forum Moderator",
      ar: "اختبار البرمجيات التجريبية وإدارة المنتدى الرسمي",
    },
    organization: {
      en: "TECNO Mobile (Camon C9 Firmware QA & Forum Moderation)",
      ar: "تكنو موبايل • كامون C9",
    },
    location: { en: "Egypt", ar: "مصر" },
    kpis: {
      en: ["Camon C9 QA", "Pre-Release Firmware", "Forum Moderator"],
      ar: ["كامون C9 QA", "سوفت وير تجريبي", "إدارة المنتدى"],
    },
    logos: [
      {
        src: "/assets/clients/tecno.png",
        alt: { en: "TECNO Mobile", ar: "شعار تكنو موبايل" },
        bg: "#FFFFFF",
        wide: true,
      },
    ],
    summary: {
      en: "In parallel with launching independent Facebook campaigns in 2016, tested pre-release TECNO Mobile firmware per device model, contributing directly to improving the TECNO Camon C9 software build (\"El-Selfie Hekaya\" campaign) alongside moderating the official TECNO forum.",
      ar: "اختبار نسخ السوفت وير التجريبية لهواتف تكنو موبايل قبل طرحها رسمياً، مع مساهمة مباشرة في تطوير إصدار كامون C9 (حملة «السيلفي حكاية») وإدارة المنتدى الرسمي.",
    },
    highlights: {
      en: [
        "Tested pre-release TECNO firmware builds per hardware model prior to rollout",
        "Directly contributed to refining the flagship TECNO Camon C9 software release",
        "Moderated the official TECNO Mobile community and structured launch feedback loops",
      ],
      ar: [
        "فحص نسخ السوفت وير التجريبية لكل طراز وتوثيق الأعطال قبل الإطلاق الرسمي",
        "مساهمة مباشرة في تحسين استقرار نظام هاتف تكنو كامون C9",
        "إدارة المنتدى الرسمي لتكنو موبايل ورفع تقارير الجودة من المستخدمين",
      ],
    },
  },
  {
    id: "digital-marketing-origin-2016",
    railYear: { en: "2016", ar: "2016" },
    period: { en: "2016", ar: "2016" },
    role: {
      en: "Self-Started Digital Marketer & Paid Media Buyer",
      ar: "الانطلاقة الأولى في التسويق الرقمي",
    },
    organization: {
      en: "Independent Personal Facebook Ad Campaigns",
      ar: "حملات ممولة مستقلة على فيسبوك",
    },
    location: { en: "Independent Practice", ar: "مبادرة ذاتية مستقلة" },
    kpis: {
      en: ["Self-Started 2016", "Paid Social Ads", "Independent Launch"],
      ar: ["انطلاقة 2016", "إعلانات ممولة", "ممارسة مستقلة"],
    },
    summary: {
      en: "Entered digital marketing independently in 2016 during university, launching and managing my own Facebook advertising campaigns hands-on before joining any agency or enterprise team.",
      ar: "بالتوازي مع سنوات الجامعة، بدأت إطلاق وإدارة حملات إعلانية ممولة على فيسبوك بشكل مستقل تماماً قبل العمل في أي وكالة أو شركة.",
    },
    highlights: {
      en: [
        "Launched personal paid Facebook ad campaigns in 2016 through hands-on experimentation",
        "Mastered audience targeting, ad copy testing, and early digital buyer behavior independently",
        "Laid the real-world foundation that later shaped agency and client growth work",
      ],
      ar: [
        "إدارة حملات ممولة وتجارب استهداف فعلية بميزانيات حقيقية منذ 2016",
        "فهم سلوك المشتري الرقمي وصياغة الرسائل البيعية من الميدان مباشرة",
        "بناء الخبرة العملية التي مهّدت لاحقاً لإدارة الوكالات ونمو العلامات التجارية",
      ],
    },
  },
  {
    id: "bsc-commerce-2013-2017",
    railYear: { en: "13–17", ar: "13–17" },
    period: { en: "2013 - 2017", ar: "2013 - 2017" },
    role: {
      en: "B.Sc. in Commerce & Business Administration",
      ar: "بكالوريوس تجارة وإدارة أعمال",
    },
    organization: {
      en: "Beni Suef University",
      ar: "جامعة بني سويف",
    },
    location: { en: "Beni Suef, Egypt", ar: "بني سويف، مصر" },
    kpis: {
      en: ["B.Sc. Commerce", "2013 – 2017", "Beni Suef Univ."],
      ar: ["بكالوريوس تجارة", "2013 – 2017", "جامعة بني سويف"],
    },
    summary: {
      en: "Earned a Bachelor's degree in Commerce & Business Administration from Beni Suef University, grounding my field campaigns and Marketing Direction work in solid commercial fundamentals.",
      ar: "تأسيس القاعدة التجارية والإدارية في جامعة بني سويف، وهي الخلفية التي ربطت لاحقاً بين الإبداع الإعلاني وفهم الأرقام والمبيعات.",
    },
    highlights: {
      en: [
        "B.Sc. in Commerce & Business Administration, Beni Suef University (2013 - 2017)",
        "Practical grounding in business administration, marketing fundamentals, and commercial operations",
      ],
      ar: [
        "بكالوريوس تجارة وإدارة أعمال، جامعة بني سويف (2013 – 2017)",
        "بناء الفهم العملي لإدارة الأعمال والسوق والمبيعات الميدانية",
      ],
    },
  },
];

export const CLIENT_STATUS_LABELS: Record<ClientStatus, LocalizedText> = {
  active: { en: "Active", ar: "نشط" },
  new: { en: "New", ar: "جديد" },
  leaving_soon: { en: "Leaving Soon", ar: "مرحلة ختامية" },
  ended: { en: "Ended", ar: "سابق" },
};

export const CASE_STUDY_CATEGORIES: { id: CaseStudyCategoryId; label: LocalizedText }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "retail_hospitality", label: { en: "F&B & Lounges", ar: "المطاعم والكافيهات" } },
  { id: "brand_growth", label: { en: "Brand & Campaigns", ar: "العلامات والحملات" } },
  { id: "corporate_tech", label: { en: "Corporate & Tech", ar: "الشركات والتعليم والتقنية" } },
  { id: "beauty_lifestyle", label: { en: "Beauty & Lifestyle", ar: "التجميل وأسلوب الحياة" } },
  { id: "ai_systems", label: { en: "AI Media", ar: "ميديا الذكاء الاصطناعي" } },
];

/**
 * Sorted by lifecycle tier: Active partners first (Al-Qersh, Mohamed Samy, Hossam Fekry,
 * EL3SAL, Khatwa), followed by New & Leaving Soon studios (Obolus, THE ARCHITECT OF REALITY),
 * and Ended commercial partners. Corporate eras (Chubb, Al-Attar, Chance Media, TECNO) live in CAREER_CHRONICLE only.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "al-qersh-mobile",
    title: { en: "Al-Qersh Mobile", ar: "القرش موبايل" },
    status: "active",
    period: { en: "Since 2022", ar: "منذ 2022" },
    category: "brand_growth",
    discipline: {
      en: "Marketing Direction · Mobile Accessories · 3 Branches",
      ar: "توجيه تسويقي • إكسسوارات الموبايل • 3 فروع",
    },
    image: "/assets/clients/alqersh.jpg",
    isMedallion: true,
    summary: {
      en: "Full Marketing Direction and commercial campaigns for the mobile accessories & electronics brand across 3 Beni Suef branches since 2022, evolving across flagship slogans from \"Met-heseb-hash\" (\"Don't Overcalculate\"), through \"Don't Overthink It, Call El-Qersh\", to \"Your Phone Deserves More.. Choose Right\".",
      ar: "قيادة التوجيه التسويقي والحملات الإعلانية للقرش موبايل عبر 3 فروع في بني سويف منذ 2022؛ بداية من «متحسبهاش»، ثم «متفكرش.. كلم القرش» (#كلم_القرش)، وصولاً إلى الحملة الأحدث «موبايلك يستاهل أكتر.. اختار صح».",
    },
    deliverables: {
      en: [
        "Slogan arc: \"Met-heseb-hash\" -> \"Don't Overthink It, Call El-Qersh\" -> \"Your Phone Deserves More.. Choose Right\"",
        "Scripted product & launch motion reels (\"Metro El-Qersh\", \"El-Basma\", 8th Anniversary × Black Friday) across 3 Beni Suef branches",
        "Audio launches (itel BudsGo / Ace / N63) and clear after-sales warranty trust campaigns",
      ],
      ar: [
        "بناء خط التوجيه التسويقي وتسلسل الشعارات: «متحسبهاش» ثم «متفكرش.. كلم القرش» وصولاً إلى «موبايلك يستاهل أكتر.. اختار صح»",
        "كتابة وإخراج ريلز موشن تجارية («مترو القرش»، «البصمة»، وحملات 8 سنين × الجمعة البيضاء) عبر الفروع الثلاثة",
        "إطلاقات السماعات والأجهزة الصوتية (itel BudsGo / Ace / N63) وحملات إبراز الضمان وخدمة ما بعد البيع",
      ],
    },
    campaigns: {
      en: ["Choose Right", "Call El-Qersh", "Met-heseb-hash", "Metro Motion Reel"],
      ar: ["اختار صح", "متفكرش كلم القرش", "متحسبهاش", "مترو القرش"],
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
      en: "Marketing Direction · Brand Building · Project Films",
      ar: "تأسيس الهوية • توجيه تسويقي • أفلام المشاريع",
    },
    image: "/assets/clients/mohamed-samy.png",
    isWhitePlate: true,
    summary: {
      en: "Architected the digital brand presence from the ground up and lead its Marketing Direction (mohamedsamyworks.com), positioning residential villas and commercial venues (After 8 Cafe, BUNO Cafe, Pyramids Heights, Zahraa El-Maadi) around engineered build precision (\"Bel-Qalam Wel Mastara\").",
      ar: "تأسيس الهوية التجارية والحضور الرقمي لمحمد سامي للديكور بالكامل عبر mohamedsamyworks.com، لإبراز دقة التنفيذ الهندسي («بالقلم والمسطرة») في مشاريع الفيلات والمنشآت مثل After 8 Cafe وBUNO Cafe وبيراميدز هايتس وزهراء المعادي.",
    },
    deliverables: {
      en: [
        "Complete brand creation & Marketing Direction shifting buyer focus from price comparisons to engineered execution quality",
        "Built mohamedsamyworks.com digital showroom highlighting documented real projects and finishing standards",
        "Commercial venue showcase films for After 8 Cafe, BUNO Cafe, Pyramids Heights, and Zahraa El-Maadi",
      ],
      ar: [
        "تأسيس العلامة وبناء التوجيه التسويقي بالكامل لنقل تركيز العميل من مجرد الأسعار إلى جودة التنفيذ الهندسي",
        "إنشاء وتوجيه المعرض الرقمي الرسمي mohamedsamyworks.com لتوثيق المشاريع الميدانية ومعايير التشطيب",
        "أفلام عرض ميدانية لمشاريع After 8 Cafe وBUNO Cafe وبيراميدز هايتس وزهراء المعادي",
      ],
    },
    campaigns: {
      en: ["Bel-Qalam Wel Mastara", "Engineered Finishing", "After 8 Cafe & BUNO"],
      ar: ["التوجيه التسويقي", "بالقلم والمسطرة", "After 8 Cafe وBUNO"],
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
      en: "Platform Management · Center Integration · Rewards System",
      ar: "إدارة المنصة • تكامل طلاب السنتر • نظام المكافآت",
    },
    image: "/assets/clients/hossam-fekry.png",
    isWhitePlate: true,
    summary: {
      en: "Managing the Hossam Fekry Platform and leading its Marketing Direction since 2020: unifying offline center student attendance (QR self check-in & group enrollment sync) with online learning, server-verified points, and the Rewards Store economy on hossamfekry.com.",
      ar: "إدارة منصة حسام فكري والتوجيه التسويقي لها منذ 2020 بشكل متكامل: ربط طلاب السنتر بالتعلم الإلكتروني عبر حضور QR والمجموعات، وتشغيل نظام النقاط ومتجر الجوائز عبر hossamfekry.com.",
    },
    deliverables: {
      en: [
        "End-to-end platform management & Marketing Direction running since 2020",
        "Center Student Integration: QR session self check-in (/attendance/checkin), center-group access alignment & attendance sync",
        "Rewards System & Points Economy: server-verified study points (1x focus, exams, center QR, Cairo streaks) driving the tiered Rewards Store",
      ],
      ar: [
        "إدارة المنصة التعليمية بالكامل وقيادة التوجيه التسويقي وحملات الثانوية العامة منذ 2020",
        "تكامل طلاب السنتر: التحقق بالـ QR لحضور الحصص، ومواءمة المجموعات مع المحتوى الإلكتروني، ومتابعة الالتزام",
        "نظام المكافآت والنقاط: احتساب نقاط موثق للتركيز والامتحانات وحضور السنتر وسلاسل الاستمرار المرتبط بمتجر جوائز متدرج",
      ],
    },
    campaigns: {
      en: ["Center QR Integration", "Rewards System", "Since 2020"],
      ar: ["تكامل طلاب السنتر", "نظام المكافآت", "إدارة منذ 2020"],
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
    title: { en: "El3sal Foods", ar: "العسال فودز" },
    status: "active",
    period: { en: "Since 2024", ar: "منذ 2024" },
    category: "retail_hospitality",
    discipline: {
      en: "Marketing Direction · 50% Takeaway \"Khud We Emshy\" · 140+ Menu",
      ar: "توجيه تسويقي • حملة خد وامشي 50% • قائمة 140+ صنف",
    },
    image: "/assets/clients/el3sal.jpg",
    isMedallion: true,
    summary: {
      en: "Marketing Direction and conversion funnels for El3sal Foods in Beni Suef since 2024: highlighted by the 2nd Anniversary campaign \"Khud We Emshy\" (\"Grab & Go\" 50% off takeaway), complete 140+ item menu redesign, and high-tempo food reels feeding Meta order funnels.",
      ar: "قيادة التوجيه التسويقي وبناء مسارات الطلب للعسال فودز في بني سويف منذ 2024؛ أبرزها حملة عيد الميلاد الثاني «خد وامشي» بخصم 50% على التيك أواي، وإعادة ترتيب قائمة تضم أكثر من 140 صنفاً مع ريلز المطبخ لزيادة الطلبات المباشرة.",
    },
    deliverables: {
      en: [
        "Directed 2nd Anniversary \"Khud We Emshy\" (\"Grab & Go\") campaign built around 50% off takeaway volume peaks",
        "140+ item menu restructuring maximizing add-ons and average basket value",
        "High-tempo food craft reels (\"El3sal × System\", Chicken Ranch, Doner Crunchy) paired with Meta CTR Messages funnels",
      ],
      ar: [
        "قيادة حملة عيد الميلاد الثاني «خد وامشي» بخصم 50% على طلبات التيك أواي لتنشيط الإقبال المباشر على الفرع",
        "توجيه تسويقي متكامل وإعادة هيكلة قائمة 140+ صنفاً لوضوح الاختيار ورفع قيمة الفاتورة",
        "ريلز تحضير الطعام السريعة («العسال × سيستم»، تشيكن رانش، دونر كرانشي) المرتبطة بمسارات رسائل الطلب",
      ],
    },
    campaigns: {
      en: ["Khud We Emshy · 50% Off", "2nd Anniversary", "140+ Item Menu"],
      ar: ["خد وامشي · خصم 50%", "عيد الميلاد الثاني", "قائمة 140+ صنف"],
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
    period: { en: "Since 2021", ar: "منذ 2021" },
    category: "corporate_tech",
    discipline: {
      en: "3-Stage Curriculum Messaging · Real Reels · Parent Leads",
      ar: "تسويق تعليمي • ريلز واقعية • استقطاب أولياء الأمور",
    },
    image: "/assets/clients/khatwa.png",
    isWhitePlate: true,
    summary: {
      en: "Mother-first educational marketing, khatwa.site web direction, and real-classroom documentation reels for Khatwa Nursery in New Beni Suef, translating Post-Infancy, Noor Al-Bayan Foundation, and KG milestones into qualified parent enrollment leads.",
      ar: "استراتيجية تسويق تعليمي تخاطب الأمهات بوضوح في بني سويف الجديدة مع توجيه موقع khatwa.site وتوثيق الأنشطة اليومية لثلاث مراحل (ما بعد الرضاعة، نور البيان، والتمهيدي KG) لتحويل الاستفسارات إلى تسجيلات فعلية.",
    },
    deliverables: {
      en: [
        "Stage-by-stage parent messaging clarity across Post-Infancy, Foundation / Noor Al-Bayan, and KG tracks",
        "Unstaged real classroom activity reels grounded in mother psychology and safety reassurance (\"Step by Step\")",
        "Direct Meta Messenger & WhatsApp parent inquiry qualification workflows linked with khatwa.site",
      ],
      ar: [
        "صياغة واضحة للمنهجية عبر المراحل الثلاث: ما بعد الرضاعة، التأسيس ونور البيان، والتمهيدي KG",
        "إنتاج ريلز توثيقية واقعية من داخل الفصول تمنح الأمهات الطمأنينة والوضوح تحت شعار «بنبني الأساس.. خطوة بخطوة»",
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
      en: "English Economic History · Custom 2D Animation Engine",
      ar: "تاريخ اقتصادي بالإنجليزية • رسوم متحركة 2D",
    },
    image: "/assets/clients/obolus-mark.jpg",
    isMedallion: true,
    summary: {
      en: "English economic history documentary channel in 2D animation for Tier-1 audiences, powered by the custom Obolus Visual Engine v2.1, producing primary-source films on the 1971 Bretton Woods collapse and the 1602 Dutch East India stock market.",
      ar: "قناة وثائقية إنجليزية بالرسوم المتحركة ثنائية الأبعاد تتناول التاريخ الاقتصادي والأنظمة النقدية عبر محرك Obolus Visual Engine v2.1، بأفلام موثقة حول فك ارتباط الدولار بالذهب عام 1971 ونشأة أول سوق أسهم عام 1602.",
    },
    deliverables: {
      en: [
        "In-house Obolus Visual Engine v2.1 driving custom lineless editorial vectors and historical scene lighting",
        "Flagship documented scripts: \"Why Money Stopped Being Real in 1971\" and \"1602 Stock Market Origins\"",
        "Automated research verification, voice-aligned subtitle timing, and custom scored sound mastering",
      ],
      ar: [
        "تشغيل محرك Obolus Visual Engine v2.1 لتوليد مشاهد متجهية تحريرية بلا حواف وتلوين تاريخي منضبط",
        "كتابة وإخراج حلقات موثقة المصادر: أزمة التحول النقدي 1971 ونشأة شركة الهند الشرقية والبورصة 1602",
        "أتمتة التدقيق البحثي ومزامنة التعليق الصوتي والهندسة الصوتية الكاملة لكل فيلم",
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
    period: { en: "Final Run · Sunset", ar: "مرحلة ختامية" },
    category: "ai_systems",
    discipline: {
      en: "International English Channel · Programmatic Visual System",
      ar: "قناة إنجليزية دولية • نظام عرض برمجي",
    },
    image: "/assets/clients/architect-of-reality.png",
    isWhitePlate: true,
    summary: {
      en: "International English psychology and philosophical cinema channel (featuring THE MIND MANUAL series), engineered on a custom programmatic Remotion rendering pipeline before winding down toward archive sunset as studio focus consolidates onto Obolus.",
      ar: "قناة إنجليزية في السرد النفسي والفلسفي (سلسلة THE MIND MANUAL) مبنية على محرك تحريك برمجي مخصص، قبل دخولها المرحلة الختامية لتوجيه تركيز الاستوديو بالكامل نحو Obolus.",
    },
    deliverables: {
      en: [
        "Programmatic A-roll & B-roll scene architecture engineered for long-form audience retention",
        "Automated telemetry, typography HUD components, and strict multi-stage visual QA verification",
        "Series packaging including THE MIND MANUAL crafted prior to channel transition and sunset",
      ],
      ar: [
        "هندسة مشاهد طويلة المدى تجمع بين البطاقات التفسيرية والمقاطع التوضيحية لرفع معدل المشاهدة",
        "مراجعة جودة بصرية برمجية وتكامل وحدات البيانات والنصوص المصاحبة للسرد الإنجليزي",
        "تطوير وتغليف سلسلة THE MIND MANUAL قبيل انتقال الاستوديو وإغلاق المشروع",
      ],
    },
    campaigns: {
      en: ["THE MIND MANUAL", "Final Chapters", "Programmatic Engine"],
      ar: ["THE MIND MANUAL", "المواسم الختامية", "محرك العرض البرمجي"],
    },
    links: [
      {
        label: { en: "YouTube Channel", ar: "قناة يوتيوب" },
        url: "https://www.youtube.com/@thearchitectofreality963",
      },
    ],
  },
  {
    id: "sanhok",
    title: { en: "Sanhok PlayStation & Café", ar: "سانهوك للترفيه والكافيه" },
    status: "ended",
    period: { en: "Ramadan 2025", ar: "رمضان 2025" },
    category: "retail_hospitality",
    discipline: {
      en: "Gen-Z Hook Reels · Hyper-Local Reach · Venue Positioning",
      ar: "ريلز شبابية • استهداف جغرافي • هوية الوجهة",
    },
    image: "/assets/clients/sanhok.jpg",
    isMedallion: true,
    summary: {
      en: "A Ramadan 2025 campaign for Sanhok: youth-culture social positioning, fast-cut promotional video hooks, and hyper-local Meta footfall campaigns keeping PlayStation arenas and café seating filled across weekday and tournament hours.",
      ar: "حملة رمضان 2025 لسانهوك: بناء حضور اجتماعي يشبه لغة الشباب عبر فيديوهات سريعة الإيقاع وحملات استهداف جغرافي على ميتا، لضمان امتلاء صالات البلايستيشن والكافيه طوال الأسبوع والبطولات.",
    },
    deliverables: {
      en: [
        "High-energy Gen-Z motion hooks & gaming tournament hype reels driving immediate shareability",
        "Hyper-local 3km-radius paid social reach campaigns maximizing weekday off-peak utilization",
        "Distinct visual brand language blending esports atmosphere with café hospitality",
      ],
      ar: [
        "تصميم مقاطع فيديو شبابية سريعة الإيقاع وإعلانات لبطولات الألعاب ترفع التفاعل والمشاركة",
        "حملات ميتا ممولة بنطاق جغرافي دقيق لتنشيط الإقبال اليومي خارج أوقات الذروة",
        "صياغة هوية بصرية تدمج أجواء المنافسات الإلكترونية مع تجربة الكافيه العصرية",
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
      {
        label: { en: "Ramadan 2025 Campaign Reel", ar: "ريل حملة رمضان 2025" },
        url: "https://www.facebook.com/reel/557540380669088",
      },
    ],
  },
  {
    id: "yasmine-salah",
    title: { en: "Yasmine Salah Makeup Artist", ar: "ياسمين صلاح • خبيرة تجميل" },
    status: "ended",
    period: { en: "Started 2023", ar: "بداية من 2023" },
    category: "beauty_lifestyle",
    discipline: {
      en: "Bridal Portfolio Direction · Instagram Positioning · Bookings",
      ar: "هوية إنستجرام • عرض إطلالات العرائس • الحجوزات",
    },
    image: "/assets/clients/yasmine-salah.jpg",
    isPortraitMedallion: true,
    summary: {
      en: "Refined personal brand positioning and Instagram visual presentation for Makeup Artist Yasmine Salah, curating signature bridal transformation showcases that attract qualified seasonal booking inquiries.",
      ar: "تطوير الهوية البصرية على إنستجرام لخبيرة التجميل ياسمين صلاح، وإبراز تفاصيل إطلالات العرائس بأسلوب راقٍ يرفع معدل طلبات الحجز الجادة.",
    },
    deliverables: {
      en: [
        "Cohesive bridal portfolio curation & studio lighting presentation standards on Instagram",
        "Seasonally timed social booking campaigns converting organic lookbook reach into appointments",
        "Elevated tone of voice distinguishing signature craft in competitive local beauty markets",
      ],
      ar: [
        "تنسيق المعرض البصري لإطلالات العرائس وتوحيد معايير العرض على منصة إنستجرام",
        "حملات مواسم الزفاف لتحويل التفاعل العضوي إلى طلبات حجز ومواعيد مؤكدة",
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
    name: { en: "Creative System Orchestration", ar: "بناء المنصات والمواقع" },
    domain: { en: "Autonomous Web & Brand Systems", ar: "تخطيط وهندسة الأنظمة" },
    role: {
      en: "Turning strategic briefs into fast, high-converting web experiences, automated visual quality gates, and structured brand architecture.",
      ar: "تحويل الرؤية التجارية إلى مواقع ومنصات ويب متكاملة، بهوية رقمية متماسكة وجاهزة للإطلاق.",
    },
  },
  {
    name: { en: "Programmatic Video Engines", ar: "إنتاج الفيديو التجاري آلياً" },
    domain: { en: "Remotion & Automated Motion", ar: "محركات الفيديو المبرمجة" },
    role: {
      en: "Frame-accurate commercial reels and modular video pipelines engineered for consistent visual identity at scale.",
      ar: "بناء محركات فيديو مبرمجة تنتج إعلانات وريلز متسقة بصرياً وتحافظ على هوية كل علامة.",
    },
  },
  {
    name: { en: "Grounded Documentary Pipelines", ar: "البحث الموثق والسرد البصري" },
    domain: { en: "Source-Verified Storytelling", ar: "منظومة البحث والمعرفة الموثقة" },
    role: {
      en: "Fact-checked long-form scripts, editorial voice pacing, and animated documentary worlds built for international channels.",
      ar: "إعداد بحوث ونصوص وثائقية طويلة مدققة المصادر وتحويلها إلى عوالم متحركة لقنوات دولية.",
    },
  },
];
