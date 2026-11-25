export type Lang = "en" | "ar";

export type CaseStudyCategoryId =
  | "all"
  | "brand_growth"
  | "retail_hospitality"
  | "beauty_lifestyle"
  | "education_tech"
  | "ai_systems";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface OrganizationLogo {
  src: string;
  alt: LocalizedText;
  bg: string;
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
  imageBg?: string;
  isLogoMark?: boolean;
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
  name: string;
  domain: LocalizedText;
  role: LocalizedText;
}

export const PORTFOLIO_IDENTITY = {
  handle: "begamal",
  brandMark: { en: "BEGAMAL", ar: "بلال جمال" },
  pageTitle: {
    en: "Belal Gamal | Creative Director & AI Production Architect",
    ar: "بلال جمال | مدير إبداعي ومهندس أنظمة إنتاج بالذكاء الاصطناعي",
  },
  name: { en: "Belal Gamal", ar: "بلال جمال" },
  primaryTitle: { en: "Creative Director", ar: "مدير إبداعي" },
  heroSubtitle: {
    en: "Creative Direction & AI Systems",
    ar: "قيادة إبداعية وأنظمة إنتاج ذكية",
  },
  heroEyebrow: {
    en: "Creative Director · Egypt (Cairo / Beni Suef)",
    ar: "مدير إبداعي · مصر (القاهرة / بني سويف)",
  },
  heroSubtext: {
    en: "Independent Creative Director, Digital Marketing Strategist, and AI Production Architect. Building brands, campaigns, and AI media systems since 2016.",
    ar: "مدير إبداعي مستقل، وموجه تسويق رقمي، ومهندس أنظمة إنتاج بالذكاء الاصطناعي. أبني العلامات التجارية والحملات التسويقية منذ 2016.",
  },
  secondaryDisciplines: {
    en: "Digital Marketing Strategist · AI Production Architect",
    ar: "استراتيجي تسويق رقمي · مهندس أنظمة إنتاج بالذكاء الاصطناعي",
  },
  bornLabel: { en: "Born July 20, 1995", ar: "مواليد 20 يوليو 1995" },
  bornCompact: "20.07.1995",
  educationTitle: { en: "B.Sc. in Commerce", ar: "بكالوريوس التجارة" },
  educationSub: {
    en: "Business Administration (English Section), Beni Suef University",
    ar: "إدارة الأعمال (شعبة اللغة الإنجليزية)، جامعة بني سويف",
  },
  base: { en: "Egypt (Cairo / Beni Suef)", ar: "مصر (القاهرة / بني سويف)" },
  reach: {
    en: "Working Independently & Globally",
    ar: "عمل مستقل وشراكات محلية وعالمية",
  },
  pointOfView: {
    en: "Independent Creative Director with a sharp, uncompromising creative perspective. Building brands, campaigns, and AI-driven media systems through conviction and clarity rather than generic trends.",
    ar: "مدير إبداعي مستقل برؤية واضحة لا تقبل الحلول التقليدية. أبني العلامات التجارية والحملات التسويقية وأنظمة الإنتاج المعتمدة على الذكاء الاصطناعي انطلاقاً من الفهم التجاري الحقيقي بعيداً عن القوالب الجاهزة.",
  },
  portraitPath: "/assets/portrait.jpg",
  liveDomain: "https://begamal.pages.dev",
  email: "1@begamal.com",
  vimeoUrl: "https://vimeo.com/begamal",
  vimeoLabel: "vimeo.com/begamal",
};

