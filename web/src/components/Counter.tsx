"use client";
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

/** Counts up the leading number in a value such as "100 t"; other values render as-is. */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(\D.*)?$/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !match || reducedMotion()) return;
      const target = Number(match[1]);
      const counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${match[2] ?? ""}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
