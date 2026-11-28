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
    en: "Belal Gamal | Marketing & Creative Direction · AI Systems",
    ar: "بلال جمال | التوجيه التسويقي والإبداعي وأنظمة الذكاء الاصطناعي",
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
    en: "I read the market from outside the noise. Field sales experience, creative direction and production systems run as one commercial path, held accountable to results.",
    ar: "أقرأ السوق من خارج الضجيج. خبرة بيع ميدانية، وتوجيه إبداعي، وأنظمة إنتاج، في مسار تجاري واحد يُحاسَب بالنتيجة.",
  },
  signature: "Lost Among Stars",
  doctrineLabel: { en: "Operating Doctrine", ar: "منهج العمل" },
  doctrine: [
    {
      index: "01",
      title: { en: "Recon", ar: "الرصد" },
      text: {
        en: "Read the market, the competitor and the audience before any idea.",
        ar: "أقرأ السوق والمنافس والجمهور قبل أي فكرة.",
      },
    },
    {
      index: "02",
      title: { en: "Position", ar: "التموضع" },
      text: {
        en: "One place in the market no one else can claim.",
        ar: "أحدد للعلامة موقعاً واحداً لا ينازعها فيه أحد.",
      },
    },
    {
      index: "03",
      title: { en: "Execute", ar: "التنفيذ" },
      text: {
        en: "One clear campaign, measured in messages and sales, not likes.",
        ar: "حملة واحدة واضحة، تُقاس بالرسائل والمبيعات لا بالإعجابات.",
      },
    },
  ],
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
      en: "Ten years on record. 2016: my own Facebook ad campaigns and TECNO Camon C9 firmware QA. Then Vodafone Business, Chance Media, Al-Attar, Majorel Smart Village talent acquisition and Chubb Life leadership. Today: AI production systems. Open any era to read its full log.",
      ar: "عشر سنوات في السجل. 2016: حملات ممولة أديرها بنفسي واختبار برمجيات هواتف تكنو. ثم فودافون بيزنس، وتشانس ميديا، ومجموعة العطار، وماجوريل بالقرية الذكية، وقيادة المبيعات في تشب. واليوم: أنظمة الإنتاج بالذكاء الاصطناعي. افتح أي حقبة لقراءة سجلها الكامل.",
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
    /** Featured films shown side by side under the showreel header */
    films: [
      {
        id: "mohamed-samy-vimeo",
        url: "https://vimeo.com/begamal",
        poster: "/assets/showreel-poster.jpg",
        eyebrow: { en: "Mohamed Samy Works · Vimeo", ar: "محمد سامي للديكور • Vimeo" },
        title: { en: "Project Films", ar: "أفلام المشاريع" },
        cta: { en: "Watch on Vimeo", ar: "شاهد على Vimeo" },
      },
      {
        id: "qersh-black-friday-rap",
        url: "https://www.facebook.com/reel/1166865936289409",
        poster: "/assets/qersh-system-poster.jpg",
        eyebrow: { en: "Al-Qersh Mobile · Black Friday", ar: "القرش موبايل • بلاك فرايداي" },
        title: { en: "“New Tech. We Are the Trend.”", ar: "«تكنولوچيا جديدة.. احنا الموضة»" },
        cta: { en: "Watch on Facebook", ar: "شاهد على فيسبوك" },
      },
    ],
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
      en: "Since 2023 I build my own production lines: research, writing, programmatic motion and web in one system. Documentaries, commercials and platforms ship faster, at a consistent standard.",
      ar: "منذ 2023 أبني خطوط الإنتاج بنفسي: البحث، والكتابة، والتحريك البرمجي، والويب، في منظومة واحدة. الوثائقيات والإعلانات والمنصات تخرج أسرع، وبمستوى ثابت.",
    },
  },
  contact: {
    eyebrow: { en: "Open Channel", ar: "القناة مفتوحة" },
    title: { en: "Work With Belal", ar: "اعمل مع بلال" },
    subtitle: {
      en: "For Marketing Direction anchored in clear positioning and commercial growth, or automated AI media pipelines, initiate direct contact below.",
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
      en: "AI production since 2023: automated English documentary channels, programmatic motion pipelines and custom interactive web systems, built and run by me.",
      ar: "الإنتاج بالذكاء الاصطناعي منذ 2023: قنوات وثائقية إنجليزية مؤتمتة، وخطوط فيديو برمجية، ومواقع ويب تفاعلية، أبنيها وأشغّلها بنفسي.",
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
      en: "September 2022 to July 2023 at Chubb Life Insurance Egypt: led the commercial team, coached it daily and drove its monthly targets, with the enterprise discipline built at Vodafone and Majorel.",
      ar: "قدت فريق المبيعات الميدانية في تشب لتأمينات الحياة مصر من سبتمبر 2022 إلى يوليو 2023. تدريب يومي، ومستهدفات شهرية تتحقق.",
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
      en: "Talent Acquisition Specialist · High-Attrition BPO Hiring (Top Achiever)",
      ar: "أخصائي استقطاب المواهب • الأعلى تحقيقاً",
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
      en: "2019: Smart Village, Beni Suef, on Vodafone's 888 queue. Promoted to Talent Acquisition Specialist at Majorel, held through August 2021. Staffed high-attrition call-center accounts for Vodafone and Uber: ~550 hires in 2020, Top Achiever. Also produced an employer-branding film on the Smart Village work environment to attract and retain talent.",
      ar: "2019: القرية الذكية ببني سويف، على خط 888 في فودافون. ثم ترقية إلى أخصائي استقطاب المواهب في ماجوريل حتى أغسطس 2021. تعيينات حسابات أوبر وفودافون في بيئة دوران وظيفي عالٍ: نحو 550 تعييناً في 2020، والأعلى أداءً. وأخرجت فيلماً ترويجياً لبيئة العمل بالقرية الذكية لجذب الكفاءات.",
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
        en: "The role went beyond hiring numbers. I helped build the local HR foundation and trained several HR trainees who earned official company certifications, including Mostafa Badr, who grew from trainee into a full-time hire. I mentored Esraa Saad from the day she joined the HR team; when the department went through a major team transition, she led the function and ran the core company accounts solo. Impact is measured by the people you build, not the seats you fill.",
        ar: "لم يتوقف الدور عند أرقام التوظيف. شاركت في تأسيس نواة فريق الموارد البشرية، ودربت عدداً من المتدربين (HR Trainees) حصلوا على شهادات معتمدة من الشركة، منهم مصطفى بدر الذي تدرّج حتى تعيينه رسمياً. ووجّهت إسراء سعد منذ انضمامها للفريق؛ وحين مر القسم بمرحلة انتقالية كبيرة، قادته وأدارت حسابات الشركة الرئيسية بمفردها. الأثر يُقاس ببناء الأشخاص، لا بسد الشواغر.",
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
      en: "Three years leading Marketing Direction, content and campaigns for Al-Attar Group. The file closed in August 2021 with the campaign \"Elly Magadedsh Mat\" (\"Whoever Doesn't Renew Dies Out\").",
      ar: "ثلاث سنوات على رأس التوجيه التسويقي والمحتوى والحملات لمجموعة العطار. أُغلق الملف في أغسطس 2021 بحملة «اللي مجددش مات»، الموثقة على Vimeo.",
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
      en: "Creative Director at Chance Media (founded by actor Ahmed Akl): TV scripts and Marketing Direction. Wrote and directed the 3-version campaign for the Noorina LED bulbs factory on one hook: \"Before changing your clothes, change your lighting\". In parallel, founded SECTOR 09 Advertising Agency.",
      ar: "الإدارة الإبداعية في تشانس ميديا: كتابة وتوجيه حملات التلفزيون. كتبت ووجهت حملة من 3 نسخ لمصنع لمبات الليد Noorina على فكرة واحدة: «قبل ما تغير لبسك، غير إضاءتك». وبالتوازي، أسست وكالة سيكتور 09.",
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
      en: "Vodafone Business Queue 247, Cairo: corporate authorized representatives only. B2B account resolution, objection handling and direct contact with decision-makers.",
      ar: "فودافون بيزنس، أكونت 247 بالقاهرة: مفوضو الشركات فقط. حل المشكلات، والتفاوض، والتواصل المباشر مع صناع القرار.",
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
      en: "Alongside my first Facebook campaigns in 2016: tested pre-release TECNO Mobile firmware per device model, contributed directly to the TECNO Camon C9 software build (\"El-Selfie Hekaya\" campaign) and moderated the official TECNO forum.",
      ar: "بالتوازي مع حملاتي الأولى عام 2016: اختبرت نسخ السوفت وير التجريبية لهواتف تكنو موبايل قبل طرحها، وساهمت مباشرة في تطوير إصدار كامون C9 (حملة «السيلفي حكاية»)، وأدرت المنتدى الرسمي.",
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
      en: "2016, during university: my own Facebook ad campaigns, launched and run hands-on before any agency or company.",
      ar: "2016، خلال سنوات الجامعة: حملات إعلانية ممولة على فيسبوك أطلقها وأديرها بنفسي، قبل أي وكالة أو شركة.",
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
      en: "Bachelor's in Commerce & Business Administration, Beni Suef University. The commercial base under every campaign since.",
      ar: "بكالوريوس تجارة وإدارة أعمال من جامعة بني سويف. القاعدة التي ربطت الإبداع الإعلاني بالأرقام والمبيعات.",
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
      en: "Marketing Direction and campaigns for Al-Qersh Mobile across 3 Beni Suef branches since 2022. The slogan line on record: \"Met-heseb-hash\" (\"Don't Overcalculate\"), then \"Don't Overthink It, Call El-Qersh\", then \"Your Phone Deserves More.. Choose Right\".",
      ar: "أدير التوجيه التسويقي والحملات للقرش موبايل في 3 فروع ببني سويف منذ 2022. تسلسل الشعارات في السجل: «متحسبهاش»، ثم «متفكرش.. كلم القرش» (#كلم_القرش)، ثم «موبايلك يستاهل أكتر.. اختار صح».",
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
      en: "Built the brand and digital presence from zero and run its Marketing Direction (mohamedsamyworks.com). One position: engineered build precision (\"Bel-Qalam Wel Mastara\"), shown on villas and venues: After 8 Cafe, BUNO Cafe, Pyramids Heights, Zahraa El-Maadi.",
      ar: "بنيت الهوية التجارية والحضور الرقمي لمحمد سامي للديكور من الصفر عبر mohamedsamyworks.com. موقع واحد في السوق: دقة التنفيذ الهندسي («بالقلم والمسطرة»)، على مشاريع الفيلات والمنشآت مثل After 8 Cafe وBUNO Cafe وبيراميدز هايتس وزهراء المعادي.",
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
      en: "Platform management and Marketing Direction for Hossam Fekry since 2020: center attendance (QR self check-in and group sync) tied to online learning, server-verified points and the Rewards Store on hossamfekry.com.",
      ar: "أدير منصة حسام فكري وتوجيهها التسويقي منذ 2020: حضور السنتر بالـ QR ومزامنة المجموعات مربوطة بالتعلم الإلكتروني، ونظام نقاط موثق ومتجر جوائز على hossamfekry.com.",
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
      en: "Marketing Direction and order funnels for El3sal Foods in Beni Suef since 2024. On record: the 2nd Anniversary campaign \"Khud We Emshy\" (\"Grab & Go\", 50% off takeaway), a 140+ item menu rebuilt for clear choice, and fast food-prep reels feeding Meta message funnels.",
      ar: "أدير التوجيه التسويقي ومسارات الطلب للعسال فودز في بني سويف منذ 2024. في السجل: حملة عيد الميلاد الثاني «خد وامشي» بخصم 50% على التيك أواي، وقائمة من أكثر من 140 صنفاً أُعيد ترتيبها لوضوح الاختيار، وريلز مطبخ سريعة مربوطة برسائل الطلب.",
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
      en: "Education marketing for Khatwa Nursery in New Beni Suef that speaks to mothers first: khatwa.site direction and real-classroom reels that turn Post-Infancy, Noor Al-Bayan Foundation and KG milestones into qualified enrollment inquiries.",
      ar: "تسويق تعليمي لحضانة خطوة في بني سويف الجديدة يخاطب الأمهات أولاً: توجيه موقع khatwa.site، وريلز من داخل الفصول للمراحل الثلاث (ما بعد الرضاعة، نور البيان، والتمهيدي KG)، تحوّل الاستفسارات إلى تسجيلات فعلية.",
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
      en: "English economic-history documentary channel in 2D animation for Tier-1 audiences, built on my own Obolus Visual Engine v2.1. On record: source-verified films on the 1971 Bretton Woods collapse and the 1602 Dutch East India stock market.",
      ar: "قناة وثائقية إنجليزية بالرسوم المتحركة ثنائية الأبعاد في التاريخ الاقتصادي والأنظمة النقدية، على محرك Obolus Visual Engine v2.1. في السجل: أفلام موثقة المصادر عن فك ارتباط الدولار بالذهب عام 1971، ونشأة أول سوق أسهم عام 1602.",
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
      en: "English psychology and philosophy channel (THE MIND MANUAL series) on a custom programmatic Remotion pipeline. Now in its final run, as the studio focus moves fully to Obolus.",
      ar: "قناة إنجليزية في السرد النفسي والفلسفي (سلسلة THE MIND MANUAL) على محرك تحريك برمجي مخصص. في مرحلتها الختامية الآن، مع انتقال تركيز الاستوديو بالكامل إلى Obolus.",
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
      en: "A Ramadan 2025 campaign for Sanhok: youth-language social presence, fast-cut video hooks and hyper-local Meta campaigns to fill the PlayStation arenas and café through the week and tournament hours.",
      ar: "حملة رمضان 2025 لسانهوك: حضور اجتماعي بلغة الشباب، وفيديوهات سريعة الإيقاع، وحملات ميتا باستهداف جغرافي دقيق، لملء صالات البلايستيشن والكافيه طوال الأسبوع وفي البطولات.",
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
      en: "Brand positioning and Instagram presentation for makeup artist Yasmine Salah: bridal transformations curated to bring in serious seasonal booking inquiries.",
      ar: "تموضع وهوية بصرية على إنستجرام لخبيرة التجميل ياسمين صلاح: إطلالات العرائس معروضة بتفاصيلها لجذب طلبات الحجز الجادة في المواسم.",
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
