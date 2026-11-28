import { useEffect, useState } from "react";
import { CAREER_CHRONICLE, CASE_STUDIES } from "../data/portfolioData";

/**
 * Section paths of the one long page (each scrolls to its section) plus the real detail pages
 * /work/<slug> and /chronicle/<era>. Cloudflare serves all of them through `/* /index.html 200`.
 */
export type PageKey = "home" | "about" | "chronicle" | "work" | "systems" | "contact";

export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  chronicle: "/chronicle",
  work: "/work",
  systems: "/systems",
  contact: "/contact",
};

/** Section element id on the long page for each section path (home = top). */
export const PAGE_SECTION_ID: Record<PageKey, string | null> = {
  home: null,
  about: "perspective",
  chronicle: "chronicle",
  work: "works",
  systems: "systems",
  contact: "contact",
};

/** Old one-page anchors (and the section ids still used by buttons) mapped to their pages. */
export const SECTION_TO_PAGE: Record<string, PageKey> = {
  hero: "home",
  perspective: "about",
  about: "about",
  chronicle: "chronicle",
  works: "work",
  work: "work",
  systems: "systems",
  contact: "contact",
};

/** Old or alternative slugs -> current slug. Add an entry here whenever a slug changes. */
export const WORK_SLUG_ALIASES: Record<string, string> = {
  "qersh": "al-qersh-mobile",
  "alqersh": "al-qersh-mobile",
  "samy": "mohamed-samy",
  "mohamed-samy-works": "mohamed-samy",
  "hossam": "hossam-fekry",
  "el3sal-foods": "el3sal",
  "khatwa": "khatwa-academy",
  "yasmine": "yasmine-salah",
  "the-architect-of-reality": "architect-of-reality",
};

export interface RouteMatch {
  /** Section of the long page, or the section a detail page belongs to (for the nav). */
  page: PageKey;
  /** /work/<slug> detail page. */
  workSlug: string | null;
  /** /chronicle/<era> detail page. */
  eraId: string | null;
  path: string;
}

interface HistoryState {
  inApp?: boolean;
}

const KNOWN_SLUGS = new Set(CASE_STUDIES.map((s) => s.id));
const KNOWN_ERAS = new Set(CAREER_CHRONICLE.map((e) => e.id));

function normalise(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? "/" : clean.toLowerCase();
}

export function matchPath(rawPath: string): RouteMatch {
  const path = normalise(rawPath);
  const workMatch = path.match(/^\/work\/([a-z0-9-]+)$/);
  if (workMatch) {
    const slug = WORK_SLUG_ALIASES[workMatch[1]] ?? workMatch[1];
    if (KNOWN_SLUGS.has(slug)) {
      return { page: "work", workSlug: slug, eraId: null, path: `/work/${slug}` };
    }
    return { page: "work", workSlug: null, eraId: null, path: "/work" };
  }
  const eraMatch = path.match(/^\/chronicle\/([a-z0-9-]+)$/);
  if (eraMatch) {
    if (KNOWN_ERAS.has(eraMatch[1])) {
      return { page: "chronicle", workSlug: null, eraId: eraMatch[1], path: `/chronicle/${eraMatch[1]}` };
    }
    return { page: "chronicle", workSlug: null, eraId: null, path: "/chronicle" };
  }
  const page = (Object.keys(PAGE_PATHS) as PageKey[]).find((k) => PAGE_PATHS[k] === path);
  return { page: page ?? "home", workSlug: null, eraId: null, path: page ? path : "/" };
}

const NAV_EVENT = "begamal:navigate";

export function navigate(to: string, opts: { replace?: boolean; state?: HistoryState } = {}) {
  const state: HistoryState = { inApp: true, ...opts.state };
  if (opts.replace) {
    window.history.replaceState(state, "", to);
  } else {
    window.history.pushState(state, "", to);
  }
  window.dispatchEvent(new Event(NAV_EVENT));
}

function readRoute(): RouteMatch {
  return matchPath(window.location.pathname);
}

/**
 * Current route. On first load it also upgrades legacy links:
 * `/#works` -> `/work`, `/#perspective` -> `/about`, unknown or aliased paths -> their canonical path.
 */
export function useRoute(): RouteMatch {
  const [route, setRoute] = useState<RouteMatch>(() => {
    const hash = window.location.hash.replace(/^#/, "").toLowerCase();
    if (hash && SECTION_TO_PAGE[hash] && normalise(window.location.pathname) === "/") {
      window.history.replaceState({}, "", PAGE_PATHS[SECTION_TO_PAGE[hash]]);
    }
    const match = readRoute();
    if (normalise(window.location.pathname) !== match.path || window.location.hash) {
      window.history.replaceState(window.history.state, "", match.path + window.location.search);
    }
    return match;
  });

  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener("popstate", update);
    window.addEventListener(NAV_EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(NAV_EVENT, update);
    };
  }, []);

  return route;
}

/** Click handler for internal <a href> links: SPA navigation, but new-tab/middle-click still work. */
export function onInternalLinkClick(e: React.MouseEvent<HTMLAnchorElement>, to: string) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  // Same path (e.g. a section link while already there): replace so the app re-scrolls to it
  navigate(to, { replace: normalise(window.location.pathname) === normalise(to) });
}
