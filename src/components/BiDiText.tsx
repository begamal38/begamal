import { Fragment } from "react";
import { Lang } from "../data/portfolioData";

interface BiDiTextProps {
  text: string;
  lang: Lang;
}

const BIDI_LTR_RE =
  /(\((?:[A-Za-z0-9@._/+,\-–\s]*[A-Za-z][A-Za-z0-9@._/+,\-–\s]*|\d{4}\s*[–-]\s*\d{4})\)|(?:[A-Za-z][A-Za-z0-9@._/+\-]*|\d+[A-Za-z]+)(?:\s+(?:[A-Za-z0-9][A-Za-z0-9@._/+\-]*))*)/g;

/**
 * Isolates inline Latin parenthetical groups and English brand/product runs
 * inside Arabic RTL prose using <bdi dir="ltr"> so parentheses never invert
 * or break across line wraps.
 */
export function BiDiText({ text, lang }: BiDiTextProps) {
  if (lang !== "ar") {
    return <>{text}</>;
  }

  const parts: Array<{ value: string; ltr: boolean }> = [];
  let lastIndex = 0;

  for (const match of text.matchAll(BIDI_LTR_RE)) {
    const idx = match.index ?? 0;
    if (idx > lastIndex) {
      parts.push({ value: text.slice(lastIndex, idx), ltr: false });
    }
    parts.push({ value: match[0], ltr: true });
    lastIndex = idx + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ value: text.slice(lastIndex), ltr: false });
  }

  return (
    <>
      {parts.map((part, idx) =>
        part.ltr ? (
          <bdi key={idx} dir="ltr">
            {part.value}
          </bdi>
        ) : (
          <Fragment key={idx}>{part.value}</Fragment>
        )
      )}
    </>
  );
}
