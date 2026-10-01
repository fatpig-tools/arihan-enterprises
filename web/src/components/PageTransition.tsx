"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Shutter that lifts off each page as it mounts. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
          className="pointer-events-none fixed inset-0 z-[60] bg-steel"
        />
      )}
      {children}
    </>
  );
}
