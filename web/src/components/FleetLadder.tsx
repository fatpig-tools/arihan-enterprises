"use client";
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import type { Crane } from "@/content/site";
import { Counter } from "./Counter";

/** Infographic: each crane is a bar scaled to its maximum rated capacity. */
export function FleetLadder({ cranes }: { cranes: Crane[] }) {
  const root = useRef<HTMLDivElement>(null);
  const max = Math.max(...cranes.map((c) => c.capacityTonnes));

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const bars = root.current!.querySelectorAll(".fl-bar");
      const grow = (axis: "scaleX" | "scaleY", origin: string) =>
        gsap.from(bars, {
          [axis]: 0,
          transformOrigin: origin,
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => void grow("scaleY", "bottom"));
      mm.add("(max-width: 767px)", () => void grow("scaleX", "left"));
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-3 md:grid-cols-3 md:gap-4">
      {cranes.map((crane) => (
        <article key={crane.slug} id={crane.slug} className="card flex scroll-mt-28 flex-col p-6 md:p-8">
          {/* Bar: horizontal on small screens, a rising column from md up */}
          <div className="relative mb-7 flex w-full md:h-64 md:items-end" aria-hidden="true">
            <div className="absolute inset-0 hidden flex-col justify-between md:flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-px w-full bg-current opacity-10" />
              ))}
            </div>
            <div
              className="fl-bar relative h-3 w-(--v) rounded-full bg-accent md:h-(--v) md:w-24 md:rounded-b-none md:rounded-t-2xl"
              style={{ "--v": `${(crane.capacityTonnes / max) * 100}%` } as React.CSSProperties}
            />
          </div>
          <p className="display text-[clamp(3rem,5vw,4.5rem)]">
            <Counter value={`${crane.capacityTonnes}`} />
            <span className="ml-2 text-[0.35em] font-normal tracking-normal opacity-60">tonnes max</span>
          </p>
          <h3 className="display h-card mt-5">{crane.name}</h3>
          <p className="mt-1 text-sm opacity-60">{crane.type}</p>
          <p className="mt-4 flex-1 opacity-80">{crane.bestFor}</p>
        </article>
      ))}
    </div>
  );
}
