"use client";
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const inputs = [
  { y: 40, title: "Fleet", sub: "Maintained equipment" },
  { y: 188, title: "Operators", sub: "Trained and licensed" },
  { y: 336, title: "Site supervisors", sub: "Accountable on site" },
];
const scope = ["Machine", "Operator", "Fuel management", "Supervision"];

/** Infographic: fleet, operators and supervisors feed one contract that delivers the project. */
export function OneContract() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
      tl.from(q(".oc-node"), { opacity: 0, x: -24, duration: 0.7, stagger: 0.12, ease: "expo.out" })
        .from(q(".oc-path"), { strokeDashoffset: 1, duration: 0.9, stagger: 0.1, ease: "power2.inOut" }, "-=0.4")
        .from(q(".oc-hub"), { scale: 0, transformOrigin: "340px 220px", duration: 0.7, ease: "back.out(1.6)" }, "-=0.5")
        .from(q(".oc-out"), { opacity: 0, x: 24, duration: 0.7, ease: "expo.out" }, "-=0.3")
        .from(q(".oc-pill"), { opacity: 0, y: 10, duration: 0.5, stagger: 0.05 }, "-=0.4");
      gsap.to(q(".oc-flow"), { strokeDashoffset: -28, duration: 1.2, ease: "none", repeat: -1 });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <svg
        viewBox="0 0 640 440"
        className="w-full"
        role="img"
        aria-label="Diagram: our fleet, operators and site supervisors combine under one contract to deliver your project."
      >
        <g fill="none" strokeWidth="1.5">
          {inputs.map((n) => {
            const d = `M200 ${n.y + 32} C250 ${n.y + 32} 250 220 294 220`;
            return (
              <g key={n.title}>
                <path className="oc-path" d={d} pathLength={1} strokeDasharray="1" stroke="var(--color-ink)" strokeOpacity="0.25" />
                <path className="oc-flow" d={d} stroke="var(--color-accent)" strokeDasharray="4 10" strokeLinecap="round" />
              </g>
            );
          })}
          <path className="oc-path" d="M386 220 H450" pathLength={1} strokeDasharray="1" stroke="var(--color-ink)" strokeOpacity="0.25" />
          <path className="oc-flow" d="M386 220 H450" stroke="var(--color-accent)" strokeDasharray="4 10" strokeLinecap="round" />
        </g>

        {inputs.map((n) => (
          <g key={n.title} className="oc-node">
            <rect x="20" y={n.y} width="180" height="64" rx="16" fill="var(--color-paper)" stroke="var(--color-ink)" strokeOpacity="0.12" />
            <circle cx="46" cy={n.y + 32} r="5" fill="var(--color-accent)" />
            <text x="62" y={n.y + 29} fontSize="16" fontWeight="500" fill="var(--color-ink)" style={{ fontFamily: "var(--font-sans)" }}>
              {n.title}
            </text>
            <text x="62" y={n.y + 47} fontSize="11.5" fill="var(--color-ink)" fillOpacity="0.6">
              {n.sub}
            </text>
          </g>
        ))}

        <g className="oc-hub">
          <circle cx="340" cy="220" r="46" fill="var(--color-ink)" />
          <circle cx="340" cy="220" r="56" fill="none" stroke="var(--color-accent)" strokeOpacity="0.5" strokeDasharray="2 6" />
          <text x="340" y="216" textAnchor="middle" fontSize="14" fontWeight="500" fill="var(--color-mist)" style={{ fontFamily: "var(--font-sans)" }}>
            One
          </text>
          <text x="340" y="233" textAnchor="middle" fontSize="14" fontWeight="500" fill="var(--color-mist)" style={{ fontFamily: "var(--font-sans)" }}>
            contract
          </text>
        </g>

        <g className="oc-out">
          <rect x="450" y="170" width="170" height="100" rx="18" fill="var(--color-accent)" />
          <text x="535" y="216" textAnchor="middle" fontSize="18" fontWeight="500" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
            Your project
          </text>
          <text x="535" y="238" textAnchor="middle" fontSize="12" fill="#fff" fillOpacity="0.85">
            Work on schedule
          </text>
        </g>
      </svg>

      <dl className="mt-6 space-y-4 border-t border-ink/10 pt-6">
        {[
          { who: "Typical rental", upTo: 1 },
          { who: "Arihan", upTo: 4 },
        ].map((row) => (
          <div key={row.who} className="grid items-center gap-3 sm:grid-cols-[8.5rem_1fr]">
            <dt className="text-sm font-medium">{row.who}</dt>
            <dd className="flex flex-wrap gap-2">
              {scope.map((item, i) => (
                <span
                  key={item}
                  className={cn(
                    "oc-pill rounded-full px-3 py-1.5 text-sm",
                    i < row.upTo
                      ? row.upTo === 4
                        ? "bg-accent text-white"
                        : "bg-ink text-mist"
                      : "border border-dashed border-ink/25 text-ink/45",
                  )}
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
