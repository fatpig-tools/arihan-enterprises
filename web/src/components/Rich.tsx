import { Fragment } from "react";

/**
 * Renders copy with [bracketed placeholders] highlighted, so unconfirmed
 * figures are obvious on the page until the real value is entered in the CMS.
 */
export function Rich({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="ph" title="Placeholder — to be confirmed">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
