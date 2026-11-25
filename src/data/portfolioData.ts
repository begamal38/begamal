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
  isWhitePlate?: boolean;
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
  { id: "perspective", index: "02", label: { en: "Manifesto", ar: "المنهجية" } },
  { id: "chronicle", index: "03", label: { en: "Chronicle", ar: "المسيرة" } },
  { id: "works", index: "04", label: { en: "Works", ar: "الأعمال" } },
  { id: "systems", index: "05", label: { en: "Systems", ar: "الأنظمة" } },
  { id: "contact", index: "06", label: { en: "Contact", ar: "التواصل" } },
];

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
    ar: "الإدارة الإبداعية وأنظمة الذكاء الاصطناعي",
  },
  heroEyebrow: {
    en: "Creative Director · Digital Strategist · AI Architect",
    ar: "مدير إبداعي · مخطط تسويق رقمي · مهندس أنظمة إنتاج",
  },
  heroSubtext: {
    en: "Creative Director, Digital Marketing Strategist, and AI Production Architect. Building brands, high-converting campaigns, and automated media systems since 2016.",
    ar: "مدير إبداعي، ومخطط استراتيجيات تسويق رقمي، ومهندس أنظمة إنتاج بالذكاء الاصطناعي. أقود بناء العلامات التجارية والحملات الإعلانية عالية التحويل ومنظومات الإنتاج الإعلامي المؤتمتة منذ عام 2016.",
  },
  bornLabel: { en: "Born July 20, 1995", ar: "مواليد 20 يوليو 1995" },
  bornCompact: "20.07.1995",
  educationTitle: {
    en: "B.Sc. in Commerce (English Section)",
    ar: "بكالوريوس التجارة (شعبة اللغة الإنجليزية)",
  },
  educationSub: {
    en: "Business Administration, Beni Suef University",
    ar: "قسم إدارة الأعمال · جامعة بني سويف",
  },
  trackTitle: {
    en: "10 Years · Multi-Sector Execution",
    ar: "عشر سنوات · تنفيذ عبر قطاعات متعددة",
  },
  trackSub: {
    en: "Telecom, TV & Film, Retail, QSR, Beauty, Architecture, EdTech & AI Media",
    ar: "الاتصالات · التلفزيون والسينما · التجزئة · المطاعم · التجميل · الديكور · التعليم · وميديا الذكاء الاصطناعي",
  },
  pointOfView: {
    en: "I do not build noise or chase short-lived trends. Every brand, campaign, and media system I direct is built from commercial conviction, real market psychology, and disciplined execution.",
    ar: "لا أصنع ضجيجاً عابراً ولا ألهث وراء المظاهر المؤقتة. منذ دخولي السوق عام 2016، تنطلق كل علامة تجارية وحملة إعلانية ومنظومة إنتاجية أقودها من قناعة تجارية راسخة، وفهم عميق لنفسية السوق، وتنفيذ منضبط يحقق نتائج ملموسة.",
  },
  portraitPath: "/assets/portrait.jpg",
  liveDomain: "https://begamal.pages.dev",
  email: "1@begamal.com",
  vimeoUrl: "https://vimeo.com/begamal",
  vimeoLabel: "vimeo.com/begamal",
  facebookUrl: "https://www.facebook.com/begamal",
  facebookLabel: "facebook.com/begamal",
};

