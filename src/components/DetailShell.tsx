import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Lang } from "../data/portfolioData";
import { onInternalLinkClick } from "../lib/router";

export interface DetailStep {
  href: string;
  eyebrow: string;
  title: string;
}

interface DetailShellProps {
  lang: Lang;
  /** Section on the long page this item belongs to (back link target). */
  backHref: string;
  backLabel: string;
  counter: string;
  meta: string;
  dots: { href: string; label: string; current: boolean }[];
  prev: DetailStep | null;
  next: DetailStep | null;
  children: ReactNode;
}

function StepLink({ step, dir }: { step: DetailStep | null; dir: "prev" | "next" }) {
  const base =
    "flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 transition-all duration-300 ease-out hover:border-white/25 hover:bg-white/[0.05]";
  if (!step) return <span className={`${base} pointer-events-none opacity-0`} aria-hidden="true" />;
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <a
      href={step.href}
      onClick={(e) => onInternalLinkClick(e, step.href)}
      className={`${base} ${dir === "next" ? "justify-end text-end" : "text-start"}`}
    >
      {dir === "prev" && <Icon size={14} weight="bold" className="shrink-0 text-[#D4D7DD] rtl:-scale-x-100" />}
      <span className="min-w-0">
        <span className="block font-mono-code text-[10px] text-[#A1A6B0]">{step.eyebrow}</span>
        <span className="block truncate text-xs font-medium text-[#F4F5F7]">{step.title}</span>
      </span>
      {dir === "next" && <Icon size={14} weight="bold" className="shrink-0 text-[#D4D7DD] rtl:-scale-x-100" />}
    </a>
  );
}

/**
 * A work or an era as a real page: the same obsidian dossier panel the popups used,
 * now in the page flow with a back link to its section and Previous / Next links.
 */
export function DetailShell({
  lang,
  backHref,
  backLabel,
  counter,
  meta,
  dots,
  prev,
  next,
  children,
}: DetailShellProps) {
  return (
    <section className="relative z-10 px-4 pb-16 sm:px-8 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <a
          href={backHref}
          onClick={(e) => onInternalLinkClick(e, backHref)}
          className="group mb-5 inline-flex min-h-11 items-center gap-2 font-mono-code text-[12px] uppercase tracking-[0.16em] text-[#A1A6B0] transition-colors duration-300 ease-out hover:text-[#F4F5F7]"
        >
          <ArrowLeft size={13} weight="bold" className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5" />
          <span>{backLabel}</span>
        </a>

        <article
          className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#07070A]/94 shadow-[0_32px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          lang={lang}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/45 to-transparent"
          />

          <header className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-3.5 sm:px-7">
            <div dir="ltr" className="flex min-w-0 items-center gap-2 font-mono-code text-[11px] text-[#A1A6B0]">
              <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold tabular-nums text-[#F4F5F7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB] shadow-[0_0_8px_rgba(229,231,235,0.85)]" />
                {counter}
              </span>
              <span aria-hidden="true" className="text-white/25">·</span>
              <span className="truncate text-[#D4D7DD]">{meta}</span>
            </div>
            <nav aria-label={backLabel} className="hidden items-center gap-1.5 sm:flex">
              {dots.map((dot) => (
                <a
                  key={dot.href}
                  href={dot.href}
                  onClick={(e) => onInternalLinkClick(e, dot.href)}
                  aria-label={dot.label}
                  title={dot.label}
                  aria-current={dot.current ? "page" : undefined}
                  className="group flex h-4 items-center px-0.5"
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      dot.current
                        ? "h-1.5 w-5 bg-[#E5E7EB] shadow-[0_0_8px_rgba(229,231,235,0.65)]"
                        : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/55"
                    }`}
                  />
                </a>
              ))}
            </nav>
          </header>

          <div className="px-5 py-6 sm:px-8 sm:py-8">{children}</div>

          <footer className="flex items-center justify-between gap-2 border-t border-white/[0.08] bg-[#0B0C10]/95 px-4 py-3 sm:px-7 sm:py-3.5">
            <StepLink step={prev} dir="prev" />
            <StepLink step={next} dir="next" />
          </footer>
        </article>
      </div>
    </section>
  );
}
