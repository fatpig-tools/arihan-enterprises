import { LottieIcon, type LottieName } from "@/components/LottieIcon";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { cn } from "@/lib/utils";

const icons: LottieName[] = ["mobilise", "gear", "agreement", "report", "shield"];
const spans = ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", ""];

/** Reasons to choose Arihan as icon tiles; the first is the lead tile. */
export function WhyBento({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <Reveal stagger className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
      {items.map((item, i) => (
        <div key={item.title} className={cn("card flex min-h-56 flex-col p-6 md:p-8", spans[i], i === 0 && "!bg-ink text-mist")}>
          <LottieIcon name={icons[i] ?? "gear"} className={i === 0 ? "size-28" : "size-16"} />
          <h3 className={cn("display mt-auto pt-8", i === 0 ? "text-[clamp(1.9rem,3vw,2.75rem)]" : "h-card")}>{item.title}</h3>
          <p className={cn("mt-2", i === 0 ? "lede max-w-md text-mist/75" : "muted")}>
            <Rich>{item.body}</Rich>
          </p>
        </div>
      ))}
    </Reveal>
  );
}
