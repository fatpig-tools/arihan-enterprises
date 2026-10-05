"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Industry } from "@/content/site";
import { cn } from "@/lib/utils";

/** Sector picker: chips on one side, the chosen sector's scope on a photo card. */
export function Sectors({ industries }: { industries: Industry[] }) {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="card relative flex min-h-[24rem] flex-col justify-end overflow-hidden p-7 md:min-h-[30rem] md:p-10">
        <Image src="/media/bridge-aerial.jpg" alt="" fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover opacity-60 saturate-[0.7]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            aria-live="polite"
          >
            <p className="tag text-accent-soft">
              {String(active + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
            </p>
            <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3rem)]">{current.title}</h3>
            <p className="lede mt-3 max-w-lg text-mist/80">{current.summary}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="card flex flex-wrap content-center gap-2.5 p-7 md:p-10">
        {industries.map((industry, i) => (
          <button
            key={industry.title}
            type="button"
            onClick={() => setActive(i)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            aria-pressed={active === i}
            className={cn(
              "relative min-h-12 cursor-pointer px-5 text-[0.95rem] transition-colors duration-200",
              active === i ? "text-ink" : "border border-mist/15 text-mist/70 hover:text-mist",
            )}
          >
            {active === i && (
              <motion.span layoutId="sector-pill" className="absolute inset-0 bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
            )}
            <span className="relative">{industry.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
