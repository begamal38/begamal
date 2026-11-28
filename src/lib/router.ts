import { useEffect, useState } from "react";
import { CASE_STUDIES } from "../data/portfolioData";

/** Real pages of the site. Every path here is served by Cloudflare through `/* /index.html 200`. */
export type PageKey = "home" | "about" | "chronicle" | "work" | "systems" | "contact";

export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  chronicle: "/chronicle",
  work: "/work",
  systems: "/systems",
  contact: "/contact",
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
  /** The page drawn on screen (for a work dossier: the page it was opened over). */
  page: PageKey;
  /** Open work dossier slug, if the URL is /work/<slug>. */
  workSlug: string | null;
  path: string;
}

interface HistoryState {
  /** Page the dossier was opened over, so closing returns there. */
  bg?: PageKey;
  /** True when this entry was pushed by the app (closing can use history.back). */
  inApp?: boolean;
}

const KNOWN_SLUGS = new Set(CASE_STUDIES.map((s) => s.id));

function normalise(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? "/" : clean.toLowerCase();
}

export function matchPath(rawPath: string, state: HistoryState | null): RouteMatch {
  const path = normalise(rawPath);
  const workMatch = path.match(/^\/work\/([a-z0-9-]+)$/);
  if (workMatch) {
    const slug = WORK_SLUG_ALIASES[workMatch[1]] ?? workMatch[1];
    if (KNOWN_SLUGS.has(slug)) {
      return { page: state?.bg ?? "work", workSlug: slug, path: `/work/${slug}` };
    }
    return { page: "work", workSlug: null, path: "/work" };
  }
  const page = (Object.keys(PAGE_PATHS) as PageKey[]).find((k) => PAGE_PATHS[k] === path);
  return { page: page ?? "home", workSlug: null, path: page ? path : "/" };
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

/** Opens a work dossier over the current page and keeps that page underneath. */
export function openWork(slug: string, currentPage: PageKey) {
  navigate(`/work/${slug}`, { state: { bg: currentPage } });
}

/** Closes a dossier: back to the page it was opened over, or /work for a direct link. */
export function closeWork(route: RouteMatch) {
  const state = window.history.state as HistoryState | null;
  if (state?.inApp && state.bg) {
    window.history.back();
  } else {
    navigate(PAGE_PATHS[route.page], { replace: true });
  }
}

function readRoute(): RouteMatch {
  return matchPath(window.location.pathname, window.history.state as HistoryState | null);
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
  if (normalise(window.location.pathname) === normalise(to)) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  navigate(to);
}
