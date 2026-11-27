import { useEffect } from "react";
import { Lang } from "../data/portfolioData";

interface UseDossierNavigationOptions {
  isOpen: boolean;
  lang: Lang;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onModalOpenChange?: (isOpen: boolean) => void;
}

/**
 * Locks background scroll (document + Lenis), and wires Escape +
 * direction-aware ArrowLeft / ArrowRight keyboard stepping for dossiers.
 */
export function useDossierNavigation({
  isOpen,
  lang,
  onClose,
  onPrev,
  onNext,
  onModalOpenChange,
}: UseDossierNavigationOptions) {
  useEffect(() => {
    if (!isOpen) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const lenisGlobal = (
      window as Window & {
        __lenis?: { stop?: () => void; start?: () => void };
      }
    ).__lenis;
    onModalOpenChange?.(true);
    lenisGlobal?.stop?.();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (lang === "ar") onNext();
        else onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (lang === "ar") onPrev();
        else onNext();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      onModalOpenChange?.(false);
      lenisGlobal?.start?.();
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, lang, onClose, onPrev, onNext, onModalOpenChange]);
}
