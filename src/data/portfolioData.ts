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
  name: LocalizedText;
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
    ar: "إدارة إبداعية · تسويق بيعي · أنظمة ذكاء اصطناعي",
  },
  heroEyebrow: {
    en: "Creative Director · Digital Strategist · AI Architect",
    ar: "من 2016 لحد النهاردة · خبرة عشر سنين في السوق",
  },
  heroSubtext: {
    en: "Creative Director, Digital Marketing Strategist, and AI Production Architect. Building brands, high-converting campaigns, and automated media systems since 2016.",
    ar: "ببني البراند من الأساس لحد ما يحقق مبيعات. من إعلانات التلفزيون وتوظيف مئات الكفاءات في الشركات العالمية، لقيادة علامات تجارية وقنوات عالمية بأنظمة الذكاء الاصطناعي.",
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
    ar: "عشر سنين تنفيذ في قطاعات متنوعة",
  },
  trackSub: {
    en: "Telecom, TV & Film, Retail, QSR, Beauty, Architecture, EdTech & AI Media",
    ar: "اتصالات · إعلانات تلفزيون · موبايلات · مطاعم · تجميل · تشطيبات · تعليم · وقنوات عالمية",
  },
  pointOfView: {
    en: "I do not build noise or chase short-lived trends. Every brand, campaign, and media system I direct is built from commercial conviction, real market psychology, and disciplined execution.",
    ar: "عمري ما اشتغلت على شوية ألوان أو ترند يعدي ويخلص. من أول يوم دخلت فيه السوق سنة 2016 والقاعدة واحدة: افهم العميل اللي قدامك، صيغ رسالة تلمس احتياجه الحقيقي، وابني وراها منظومة تخليه يشتري وهو مقتنع.",
  },
  portraitPath: "/assets/portrait.jpg",
  liveDomain: "https://begamal.pages.dev",
  vimeoUrl: "https://vimeo.com/begamal",
  vimeoLabel: "vimeo.com/begamal",
  facebookUrl: "https://www.facebook.com/begamal",
  facebookLabel: "facebook.com/begamal",
};

export const UI_COPY = {
  nav: {
    chronicle: { en: "Chronicle", ar: "الرحلة" },
    works: { en: "Works", ar: "الأعمال" },
    systems: { en: "Systems", ar: "المنظومة" },
    cta: { en: "Connect", ar: "تواصل معايا" },
    openMenu: { en: "Open navigation menu", ar: "فتح القائمة" },
    closeMenu: { en: "Close navigation menu", ar: "إغلاق القائمة" },
  },
  hero: {
    secondaryCta: { en: "Selected Works", ar: "شوف الشغل" },
    portraitAlt: {
      en: "Belal Gamal portrait in low-key monochrome studio light",
      ar: "صورة بلال جمال",
    },
  },
  statement: {
    origin: { en: "Origin", ar: "البداية" },
    education: { en: "Academic Foundation", ar: "الأساس العلمي" },
    scope: { en: "Field Reach", ar: "نطاق الخبرة" },
  },
  chronicle: {
    title: { en: "Career Chronicle", ar: "تدرج الرحلة من أول يوم" },
    subtitle: {
      en: "Ten years across commercial marketing, enterprise operations, large-scale corporate recruitment, brand direction, and AI production systems.",
      ar: "الخبرة مبتجيش في يوم وليلة. دي خطوات حقيقية بالترتيب من أيام الجامعة لحد إدارة شركات وعلامات تجارية ومنظومات إنتاج كاملة.",
    },
  },
  works: {
    eyebrow: { en: "Client Roster & Case Studies", ar: "شركاء النجاح والمشاريع" },
    title: { en: "Selected Works", ar: "نماذج من أرض الواقع" },
    openDossier: { en: "Project Brief", ar: "تفاصيل الدور" },
    visitPage: { en: "Visit Client Page", ar: "ادخل على الصفحة" },
    scopeHeading: { en: "Scope & Execution", ar: "اللي اتنفذ على الأرض" },
    closeModal: { en: "Close project brief", ar: "إغلاق" },
  },
  systems: {
    title: { en: "AI Production Architecture", ar: "ماكينة الإنتاج بالذكاء الاصطناعي" },
    subtitle: {
      en: "Since the 2023 wave, I have built full production engines that turn strategy into finished documentaries, commercials, and custom web experiences at scale.",
      ar: "من أول موجة 2023 وأنا شغال على الأرض في بناء سيستم كامل يطلع أفلام وثائقية، وإعلانات، ومواقع متفصلة بالذكاء الاصطناعي من الفكرة لحد التسليم النهائي.",
    },
  },
  contact: {
    eyebrow: { en: "Direct Channel", ar: "التواصل المباشر" },
    title: { en: "Ready to Scale Your Brand?", ar: "عايز تكبّر شغلك بجد؟" },
    subtitle: {
      en: "If you want clear creative direction, campaigns built on real buyer psychology, or an AI media pipeline that actually delivers, start the conversation directly.",
      ar: "لشغل الإدارة الإبداعية، الحملات المبنية على فهم السوق، أو أنظمة الإنتاج بالذكاء الاصطناعي، تواصل معايا مباشرة أو اتفرج على أرشيف الأعمال.",
    },
    facebookCta: { en: "Message on Facebook", ar: "ابعتلي على فيسبوك" },
    vimeoCta: { en: "Watch Showreel on Vimeo", ar: "أرشيف الأعمال على فيميو" },
  },
};

