export type CaseStudyCategory =
  | "All"
  | "Brand & Growth"
  | "Hospitality & Retail"
  | "Education & Tech"
  | "AI Systems";

export interface ChronicleEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  organizationAr?: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  titleAr?: string;
  period: string;
  category: Exclude<CaseStudyCategory, "All">;
  discipline: string;
  accentHex: string;
  image?: string;
  imageBg?: string;
  isLogoMark?: boolean;
  summary: string;
  deliverables: string[];
  campaigns: string[];
  link?: {
    label: string;
    url: string;
  };
}

export interface StackTool {
  name: string;
  domain: string;
  role: string;
}

export const PORTFOLIO_IDENTITY = {
  handle: "begamal",
  name: "Belal Gamal",
  primaryTitle: "Creative Director",
  secondaryDisciplines: [
    "Digital Marketing Strategist",
    "AI Production Architect",
  ],
  born: "July 20, 1995",
  bornCompact: "20.07.1995",
  education:
    "B.Sc. in Commerce, Business Administration (English Section), Beni Suef University",
  base: "Egypt (Cairo / Beni Suef)",
  reach: "Working Independently & Globally",
  pointOfView:
    "Independent Creative Director with a sharp, uncompromising creative perspective. Building brands, campaigns, and AI-driven media systems through conviction and clarity rather than generic trends.",
  heroSubtext:
    "Independent Creative Director, Digital Marketing Strategist, and AI Production Architect. Building brands, campaigns, and AI media systems since 2016.",
  portraitPath: "/assets/portrait.jpg",
  liveDomain: "https://begamal.pages.dev",
  email: "1@begamal.com",
  vimeoUrl: "https://vimeo.com/begamal",
  vimeoLabel: "vimeo.com/begamal",
};

export const CAREER_CHRONICLE: ChronicleEntry[] = [
  {
    id: "digital-marketing-2016",
    period: "2016 - Present",
    role: "Digital Marketing & Content Creation (10 Years)",
    organization: "Commercial Foundations & Community Moderation",
    location: "Egypt",
    summary:
      "Entered digital marketing and commercial content creation in 2016 while still in university, alongside community moderation for TECNO Mobile, building a decade-long foundation in audience psychology and conversion.",
    highlights: [
      "10 years of continuous commercial practice since 2016",
      "Community moderation for TECNO Mobile during university",
      "Grounded in audience psychology and measurable conversion",
    ],
  },
  {
    id: "vodafone-wasla-2017",
    period: "2017",
    role: "Enterprise Customer Operations",
    organization: "Vodafone Business Call Center, Wasla",
    location: "Al-Korba, Heliopolis, Cairo",
    summary:
      "Frontline enterprise customer operations for Vodafone Business in Cairo, mastering high-stakes communication, objection handling, and client psychology.",
    highlights: [
      "Al-Korba, Heliopolis operations floor",
      "Enterprise communication and objection handling",
      "Real-time commercial client psychology",
    ],
  },
  {
    id: "chance-media-sector09-2018",
    period: "2018",
    role: "Creative Director & Independent Founder",
    organization: "Chance Media & SECTOR 09",
    organizationAr: "أحمد عقل",
    location: "Cairo / Beni Suef",
    summary:
      "Served as Creative Director at Chance Media (founded by renowned actor Ahmed Akl), leading commercial concepts, TV ad scripts, and campaign direction, alongside launching independent agency SECTOR 09 and directing narrative short films.",
    highlights: [
      "Creative Director at Chance Media (founded by Ahmed Akl)",
      "Commercial concepts, TV ad scripts, and campaign direction",
      "Founded independent agency SECTOR 09 and directed narrative short films",
    ],
  },
  {
    id: "al-attar-2018-2021",
    period: "2018 - 2021",
    role: "Digital Marketing & Content Creation",
    organization: "Al-Attar Group",
    organizationAr: "العطار",
    location: "Egypt",
    summary:
      "Led digital marketing, content creation, and high-volume commercial ad campaigns for Al-Attar Group through 2021.",
    highlights: [
      "Full-scale digital marketing and content production",
      "High-volume commercial advertising campaigns",
      "Multi-year brand growth through 2021",
    ],
  },
  {
    id: "majorel-vodafone-2019-2022",
    period: "2019 - 2022",
    role: "HR Recruitment Specialist (3 Years)",
    organization: "Vodafone Smart Village & Majorel Egypt",
    location: "Beni Suef",
    summary:
      "Joined Vodafone Smart Village (Beni Suef) in 2019 on the 888 queue, then earned promotion to HR Recruitment Specialist at Majorel, spending 3 years in high-volume talent acquisition.",
    highlights: [
      "Recruited across Vodafone queues: 888, Vodafone Cash, CVM, ADSL",
      "Recruited across Uber accounts: Uber Rider, Uber Driver, Uber Eats",
      "Hired ~550 employees in 2020, recognized as Top Achiever (Beni Suef Recruitment Team)",
    ],
  },
  {
    id: "independent-director-2022",
    period: "2022 - Present",
    role: "Independent Creative Director & Growth Partner",
    organization: "Independent Practice",
    organizationAr: "القرش موبايل · العسال · محمد سامي · حسام فكري",
    location: "Egypt & Regional",
    summary:
      "Partnering with leading local and regional businesses as an independent Creative Director: directing Al-Qersh Mobile since 2022, EL3SAL Crepe & Pizza, Mohamed Samy, Mr. Hossam Fikry, and active commercial clients.",
    highlights: [
      "Long-term creative direction for Al-Qersh Mobile since 2022",
      "Hospitality, retail, architecture, and education retainers",
      "Full alignment between brand identity and direct acquisition",
    ],
  },
  {
    id: "ai-systems-2023",
    period: "2023 - Present",
    role: "AI Creative & Production Systems",
    organization: "Automated Media & Web Engineering",
    location: "Local & Global Pipelines",
    summary:
      "Deep hands-on mastery of AI workflows since the 2023 wave, architecting automated video, documentary (Obolus @obolus.explains), and web engineering pipelines.",
    highlights: [
      "Production pipelines using Google Antigravity and Claude",
      "Programmatic video architecture with HyperFrames and Remotion Studio",
      "Knowledge and code indexing via NotebookLM MCP and Local Graphify",
    ],
  },
];

