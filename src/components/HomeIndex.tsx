import { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  CAREER_CHRONICLE,
  CASE_STUDIES,
  Lang,
  PORTFOLIO_IDENTITY,
  UI_COPY,
} from "../data/portfolioData";
import { PAGE_PATHS, onInternalLinkClick } from "../lib/router";
import { CaseStudyVisualStage, ClientStatusBadge } from "./WorksSection";
import { StatementSection } from "./StatementSection";
import type { TelemetryChapter } from "./ScrollTelemetry";

/** The home page is one short scroll journey; these are its chapters (also drive the side rail). */
export const HOME_CHAPTERS: TelemetryChapter[] = [
  { id: "hero", index: "01", label: { en: "Overview", ar: "المقدمة" } },
  { id: "home-ethos", index: "02", label: { en: "Ethos", ar: "الرؤية" } },
  { id: "home-latest", index: "03", label: { en: "Works", ar: "الأعمال" } },
  { id: "home-record", index: "04", label: { en: "Field Record", ar: "سجل ميداني" } },
  { id: "home-trajectory", index: "05", label: { en: "Chronicle", ar: "المسيرة" } },
  { id: "home-doctrine", index: "06", label: { en: "Doctrine", ar: "منهج العمل" } },
  { id: "home-contact", index: "07", label: { en: "Contact", ar: "التواصل" } },
];

/** First three works in Belal's own order on the Works page. */
const FEATURED_WORKS = CASE_STUDIES.slice(0, 3);
/** The Smart Village era (Majorel) and the earlier Vodafone Business era it must not be confused with. */
const MAJOREL_ERA = CAREER_CHRONICLE.find((e) => e.id === "majorel-vodafone-2019-2021")!;
const VODAFONE_LOGO = MAJOREL_ERA.logos!.find((l) => l.src.includes("vodafone"))!;
const RECORD_LOGOS = [
  VODAFONE_LOGO,
  ...MAJOREL_ERA.logos!.filter((l) => !l.src.includes("vodafone")),
];

const RECORD = {
  title: { en: "Smart Village · Talent Acquisition", ar: "القرية الذكية • استقطاب المواهب" },
  role: { en: "Talent Acquisition Specialist · Majorel", ar: "أخصائي استقطاب المواهب • ماجوريل" },
  place: {
    en: "Smart Village, Beni Suef · 2019 – Aug 2021",
    ar: "القرية الذكية، بني سويف • 2019 – أغسطس 2021",
  },
  stats: [
    { value: { en: "~550", ar: "نحو 550" }, label: { en: "hires in 2020", ar: "تعييناً في 2020" } },
    {
      value: { en: "Top Achiever", ar: "الأعلى أداءً" },
      label: { en: "2020, internal email on record", ar: "2020، بإيميل داخلي موثق" },
    },
    { value: { en: "Vodafone · Uber", ar: "فودافون • أوبر" }, label: { en: "accounts staffed", ar: "حسابات التوظيف" } },
  ],
  split: [
    {
      when: { en: "2017 · Cairo", ar: "2017 • القاهرة" },
      what: { en: "Customer service", ar: "خدمة العملاء" },
      text: {
        en: "Vodafone Business, Queue 247: corporate authorized representatives (Wasla, Al-Korba).",
        ar: "فودافون بيزنس، أكونت 247: خدمة مفوضي الشركات (وصلة، الكوربة).",
      },
    },
    {
      when: { en: "2019 – 2021 · Beni Suef", ar: "2019 – 2021 • بني سويف" },
      what: { en: "Talent acquisition", ar: "استقطاب المواهب" },
      text: {
        en: "Smart Village: started on Vodafone's 888 queue, then Talent Acquisition at Majorel for the Vodafone and Uber accounts.",
        ar: "القرية الذكية: البداية على خط 888 في فودافون، ثم استقطاب المواهب في ماجوريل لحسابات فودافون وأوبر.",
      },
    },
  ],
};

