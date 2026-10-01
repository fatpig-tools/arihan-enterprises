"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";
import { SplitHeading } from "@/components/SplitHeading";
import { Button } from "@/components/Button";
import { Loop } from "@/components/Media";

// Geometry of the elevation drawing (SVG user units).
const GROUND = 690;
const SLEW_X = 310;
const PIVOT = { x: 410, y: 560 };
const GANTRY = { x: 215, y: 395 };
const BOOM = 520;
const rad = (deg: number) => (deg * Math.PI) / 180;

// Lattice boom along +x from the pivot: two chords, tapered ends, zigzag bracing.
const lattice = (() => {
  const a = 50;
  const b = BOOM - 50;
  const h = 15;
  let d = `M0 0 L${a} ${-h} L${b} ${-h} L${BOOM} 0 L${b} ${h} L${a} ${h} Z`;
  const bays = 15;
  const step = (b - a) / bays;
  for (let i = 0; i < bays; i++) {
    const x = a + i * step;
    d += ` M${x} ${i % 2 ? h : -h} L${x + step} ${i % 2 ? -h : h}`;
  }
  return d + ` M${a} ${-h} V${h} M${b} ${-h} V${h}`;
})();

const fleet = [
  { t: 45, name: "Sany STC 450" },
  { t: 80, name: "Sany STC 800" },
  { t: 100, name: "Sany SCS1000A" },
];