export const UI_COPY = {
  nav: {
    chronicle: { en: "Chronicle", ar: "المسيرة" },
    works: { en: "Works", ar: "الأعمال" },
    systems: { en: "Systems", ar: "الأنظمة" },
    cta: { en: "Direct Inquiry", ar: "تواصل مباشر" },
    openMenu: { en: "Open navigation menu", ar: "فتح القائمة" },
    closeMenu: { en: "Close navigation menu", ar: "إغلاق القائمة" },
  },
  hero: {
    secondaryCta: { en: "Selected Works", ar: "أبرز الأعمال" },
    portraitAlt: {
      en: "Belal Gamal portrait in low-key monochrome studio light",
      ar: "صورة شخصية لبلال جمال بإضاءة استوديو أحادية اللون",
    },
  },
  statement: {
    coordinates: { en: "Coordinates", ar: "النشأة والمقر" },
    education: { en: "Academic Foundation", ar: "الخلفية الأكاديمية" },
    scope: { en: "Practice Scope", ar: "نطاق العمل" },
  },
  chronicle: {
    title: { en: "Career Chronicle", ar: "المسيرة المهنية" },
    subtitle: {
      en: "A decade across commercial marketing, enterprise operations, talent acquisition, independent brand direction, and AI media engineering.",
      ar: "عشر سنوات متواصلة بين التسويق التجاري، وعمليات الشركات الكبرى، واستقطاب الكفاءات، والإدارة الإبداعية المستقلة، وهندسة أنظمة الذكاء الاصطناعي.",
    },
  },
  works: {
    eyebrow: { en: "Client Roster & Case Studies", ar: "شركاء النجاح ودراسات الحالة" },
    title: { en: "Selected Works", ar: "أبرز الأعمال" },
    openDossier: { en: "Project Brief", ar: "ملف المشروع" },
    visitPage: { en: "Visit Client Page", ar: "زيارة صفحة العميل" },
    scopeHeading: { en: "Scope & Execution", ar: "نطاق التنفيذ والنتائج" },
    closeModal: { en: "Close project brief", ar: "إغلاق الملف" },
  },
  systems: {
    title: { en: "AI Production Architecture", ar: "منظومة الإنتاج بالذكاء الاصطناعي" },
    subtitle: {
      en: "Active since the 2023 wave, uniting local orchestration, programmatic video production, and grounded knowledge systems.",
      ar: "خبرة عملية متعمقة منذ موجة 2023 في بناء خطوط إنتاج متكاملة للفيديو التلقائي والوثائقي وتطوير المنصات عبر أدوات الذكاء الاصطناعي المحلية.",
    },
  },
  contact: {
    title: { en: "Direct Inquiry", ar: "تواصل مباشر" },
    subtitle: {
      en: "Available for creative direction retainers, commercial campaign architecture, and custom AI production pipelines.",
      ar: "متاح للتعاقدات الاستشارية في التوجيه الإبداعي، وإدارة الحملات التجارية، وبناء أنظمة الإنتاج المعتمدة على الذكاء الاصطناعي.",
    },
    copyAddress: { en: "Copy Address", ar: "نسخ البريد" },
    copied: { en: "Copied", ar: "تم النسخ" },
    showreel: { en: "Showreel Archive", ar: "أرشيف الأعمال المرئية" },
    domain: { en: "Domain", ar: "الموقع الرسمي" },
    base: { en: "Base", ar: "المقر" },
    footerLeft: {
      en: "Belal Gamal · Independent Creative Director",
      ar: "بلال جمال · مدير إبداعي مستقل",
    },
    footerRight: {
      en: "Beni Suef / Cairo · 2016 - 2026",
      ar: "بني سويف / القاهرة · 2016 - 2026",
    },
  },
};