export const UI_COPY = {
  nav: {
    chronicle: { en: "Chronicle", ar: "المسيرة" },
    works: { en: "Works", ar: "الأعمال" },
    systems: { en: "Systems", ar: "الأنظمة" },
    cta: { en: "Connect", ar: "تواصل الآن" },
    openMenu: { en: "Open navigation menu", ar: "فتح قائمة التنقل" },
    closeMenu: { en: "Close navigation menu", ar: "إغلاق قائمة التنقل" },
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
      en: "Ten years across commercial marketing, enterprise operations, large-scale corporate recruitment, brand direction, and AI production systems.",
      ar: "عشر سنوات متدرجة في التسويق التجاري، وعمليات الشركات الكبرى، والتوظيف المؤسسي واسع النطاق، والإدارة الإبداعية، وهندسة أنظمة الإنتاج بالذكاء الاصطناعي.",
    },
  },
  works: {
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
      en: "Since the 2023 wave, I have built full production engines that turn strategy into finished documentaries, commercials, and custom web experiences at scale.",
      ar: "منذ انطلاق موجة الذكاء الاصطناعي عام 2023، طورت محركات إنتاج متكاملة تحول الرؤية الاستراتيجية إلى أفلام وثائقية مكتملة، وحملات إعلانية، ومنصات ويب مخصصة بمعايير احترافية.",
    },
  },
  contact: {
    eyebrow: { en: "Direct Channel", ar: "القناة المباشرة" },
    title: { en: "Ready to Scale Your Brand?", ar: "هل أنت مستعد لتطوير علامتك التجارية؟" },
    subtitle: {
      en: "If you want clear creative direction, campaigns built on real buyer psychology, or an AI media pipeline that actually delivers, start the conversation directly.",
      ar: "لقيادة الإدارة الإبداعية، أو صياغة حملات ترتكز على سيكولوجية المشتري، أو بناء منظومة إنتاج إعلامي بالذكاء الاصطناعي تحقق نتائج فعلية، يمكنك بدء التواصل مباشرة.",
    },
    facebookCta: { en: "Message on Facebook", ar: "التواصل عبر فيسبوك" },
    vimeoCta: { en: "Watch Showreel on Vimeo", ar: "معرض الأعمال على فيميو" },
    copyEmail: { en: "Copy 1@begamal.com", ar: "نسخ 1@begamal.com" },
    copiedEmail: { en: "Copied 1@begamal.com", ar: "تم نسخ 1@begamal.com" },
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
      en: "Commercial Foundations & TECNO Mobile Moderation",
      ar: "الأسس التجارية وإدارة مجتمعات تكنو موبايل",
    },
    location: { en: "Egypt", ar: "مصر" },
    summary: {
      en: "Entered digital marketing and commercial content creation in 2016 while still in university, alongside community moderation for TECNO Mobile, building a decade-long foundation in audience psychology and conversion.",
      ar: "انطلقت في مجال التسويق الرقمي وصناعة المحتوى التجاري عام 2016 بالتوازي مع الدراسة الجامعية، إلى جانب إدارة المجتمعات الرقمية لعلامة تكنو موبايل، مما أرسى أساساً مهنياً يمتد لعشر سنوات في فهم سيكولوجية الجمهور وتحويل التفاعل إلى مبيعات.",
    },
    highlights: {
      en: [
        "10 years of continuous commercial practice since 2016",
        "Community moderation for TECNO Mobile during university",
        "Grounded in audience psychology and measurable conversion",
      ],
      ar: [
        "عشر سنوات من الممارسة التجارية المتواصلة منذ عام 2016",
        "إدارة المجتمعات الرقمية لعلامة تكنو موبايل خلال المرحلة الجامعية",
        "الارتكاز على سيكولوجية الجمهور وتحقيق معدلات تحويل قابلة للقياس",
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
        bg: "#E60000",
      },
    ],
    summary: {
      en: "Frontline enterprise customer operations for Vodafone Business in Cairo, mastering high-stakes communication, objection handling, and client psychology.",
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
      en: "Creative Director & Independent Founder",
      ar: "مدير إبداعي ومؤسس وكالة مستقلة",
    },
    organization: {
      en: "Chance Media (Ahmed Akl) & SECTOR 09",
      ar: "تشانس ميديا (تأسيس الفنان أحمد عقل) ووكالة سيكتور 09",
    },
    location: { en: "Cairo / Beni Suef", ar: "القاهرة / بني سويف" },
    summary: {
      en: "Served as Creative Director at Chance Media (founded by renowned actor Ahmed Akl), leading commercial concepts, TV ad scripts, and campaign direction, alongside launching independent agency SECTOR 09 and directing narrative short films.",
      ar: "توليت منصب المدير الإبداعي في وكالة تشانس ميديا (التي أسسها الفنان أحمد عقل)، حيث قدت صياغة المفاهيم الإعلانية وكتابة نصوص الإعلانات التلفزيونية والتوجيه الإبداعي للحملات، بالتوازي مع تأسيس وكالتي المستقلة سيكتور 09 وإخراج أفلام روائية قصيرة.",
    },
    highlights: {
      en: [
        "Creative Director at Chance Media (founded by Ahmed Akl)",
        "Commercial concepts, TV ad scripts, and campaign direction",
        "Founded independent agency SECTOR 09 and directed narrative short films",
      ],
      ar: [
        "مدير إبداعي في وكالة تشانس ميديا (تأسيس الفنان أحمد عقل)",
        "تطوير المفاهيم التجارية وكتابة نصوص الإعلانات التلفزيونية وتوجيه الحملات",
        "تأسيس وكالة سيكتور 09 المستقلة وإخراج أفلام روائية قصيرة",
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
      en: "HR Recruitment Specialist (3 Years) · Majorel BPO (Vodafone & Uber)",
      ar: "أخصائي توظيف وموارد بشرية (3 سنوات) · شركة ماجوريل (فودافون وأوبر)",
    },
    organization: {
      en: "Majorel Egypt (Global CX & BPO) · Smart Village, Beni Suef",
      ar: "ماجوريل مصر (الرائدة عالمياً في تعهيد الأعمال وتجربة العملاء) · القرية الذكية، بني سويف",
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
      ar: "التحقت بالقرية الذكية في بني سويف عام 2019 ضمن صف 888 في فودافون، ثم تمت ترقيتي إلى أخصائي توظيف وموارد بشرية في شركة ماجوريل العالمية (رائدة خدمات مراكز الاتصال وتعهيد الأعمال)، حيث أدرت على مدار 3 سنوات عمليات التوظيف عالية الكثافة لحسابات كبرى تشمل فودافون وأوبر.",
    },
    highlights: {
      en: [
        "Started in 2019 at Smart Village (Beni Suef) on Vodafone 888 before promotion to Majorel HR Recruitment",
        "Managed recruitment for Uber enterprise accounts: Uber Rider, Uber Driver, and Uber Eats",
        "Managed recruitment across Vodafone queues: 888, Vodafone Cash, CVM, and ADSL",
        "Hired ~550 employees in 2020 and recognized as Top Achiever (Beni Suef Recruitment Team)",
      ],
      ar: [
        "الانطلاق عام 2019 في القرية الذكية ببني سويف على خط 888 في فودافون قبل الترقية لقسم التوظيف في ماجوريل",
        "إدارة ملفات التوظيف لحسابات أوبر المؤسسية: أوبر للركاب، وأوبر للسائقين، وأوبر إيتس",
        "إدارة التوظيف لصفوف فودافون: 888، وفودافون كاش، والاحتفاظ بالعملاء، والإنترنت الأرضي",
        "تعيين نحو 550 موظفاً في عام 2020 والحصول على تكريم الأعلى تحقيقاً في فريق توظيف بني سويف",
      ],
    },
  },
  {
    id: "independent-director-2022",
    period: { en: "2022 - Present", ar: "2022 - حتى الآن" },
    role: {
      en: "Creative Director & Growth Partner",
      ar: "مدير إبداعي وشريك نمو تجاري",
    },
    organization: {
      en: "Multi-Sector Commercial Roster",
      ar: "محفظة عملاء عبر قطاعات تجارية متعددة",
    },
    location: { en: "Multi-Sector", ar: "قطاعات متعددة" },
    summary: {
      en: "Partnering with leading businesses across mobile retail, QSR hospitality, gaming lounges, beauty, interior architecture, and EdTech, driving brand clarity and direct sales.",
      ar: "شراكات تنفيذية مع علامات بارزة في قطاعات تجارة الهواتف، والمطاعم، وصالات الألعاب، والتجميل، والتشطيبات المعمارية، وتقنية التعليم، لترسيخ وضوح الهوية وتحقيق المبيعات المباشرة.",
    },
    highlights: {
      en: [
        "Long-term creative direction for Al-Qersh Mobile since 2022",
        "Multi-sector execution across retail, hospitality, beauty, interiors, and education",
        "Full alignment between brand identity and commercial revenue",
      ],
      ar: [
        "إدارة إبداعية طويلة الأمد لعلامة القرش موبايل منذ عام 2022",
        "تنفيذ ميداني عبر قطاعات التجزئة، والضيافة، والتجميل، والديكور، والتعليم",
        "مواءمة كاملة بين الهوية البصرية والعوائد التجارية الفعلية",
      ],
    },
  },
  {
    id: "ai-systems-2023",
    period: { en: "2023 - Present", ar: "2023 - حتى الآن" },
    role: {
      en: "AI Creative & Production Systems",
      ar: "الإبداع المؤسسي وأنظمة الإنتاج بالذكاء الاصطناعي",
    },
    organization: {
      en: "Automated Documentary, Video & Web Systems",
      ar: "أنظمة الوثائقيات والفيديو والمواقع المؤتمتة",
    },
    location: { en: "Global Audiences", ar: "جمهور عالمي ومحلي" },
    summary: {
      en: "Deep hands-on mastery of AI production since the 2023 wave, architecting automated English documentary channels, programmatic commercial video pipelines, and custom web platforms.",
      ar: "إتقان عملي معمق لأنظمة الإنتاج بالذكاء الاصطناعي منذ موجة 2023، وتصميم وبناء قنوات وثائقية إنجليزية مؤتمتة، وخطوط إنتاج فيديو تجاري مبرمجة، ومنصات ويب مخصصة.",
    },
    highlights: {
      en: [
        "End-to-end English documentary systems (Obolus & THE ARCHITECT OF REALITY)",
        "Programmatic motion and reel production engines built for speed and precision",
        "Custom web architecture and rapid interactive deployment",
      ],
      ar: [
        "بناء وإدارة قنوات وثائقية إنجليزية متكاملة (أوبولوس وذا أركيتيكت أوف ريالتي)",
        "تطوير محركات مبرمجة لإنتاج المقاطع التجارية بدقة وسرعة عالية",
        "هندسة واجهات ومنصات ويب تفاعلية مخصصة وسريعة الإطلاق",
      ],
    },
  },
];

