"use client";
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { LottieIcon, type LottieName } from "./LottieIcon";
import { Rich } from "./Rich";
import { SectionHead } from "./SectionHead";

type Step = { icon: string; title: string; body: string };

/** Five-step process as a timeline whose spine draws itself as the reader scrolls. */
export function Process({ steps, heading }: { steps: readonly Step[]; heading: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ".process-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process-list", start: "top 65%", end: "bottom 65%", scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step.querySelector(".process-card"), {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: step, start: "top 80%", once: true },
        });
        gsap.fromTo(
          step.querySelector(".process-dot"),
          { scale: 0.4, backgroundColor: "#1a2a41" },
          {
            scale: 1,
            backgroundColor: "#dc4a1f",
            duration: 0.5,
            scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-ink py-24 md:py-36">
      <div className="wrap">
        <SectionHead centered tag="How we work" title={heading} />
        <ol className="process-list relative mx-auto max-w-5xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-mist/12 lg:left-1/2" aria-hidden="true">
            <div className="process-spine size-full origin-top bg-accent" />
          </div>
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={cn("process-step relative pb-10 pl-14 last:pb-0 lg:w-1/2 lg:pb-0 lg:pl-0", i > 0 && "lg:-mt-6", i % 2 ? "lg:ml-auto lg:pl-14" : "lg:pr-14")}
            >
              <span
                className={cn(
                  "process-dot absolute left-5 top-8 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white",
                  i % 2 ? "lg:left-0" : "lg:left-full",
                )}
              >
                {i + 1}
              </span>
              <div className="process-card card flex gap-5 p-6 md:p-7">
                <LottieIcon name={step.icon as LottieName} className="size-16 shrink-0 md:size-20" />
                <div>
                  <h3 className="display h-card">{step.title}</h3>
                  <p className="mt-2 text-mist/70">
                    <Rich>{step.body}</Rich>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
