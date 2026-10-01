"use client";
import { useRef, type ElementType } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  /** Wrap words in *asterisks* to set them in the italic serif. With none, the last word is emphasised. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

function parse(text: string) {
  const marked = text.includes("*");
  let on = false;
  const words = text.split(" ").map((raw) => {
    if (raw.startsWith("*")) on = true;
    const em = on;
    if (raw.endsWith("*")) on = false;
    return { word: raw.replaceAll("*", ""), em };
  });
  if (!marked && words.length > 1) words[words.length - 1].em = true;
  return words;
}

/** Heading whose words rise out of a mask when it scrolls into view. */
export function SplitHeading({ text, as = "h2", className, delay = 0 }: Props) {
  const Tag = as as "h2";
  const ref = useRef<HTMLHeadingElement>(null);
  const words = parse(text);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion()) return;
      gsap.to(el.querySelectorAll(".split-word"), {
        yPercent: 0,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.055,
        delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn("display", className)}>
      <span className="sr-only">{words.map((w) => w.word).join(" ")}</span>
      <span aria-hidden="true">
        {words.map(({ word, em }, i) => (
          <span key={i} className="inline-block overflow-hidden align-top pb-[0.16em] -mb-[0.16em] pr-[0.24em]">
            <span className={cn("split-word", em && "em")}>{word}</span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