export const CAREER_CHRONICLE: ChronicleEntry[] = [
  {
    id: "digital-marketing-2016",
    period: { en: "2016 - Present", ar: "2016 - حتى الآن" },
    role: {
      en: "Digital Marketing & Content Creation (10 Years)",
      ar: "التسويق الرقمي وصناعة المحتوى (10 سنوات)",
    },
    organization: {
      en: "Commercial Foundations & Community Moderation",
      ar: "تأسيس تجاري وإدارة مجتمعات تقنية",
    },
    location: { en: "Egypt", ar: "مصر" },
    summary: {
      en: "Entered digital marketing and commercial content creation in 2016 while still in university, alongside community moderation for TECNO Mobile, building a decade-long foundation in audience psychology and conversion.",
      ar: "دخلت مجال التسويق الرقمي وصناعة المحتوى التجاري عام 2016 بالتوازي مع الدراسة الجامعية وإدارة مجتمعات علامة تكنو موبايل، مما أسس لخبرة تمتد لعقد كامل في سيكولوجية الجمهور وتحويل التفاعل إلى مبيعات.",
    },
    highlights: {
      en: [
        "10 years of continuous commercial practice since 2016",
        "Community moderation for TECNO Mobile during university",
        "Grounded in audience psychology and measurable conversion",
      ],
      ar: [
        "عشر سنوات متواصلة من العمل التسويقي والتجاري الفعلي منذ 2016",
        "إدارة مجتمعات علامة تكنو موبايل أثناء الدراسة الجامعية",
        "تركيز دائم على سيكولوجية المستهلك ومعدلات التحويل البيعي",
      ],
    },
  },
  {
    id: "vodafone-wasla-2017",
    period: { en: "2017", ar: "2017" },
    role: {
      en: "Enterprise Customer Operations",
      ar: "عمليات عملاء الشركات (فودافون بيزنس)",
    },
    organization: {
      en: "Vodafone Business Call Center, Wasla",
      ar: "مركز خدمة عملاء فودافون بيزنس، وصلة",
    },
    location: {
      en: "Al-Korba, Heliopolis, Cairo",
      ar: "الكوربة، مصر الجديدة، القاهرة",
    },
    logos: [
      {
        src: "/assets/clients/vodafone.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
        bg: "#E60000",
      },
    ],
    summary: {
      en: "Frontline enterprise customer operations for Vodafone Business in Cairo, mastering high-stakes communication, objection handling, and client psychology.",
      ar: "العمل في الصفوف الأمامية لعمليات عملاء الشركات في فودافون بيزنس بالقاهرة، وإتقان مهارات التفاوض والرد على الاعتراضات وفهم عقلية العميل التجاري.",
    },
    highlights: {
      en: [
        "Al-Korba, Heliopolis operations floor",
        "Enterprise communication and objection handling",
        "Real-time commercial client psychology",
      ],
      ar: [
        "التشغيل المباشر في فرع الكوربة بمصر الجديدة",
        "إدارة المحادثات التجارية المعقدة ومعالجة اعتراضات العملاء",
        "قراءة سريعة لاحتياجات أصحاب الأعمال والشركات",
      ],
    },
  },
  {
    id: "chance-media-sector09-2018",
    period: { en: "2018", ar: "2018" },
    role: {
      en: "Creative Director & Independent Founder",
      ar: "مدير إبداعي ومؤسس وكالة مستقلة",
    },
    organization: {
      en: "Chance Media (Ahmed Akl) & SECTOR 09",
      ar: "تشانس ميديا (أحمد عقل) ووكالة سيكتور 09",
    },
    location: { en: "Cairo / Beni Suef", ar: "القاهرة / بني سويف" },
    summary: {
      en: "Served as Creative Director at Chance Media (founded by renowned actor Ahmed Akl), leading commercial concepts, TV ad scripts, and campaign direction, alongside launching independent agency SECTOR 09 and directing narrative short films.",
      ar: "توليت منصب المدير الإبداعي في تشانس ميديا (المؤسسة من الفنان أحمد عقل)، لقيادة الأفكار الإعلانية وكتابة سيناريوهات إعلانات التلفزيون وتوجيه الحملات، بالتوازي مع تأسيس وكالة سيكتور 09 المستقلة وإخراج أفلام روائية قصيرة.",
    },
    highlights: {
      en: [
        "Creative Director at Chance Media (founded by Ahmed Akl)",
        "Commercial concepts, TV ad scripts, and campaign direction",
        "Founded independent agency SECTOR 09 and directed narrative short films",
      ],
      ar: [
        "مدير إبداعي في شركة تشانس ميديا التي أسسها الفنان أحمد عقل",
        "كتابة اسكربتات إعلانات التلفزيون وقيادة المفاهيم الإبداعية للحملات",
        "تأسيس وكالة سيكتور 09 المستقلة وإخراج أفلام قصيرة",
      ],
    },
  },
  {
    id: "al-attar-2018-2021",
    period: { en: "2018 - 2021", ar: "2018 - 2021" },
    role: {
      en: "Digital Marketing & Content Creation",
      ar: "التسويق الرقمي وصناعة المحتوى التجاري",
    },
    organization: { en: "Al-Attar Group", ar: "مجموعة العطار" },
    location: { en: "Egypt", ar: "مصر" },
    summary: {
      en: "Led digital marketing, content creation, and high-volume commercial ad campaigns for Al-Attar Group through 2021.",
      ar: "قيادة التسويق الرقمي وصناعة المحتوى وإطلاق الحملات الإعلانية المكثفة لمجموعة العطار حتى عام 2021.",
    },
    highlights: {
      en: [
        "Full-scale digital marketing and content production",
        "High-volume commercial advertising campaigns",
        "Multi-year brand growth through 2021",
      ],
      ar: [
        "إدارة شاملة للتسويق الرقمي وتطوير المحتوى الإعلاني",
        "تنفيذ حملات إعلانية تجارية عالية التفاعل",
        "شراكة نمو متواصلة من 2018 حتى 2021",
      ],
    },
  },
  {
    id: "majorel-vodafone-2019-2022",
    period: { en: "2019 - 2022", ar: "2019 - 2022" },
    role: {
      en: "HR Recruitment Specialist (3 Years) · Majorel BPO (Vodafone & Uber)",
      ar: "أخصائي توظيف موارد بشرية (3 سنوات) · ماجوريل لخدمات التعهيد (فودافون وأوبر)",
    },
    organization: {
      en: "Majorel Egypt (Global CX & BPO) · Smart Village, Beni Suef",
      ar: "ماجوريل مصر (تعهيد الأعمال وتجربة العملاء) · القرية الذكية ببني سويف",
    },
    location: { en: "Smart Village, Beni Suef", ar: "القرية الذكية، بني سويف" },
    logos: [
      {
        src: "/assets/clients/majorel.jpg",
        alt: { en: "Majorel", ar: "شعار ماجوريل" },
        bg: "#FFFFFF",
      },
      {
        src: "/assets/clients/vodafone.png",
        alt: { en: "Vodafone", ar: "شعار فودافون" },
        bg: "#E60000",
      },
      {
        src: "/assets/clients/uber.png",
        alt: { en: "Uber", ar: "شعار أوبر" },
        bg: "#000000",
      },
    ],
    summary: {
      en: "Joined Smart Village in Beni Suef in 2019 on Vodafone's 888 queue, then earned promotion to HR Recruitment Specialist at global CX & BPO leader Majorel, spending 3 years leading high-volume recruitment for enterprise accounts including Vodafone and Uber.",
      ar: "انضممت للعمل في القرية الذكية ببني سويف عام 2019 على خط 888 التابع لفودافون، ثم تمت ترقيتي إلى أخصائي توظيف موارد بشرية في شركة ماجوريل العالمية لتعهيد الأعمال وتجربة العملاء، حيث قدت على مدار 3 سنوات التوظيف لحسابات كبرى تشمل فودافون وأوبر.",
    },
    highlights: {
      en: [
        "Started in 2019 at Smart Village (Beni Suef) on Vodafone 888 before promotion to Majorel HR Recruitment",
        "Managed recruitment for Uber enterprise accounts: Uber Rider, Uber Driver, and Uber Eats",
        "Managed recruitment across Vodafone queues: 888, Vodafone Cash, CVM, and ADSL",
        "Hired ~550 employees in 2020 and recognized as Top Achiever (Beni Suef Recruitment Team)",
      ],
      ar: [
        "بداية المسار في القرية الذكية ببني سويف عام 2019 على صف 888 ثم الترقية لقسم التوظيف بشركة ماجوريل",
        "تولي عمليات التوظيف لحسابات أوبر: ركاب أوبر، كباتن أوبر، وأوبر إيتس",
        "تغطية احتياجات التعيين لصفوف فودافون: 888، فودافون كاش، إدارة القيمة، والإنترنت المنزلي",
        "تعيين نحو 550 موظفاً خلال عام 2020 والحصول على لقب الأعلى تحقيقاً بفريق توظيف بني سويف",
      ],
    },
  },
  {
    id: "independent-director-2022",
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    role: {
      en: "Independent Creative Director & Growth Partner",
      ar: "مدير إبداعي مستقل وشريك نمو",
    },
    organization: {
      en: "Independent Commercial Practice",
      ar: "شراكات تجارية متعددة القطاعات",
    },
    location: { en: "Egypt & Regional", ar: "مصر والمنطقة" },
    summary: {
      en: "Partnering with leading local and regional businesses across retail, hospitality, beauty, architecture, and education, directing long-term brand growth and acquisition funnels.",
      ar: "شراكة إبداعية وتنفيذية مع علامات رائدة في قطاعات الهواتف والمطاعم والتجميل والديكور والتعليم لبناء الهوية ومضاعفة المبيعات.",
    },
    highlights: {
      en: [
        "Long-term creative direction for Al-Qersh Mobile since 2022",
        "Multi-sector leadership across hospitality, beauty, architecture, and EdTech",
        "Full alignment between creative storytelling and direct revenue",
      ],
      ar: [
        "توجيه إبداعي مستمر لشركة القرش موبايل منذ 2022",
        "إدارة حملات وهوية في قطاعات الضيافة والتجميل والديكور والمنصات التعليمية",
        "ربط الإبداع البصري مباشرة بعائد الاستثمار والمبيعات الفعلية",
      ],
    },
  },
  {
    id: "ai-systems-2023",
    period: { en: "2023 - Present", ar: "2023 - حتى الآن" },
    role: {
      en: "AI Creative & Production Systems",
      ar: "أنظمة الإنتاج الإبداعي بالذكاء الاصطناعي",
    },
    organization: {
      en: "Automated Media & Web Engineering",
      ar: "هندسة المحتوى المرئي وتطوير الويب",
    },
    location: { en: "Local & Global Pipelines", ar: "خطوط إنتاج محلية وعالمية" },
    summary: {
      en: "Deep hands-on mastery of AI workflows since the 2023 wave, architecting automated video, documentary production, and custom web engineering pipelines.",
      ar: "إتقان عملي عميق لسير عمل الذكاء الاصطناعي منذ موجة 2023، وبناء منظومات متكاملة لإنتاج الفيديو الآلي والأفلام الوثائقية وتطوير المنصات.",
    },
    highlights: {
      en: [
        "End-to-end documentary channel systems (Obolus)",
        "Programmatic motion architecture with HyperFrames and Remotion Studio",
        "Autonomous engineering and research via Antigravity, Claude, and Graphify",
      ],
      ar: [
        "تأسيس خطوط إنتاج وثائقية متكاملة لقناة أوبولوس",
        "إنتاج فيديو مبرمج وعالي الدقة عبر HyperFrames وRemotion Studio",
        "هندسة برمجية وبحثية متكاملة عبر Antigravity وClaude وGraphify",
      ],
    },
  },
];

