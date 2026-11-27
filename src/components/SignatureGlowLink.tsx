import { Fragment, ReactNode } from "react";
import { Lang } from "../data/portfolioData";
import { BiDiText } from "./BiDiText";

interface SignatureGlowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Restrained Obsidian + Brushed Titanium inline external link for named
 * mentors and creative influences.
 */
export function SignatureGlowLink({
  href,
  children,
  className = "",
}: SignatureGlowLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`signature-glow-link group inline-flex items-baseline whitespace-nowrap font-medium text-[#F3F4F6] transition-all duration-300 ease-out hover:text-white focus-visible:text-white ${className}`}
    >
      <span className="border-b border-white/25 pb-[1px] transition-colors duration-300 ease-out group-hover:border-white/60 group-focus-visible:border-white/60">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="ms-1 inline-block text-[0.8em] opacity-60 transition-all duration-300 ease-out group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px] group-hover:opacity-100 group-focus-visible:translate-x-[1.5px] group-focus-visible:-translate-y-[1.5px] group-focus-visible:opacity-100 rtl:-scale-x-100 rtl:group-hover:-translate-x-[1.5px] rtl:group-focus-visible:-translate-x-[1.5px]"
      >
        ↗
      </span>
    </a>
  );
}

export interface InlineEntityLink {
  match: string;
  url: string;
}

interface RichInlineTextProps {
  text: string;
  lang: Lang;
  links?: InlineEntityLink[];
}

/**
 * Renders prose with optional inline SignatureGlowLink entities and automatic
 * Arabic BiDi isolation for Latin parenthetical phrases.
 */
export function RichInlineText({
  text,
  lang,
  links = [],
}: RichInlineTextProps) {
  if (!links.length) {
    return <BiDiText text={text} lang={lang} />;
  }

  let segments: Array<{ text: string; url?: string }> = [{ text }];

  for (const entity of links) {
    if (!entity.match) continue;
    const nextSegments: Array<{ text: string; url?: string }> = [];
    for (const seg of segments) {
      if (seg.url) {
        nextSegments.push(seg);
        continue;
      }
      const parts = seg.text.split(entity.match);
      parts.forEach((part, idx) => {
        if (part) {
          nextSegments.push({ text: part });
        }
        if (idx < parts.length - 1) {
          nextSegments.push({ text: entity.match, url: entity.url });
        }
      });
    }
    segments = nextSegments;
  }

  return (
    <>
      {segments.map((seg, idx) =>
        seg.url ? (
          <SignatureGlowLink key={`${idx}-${seg.url}`} href={seg.url}>
            {seg.text}
          </SignatureGlowLink>
        ) : (
          <Fragment key={idx}>
            <BiDiText text={seg.text} lang={lang} />
          </Fragment>
        )
      )}
    </>
  );
}
