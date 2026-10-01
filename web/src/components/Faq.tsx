"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/content/site";
import { Rich } from "./Rich";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="rule border-t">
      {items.map((item, i) => (
        <li key={item.question} className="rule border-b">
          <h3>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold leading-snug md:text-2xl"
            >
              {item.question}
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                <Plus aria-hidden="true" className="size-7" />
              </motion.span>
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`faq-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="muted max-w-3xl pb-7 text-lg">
                  <Rich>{item.answer}</Rich>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
