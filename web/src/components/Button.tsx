"use client";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ink";
  className?: string;
  external?: boolean;
};

const styles = {
  solid: "bg-accent text-white hover:bg-accent-deep",
  outline: "border border-current/30 hover:border-current/70",
  ink: "bg-ink text-white hover:bg-steel",
};

/** Call-to-action link that leans toward the pointer. */
export function Button({ href, children, variant = "solid", className, external }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      ref={ref}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200",
        styles[variant],
        className,
      )}
    >
      {children}
      <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </span>
    </motion.span>
  );

  const props = { onPointerMove: onMove, onPointerLeave: reset, className: "inline-block" };
  return external ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...props}>
      {inner}
    </a>
  ) : (
    <Link href={href} {...props}>
      {inner}
    </Link>
  );
}
