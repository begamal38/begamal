import { CAREER_CHRONICLE, CASE_STUDIES, Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";
import { PageKey, RouteMatch } from "./router";

const SITE = "https://begamal.pages.dev";

/** Page names (also used by the nav, footer and home cards). */
export const PAGE_LABELS: Record<PageKey, { en: string; ar: string }> = {
  home: { en: "Home", ar: "الرئيسية" },
  about: { en: "About", ar: "المنهج" },
  chronicle: UI_COPY.nav.chronicle,
  work: UI_COPY.nav.works,
  systems: UI_COPY.nav.systems,
  contact: UI_COPY.nav.contact,
};

const PAGE_TITLES: Record<Exclude<PageKey, "home">, { en: string; ar: string }> = {
  about: UI_COPY.statement.eyebrow,
  chronicle: UI_COPY.chronicle.title,
  work: UI_COPY.works.title,
  systems: UI_COPY.systems.title,
  contact: UI_COPY.contact.title,
};

const PAGE_DESCRIPTIONS: Record<PageKey, { en: string; ar: string }> = {
  home: {
    en: "Marketing and creative direction from Beni Suef, Egypt since 2016: brand positioning, campaigns that drive measurable demand, and AI production systems.",
    ar: "التوجيه التسويقي والإبداعي من بني سويف، مصر منذ 2016: تموضع واضح للعلامات، وحملات تصنع طلباً حقيقياً، وأنظمة إنتاج بالذكاء الاصطناعي.",
  },
  about: PORTFOLIO_IDENTITY.pointOfView,
  chronicle: UI_COPY.chronicle.subtitle,
  work: UI_COPY.works.showreelSubtitle,
  systems: UI_COPY.systems.subtitle,
  contact: UI_COPY.contact.subtitle,
};

function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;·–—-]+$/, "") + "…";
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

export function applyPageMeta(route: RouteMatch, lang: Lang) {
  const brand = PORTFOLIO_IDENTITY.name[lang];
  let title: string;
  let description: string;
  let path: string;

  const study = route.workSlug ? CASE_STUDIES.find((s) => s.id === route.workSlug) : null;
  const era = route.eraId ? CAREER_CHRONICLE.find((e) => e.id === route.eraId) : null;
  if (study) {
    title = `${study.title[lang]} · ${brand}`;
    description = clip(study.summary[lang].replace(/\\"/g, '"'));
    path = `/work/${study.id}`;
  } else if (era) {
    const org = era.organization[lang].split(/ [·•] /)[0];
    title = `${org} · ${era.period[lang]} · ${brand}`;
    description = clip(era.summary[lang].replace(/\\"/g, '"'));
    path = `/chronicle/${era.id}`;
  } else if (route.page === "home") {
    title = PORTFOLIO_IDENTITY.pageTitle[lang];
    description = PAGE_DESCRIPTIONS.home[lang];
    path = "/";
  } else {
    title = `${PAGE_TITLES[route.page][lang]} · ${brand}`;
    description = clip(PAGE_DESCRIPTIONS[route.page][lang]);
    // Section links show the same long page: one canonical URL for it, no duplicate content
    path = "/";
  }

  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", `${SITE}${path}`);
  setMeta('meta[property="og:url"]', "content", `${SITE}${path}`);
}
