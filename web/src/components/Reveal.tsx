"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate each direct child in sequence instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
};

export function Reveal({ children, as = "div", className, stagger, delay = 0 }: Props) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion()) return;
      gsap.to(stagger ? el.children : el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        delay,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...(stagger ? { "data-reveal-stagger": "" } : { "data-reveal": "" })}>
      {children}
    </Tag>
  );
}