export const CASE_STUDY_CATEGORIES: { id: CaseStudyCategoryId; label: LocalizedText }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "retail_hospitality", label: { en: "Retail & Hospitality", ar: "التجزئة والضيافة" } },
  { id: "brand_growth", label: { en: "Brand & Campaigns", ar: "العلامات والحملات" } },
  { id: "beauty_lifestyle", label: { en: "Beauty & Lifestyle", ar: "التجميل وأسلوب الحياة" } },
  { id: "education_tech", label: { en: "Education & Tech", ar: "التعليم والتقنية" } },
  { id: "ai_systems", label: { en: "AI Media", ar: "ميديا الذكاء الاصطناعي" } },
];

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
    isWhitePlate: false,
    summary: {
      en: "Directing brand discipline and commercial campaigns across 3 branches in Beni Suef since 2022, turning product launches, seasonal promotions, and after-sales trust into steady retail growth.",
      ar: "توجيه انضباط العلامة التجارية والحملات الإعلانية عبر 3 فروع في بني سويف منذ عام 2022، مع تحويل إطلاقات المنتجات والمواسم الترويجية وخدمة ما بعد البيع إلى نمو تجاري مستقر.",
    },
    deliverables: {
      en: [
        "Unified brand positioning across 3 physical retail branches",
        "8th Anniversary and Black Friday high-volume promotional campaigns",
        "Commercial audio product reels and after-sales customer authority",
      ],
      ar: [
        "توحيد التموضع البصري وصوت العلامة عبر 3 فروع بيع بالتجزئة",
        "حملات الذكرى الثامنة والجمعة البيضاء واسعة الانتشار والتفاعل",
        "إنتاج مقاطع تجارية لمنتجات الصوت وترسيخ الثقة بخدمات ما بعد البيع",
      ],
    },
    campaigns: {
      en: ["8th Anniversary", "Black Friday", "Product Reels", "After-Sales Authority"],
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
    id: "el3sal",
    title: { en: "EL3SAL Crepe & Pizza", ar: "مطعم العسال" },
    period: { en: "ACTIVE CLIENT", ar: "عميل حالي" },
    category: "retail_hospitality",
    discipline: {
      en: "Menu Architecture · QSR Campaigns · Conversion",
      ar: "هندسة القائمة · حملات المطاعم · رفع المبيعات",
    },
    image: "/assets/clients/el3sal.jpg",
    isWhitePlate: false,
    summary: {
      en: "Complete 140+ item menu redesign paired with high-tempo food craft reels and Facebook Messages conversion funnels engineered to turn views into direct orders.",
      ar: "إعادة تصميم شاملة لقائمة طعام تضم أكثر من 140 صنفاً لتعزيز وضوح الاختيار ورفع متوسط قيمة الطلب، مقترنة بمقاطع مرئية سريعة الإيقاع ومسارات تحويل عبر رسائل فيسبوك للطلب المباشر.",
    },
    deliverables: {
      en: [
        "Full 140+ item menu restructuring for clarity and higher ticket value",
        "Signature QSR campaigns built around bold seasonal launches",
        "Craft food reels paired with direct Facebook Messages conversion funnels",
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
    id: "sanhok",
    title: { en: "Sanhok PlayStation & Café", ar: "سانهوك للترفيه والكافيه" },
    period: { en: "Commercial Partner", ar: "شريك تجاري" },
    category: "retail_hospitality",
    discipline: {
      en: "Commercial Media · Entertainment Marketing",
      ar: "إنتاج تجاري · تسويق الوجهات الترفيهية",
    },
    image: "/assets/clients/sanhok.jpg",
    isWhitePlate: false,
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
  {
    id: "hossam-fikry",
    title: { en: "Hossam Fikry Platform", ar: "منصة حسام فكري التعليمية" },
    period: { en: "EdTech Platform", ar: "منصة تقنية تعليمية" },
    category: "education_tech",
    discipline: {
      en: "Academic Identity · Platform Direction · Campaigns",
      ar: "الهوية الأكاديمية · توجيه المنصة · الحملات الطلابية",
    },
    image: "/assets/clients/hossam-fekry.png",
    isWhitePlate: true,
    summary: {
      en: "Visual direction, nationwide enrollment campaigns, and ongoing web experience engineering for the Hossam Fikry educational platform.",
      ar: "التوجيه البصري، وحملات التسجيل الطلابي على مستوى الجمهورية، والهندسة المستمرة لتجربة المستخدم على منصة حسام فكري التعليمية.",
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
      ar: ["الهوية الأكاديمية", "تطوير المنصة", "تسجيل الطلاب"],
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
      ar: "إدارة إبداعية · تموضع معماري · منصة رقمية",
    },
    image: "/assets/clients/mohamed-samy.png",
    isWhitePlate: true,
    summary: {
      en: "Creative direction, high-ticket digital positioning, and promotional showcase direction across Mohamed Samy's interior contracting portfolio.",
      ar: "الإدارة الإبداعية، والتموضع الرقمي للمشاريع عالية القيمة، وتوجيه العرض الترويجي لمحفظة أعمال محمد سامي في الديكور والمقاولات الداخلية.",
    },
    deliverables: {
      en: [
        "Digital positioning targeting commercial venues and residential villas",
        "Dedicated digital showroom web presence and campaign supervision",
        "Promotional direction for flagship interior showcase projects",
      ],
      ar: [
        "تموضع رقمي يخاطب مشاريع المنشآت التجارية والفيلات السكنية",
        "إطلاق المعرض الرقمي الرسمي والإشراف الإبداعي على الحملات",
        "توجيه العرض الترويجي لأبرز مشاريع التشطيبات الداخلية",
      ],
    },
    campaigns: {
      en: ["Interior Positioning", "Digital Showroom", "Commercial Roster"],
      ar: ["التموضع المعماري", "المعرض الرقمي", "المشاريع التجارية"],
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
      ar: "التسويق الرقمي · الإعلانات التجارية",
    },
    image: "/assets/clients/attar-group.jpg",
    isWhitePlate: true,
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
    id: "obolus",
    title: { en: "Obolus (@obolus.explains)", ar: "أوبولوس (Obolus)" },
    period: { en: "AI Media Studio", ar: "استوديو إنتاج ذكي" },
    category: "ai_systems",
    discipline: {
      en: "English 2D Documentary · Automated Production Stack",
      ar: "وثائقيات إنجليزية ثنائية الأبعاد · خط إنتاج مؤتمت",
    },
    image: "/assets/clients/obolus-mark.jpg",
    isWhitePlate: false,
    summary: {
      en: "Tier-1 English faceless 2D animated documentary channel covering Economic History and Money Systems, built end-to-end with a custom local AI production stack.",
      ar: "قناة وثائقية إنجليزية بالرسوم المتحركة الثنائية الأبعاد، تتناول التاريخ الاقتصادي والأنظمة النقدية، ومبنية بالكامل عبر منظومة إنتاج محلية مخصصة بالذكاء الاصطناعي.",
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
    id: "architect-of-reality",
    title: { en: "THE ARCHITECT OF REALITY", ar: "مُصمّم الواقع" },
    period: { en: "YouTube Channel", ar: "قناة يوتيوب" },
    category: "ai_systems",
    discipline: {
      en: "Tier-1 English Channel · Long-Form Visual Systems",
      ar: "قناة إنجليزية عالمية · منظومات سرد بصري طويلة",
    },
    image: "/assets/clients/architect-of-reality.png",
    isWhitePlate: true,
    summary: {
      en: "Flagship English YouTube channel built for Tier-1 international viewers, combining deep psychological and philosophical storytelling with a custom programmatic animation engine.",
      ar: "قناة يوتيوب رئيسية باللغة الإنجليزية موجهة للجمهور الدولي، تجمع بين السرد النفسي والفلسفي العميق ومحرك تحريك برمجي مخصص لإنتاج الحلقات الطويلة.",
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
    category: "education_tech",
    discipline: {
      en: "Nursery Marketing · Reels Production · Parent Conversion",
      ar: "تسويق تعليمي · إنتاج مرئي · استقطاب أولياء الأمور",
    },
    image: "/assets/clients/khatwa.png",
    isWhitePlate: true,
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
    id: "chance-media",
    title: { en: "Chance Media (Ahmed Akl)", ar: "تشانس ميديا (أحمد عقل)" },
    period: { en: "2018", ar: "2018" },
    category: "brand_growth",
    discipline: {
      en: "Creative Direction · TV Ad Scripts · Real Estate & Medical",
      ar: "إدارة إبداعية · إعلانات تلفزيون · العقارات والمراكز الطبية",
    },
    monogram: "CM",
    summary: {
      en: "Creative Direction, TV ad scriptwriting, and campaign leadership for real-estate and medical brand accounts at Chance Media, founded by actor Ahmed Akl.",
      ar: "تولي الإدارة الإبداعية، وكتابة نصوص الإعلانات التلفزيونية، وقيادة الحملات الإعلانية لحسابات العقارات والمراكز الطبية لدى وكالة تشانس ميديا التي أسسها الفنان أحمد عقل.",
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
    links: [],
  },
];

export const AI_PRODUCTION_STACK: StackTool[] = [
  {
    name: { en: "Creative System Orchestration", ar: "تخطيط وهندسة الأنظمة" },
    domain: { en: "Google Antigravity & Claude", ar: "بناء المنصات والأنظمة" },
    role: {
      en: "Turning strategic briefs into full-stack web platforms, automated visual checks, and production-ready code.",
      ar: "تحويل الموجزات الاستراتيجية إلى منصات ويب متكاملة، ومراجعات بصرية مؤتمتة، وشيفرة برمجية جاهزة للإطلاق.",
    },
  },
  {
    name: { en: "Programmatic Video Engines", ar: "محركات الفيديو المبرمجة" },
    domain: { en: "HyperFrames & Remotion Studio", ar: "إنتاج الفيديو التجاري آلياً" },
    role: {
      en: "Frame-accurate commercial reels and modular video systems engineered for consistent brand identity.",
      ar: "إنتاج مقاطع إعلانية بدقة الإطار الواحد ومنظومات فيديو معيارية تحافظ على اتساق الهوية البصرية لكل علامة.",
    },
  },
  {
    name: { en: "Documentary & Research Pipelines", ar: "منظومة الوثائقيات والبحث" },
    domain: { en: "Grounded Source Synthesis", ar: "بحث موثق وسرد بصري" },
    role: {
      en: "Fact-checked long-form scripts, voice pacing, and animated documentary worlds built for international channels.",
      ar: "إعداد نصوص طويلة مدققة الحقائق، وضبط إيقاع التعليق الصوتي، وبناء عوالم وثائقية متحركة لقنوات دولية.",
    },
  },
];