export const CAREER_CHRONICLE: ChronicleEntry[] = [
  {
    id: "digital-marketing-2016",
    period: { en: "2016 - Present", ar: "2016 - لحد النهاردة" },
    role: {
      en: "Digital Marketing & Content Creation (10 Years)",
      ar: "أول نزول للسوق · تسويق رقمي وصناعة محتوى",
    },
    organization: {
      en: "Commercial Foundations & TECNO Mobile Moderation",
      ar: "البداية أثناء الجامعة وإدارة مجتمعات تكنو موبايل",
    },
    location: { en: "Egypt", ar: "مصر" },
    summary: {
      en: "Entered digital marketing and commercial content creation in 2016 while still in university, alongside community moderation for TECNO Mobile, building a decade-long foundation in audience psychology and conversion.",
      ar: "نزلت السوق في 2016 وأنا لسه طالب في تجارة إنجليزي. اشتغلت تسويق رقمي ومحتوى تجاري، ومعاهم إدارة مجتمعات لعلامة تكنو موبايل، ومن هنا اتبنت عندي عين السوق: إزاي الرسالة الصح تحوّل المتابع لعميل ومبيعات حقيقية.",
    },
    highlights: {
      en: [
        "10 years of continuous commercial practice since 2016",
        "Community moderation for TECNO Mobile during university",
        "Grounded in audience psychology and measurable conversion",
      ],
      ar: [
        "عشر سنين متواصلة من الشغل الفعلي في السوق من 2016",
        "إدارة مجتمعات تكنو موبايل وفهم سلوك المشتري لحظة بلحظة",
        "من أول يوم وكل محتوى وراه هدف بيعي واضح",
      ],
    },
  },
  {
    id: "vodafone-wasla-2017",
    period: { en: "2017", ar: "2017" },
    role: {
      en: "Enterprise Customer Operations",
      ar: "عمليات عملاء الشركات · فودافون بيزنس",
    },
    organization: {
      en: "Vodafone Business Call Center, Wasla",
      ar: "شركة وصلة · حساب فودافون بيزنس",
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
      ar: "الخطوة اللي صقلت طريقة كلامي وإقناعي. في الكوربة بمصر الجديدة كنت على خط المواجهة الأول مع عملاء قطاع الأعمال في فودافون بيزنس، وده بنى عندي قدرة حاسمة في إدارة النقاشات المعقدة وحسم اعتراضات أصحاب الشركات في وقتها.",
    },
    highlights: {
      en: [
        "Al-Korba, Heliopolis operations floor",
        "Enterprise communication and objection handling",
        "Real-time commercial client psychology",
      ],
      ar: [
        "التعامل المباشر مع أصحاب الشركات وعملاء قطاع الأعمال في الكوربة",
        "إتقان فنون التفاوض والرد على الاعتراضات تحت الضغط",
        "فهم عقلية العميل التجاري قبل ما تبدأ معاه أي عرض بيعي",
      ],
    },
  },
  {
    id: "chance-media-sector09-2018",
    period: { en: "2018", ar: "2018" },
    role: {
      en: "Creative Director & Independent Founder",
      ar: "مدير إبداعي وتأسيس وكالة سيكتور 09",
    },
    organization: {
      en: "Chance Media (Ahmed Akl) & SECTOR 09",
      ar: "تشانس ميديا (مع الفنان أحمد عقل) ووكالة سيكتور 09",
    },
    location: { en: "Cairo / Beni Suef", ar: "القاهرة وبني سويف" },
    summary: {
      en: "Served as Creative Director at Chance Media (founded by renowned actor Ahmed Akl), leading commercial concepts, TV ad scripts, and campaign direction, alongside launching independent agency SECTOR 09 and directing narrative short films.",
      ar: "في 2018 مسكت القيادة الإبداعية بدري. اشتغلت مدير إبداعي في شركة تشانس ميديا اللي أسسها الفنان أحمد عقل، وكتبت اسكربتات إعلانات تلفزيون وأشرفت على حملات عقارية وطبية، وبالتوازي أسست وكالتي الخاصة سيكتور 09 وأخرجت أفلام قصيرة.",
    },
    highlights: {
      en: [
        "Creative Director at Chance Media (founded by Ahmed Akl)",
        "Commercial concepts, TV ad scripts, and campaign direction",
        "Founded independent agency SECTOR 09 and directed narrative short films",
      ],
      ar: [
        "مدير إبداعي في تشانس ميديا (تأسيس الفنان أحمد عقل)",
        "تأليف اسكربتات إعلانات التلفزيون ووضع الكونسبت الرئيسي للحملات",
        "تأسيس وكالة سيكتور 09 المستقلة وإخراج أفلام روائية قصيرة",
      ],
    },
  },
  {
    id: "al-attar-2018-2021",
    period: { en: "2018 - 2021", ar: "2018 - 2021" },
    role: {
      en: "Digital Marketing & Content Creation",
      ar: "قيادة التسويق الرقمي والحملات الإعلانية",
    },
    organization: { en: "Al-Attar Group", ar: "مجموعة العطار" },
    location: { en: "Commercial Retail", ar: "تجارة الهواتف والإكسسوارات" },
    summary: {
      en: "Led digital marketing, content creation, and high-volume commercial ad campaigns for Al-Attar Group through 2021.",
      ar: "تلات سنين من الشغل المستمر مع مجموعة العطار من 2018 لـ 2021. توليت التسويق الرقمي، صناعة المحتوى، وتوجيه الحملات الإعلانية اللي بتحرك المبيعات بشكل مباشر.",
    },
    highlights: {
      en: [
        "Full-scale digital marketing and content production",
        "High-volume commercial advertising campaigns",
        "Multi-year brand growth through 2021",
      ],
      ar: [
        "إدارة شاملة للتسويق الرقمي وصناعة المحتوى التجاري",
        "تنفيذ حملات إعلانية مكثفة عالية الانتشار والتحويل",
        "استمرارية وتوسع في السوق على مدار تلات سنوات",
      ],
    },
  },
  {
    id: "majorel-vodafone-2019-2022",
    period: { en: "2019 - 2022", ar: "2019 - 2022" },
    role: {
      en: "HR Recruitment Specialist (3 Years) · Majorel BPO (Vodafone & Uber)",
      ar: "القرية الذكية · أخصائي توظيف بشركة ماجوريل العالمية (فودافون وأوبر)",
    },
    organization: {
      en: "Majorel Egypt (Global CX & BPO) · Smart Village, Beni Suef",
      ar: "شركة ماجوريل العالمية لتعهيد الأعمال · القرية الذكية ببني سويف",
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
      ar: "محطة فارقة في مساري. بدأت في القرية الذكية ببني سويف سنة 2019 على خط 888 في فودافون، وبعدها اترقيت لأخصائي توظيف في شركة ماجوريل العالمية (رائدة الكول سنتر وتعهيد الأعمال). فضلت 3 سنين أدير ملف التوظيف لأكبر حسابين في الشركة: فودافون وأوبر، وفي 2020 لوحدها عينت حوالي 550 موظف وخدت لقب الأعلى تحقيقاً في فريق توظيف بني سويف.",
    },
    highlights: {
      en: [
        "Started in 2019 at Smart Village (Beni Suef) on Vodafone 888 before promotion to Majorel HR Recruitment",
        "Managed recruitment for Uber enterprise accounts: Uber Rider, Uber Driver, and Uber Eats",
        "Managed recruitment across Vodafone queues: 888, Vodafone Cash, CVM, and ADSL",
        "Hired ~550 employees in 2020 and recognized as Top Achiever (Beni Suef Recruitment Team)",
      ],
      ar: [
        "البداية في القرية الذكية ببني سويف سنة 2019 على صف 888 ثم الترقية لقسم التوظيف في ماجوريل",
        "إدارة التوظيف لحسابات أوبر بالكامل: العملاء، السائقين، وأوبر إيتس",
        "تغطية احتياجات صفوف فودافون: 888، فودافون كاش، الاحتفاظ بالعملاء، والإنترنت الأرضي",
        "تعيين نحو 550 موظف في 2020 والتتويج بلقب الأعلى تحقيقاً في فريق توظيف بني سويف",
      ],
    },
  },
  {
    id: "independent-director-2022",
    period: { en: "2022 - Present", ar: "2022 - لحد النهاردة" },
    role: {
      en: "Creative Director & Growth Partner",
      ar: "الشراكات التجارية وإدارة العلامات الكبرى",
    },
    organization: {
      en: "Multi-Sector Commercial Roster",
      ar: "القرش · العسال · سانهوك · ياسمين صلاح · محمد سامي · حسام فكري · خطوة",
    },
    location: { en: "Multi-Sector", ar: "قطاعات متعددة" },
    summary: {
      en: "Partnering with leading businesses across mobile retail, QSR hospitality, gaming lounges, beauty, interior architecture, and EdTech, driving brand clarity and direct sales.",
      ar: "بعد خبرة الشركات والوكالات، دخلت في شراكات استراتيجية مع علامات تجارية في قطاعات مختلفة: الهواتف، المطاعم، صالات الألعاب، التجميل، الديكور، والمنصات التعليمية والحضانات. كل علامة ليها هويتها المستقلة وخطة بتجيب عميل حقيقي.",
    },
    highlights: {
      en: [
        "Long-term creative direction for Al-Qersh Mobile since 2022",
        "Multi-sector execution across retail, hospitality, beauty, interiors, and education",
        "Full alignment between brand identity and commercial revenue",
      ],
      ar: [
        "قيادة الهوية والحملات لبراند القرش موبايل من 2022 لحد النهاردة",
        "تنوع عملي بين المطاعم، صالات الألعاب، التجميل، التشطيبات، والتعليم",
        "ربط التوجيه الإبداعي مباشرة بنتايج ومبيعات فعلية",
      ],
    },
  },
  {
    id: "ai-systems-2023",
    period: { en: "2023 - Present", ar: "2023 - لحد النهاردة" },
    role: {
      en: "AI Creative & Production Systems",
      ar: "ثورة الذكاء الاصطناعي وبناء أنظمة الإنتاج",
    },
    organization: {
      en: "Automated Documentary, Video & Web Systems",
      ar: "أوبولوس · ذا أركيتيكت أوف ريالتي · ومنصات ويب متكاملة",
    },
    location: { en: "Global Audiences", ar: "جمهور عالمي ومحلي" },
    summary: {
      en: "Deep hands-on mastery of AI production since the 2023 wave, architecting automated English documentary channels, programmatic commercial video pipelines, and custom web platforms.",
      ar: "من أول موجة الذكاء الاصطناعي في 2023 وأنا في قلب اللعبة مش بتفرج من بره. بنيت منظومات إنتاج كاملة بتطلع حلقات وثائقية عالمية بالإنجليزي زي أوبولوس وذا أركيتيكت أوف ريالتي، جنب برمجة مواقع ومنصات سريعة وشغالة.",
    },
    highlights: {
      en: [
        "End-to-end English documentary systems (Obolus & THE ARCHITECT OF REALITY)",
        "Programmatic motion and reel production engines built for speed and precision",
        "Custom web architecture and rapid interactive deployment",
      ],
      ar: [
        "تأسيس وإنتاج قناتين باللغة الإنجليزية للجمهور العالمي بأسلوب آلي دقيق",
        "خطوط إنتاج فيديو وريلز تجارية مبرمجة بسرعة وجودة ثابتة",
        "تصميم وبناء منصات ويب متكاملة من الفكرة لحد الإطلاق",
      ],
    },
  },
];

