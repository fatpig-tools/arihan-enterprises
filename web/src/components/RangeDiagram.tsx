"use client";
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

const PIVOT = { x: 200, y: 350 };
const BOOM = 300;
const GROUND = 400;
const rad = (deg: number) => (deg * Math.PI) / 180;
const tip = (deg: number) => ({ x: PIVOT.x + Math.cos(rad(deg)) * BOOM, y: PIVOT.y - Math.sin(rad(deg)) * BOOM });

/**
 * Animated schematic of why rated capacity depends on radius: as the boom
 * lowers, the working radius grows and the load it can carry shrinks.
 * Deliberately carries no figures — real values come from the load chart.
 */
export function RangeDiagram() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const [boom] = q(".rd-boom");
      const [rope] = q(".rd-rope");
      const [load] = q(".rd-load");
      const [dim] = q(".rd-dim");
      const [tick] = q(".rd-tick");

      const draw = (deg: number) => {
        const t = tip(deg);
        const size = gsap.utils.mapRange(35, 76, 20, 50, deg);
        boom.setAttribute("x2", String(t.x));
        boom.setAttribute("y2", String(t.y));
        rope.setAttribute("x1", String(t.x));
        rope.setAttribute("x2", String(t.x));
        rope.setAttribute("y1", String(t.y));
        rope.setAttribute("y2", String(GROUND - size - 46));
        load.setAttribute("x", String(t.x - size / 2));
        load.setAttribute("y", String(GROUND - size - 46));
        load.setAttribute("width", String(size));
        load.setAttribute("height", String(size));
        dim.setAttribute("x2", String(t.x));
        tick.setAttribute("x1", String(t.x));
        tick.setAttribute("x2", String(t.x));
      };
      draw(62);
      if (reducedMotion()) return;

      gsap.from(q(".rd-draw"), {
        strokeDashoffset: 1,
        duration: 1.4,
        ease: "power2.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      const angle = { deg: 76 };
      gsap.to(angle, {
        deg: 35,
        duration: 4.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        onUpdate: () => draw(angle.deg),
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
      });
    },
    { scope: root },
  );

  const arc = `M ${tip(80).x} ${tip(80).y} A ${BOOM} ${BOOM} 0 0 1 ${tip(28).x} ${tip(28).y}`;

  return (
    <svg
      ref={root}
      viewBox="0 0 640 470"
      className="w-full"
      role="img"
      aria-label="Schematic: as the boom lowers, the working radius increases and the load the crane can carry decreases."
    >
      <g fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5">
        <path className="rd-draw" pathLength={1} strokeDasharray="1" d={`M 20 ${GROUND} H 620`} />
        <path className="rd-draw" pathLength={1} strokeDasharray="1" d={arc} />
        {[76, 55, 35].map((deg) => (
          <path
            key={deg}
            className="rd-draw"
            pathLength={1}
            strokeDasharray="1"
            strokeOpacity="0.18"
            d={`M ${PIVOT.x} ${PIVOT.y} L ${tip(deg).x} ${tip(deg).y}`}
          />
        ))}
        <path className="rd-draw" pathLength={1} strokeDasharray="1" d={`M ${PIVOT.x} ${GROUND + 8} V ${GROUND + 40}`} />
      </g>

      {/* Crane body */}
      <g fill="currentColor" fillOpacity="0.85">
        <rect x="108" y="372" width="150" height="28" rx="14" />
        <rect x="118" y="330" width="120" height="36" />
        <rect x="96" y="322" width="34" height="46" fillOpacity="0.5" />
      </g>

      <g stroke="var(--color-accent)" strokeLinecap="round">
        <line className="rd-boom" x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y} strokeWidth="7" />
        <line className="rd-rope" strokeWidth="1.5" strokeDasharray="5 5" />
        <line className="rd-dim" x1={PIVOT.x} y1={GROUND + 28} x2={PIVOT.x} y2={GROUND + 28} strokeWidth="2" />
        <line className="rd-tick" y1={GROUND + 8} y2={GROUND + 40} strokeWidth="2" />
      </g>
      <rect className="rd-load" fill="var(--color-accent)" />
      <circle cx={PIVOT.x} cy={PIVOT.y} r="7" fill="var(--color-accent)" />

      <g className="tag" fill="currentColor" fillOpacity="0.6" fontSize="11">
        <text x={PIVOT.x + 12} y={GROUND + 60}>WORKING RADIUS →</text>
        <text x="330" y="60">BOOM ARC</text>
        <text x="20" y="30">RADIUS UP · RATED LOAD DOWN</text>
      </g>
    </svg>
  );
}
