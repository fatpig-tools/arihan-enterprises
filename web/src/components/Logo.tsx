import { cn } from "@/lib/utils";

/** Wordmark with a hook-block mark. Replace with the real logo when supplied. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--color-accent)" />
        <path d="M16 4v9M11 13h10v5H11zM16 18v3a4 4 0 1 1-4 4" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="square" />
      </svg>
      <span className="font-display text-[1.3rem] font-semibold leading-none tracking-tight">
        Arihan <span className="font-serif text-[1.25em] font-normal italic opacity-70">Enterprises</span>
      </span>
    </span>
  );
}
