import { cn } from "@/lib/utils";

/** Wordmark with a hook-block mark. Replace with the real logo when supplied. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="3" fill="var(--color-accent)" />
        <path d="M16 4v9M11 13h10v5H11zM16 18v3a4 4 0 1 1-4 4" fill="none" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="square" />
      </svg>
      <span className="font-display text-[1.35rem] font-semibold uppercase leading-none tracking-[0.2em]">
        Arihan<span className="ml-2 hidden font-sans text-[0.6rem] font-normal tracking-[0.3em] opacity-60 sm:inline">Enterprises</span>
      </span>
    </span>
  );
}