export const CASE_STUDY_CATEGORIES: CaseStudyCategory[] = [
  "All",
  "Brand & Growth",
  "Hospitality & Retail",
  "Education & Tech",
  "AI Systems",
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "al-qersh-mobile",
    title: "Al-Qersh Mobile",
    titleAr: "القرش موبايل",
    period: "2022 - Present",
    category: "Hospitality & Retail",
    discipline: "Brand Discipline · Commercial Reels · Retail Growth",
    accentHex: "#0036B8",
    image: "/assets/clients/alqersh.jpg",
    imageBg: "#0036B8",
    isLogoMark: true,
    summary:
      "Directing brand discipline and commercial campaigns across 3 branches in Beni Suef since 2022, enforcing strict royal-blue (#0036B8) visual consistency across retail photography, product reels, and seasonal events.",
    deliverables: [
      "3 branches in Beni Suef unified under strict #0036B8 brand discipline",
      "8th Anniversary & Black Friday campaigns (#كلم_القرش)",
      "itel audio product reels and after-sales organic authority",
    ],
    campaigns: ["#كلم_القرش", "القرش عضّ في الأسعار", "8th Anniversary", "Black Friday"],
  },
  {
    id: "el3sal",
    title: "EL3SAL Crepe & Pizza",
    titleAr: "مطعم العسال",
    period: "2022 - Present",
    category: "Hospitality & Retail",
    discipline: "Menu Architecture · QSR Campaigns · Conversion",
    accentHex: "#F26B1D",
    image: "/assets/clients/el3sal.jpg",
    imageBg: "#111111",
    isLogoMark: true,
    summary:
      "Complete 140+ item menu redesign anchored in signature #F26B1D orange and #111111 charcoal, paired with high-tempo QSR craft reels and Facebook CTR Messages conversion funnels.",
    deliverables: [
      "Full 140+ item menu redesign (#F26B1D orange & #111111 charcoal)",
      "QSR campaigns: THE CRAVING STANDARD and RANCH TAKES OVER",
      "Craft food reels and Facebook CTR Messages conversion funnels",
    ],
    campaigns: ["THE CRAVING STANDARD", "RANCH TAKES OVER", "140+ Item Menu System"],
  },
  {
    id: "obolus",
    title: "Obolus (@obolus.explains)",
    period: "AI Media Studio",
    category: "AI Systems",
    discipline: "Tier-1 English 2D Documentary · Local AI Stack",
    accentHex: "#C5A572",
    image: "/assets/clients/obolus-ep02.jpg",
    imageBg: "#0A0A0C",
    isLogoMark: false,
    summary:
      "Tier-1 English faceless 2D animated documentary channel covering Economic History and Money Systems, engineered end-to-end with a custom local AI production stack.",
    deliverables: [
      "Full visual world, character pipeline, and automated rendering engine",
      "Economic History & Money Systems long-form 2D documentaries",
      "Deterministic vector animation, voiceover alignment, and sound design",
    ],
    campaigns: ["Why Money Stopped Being Real in 1971", "How One 1602 Company Invented the Stock Market"],
  },
  {
    id: "hossam-fikry",
    title: "Hossam Fikry Platform",
    titleAr: "حسام فكري",
    period: "EdTech Platform",
    category: "Education & Tech",
    discipline: "Academic Identity · Platform Engineering",
    accentHex: "#3173B8",
    image: "/assets/clients/hossam-fekry.png",
    imageBg: "#0D1520",
    isLogoMark: true,
    summary:
      "Academic visual identity (#3173B8 and gold) and ongoing web platform engineering and maintenance for the Hossam Fikry educational ecosystem.",
    deliverables: [
      "Academic visual identity system in #3173B8 and gold",
      "Active web platform maintenance and frontend engineering",
      "Course, campaign, and student experience reels",
    ],
    campaigns: ["Academic Identity", "Platform Engineering", "Student Campaigns"],
    link: {
      label: "hossamfekry.com",
      url: "https://hossamfekry.com",
    },
  },
  {
    id: "mohamed-samy",
    title: "Mohamed Samy & Independent Roster",
    titleAr: "محمد سامي",
    period: "2022 - Present",
    category: "Brand & Growth",
    discipline: "Creative Direction · Digital Growth",
    accentHex: "#C5A572",
    image: "/assets/clients/mohamed-samy.png",
    imageBg: "#111114",
    isLogoMark: true,
    summary:
      "Creative direction and digital growth across Mohamed Samy and an active roster of diverse commercial accounts.",
    deliverables: [
      "Brand positioning and visual direction for Mohamed Samy",
      "Digital growth systems across active commercial accounts",
      "Campaign storytelling and commercial video supervision",
    ],
    campaigns: ["Commercial Portfolio", "Digital Growth Roster"],
  },
  {
    id: "al-attar-group",
    title: "Al-Attar Group",
    titleAr: "العطار",
    period: "2018 - 2021",
    category: "Brand & Growth",
    discipline: "Digital Marketing · Commercial Advertising",
    accentHex: "#C5A572",
    summary:
      "Full-scale digital marketing, content creation, and commercial advertising campaigns executed across multiple product lines from 2018 through 2021.",
    deliverables: [
      "Multi-year digital marketing and content creation",
      "Commercial advertising campaign execution",
      "Sustained regional market visibility",
    ],
    campaigns: ["Commercial Ad Campaigns", "Content Production (2018 - 2021)"],
  },
  {
    id: "chance-media",
    title: "Chance Media (Ahmed Akl)",
    titleAr: "أحمد عقل",
    period: "2018",
    category: "Brand & Growth",
    discipline: "Creative Direction · TV Ad Scripts",
    accentHex: "#C5A572",
    summary:
      "Creative Direction, TV ad scriptwriting, and campaign leadership for real-estate and medical brand accounts at Chance Media, founded by actor Ahmed Akl.",
    deliverables: [
      "Creative direction across commercial studio accounts",
      "Television commercial scriptwriting and concepting",
      "Real-estate and medical brand campaign execution",
    ],
    campaigns: ["TV Ad Scripts", "Real-Estate Campaigns", "Medical Brand Campaigns"],
  },
];

export const AI_PRODUCTION_STACK: StackTool[] = [
  {
    name: "Google Antigravity",
    domain: "Autonomous Build & Orchestration",
    role: "Multi-file engineering, visual QA, and deployment automation",
  },
  {
    name: "Claude",
    domain: "Creative Architecture & Code",
    role: "System planning, script craft, and deterministic pipelines",
  },
  {
    name: "HyperFrames",
    domain: "Programmatic Motion",
    role: "Deterministic frame-accurate commercial video assembly",
  },
  {
    name: "Remotion Studio",
    domain: "React Video Systems",
    role: "Component-driven reel production and automated rendering",
  },
  {
    name: "NotebookLM MCP",
    domain: "Research & Grounding",
    role: "Source-verified documentary synthesis and reference indexing",
  },
  {
    name: "Local Graphify",
    domain: "Codebase Knowledge Graph",
    role: "Local structural mapping across active client repositories",
  },
];
