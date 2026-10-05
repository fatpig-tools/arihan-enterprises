"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { Machine } from "@/components/three/Showroom";

const Showroom = dynamic(() => import("@/components/three/Showroom"), { ssr: false });

// One machine on the turntable: it turns as the page scrolls and tips its body mid-way.
const tipper: Machine = {
  url: "/models/tipper.glb",
  accentNodes: ["Dump_Box_7", "Boards_5", "Door_6"],
  tipNodes: ["Dump_Box_7", "Boards_5", "Door_6"],
  frontNode: "Cabin_4",
};
const machines = [tipper];

const figures = [
  { name: "Equipment hire", use: "Excavators, cranes, tippers and trailers, by the hour, day or month." },
  { name: "Contract work", use: "Earthwork, haulage and lifting, billed per quantity or as a lump sum." },
  { name: "Transport", use: "Machinery and over-dimensional cargo moved between sites and plants." },
];

/** Pinned hero: a studio turntable presents the fleet as the page scrolls. */
export function ShowroomHero({ intro }: { intro: string }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          progress.current = self.progress;
          setActive(Math.min(figures.length - 1, Math.floor(self.progress * figures.length)));
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[330svh] bg-ink motion-reduce:h-auto">
      <div className="sticky top-0 h-svh min-h-[680px] overflow-hidden motion-reduce:relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_55%,#262d35_0%,#111417_62%)]" aria-hidden="true" />
        <div aria-hidden="true">
          <Showroom machines={machines} progress={progress} />
        </div>

        <div className="wrap relative flex h-full flex-col justify-between pb-10 pt-32">
          <div className="max-w-[34rem]">
            <p className="chip mb-8">
              <span className="text-accent">Arihan Enterprises</span> Machinery hire and contract execution
            </p>
            <h1 className="display text-[clamp(1.9rem,min(3.3vw,6.4svh),3rem)]">Heavy machinery on hire. Project work on contract.</h1>
            <p className="lede mt-7 max-w-md text-mist/75">{intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact">Get a Quote</Button>
              <Button href="/fleet" variant="outline">
                View the Fleet
              </Button>
            </div>
          </div>

          <div className="grid items-end gap-6 border-t border-mist/15 pt-6 md:grid-cols-3">
            {figures.map((m, i) => (
              <div key={m.name} className={cn("transition-opacity duration-500", active === i ? "opacity-100" : "hidden opacity-35 md:block")}>
                <p className="tag flex items-center gap-3">
                  <span className={cn("h-px w-8 transition-colors duration-500", active === i ? "bg-accent" : "bg-mist/40")} />
                  Fig. 0{i + 1}
                </p>
                <p className="mt-3 font-display text-lg uppercase">{m.name}</p>
                <p className="mt-1.5 hidden max-w-xs text-sm text-mist/70 md:block">{m.use}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="tag pointer-events-none absolute bottom-10 right-[clamp(1.25rem,4vw,3rem)] hidden text-mist/45 lg:block">
          Clay model, not to scale
        </p>
      </div>
    </section>
  );
}
