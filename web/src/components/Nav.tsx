"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav } from "@/content/site";
import { cn, digits } from "@/lib/utils";
import { Logo } from "./Logo";
import { Rich } from "./Rich";

const ease = [0.16, 1, 0.3, 1] as const;

/** Floating capsule navigation with a full-screen menu behind it. */
export function Nav({ phone, email }: { phone: string; email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > 240 && y > previous);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const tel = digits(phone);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-140%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-4 z-50 text-mist"
      >
        <div className="wrap">
          <div className="flex h-16 items-center justify-between gap-4 rounded-full border border-mist/12 bg-ink/70 pl-5 pr-2.5 backdrop-blur-xl">
            <Link href="/" aria-label="Arihan Enterprises — home" onClick={() => setOpen(false)}>
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
              {nav.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[0.7rem] uppercase tracking-[0.18em] transition-colors hover:bg-mist/10",
                    pathname === item.href ? "bg-mist/10 text-mist" : "text-mist/70",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden min-h-11 items-center rounded-full bg-accent px-5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent-deep sm:inline-flex"
              >
                Get a Quote
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full bg-mist/10 transition-colors hover:bg-mist/20"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-0.5 w-4.5 rounded bg-current" />
                <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-0.5 w-4.5 rounded bg-current" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 text-mist backdrop-blur-xl"
          >
            <div className="wrap grid min-h-full gap-12 pb-12 pt-32 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <nav aria-label="All pages">
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                    <li key={item.href} className="overflow-hidden border-b border-mist/10">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "display block py-4 text-[clamp(1.8rem,3.4vw,2.9rem)] transition-colors hover:text-accent-soft",
                            pathname === item.href && "text-accent-soft",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="card space-y-5 p-8"
              >
                <p className="chip">Talk to our team</p>
                <p className="display text-3xl">{tel ? <a href={`tel:${tel}`}>{phone}</a> : <Rich>{phone}</Rich>}</p>
                <p className="text-mist/70">
                  <Rich>{email}</Rich>
                </p>
                <p className="tag text-mist/50">Breakdown support 24×7</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