export const CASE_STUDY_CATEGORIES: { id: CaseStudyCategoryId; label: LocalizedText }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "retail_hospitality", label: { en: "Retail & Hospitality", ar: "التجزئة والضيافة" } },
  { id: "brand_growth", label: { en: "Brand & Campaigns", ar: "العلامات والحملات" } },
  { id: "beauty_lifestyle", label: { en: "Beauty & Lifestyle", ar: "التجميل والأسلوب" } },
  { id: "education_tech", label: { en: "Education & Tech", ar: "التعليم والتقنية" } },
  { id: "ai_systems", label: { en: "AI Media", ar: "إنتاج الذكاء الاصطناعي" } },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "al-qersh-mobile",
    title: { en: "Al-Qersh Mobile", ar: "القرش موبايل" },
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    category: "retail_hospitality",
    discipline: {
      en: "Creative Direction · Commercial Reels · Retail Growth",
      ar: "التوجيه الإبداعي · الريلز التجاري · نمو الفروع",
    },
    image: "/assets/clients/alqersh.jpg",
    imageBg: "#0036B8",
    isLogoMark: true,
    summary: {
      en: "Directing brand discipline and commercial campaigns across 3 branches in Beni Suef since 2022, turning product releases, seasonal events, and after-sales trust into steady retail momentum.",
      ar: "قيادة الهوية والحملات الإعلانية لثلاثة فروع في بني سويف منذ 2022، وتحويل إطلاقات الهواتف والإكسسوارات والمواسم الكبرى إلى مبيعات يومية مستمرة.",
    },
    deliverables: {
      en: [
        "Unified brand positioning across 3 physical retail branches in Beni Suef",
        "8th Anniversary and Black Friday high-volume promotional campaigns",
        "Commercial audio product reels and after-sales customer authority",
      ],
      ar: [
        "توحيد الصورة الذهنية لثلاثة فروع في بني سويف تحت هوية بصرية ثابتة",
        "قيادة حملات الذكرى الثامنة والبلاك فرايدي بمشاهدات ومبيعات واسعة",
        "إنتاج ريلز تقنية لمنتجات الصوت وترسيخ الثقة بخدمات ما بعد البيع",
      ],
    },
    campaigns: {
      en: ["8th Anniversary", "Black Friday", "Product Reels", "After-Sales Authority"],
      ar: ["#كلم_القرش", "القرش عضّ في الأسعار", "الذكرى الثامنة", "بلاك فرايدي"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/elqrsh963",
      },
    ],
  },
  {
    id: "el3sal",
    title: { en: "EL3SAL Crepe & Pizza", ar: "مطعم العسال" },
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    category: "retail_hospitality",
    discipline: {
      en: "Menu Architecture · QSR Campaigns · Conversion",
      ar: "تطوير المنيو · حملات المطاعم · مسارات الطلب",
    },
    image: "/assets/clients/el3sal.jpg",
    imageBg: "#ED6C18",
    isLogoMark: true,
    summary: {
      en: "Complete 140+ item menu redesign paired with high-tempo food craft reels and Facebook Messages conversion funnels built to drive direct branch visits and delivery orders.",
      ar: "إعادة تصميم شاملة لقائمة طعام تضم أكثر من 140 صنفاً مع إنتاج ريلز مطاعم سريع الإيقاع وحملات رسائل فيسبوك تستهدف الطلب المباشر.",
    },
    deliverables: {
      en: [
        "Full 140+ item menu restructuring for clarity and higher ticket value",
        "Signature QSR campaigns built around bold seasonal launches",
        "Craft food reels paired with direct Facebook CTR Messages funnels",
      ],
      ar: [
        "إعادة بناء وتنسيق منيو كامل بأكثر من 140 صنفاً لرفع قيمة الطلب",
        "إطلاق حملات موسمية قوية لترسيخ العلامة في سوق المطاعم",
        "تصوير ومونتاج ريلز احترافية مع قمع تحويل مباشر عبر رسائل الصفحة",
      ],
    },
    campaigns: {
      en: ["THE CRAVING STANDARD", "RANCH TAKES OVER", "140+ Item Menu"],
      ar: ["معيار الطعم الحقيقي", "حملة صوص الرانش", "منيو 140+ صنف"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/EL3salFoods/",
      },
    ],
  },
  {
    id: "sanhok",
    title: { en: "Sanhok PlayStation & Café", ar: "سانهوك بلايستيشن وكافيه" },
    period: { en: "Commercial Partner", ar: "شريك تجاري" },
    category: "retail_hospitality",
    discipline: {
      en: "Commercial Media · Entertainment Marketing",
      ar: "الإنتاج الترفيهي · التسويق التجاري",
    },
    image: "/assets/clients/sanhok.jpg",
    imageBg: "#02132A",
    isLogoMark: true,
    summary: {
      en: "Commercial entertainment marketing and high-energy digital campaigns tailored to keep gaming lounges and café seating consistently booked.",
      ar: "توجيه تسويقي وصناعة محتوى ترفيهي وتجاري موجه لجمهور الألعاب والكافيهات لرفع معدلات الإقبال والحجز المستمر.",
    },
    deliverables: {
      en: [
        "Youth-focused visual storytelling and promotional video hooks",
        "Targeted local social campaigns driving walk-in traffic",
        "Cohesive digital presence across entertainment offerings",
      ],
      ar: [
        "محتوى مرئي وخطافات إعلانية تناسب جمهور الألعاب والكافيهات",
        "حملات محلية موجهة لزيادة الزيارات اليومية والحجوزات",
        "بناء حضور رقمي واضح ومترابط لهوية المكان",
      ],
    },
    campaigns: {
      en: ["Gaming Lounge", "Local Traffic", "Commercial Media"],
      ar: ["صالات الألعاب", "زيارات محلية", "إنتاج ترفيهي"],
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
    title: { en: "Yasmine Salah Makeup Artist", ar: "ياسمين صلاح ميك أب أرتيست" },
    period: { en: "Commercial Partner", ar: "شريكة نجاح" },
    category: "beauty_lifestyle",
    discipline: {
      en: "Beauty Positioning · Social Growth · Bookings",
      ar: "التموضع البصري · نمو السوشيال · حجوزات",
    },
    summary: {
      en: "Strategic social positioning and digital presence management for Makeup Artist Yasmine Salah, connecting high-craft visual showcases directly with bridal and client bookings.",
      ar: "إدارة الحضور الرقمي والتموضع البصري لخبيرة التجميل ياسمين صلاح لربط جودة الأعمال المعروضة بتدفق مستمر من حجوزات العرائس والعميلات.",
    },
    deliverables: {
      en: [
        "Refined social presentation aligned with bridal and beauty clientele",
        "Targeted Facebook campaigns built for qualified booking inquiries",
        "Consistent visual storytelling across showcase deliverables",
      ],
      ar: [
        "عرض بصري راقٍ يتماشى مع ذوق عميلات التجميل والعرائس",
        "حملات مستهدفة لتحويل التفاعل إلى استفسارات وحجوزات حقيقية",
        "تنسيق محتوى مستمر يبرز دقة الشغل وثقة العميلات",
      ],
    },
    campaigns: {
      en: ["Beauty Positioning", "Bridal Bookings", "Social Growth"],
      ar: ["تموضع قطاع التجميل", "حجوزات العرائس", "نمو رقمي"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/profile.php?id=100057476078591",
      },
    ],
  },
  {
    id: "hossam-fikry",
    title: { en: "Hossam Fikry Platform", ar: "منصة حسام فكري" },
    period: { en: "EdTech Platform", ar: "منصة تعليمية" },
    category: "education_tech",
    discipline: {
      en: "Academic Identity · Platform Engineering · Campaigns",
      ar: "الهوية الأكاديمية · هندسة المنصة · الحملات",
    },
    image: "/assets/clients/hossam-fekry.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Academic visual direction, enrollment campaigns, and ongoing frontend engineering for the Hossam Fikry educational platform serving thousands of students.",
      ar: "قيادة الهوية البصرية التعليمية، وإدارة حملات التسجيل، والصيانة والتطوير البرمجي المستمر لمنصة حسام فكري التي تخدم آلاف الطلاب.",
    },
    deliverables: {
      en: [
        "Cohesive academic visual identity and campaign storytelling",
        "Active web platform maintenance and experience engineering",
        "Student-focused reels and seasonal enrollment pushes",
      ],
      ar: [
        "هوية أكاديمية متكاملة وحملات موسمية لاستقطاب الطلاب",
        "تطوير وصيانة مستمرة لواجهة وتجربة استخدام المنصة التعليمية",
        "إنتاج ريلز تعليمية وترويجية ترفع الارتباط بالمنصة",
      ],
    },
    campaigns: {
      en: ["Academic Identity", "Web Engineering", "Student Enrollment"],
      ar: ["الهوية التعليمية", "تطوير المنصة", "حملات التسجيل"],
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
    id: "mohamed-samy",
    title: { en: "Mohamed Samy Works", ar: "محمد سامي للديكور والتشطيبات" },
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    category: "brand_growth",
    discipline: {
      en: "Creative Direction · Architecture Positioning · Web",
      ar: "التوجيه الإبداعي · تموضع المعمار · الويب",
    },
    image: "/assets/clients/mohamed-samy.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Creative direction, digital positioning, and high-value commercial project promotion across Mohamed Samy's interior contracting work and active client roster.",
      ar: "قيادة التوجيه الإبداعي والتموضع الرقمي والترويج للمشاريع التجارية والسكنية الكبرى لأعمال المهندس محمد سامي في الديكور والتشطيبات.",
    },
    deliverables: {
      en: [
        "Digital positioning targeting commercial venues and residential villas",
        "Dedicated digital showroom web presence and campaign supervision",
        "Promotional direction for flagship interior showcase projects",
      ],
      ar: [
        "تموضع احترافي يستهدف عملاء الفلل والمشاريع التجارية الكبرى",
        "بناء الواجهة الرقمية والإشراف على الحملات التعريفية",
        "التوجيه التسويقي والترويجي لمشاريع الديكور والتنفيذ المعماري",
      ],
    },
    campaigns: {
      en: ["Interior Positioning", "Digital Showroom", "Commercial Roster"],
      ar: ["تموضع الديكور", "المعرض الرقمي", "حملات المشاريع"],
    },
    links: [
      {
        label: { en: "Facebook Page", ar: "صفحة فيسبوك" },
        url: "https://www.facebook.com/mohamedsamyworks/",
      },
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "http://mohamedsamyworks.com",
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
      ar: "التسويق الرقمي · الحملات الإعلانية",
    },
    image: "/assets/clients/attar-group.jpg",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Full-scale digital marketing, content creation, and commercial advertising campaigns executed for Al-Attar Group across 2018 through 2021.",
      ar: "قيادة التسويق الرقمي وصناعة المحتوى وإدارة الحملات الإعلانية التجارية لمجموعة العطار خلال الفترة من 2018 وحتى 2021.",
    },
    deliverables: {
      en: [
        "Multi-year digital marketing and commercial content production",
        "High-volume paid advertising campaigns across product lines",
        "Sustained regional market visibility and customer acquisition",
      ],
      ar: [
        "تخطيط وتنفيذ التسويق الرقمي وصناعة المحتوى لثلاث سنوات",
        "إدارة حملات إعلانية تجارية مكثفة لمختلف خطوط المنتجات",
        "تعزيز الانتشار السوقي واستقطاب العملاء بشكل مستمر",
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
    id: "obolus",
    title: { en: "Obolus (@obolus.explains)", ar: "أوبولوس (Obolus)" },
    period: { en: "AI Media Studio", ar: "استوديو إنتاج بالذكاء الاصطناعي" },
    category: "ai_systems",
    discipline: {
      en: "English 2D Documentary · Automated Production Stack",
      ar: "أفلام وثائقية إنجليزية · خط إنتاج ذكي",
    },
    image: "/assets/clients/obolus-ep02.jpg",
    imageBg: "#0A0A0C",
    isLogoMark: false,
    summary: {
      en: "Tier-1 English faceless 2D animated documentary channel covering Economic History and Money Systems, built end-to-end with a custom local AI production stack.",
      ar: "قناة وثائقية إنجليزية بالرسوم المتحركة ثنائية الأبعاد موجهة للجمهور العالمي في التاريخ الاقتصادي وأنظمة المال، مبنية بالكامل عبر منظومة ذكاء اصطناعي محلية.",
    },
    deliverables: {
      en: [
        "Custom local AI production pipeline from research to final render",
        "Long-form 2D animated documentaries on Economic History & Money",
        "Deterministic vector animation, voiceover alignment, and sound design",
      ],
      ar: [
        "بناء خط إنتاج محلي متكامل من البحث والكتابة حتى التصدير النهائي",
        "أفلام وثائقية طويلة في التاريخ الاقتصادي وأنظمة النقد",
        "تحريك فيكتور دقيق ومزامنة صوتية وموسيقى ومؤثرات مخصصة",
      ],
    },
    campaigns: {
      en: ["1971 Monetary Shift", "1602 Stock Market Origins", "2D Documentary Engine"],
      ar: ["حلقة 1971", "حلقة بورصة 1602", "محرك الوثائقيات"],
    },
    links: [],
  },
  {
    id: "architect-of-reality",
    title: { en: "THE ARCHITECT OF REALITY", ar: "ذا أركيتيكت أوف ريالتي" },
    period: { en: "YouTube Channel", ar: "قناة يوتيوب" },
    category: "ai_systems",
    discipline: {
      en: "Tier-1 English Channel · THE MIND MANUAL Series",
      ar: "قناة يوتيوب إنجليزية · سلسلة دليل العقل",
    },
    image: "/assets/clients/architect-of-reality.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Flagship English YouTube channel built for Tier-1 international audiences, combining long-form psychological and philosophical deconstruction with a custom programmatic Remotion animation engine.",
      ar: "مشروع الهوية الشخصية على يوتيوب باللغة الإنجليزية للجمهور العالمي، يجمع بين التفكيك الفكري والنفسي طويل النفس وبناء محرك تحريك برمجي خاص عبر Remotion Studio.",
    },
    deliverables: {
      en: [
        "THE MIND MANUAL long-form 2D animated episode architecture",
        "Custom Remotion rendering pipeline, voice pacing, and visual QA loops",
        "End-to-end packaging strategy built for watch time and audience retention",
      ],
      ar: [
        "بناء سلسلة الحلقات الطويلة بتحريك ثنائي الأبعاد مخصص بالكامل",
        "تطوير محرك إنتاج متكامل عبر Remotion مع تدقيق بصري وصوتي صارم",
        "هندسة العناوين والصور المصغرة لرفع معدلات الاحتفاظ بالمشاهدين",
      ],
    },
    campaigns: {
      en: ["THE MIND MANUAL", "Long-Form Retention", "Programmatic Animation"],
      ar: ["سلسلة دليل العقل", "إنتاج طويل النفس", "تحريك برمجي"],
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
    category: "education_tech",
    discipline: {
      en: "Nursery Marketing · Reels Production · Parent Conversion",
      ar: "تسويق تعليمي · إنتاج ريلز · استقطاب أولياء الأمور",
    },
    image: "/assets/clients/khatwa.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Marketing direction and real-activity video reels for Khatwa Academy and Nursery in New Beni Suef, structuring clear stage-by-stage parent messaging that drives qualified enrollment inquiries.",
      ar: "التوجيه التسويقي وإنتاج الريلز الواقعي لأكاديمية وحضانة خطوة في بني سويف الجديدة، عبر رسائل واضحة للأمهات تشرح كل مرحلة تعليمية وتوجه لاستفسارات التسجيل.",
    },
    deliverables: {
      en: [
        "Stage-structured parent positioning across post-infancy, pre-KG, and KG",
        "Authentic activity reels built around real nursery moments",
        "Direct Messenger and WhatsApp qualification funnels for New Beni Suef parents",
      ],
      ar: [
        "تنظيم العرض التعليمي حسب مراحل ما بعد الرضع والتمهيدي وKG",
        "إنتاج ريلز يبرز الأنشطة الحقيقية داخل الحضانة بدون مبالغة",
        "مسار تواصل وتأهيل مباشر لأولياء الأمور في بني سويف الجديدة",
      ],
    },
    campaigns: {
      en: ["Stage-by-Stage Clarity", "Real Activity Reels", "Parent Funnel"],
      ar: ["كل سن ليه خطوته", "توثيق الأنشطة الحقيقية", "بني سويف الجديدة"],
    },
    links: [
      {
        label: { en: "Official Website", ar: "الموقع الرسمي" },
        url: "https://www.khatwa.site",
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
      ar: "الإدارة الإبداعية · إعلانات التلفزيون · العقارات والطب",
    },
    summary: {
      en: "Creative Direction, TV ad scriptwriting, and campaign leadership for real-estate and medical brand accounts at Chance Media, founded by actor Ahmed Akl.",
      ar: "قيادة الإدارة الإبداعية وكتابة اسكربتات إعلانات التلفزيون وتوجيه حملات العقارات والمراكز الطبية في شركة تشانس ميديا المؤسسة من الفنان أحمد عقل.",
    },
    deliverables: {
      en: [
        "Creative direction across commercial agency accounts",
        "Television commercial scriptwriting and narrative concepts",
        "Real-estate and medical sector brand campaign execution",
      ],
      ar: [
        "التوجيه الإبداعي لحسابات الشركات داخل الوكالة",
        "كتابة سيناريوهات الإعلانات التلفزيونية والمفاهيم الإخراجية",
        "تنفيذ حملات إعلانية متخصصة لقطاعي العقارات والطب",
      ],
    },
    campaigns: {
      en: ["TV Ad Scripts", "Real Estate", "Medical Brands"],
      ar: ["اسكربتات تلفزيون", "عقارات", "علامات طبية"],
    },
    links: [],
  },
];

