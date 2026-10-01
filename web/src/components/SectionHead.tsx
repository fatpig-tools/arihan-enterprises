import { cn } from "@/lib/utils";
import { SplitHeading } from "./SplitHeading";

export function SectionHead({
  tag,
  title,
  className,
  centered,
}: {
  tag: string;
  title: string;
  className?: string;
  /** Kept for callers on light sections; colour now follows the section. */
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "flex flex-col items-center text-center", className)}>
      <p className="chip mb-6">{tag}</p>
      <SplitHeading text={title} className={cn("h-section", centered ? "max-w-[20ch]" : "max-w-[18ch]")} />
    </div>
  );
}