export const CASE_STUDY_CATEGORIES: { id: CaseStudyCategoryId; label: LocalizedText }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "retail_hospitality", label: { en: "Retail & Hospitality", ar: "تجارة ومطاعم" } },
  { id: "brand_growth", label: { en: "Brand & Campaigns", ar: "براندات وحملات" } },
  { id: "beauty_lifestyle", label: { en: "Beauty & Lifestyle", ar: "تجميل ولايف ستايل" } },
  { id: "education_tech", label: { en: "Education & Tech", ar: "تعليم وتقنية" } },
  { id: "ai_systems", label: { en: "AI Media", ar: "ميديا الذكاء الاصطناعي" } },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "al-qersh-mobile",
    title: { en: "Al-Qersh Mobile", ar: "القرش موبايل" },
    period: { en: "2022 - Present", ar: "2022 - مستمر" },
    category: "retail_hospitality",
    discipline: {
      en: "Creative Direction · Commercial Reels · Retail Growth",
      ar: "إدارة إبداعية · ريلز تجاري · توسع الفروع",
    },
    image: "/assets/clients/alqersh.jpg",
    imageBg: "#0036B8",
    isLogoMark: true,
    summary: {
      en: "Directing brand discipline and commercial campaigns across 3 branches in Beni Suef since 2022, turning product launches, seasonal promotions, and after-sales trust into steady retail growth.",
      ar: "توجيه الهوية والحملات التجارية لـ 3 فروع في بني سويف من 2022، وبناء حضور قوي في السوق خلال مواسم الذروة زي الذكرى الثامنة والبلاك فرايدي مع تحويل خدمة ما بعد البيع لنقطة ثقة أساسية.",
    },
    deliverables: {
      en: [
        "Unified brand positioning across 3 physical retail branches",
        "8th Anniversary and Black Friday high-volume promotional campaigns",
        "Commercial audio product reels and after-sales customer authority",
      ],
      ar: [
        "توحيد هوية وصوت البراند في الثلاث فروع بأسلوب مميز وسط المنافسين",
        "حملات الذكرى الثامنة والبلاك فرايدي اللي حققت أعلى تفاعل ومبيعات",
        "ريلز تجارية لمنتجات الصوت والأكسسوارات وبناء ثقة ما بعد البيع",
      ],
    },
    campaigns: {
      en: ["8th Anniversary", "Black Friday", "Product Reels", "After-Sales Authority"],
      ar: ["#كلم_القرش", "القرش عض في الأسعار", "الذكرى الثامنة", "بلاك فرايدي"],
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
    period: { en: "2022 - Present", ar: "2022 - مستمر" },
    category: "retail_hospitality",
    discipline: {
      en: "Menu Architecture · QSR Campaigns · Conversion",
      ar: "هندسة المنيو · حملات مطاعم · مسارات الطلب",
    },
    image: "/assets/clients/el3sal.jpg",
    imageBg: "#ED6C18",
    isLogoMark: true,
    summary: {
      en: "Complete 140+ item menu redesign paired with high-tempo food craft reels and Facebook Messages conversion funnels engineered to turn views into direct orders.",
      ar: "إعادة هيكلة وتصميم منيو كامل يضم أكتر من 140 صنف بشكل يسهل الاختيار ويرفع قيمة الفاتورة، مع ريلز مطاعم سريعة الإيقاع وحملات رسائل فيسبوك موجهة للطلب المباشر.",
    },
    deliverables: {
      en: [
        "Full 140+ item menu restructuring for clarity and higher ticket value",
        "Signature QSR campaigns built around bold seasonal launches",
        "Craft food reels paired with direct Facebook Messages conversion funnels",
      ],
      ar: [
        "إعادة تنظيم وتصميم منيو من 140+ صنف بشكل احترافي يسهل الاختيار",
        "حملات إطلاق قوية لمنتجات وصوصات جديدة في السوق",
        "ريلز تصوير طعام احترافي مربوط بمسارات رسائل تجيب طلبات فورية",
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
      ar: "محتوى ترفيهي · تسويق صالات ألعاب",
    },
    image: "/assets/clients/sanhok.jpg",
    imageBg: "#02132A",
    isLogoMark: true,
    summary: {
      en: "Commercial entertainment marketing and youth-focused digital campaigns designed to keep gaming lounges and café seating consistently active.",
      ar: "محتوى مرئي وحملات محلية موجهة لجمهور الشباب والألعاب تحافظ على حركة الزيارات والحجوزات في الصالة والكافيه طول الأسبوع.",
    },
    deliverables: {
      en: [
        "Youth-focused visual storytelling and promotional video hooks",
        "Targeted local social campaigns driving walk-in traffic",
        "Cohesive digital presence across entertainment offerings",
      ],
      ar: [
        "فيديوهات وخطافات إعلانية بتخاطب الشباب بلغة الجيمنج الصح",
        "حملات جغرافية موجهة تزود الإقبال اليومي على الصالة والكافيه",
        "هوية رقمية متماسكة تبرز مستوى المكان وسط المنافسين",
      ],
    },
    campaigns: {
      en: ["Gaming Lounge", "Local Traffic", "Commercial Media"],
      ar: ["صالات بلايستيشن", "إقبال محلي", "محتوى ترفيهي"],
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
      ar: "التموضع في التجميل · نمو السوشيال · الحجوزات",
    },
    summary: {
      en: "Strategic social positioning and digital growth for Makeup Artist Yasmine Salah, connecting high-craft beauty showcases directly with bridal and client bookings.",
      ar: "بناء حضور رقمي يليق بمستوى خبيرة التجميل ياسمين صلاح، يعكس دقة الشغل ويحوّل التفاعل لاستفسارات وحجوزات عرائس مؤهلة.",
    },
    deliverables: {
      en: [
        "Refined social presentation aligned with bridal and beauty clientele",
        "Targeted campaigns built for qualified booking inquiries",
        "Consistent visual storytelling across showcase deliverables",
      ],
      ar: [
        "تموضع بصري راقي يناسب جمهور التجميل وحفلات الزفاف",
        "حملات مستهدفة تستقطب عميلات جادات للحجز المباشر",
        "إدارة عرض الأعمال بأسلوب يحافظ على ثقة العميلات",
      ],
    },
    campaigns: {
      en: ["Beauty Positioning", "Bridal Bookings", "Social Growth"],
      ar: ["قطاع التجميل", "حجوزات العرائس", "نمو رقمي"],
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
      en: "Academic Identity · Platform Direction · Campaigns",
      ar: "إدارة إبداعية · تطوير المنصة · حملات الطلاب",
    },
    image: "/assets/clients/hossam-fekry.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Visual direction, nationwide enrollment campaigns, and ongoing web experience engineering for the Hossam Fikry educational platform.",
      ar: "قيادة الصورة البصرية للمنصة التعليمية، وتوجيه حملات استقطاب الطلاب على مستوى الجمهورية، مع متابعة وتطوير واجهة المنصة عشان تستوعب آلاف الطلاب بسلاسة.",
    },
    deliverables: {
      en: [
        "Cohesive academic visual identity and campaign storytelling",
        "Active web platform experience engineering and maintenance",
        "Student-focused reels and seasonal enrollment campaigns",
      ],
      ar: [
        "توحيد الهوية الأكاديمية للمحتوى والإعلانات وحملات الحجز",
        "تطوير مستمر لتجربة المستخدم على المنصة الإلكترونية",
        "إخراج ريلز تعليمية وترويجية ترفع ارتباط الطلاب بالمنصة",
      ],
    },
    campaigns: {
      en: ["Academic Identity", "Web Engineering", "Student Enrollment"],
      ar: ["هوية تعليمية", "تطوير المنصة", "استقطاب الطلاب"],
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
    period: { en: "2022 - Present", ar: "2022 - مستمر" },
    category: "brand_growth",
    discipline: {
      en: "Creative Direction · Architecture Positioning · Web",
      ar: "تموضع معماري · معرض رقمي · حملات مشاريع",
    },
    image: "/assets/clients/mohamed-samy.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Creative direction, high-ticket digital positioning, and promotional showcase direction across Mohamed Samy's interior contracting portfolio.",
      ar: "نقلنا البراند لمستوى يخاطب أصحاب الفلل والمشاريع التجارية الكبيرة. من تأسيس واجهة الويب الرسمية لإدارة الحملات الترويجية للمشاريع المنفذة على الأرض.",
    },
    deliverables: {
      en: [
        "Digital positioning targeting commercial venues and residential villas",
        "Dedicated digital showroom web presence and campaign supervision",
        "Promotional direction for flagship interior showcase projects",
      ],
      ar: [
        "صياغة تموضع يستهدف تعاقدات الفلل والكافيهات والمشاريع الكبرى",
        "بناء الموقع الرسمي كمعرض رقمي يجلب عملاء مؤهلين",
        "إخراج الحملات التعريفية لأحدث مشاريع التشطيبات والديكور",
      ],
    },
    campaigns: {
      en: ["Interior Positioning", "Digital Showroom", "Commercial Roster"],
      ar: ["تموضع الديكور", "الموقع الرسمي", "حملات المشاريع"],
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
      ar: "تسويق رقمي · حملات تجارية",
    },
    image: "/assets/clients/attar-group.jpg",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Full-scale digital marketing, content creation, and commercial advertising campaigns executed for Al-Attar Group across 2018 through 2021.",
      ar: "تلات سنين قيادة للتسويق الرقمي وصناعة المحتوى وإطلاق الحملات التجارية لمجموعة العطار، وبناء تواجد قوي في سوق الموبايلات والإكسسوارات.",
    },
    deliverables: {
      en: [
        "Multi-year digital marketing and commercial content production",
        "High-volume paid advertising campaigns across product lines",
        "Sustained regional market visibility and customer acquisition",
      ],
      ar: [
        "إدارة التسويق الرقمي والمحتوى الإعلاني على مدار 3 سنوات",
        "إطلاق حملات إعلانية تجارية لمختلف خطوط المنتجات",
        "توسيع الانتشار في السوق وزيادة تدفق العملاء",
      ],
    },
    campaigns: {
      en: ["Digital Marketing", "Commercial Campaigns", "2018 - 2021"],
      ar: ["تسويق رقمي", "حملات إعلانية", "2018 - 2021"],
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
    title: { en: "Obolus (@obolus.explains)", ar: "أوبولوس" },
    period: { en: "AI Media Studio", ar: "استوديو إنتاج ذكي" },
    category: "ai_systems",
    discipline: {
      en: "English 2D Documentary · Automated Production Stack",
      ar: "أفلام وثائقية إنجليزية · منظومة إنتاج آلية",
    },
    image: "/assets/clients/obolus-mark.jpg",
    imageBg: "#0E6B47",
    isLogoMark: true,
    summary: {
      en: "Tier-1 English faceless 2D animated documentary channel covering Economic History and Money Systems, built end-to-end with a custom local AI production stack.",
      ar: "قناة وثائقية إنجليزية موجهة للجمهور العالمي في التاريخ الاقتصادي وأنظمة المال والأسواق، مبنية بالكامل على خط إنتاج ذكاء اصطناعي محلي من البحث والكتابة لحد الصوت والصورة والمونتاج.",
    },
    deliverables: {
      en: [
        "Custom local AI production pipeline from research to final render",
        "Long-form 2D animated documentaries on Economic History & Money",
        "Deterministic vector animation, voiceover alignment, and sound design",
      ],
      ar: [
        "بناء خط إنتاج كامل يشتغل محلياً من أول الفكرة لحد النسخة النهائية",
        "أفلام وثائقية طويلة بالرسوم المتحركة عن تاريخ الاقتصاد والمال",
        "ضبط التحريك الفيكتور والصوت والمؤثرات بأعلى دقة",
      ],
    },
    campaigns: {
      en: ["1971 Monetary Shift", "1602 Stock Market Origins", "2D Documentary Engine"],
      ar: ["وثائقي 1971", "أول بورصة في 1602", "محرك الوثائقيات"],
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
      ar: "قناة إنجليزية عالمية · تحريك برمجي طويل النفس",
    },
    image: "/assets/clients/architect-of-reality.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Flagship English YouTube channel built for Tier-1 international viewers, combining deep psychological and philosophical storytelling with a custom programmatic animation engine.",
      ar: "مشروعي الشخصي على يوتيوب باللغة الإنجليزية للجمهور العالمي. محتوى عميق في علم النفس والفلسفة التطبيقية، مبني على محرك تحريك برمجي خاص مصمم لوقت المشاهدة الطويل.",
    },
    deliverables: {
      en: [
        "Long-form 2D animated episode architecture focused on depth and retention",
        "Custom programmatic rendering pipeline with strict visual QA gates",
        "Packaging and hook strategy built for international audiences",
      ],
      ar: [
        "سلسلة حلقات طويلة مبنية على العمق الفكري وجودة السرد",
        "محرك تحريك وتصدير برمجي بمراجعات بصرية وصوتية صارمة",
        "هندسة العناوين والخطافات الأولية لرفع نسبة النقر والاحتفاظ",
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
      ar: "تسويق تعليمي · ريلز واقعي · استقطاب أولياء الأمور",
    },
    image: "/assets/clients/khatwa.png",
    imageBg: "#FFFFFF",
    isLogoMark: true,
    summary: {
      en: "Marketing direction and real-activity video reels for Khatwa Academy and Nursery, structuring clear stage-by-stage parent messaging that drives qualified enrollment inquiries.",
      ar: "تسويق ذكي بيخاطب الأم بالمنطق مش بالكلام الإنشائي. عملنا ريلز توثق الأنشطة الحقيقية جوه الحضانة وقسمنا المراحل العمرية بوضوح، عشان استفسارات التسجيل تيجي جاهزة.",
    },
    deliverables: {
      en: [
        "Stage-structured parent positioning across nursery and KG programs",
        "Authentic activity reels built around real classroom moments",
        "Direct Messenger and WhatsApp qualification funnels for parents",
      ],
      ar: [
        "توضيح كل مرحلة تعليمية وعمرية قدام ولي الأمر بدون تشتيت",
        "إنتاج ريلز واقعي من جوه الأنشطة الفعلية لبناء الثقة",
        "مسار تواصل وتأهيل مباشر لاستفسارات التسجيل",
      ],
    },
    campaigns: {
      en: ["Stage-by-Stage Clarity", "Real Activity Reels", "Parent Funnel"],
      ar: ["كل سن ليه خطوته", "أنشطة حقيقية", "مسار التسجيل"],
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
      ar: "إدارة إبداعية · إعلانات تلفزيون · عقارات ومراكز طبية",
    },
    summary: {
      en: "Creative Direction, TV ad scriptwriting, and campaign leadership for real-estate and medical brand accounts at Chance Media, founded by actor Ahmed Akl.",
      ar: "توليت الإدارة الإبداعية وكتابة اسكربتات إعلانات التلفزيون وتوجيه الحملات الإعلانية لقطاعي العقارات والمراكز الطبية في تشانس ميديا مع الفنان أحمد عقل.",
    },
    deliverables: {
      en: [
        "Creative direction across commercial agency accounts",
        "Television commercial scriptwriting and narrative concepts",
        "Real-estate and medical sector brand campaign execution",
      ],
      ar: [
        "الإدارة الإبداعية لحسابات الوكالة التجارية",
        "كتابة سيناريوهات إعلانات التلفزيون وتطوير الفكرة",
        "قيادة حملات العقارات والعلامات الطبية",
      ],
    },
    campaigns: {
      en: ["TV Ad Scripts", "Real Estate", "Medical Brands"],
      ar: ["اسكربتات تلفزيون", "عقارات", "مراكز طبية"],
    },
    links: [],
  },
];