export const AI_PRODUCTION_STACK: StackTool[] = [
  {
    name: "Google Antigravity",
    domain: { en: "Autonomous Build & Orchestration", ar: "البناء والأتمتة الهندسية" },
    role: {
      en: "Multi-file engineering, visual verification, and rapid delivery",
      ar: "تنفيذ المشاريع البرمجية المتعددة والفحص البصري وتسريع التسليم",
    },
  },
  {
    name: "Claude",
    domain: { en: "Creative Architecture & Code", ar: "الهندسة الإبداعية والبرمجة" },
    role: {
      en: "System planning, script craft, and deterministic pipelines",
      ar: "تخطيط الأنظمة وصياغة النصوص وبناء خطوط العمل الدقيقة",
    },
  },
  {
    name: "HyperFrames",
    domain: { en: "Programmatic Motion", ar: "التحريك البرمجي" },
    role: {
      en: "Deterministic frame-accurate commercial video assembly",
      ar: "تركيب الفيديو الإعلاني بدقة الفريم الواحد برمجياً",
    },
  },
  {
    name: "Remotion Studio",
    domain: { en: "React Video Systems", ar: "أنظمة فيديو React" },
    role: {
      en: "Component-driven reel production and automated rendering",
      ar: "إنتاج الريلز والوسائط عبر مكونات برمجية قابلة للتوسع",
    },
  },
  {
    name: "NotebookLM MCP",
    domain: { en: "Research & Grounding", ar: "البحث والتوثيق المرجعي" },
    role: {
      en: "Source-verified documentary synthesis and reference indexing",
      ar: "تحليل المصادر الموثقة وبناء قواعد المعرفة الوثائقية",
    },
  },
  {
    name: "Local Graphify",
    domain: { en: "Codebase Knowledge Graph", ar: "خرائط المعرفة البرمجية" },
    role: {
      en: "Local structural mapping across active client repositories",
      ar: "ربط وفهرسة البنية البرمجية لمشاريع العملاء محلياً",
    },
  },
];