/** Pinned hero: scrolling raises the boom and hoists the load on an elevation drawing of the crawler crane. */
export function HomeHero({ headline, intro }: { headline: string; intro: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const one = (s: string) => q(s)[0] as SVGElement & HTMLElement;
      const set = (el: Element, attrs: Record<string, number | string>) =>
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));

      const draw = (p: number) => {
        const lift = gsap.utils.clamp(0, 1, p / 0.9);
        const deg = 46 + lift * 24;
        const tip = { x: PIVOT.x + Math.cos(rad(deg)) * BOOM, y: PIVOT.y - Math.sin(rad(deg)) * BOOM };
        const hookY = gsap.utils.interpolate(GROUND - 96, tip.y + 90, lift);

        one(".hl-boom").setAttribute("transform", `rotate(${-deg} ${PIVOT.x} ${PIVOT.y})`);
        set(one(".hl-pendant"), { x2: tip.x, y2: tip.y });
        set(one(".hl-rope"), { x1: tip.x, y1: tip.y, x2: tip.x, y2: hookY });
        one(".hl-hook").setAttribute("transform", `translate(${tip.x} ${hookY})`);

        // Dimension lines
        set(one(".hl-radius"), { x2: tip.x });
        set(one(".hl-radius-end"), { x1: tip.x, x2: tip.x });
        set(one(".hl-radius-label"), { x: (SLEW_X + tip.x) / 2 });
        const ax = PIVOT.x + Math.cos(rad(deg)) * 96;
        const ay = PIVOT.y - Math.sin(rad(deg)) * 96;
        one(".hl-angle").setAttribute("d", `M${PIVOT.x + 96} ${PIVOT.y} A96 96 0 0 0 ${ax} ${ay}`);
        const angleLabel = one(".hl-angle-label");
        angleLabel.textContent = `${Math.round(deg)}°`;
        set(angleLabel, { x: PIVOT.x + Math.cos(rad(deg / 2)) * 122, y: PIVOT.y - Math.sin(rad(deg / 2)) * 122 + 5 });
        const hx = tip.x + 118;
        set(one(".hl-height"), { x1: hx, x2: hx, y2: hookY + 78 });
        set(one(".hl-height-end"), { x1: hx - 8, x2: hx + 8, y1: hookY + 78, y2: hookY + 78 });
        set(one(".hl-height-base"), { x1: hx - 8, x2: hx + 8 });
        const heightLabel = one(".hl-height-label");
        heightLabel.textContent = `Hoist ${Math.round(lift * 100)}%`;
        set(heightLabel, { x: hx - 14, y: (GROUND + hookY + 78) / 2 + 4 });

        // Capacity gauge
        one(".hl-gauge").style.transform = `scaleY(${lift})`;
        q(".hl-tick").forEach((el, i) => el.classList.toggle("is-on", lift * 100 >= fleet[i].t - 0.5));
        one(".hl-hint").style.opacity = String(1 - gsap.utils.clamp(0, 1, p * 8));
      };

      if (reducedMotion()) {
        draw(0.75);
        return;
      }
      draw(0);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => draw(self.progress),
      });
      gsap.from(q(".hl-line"), { opacity: 0, duration: 1.2, delay: 0.7, stagger: 0.03, ease: "power2.out" });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[240svh] bg-ink motion-reduce:h-auto">
      <div className="sticky top-0 h-svh min-h-[680px] overflow-hidden motion-reduce:relative">
        <div className="absolute inset-0 opacity-45" aria-hidden="true">
          <Loop src="/media/sky.mp4" poster="/media/sky-poster.jpg" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/45" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" aria-hidden="true" />

        {/* Elevation drawing */}
        <svg
          viewBox="0 0 1000 760"
          preserveAspectRatio="xMidYMax meet"
          className="absolute bottom-0 right-0 h-[82%] w-full opacity-35 lg:right-[9%] lg:w-[58%] lg:opacity-100"
          aria-hidden="true"
        >
          <g fill="none" stroke="var(--color-mist)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            {/* Ground */}
            <path className="hl-line" d={`M40 ${GROUND} H960`} strokeOpacity="0.5" />
            <path
              className="hl-line"
              strokeOpacity="0.25"
              d={Array.from({ length: 31 }, (_, i) => `M${60 + i * 30} ${GROUND} l-14 14`).join(" ")}
            />
            {/* Crawler tracks */}
            <rect className="hl-line" x="150" y="632" width="320" height="58" rx="29" />
            <rect className="hl-line" x="164" y="646" width="292" height="30" rx="15" strokeOpacity="0.5" />
            <circle className="hl-line" cx="179" cy="661" r="17" />
            <circle className="hl-line" cx="441" cy="661" r="17" />
            {[222, 258, 294, 330, 366, 402].map((x) => (
              <circle key={x} className="hl-line" cx={x} cy="676" r="7" strokeOpacity="0.6" />
            ))}
            {/* Car body and slew ring */}
            <path className="hl-line" d="M250 632 V612 H370 V632 M270 612 V602 H350 V612" />
            {/* Upper works: deck, engine house, cab, counterweight */}
            <path className="hl-line" d="M196 602 V566 H452 V602 Z" />
            <path className="hl-line" d="M214 566 V502 H352 V566" />
            <path className="hl-line" strokeOpacity="0.45" d="M230 516 H336 M230 528 H336 M230 540 H336 M230 552 H336" />
            <path className="hl-line" d="M372 566 V512 H424 L446 540 V566 M382 522 H420 L436 542 H382 Z" />
            <path className="hl-line" d="M140 602 V514 H196 V602 Z M140 536 H196 M140 558 H196 M140 580 H196" />
            {/* Gantry */}
            <path className="hl-line" d={`M232 502 L${GANTRY.x} ${GANTRY.y} L330 502 M${GANTRY.x} ${GANTRY.y} L168 514`} />
            <line className="hl-line hl-pendant" x1={GANTRY.x} y1={GANTRY.y} strokeOpacity="0.7" />
            {/* Boom */}
            <g className="hl-boom">
              <path className="hl-line" transform={`translate(${PIVOT.x} ${PIVOT.y})`} d={lattice} />
            </g>
            <circle className="hl-line" cx={PIVOT.x} cy={PIVOT.y} r="6" fill="var(--color-ink)" />
          </g>

          {/* Hoist line, hook block and load */}
          <g fill="none" stroke="var(--color-accent-soft)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line className="hl-rope" />
            <g className="hl-hook">
              <rect x="-11" y="0" width="22" height="20" rx="4" fill="var(--color-ink)" />
              <path d="M0 20 V30 M0 30 L-70 60 M0 30 L70 60" />
              <rect x="-82" y="60" width="164" height="18" rx="2" fill="var(--color-accent)" stroke="none" />
            </g>
          </g>

          {/* Dimensions */}
          <g fill="none" stroke="var(--color-mist)" strokeOpacity="0.45" strokeWidth="1">
            <line className="hl-radius" x1={SLEW_X} y1="726" y2="726" />
            <line x1={SLEW_X} x2={SLEW_X} y1="716" y2="736" />
            <line className="hl-radius-end" y1="716" y2="736" />
            <path className="hl-angle" strokeDasharray="3 4" />
            <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x + 130} y2={PIVOT.y} strokeDasharray="3 4" />
            <line className="hl-height" y1={GROUND} />
            <line className="hl-height-end" />
            <line className="hl-height-base" y1={GROUND} y2={GROUND} />
          </g>
          <g fill="var(--color-mist)" fillOpacity="0.7" fontSize="13" style={{ fontFamily: "var(--font-mono)" }}>
            <text className="hl-radius-label" y="750" textAnchor="middle">
              Working radius
            </text>
            <text className="hl-angle-label" textAnchor="middle" />
            <text className="hl-height-label" textAnchor="end" />
          </g>
        </svg>

        {/* Copy */}
        <div className="wrap relative flex h-full flex-col justify-center pb-20 pt-28">
          <p className="chip mb-7 w-fit">Machinery hire · Contract execution</p>
          <SplitHeading
            as="h1"
            text="Heavy Machinery on *Hire.* Project Work on *Contract.*"
            delay={0.55}
            className="max-w-[12ch] text-[clamp(2.6rem,min(4.9vw,9.5svh),4.7rem)]"
          />
          <p className="sr-only">{headline}</p>
          <p className="lede mt-7 max-w-md text-mist/85">{intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact">Get a Quote</Button>
            <Button href="/fleet" variant="outline">
              View Our Fleet
            </Button>
          </div>
          <p className="hl-hint tag mt-12 text-mist/60 motion-reduce:hidden">Scroll to lift ↓</p>
        </div>

        {/* Fleet capacity gauge */}
        <div className="absolute bottom-[14%] right-[max(1.5rem,calc((100vw-1360px)/2+3rem))] top-[22%] hidden w-40 lg:block" aria-hidden="true">
          <p className="tag mb-12 text-mist/60">Fleet capacity</p>
          <div className="relative h-[calc(100%-4rem)]">
            <div className="absolute inset-y-0 left-0 w-1 overflow-hidden rounded-full bg-mist/15">
              <div className="hl-gauge size-full origin-bottom bg-accent" />
            </div>
            {fleet.map((unit) => (
              <div
                key={unit.t}
                style={{ bottom: `${unit.t}%` }}
                className="hl-tick absolute left-0 flex translate-y-1/2 items-center gap-3 text-mist/35 transition-colors duration-300 [&.is-on]:text-mist"
              >
                <span className="h-px w-5 bg-current" />
                <span>
                  <span className="display block text-2xl">{unit.t} t</span>
                  <span className="block text-xs opacity-70">{unit.name}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