export const AI_PRODUCTION_STACK: StackTool[] = [
  {
    name: { en: "Creative System Orchestration", ar: "تخطيط وتنفيذ الأنظمة" },
    domain: { en: "Google Antigravity & Claude", ar: "بناء المنصات والأنظمة" },
    role: {
      en: "Turning strategic briefs into full-stack web platforms, automated visual checks, and production-ready code.",
      ar: "تحويل الفكرة التجارية لمنصات ويب سريعة ومراجعة بصرية دقيقة بدون انتظار فرق كبيرة.",
    },
  },
  {
    name: { en: "Programmatic Video Engines", ar: "محركات الفيديو المبرمجة" },
    domain: { en: "HyperFrames & Remotion Studio", ar: "إنتاج الريلز والإعلانات آلياً" },
    role: {
      en: "Frame-accurate commercial reels and modular video systems engineered for consistent brand identity.",
      ar: "إنتاج ريلز وفيديوهات تجارية بدقة الفريم الواحد وهوية بصرية ثابتة لكل عميل.",
    },
  },
  {
    name: { en: "Documentary & Research Pipelines", ar: "منظومة الوثائقيات والبحث" },
    domain: { en: "Grounded Source Synthesis", ar: "بحث موثق وسرد بصري" },
    role: {
      en: "Fact-checked long-form scripts, voice pacing, and animated documentary worlds built for international channels.",
      ar: "تحويل المصادر الموثوقة لاسكربتات طويلة وأفلام وثائقية متكاملة للجمهور العالمي.",
    },
  },
];