/** Client mark on its own original background (never recoloured). */
function LogoTile({ logo, lang, large = false }: { logo: typeof VODAFONE_LOGO; lang: Lang; large?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl border border-white/15 shadow-sm ${
        large ? "h-14 min-w-[56px] px-3" : "h-10 min-w-[44px] px-2.5"
      }`}
      style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
    >
      <img
        src={logo.src}
        alt={logo.alt[lang]}
        loading="lazy"
        decoding="async"
        className={`block object-contain ${
          logo.wide ? (large ? "max-h-7 max-w-[130px]" : "max-h-5 max-w-[100px]") : large ? "h-9 w-auto" : "h-6 w-auto"
        }`}
      />
    </span>
  );
}

/** Oldest era first: the trajectory reads like a flight path. */
const TRAJECTORY = [...CAREER_CHRONICLE].reverse();

function chapterLabel(id: string, lang: Lang) {
  const c = HOME_CHAPTERS.find((x) => x.id === id)!;
  return `${c.index} · ${c.label[lang]}`;
}

function ChapterHeader({ id, title, lang }: { id: string; title: string; lang: Lang }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono-code text-[11px] uppercase tracking-[0.22em] text-[#A1A6B0]">
        {chapterLabel(id, lang)}
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
        {title}
      </h2>
    </div>
  );
}

/** Quiet text link: the one loud button on this page is the final Connect. */
function ChapterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <div className="mt-8 flex justify-center">
      <a
        href={to}
        onClick={(e) => onInternalLinkClick(e, to)}
        className="group inline-flex min-h-11 items-center gap-2 border-b border-white/20 font-mono-code text-[12px] uppercase tracking-[0.16em] text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-white/60 hover:text-[#F4F5F7]"
      >
        <span>{children}</span>
        <ArrowUpRight
          size={13}
          weight="bold"
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
        />
      </a>
    </div>
  );
}

const sectionShell = "relative z-10 px-5 py-16 sm:px-8 md:py-24";
const hairline = (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
  />
);

interface HomeIndexProps {
  lang: Lang;
  onOpenWork: (slug: string) => void;
}

export function HomeIndex({ lang, onOpenWork }: HomeIndexProps) {
  return (
    <>
      {/* 02 · Ethos: the manifesto whose words light up with the scroll */}
      <StatementSection
        lang={lang}
        variant="manifesto"
        header={<ChapterHeader id="home-ethos" title={UI_COPY.statement.eyebrow[lang]} lang={lang} />}
        footer={
          <ChapterLink to={PAGE_PATHS.about}>
            {lang === "en" ? "Read the full ethos" : "اقرأ المنهج كاملاً"}
          </ChapterLink>
        }
      />

      {/* 03 · Selected works */}
      <section id="home-latest" className={sectionShell}>
        {hairline}
        <div className="mx-auto max-w-6xl">
          <ChapterHeader id="home-latest" title={UI_COPY.works.title[lang]} lang={lang} />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {FEATURED_WORKS.map((study) => (
              <a
                key={study.id}
                href={`/work/${study.id}`}
                onClick={(e) => {
                  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onOpenWork(study.id);
                }}
                className="works-card group flex flex-col rounded-[1.5rem] border border-white/[0.11] bg-[#0D0F14]/75 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25"
              >
                <div className="flex h-full flex-col items-center rounded-[1.15rem] bg-[#0A0A0C]/75 p-4 text-center">
                  <CaseStudyVisualStage study={study} lang={lang} />
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <ClientStatusBadge status={study.status} lang={lang} />
                    <span className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#A1A6B0]">
                      {study.period[lang]}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[#F4F5F7]">{study.title[lang]}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#9CA3AF]">{study.discipline[lang]}</p>
                </div>
              </a>
            ))}
          </div>
          <ChapterLink to={PAGE_PATHS.work}>{lang === "en" ? "All Works" : "كل الأعمال"}</ChapterLink>
        </div>
      </section>

      {/* 04 · Field record: the Smart Village / talent acquisition period, kept apart from 2017 */}
      <section id="home-record" className={sectionShell}>
        {hairline}
        <div className="mx-auto max-w-6xl">
          <ChapterHeader id="home-record" title={RECORD.title[lang]} lang={lang} />

          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            <figure className="group relative flex items-center overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#0D0F14]/75 p-1.5">
              <img
                src="/assets/clients/majorel-smart-village-photo.jpg"
                alt={lang === "en" ? "Majorel team at Smart Village, Beni Suef" : "فريق ماجوريل بالقرية الذكية، بني سويف"}
                loading="lazy"
                decoding="async"
                className="aspect-[720/300] h-full w-full rounded-[calc(1.75rem-0.375rem)] object-cover grayscale contrast-[1.06] brightness-[0.85] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-95"
              />
            </figure>

            <div className="flex flex-col justify-center rounded-[1.75rem] border border-white/[0.12] bg-[#0D0F14]/80 p-6 text-center sm:p-8">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {RECORD_LOGOS.map((logo, i) => (
                  <LogoTile key={logo.src} logo={logo} lang={lang} large={i === 0} />
                ))}
              </div>
              <p className="mt-6 text-xl font-semibold text-[#F4F5F7] sm:text-2xl">{RECORD.role[lang]}</p>
              <p className="mt-1.5 font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#A1A6B0]">
                {RECORD.place[lang]}
              </p>
              <dl className="mt-7 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-2">
                {RECORD.stats.map((stat) => (
                  <div key={stat.label.en} className="flex items-baseline justify-between gap-4 text-start sm:block sm:text-center">
                    <dt className="sr-only">{stat.label[lang]}</dt>
                    <dd className="whitespace-nowrap font-display text-base font-semibold leading-tight text-[#F4F5F7] sm:whitespace-normal sm:text-lg">
                      {stat.value[lang]}
                    </dd>
                    <dd className="text-[12px] leading-snug text-[#9CA3AF] sm:mt-1.5 sm:text-xs">{stat.label[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Two Vodafone chapters, two different jobs */}
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {RECORD.split.map((item) => (
              <div
                key={item.when.en}
                className="doctrine-card flex items-start gap-4 rounded-2xl border border-white/[0.11] bg-[#0D0F14]/80 p-5 text-start"
              >
                <LogoTile logo={VODAFONE_LOGO} lang={lang} />
                <div className="min-w-0">
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#A1A6B0]">
                    {item.when[lang]} · <span className="text-[#F4F5F7]">{item.what[lang]}</span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#D4D7DD]/90">{item.text[lang]}</p>
                </div>
              </div>
            ))}
          </div>

          <ChapterLink to={PAGE_PATHS.chronicle}>
            {lang === "en" ? "Open the full era" : "افتح الحقبة كاملة"}
          </ChapterLink>
        </div>
      </section>

      {/* 05 · Trajectory: every era on one flight path, oldest first */}
      <section id="home-trajectory" className={sectionShell}>
        {hairline}
        <div className="mx-auto max-w-6xl">
          <ChapterHeader id="home-trajectory" title={UI_COPY.chronicle.title[lang]} lang={lang} />
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[7px] h-px bg-gradient-to-r from-white/5 via-white/25 to-white/5"
            />
            <ol className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-10 md:gap-2 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {TRAJECTORY.map((era, i) => {
                const isLatest = i === TRAJECTORY.length - 1;
                return (
                  <li key={era.id} className="w-[132px] shrink-0 snap-start md:w-auto">
                    <a
                      href={PAGE_PATHS.chronicle}
                      onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.chronicle)}
                      className="group flex flex-col items-center text-center"
                    >
                      <span
                        aria-hidden="true"
                        className={`block rounded-full transition-all duration-300 ease-out ${
                          isLatest
                            ? "h-[15px] w-[15px] bg-[#F4F5F7] shadow-[0_0_14px_rgba(244,245,247,0.8)]"
                            : "mt-[3px] h-[9px] w-[9px] bg-white/40 group-hover:bg-[#F4F5F7] group-hover:shadow-[0_0_10px_rgba(244,245,247,0.7)]"
                        }`}
                      />
                      <span className="mt-4 font-mono-code text-[12px] tracking-[0.12em] text-[#F4F5F7]">
                        {era.railYear[lang]}
                      </span>
                      <span className="mt-1.5 line-clamp-3 text-[12px] leading-snug text-[#9CA3AF] transition-colors duration-300 group-hover:text-[#D4D7DD]">
                        {era.organization[lang]}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
          <ChapterLink to={PAGE_PATHS.chronicle}>
            {lang === "en" ? "Open the full log" : "افتح السجل الكامل"}
          </ChapterLink>
        </div>
      </section>

      {/* 06 · Operating doctrine */}
      <section id="home-doctrine" className={sectionShell}>
        {hairline}
        <div className="mx-auto max-w-6xl">
          <ChapterHeader id="home-doctrine" title={PORTFOLIO_IDENTITY.doctrineLabel[lang]} lang={lang} />
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PORTFOLIO_IDENTITY.doctrine.map((step) => (
              <li
                key={step.index}
                className="doctrine-card rounded-2xl border border-white/[0.11] bg-[#0D0F14]/80 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <p className="font-mono-code text-[11px] tracking-[0.2em] text-[#A1A6B0]">{step.index}</p>
                <p className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.08em] text-[#F4F5F7]">
                  {step.title[lang]}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#D4D7DD]/85">
                  {step.text[lang]}
                </p>
              </li>
            ))}
          </ol>
          <ChapterLink to={PAGE_PATHS.systems}>
            {lang === "en" ? "The production systems" : "أنظمة الإنتاج"}
          </ChapterLink>
        </div>
      </section>

      {/* 07 · Contact: the single loud button of the page */}
      <section id="home-contact" className={`${sectionShell} pb-20 md:pb-28`}>
        {hairline}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono-code text-[11px] uppercase tracking-[0.22em] text-[#A1A6B0]">
            {chapterLabel("home-contact", lang)}
          </p>
          <p className="mt-6 font-editorial text-xl font-medium italic text-[#D4D7DD]/75" lang="en" dir="ltr">
            — {PORTFOLIO_IDENTITY.signature}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase tracking-[0.05em] text-[#F4F5F7]">
            {UI_COPY.contact.title[lang]}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#E4E4E7]/85">
            {UI_COPY.contact.subtitle[lang]}
          </p>
          <a
            href={PAGE_PATHS.contact}
            onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.contact)}
            className="btn-titanium group mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full ps-6 pe-2 text-sm font-semibold text-[#050505]"
          >
            <span>{UI_COPY.nav.cta[lang]}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
              <ArrowUpRight size={15} weight="bold" className="rtl:-scale-x-100" />
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
